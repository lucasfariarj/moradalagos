import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropertyPage, { generateMetadata, generateStaticParams } from "@/app/imoveis/[slug]/page";
import { FavoritesProvider } from "@/context/FavoritesContext";

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

async function renderPage(slug = "casa-ampla-em-condominio-nautico") {
  const page = await PropertyPage(params(slug));
  render(<FavoritesProvider>{page}</FavoritesProvider>);
  return { user: userEvent.setup() };
}

describe("Página do imóvel", () => {
  it("gera uma rota estática por imóvel", () => {
    expect(generateStaticParams()).toHaveLength(6);
    expect(generateStaticParams()).toContainEqual({ slug: "studio-a-poucos-passos-da-lagoa" });
  });

  it("gera título e descrição para SEO", async () => {
    const metadata = await generateMetadata(params("studio-a-poucos-passos-da-lagoa"));
    expect(metadata.title).toBe("Studio a poucos passos da lagoa | Morada Lagos");
    expect(metadata.description).toContain("Centro, Iguaba Grande");
  });

  it("exibe os detalhes do imóvel", async () => {
    await renderPage();

    expect(screen.getByRole("heading", { level: 1, name: "Casa ampla em condomínio náutico" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Trilha de navegação" })).toHaveTextContent(
      "InícioImóveisCasa ampla em condomínio náutico",
    );
    expect(screen.getByText("Píer")).toBeInTheDocument();
    expect(screen.getByText(/acesso direto à Lagoa de Araruama/)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Ampliar:/ })).toHaveLength(3);
  });

  it("detalha os custos mensais", async () => {
    await renderPage();

    const card = screen.getByRole("complementary", { name: "Valores e agendamento de visita" });
    expect(within(card).getByText("R$ 1.400")).toBeInTheDocument(); // condomínio
    expect(within(card).getByText("R$ 13.010")).toBeInTheDocument(); // 11.200 + 1.400 + 410
  });

  it("mostra 'Isento' quando não há condomínio", async () => {
    await renderPage("casa-contemporanea-perto-da-praia");
    expect(screen.getByText("Isento")).toBeInTheDocument();
  });

  it("sugere imóveis semelhantes, priorizando o mesmo tipo", async () => {
    await renderPage();

    const section = screen.getByRole("region", { name: "Imóveis semelhantes" });
    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toHaveLength(3);
    expect(titles[0]).toBe("Casa contemporânea perto da praia");
    expect(titles).not.toContain("Casa ampla em condomínio náutico");
  });

  it("envia o pedido de visita", async () => {
    const { user } = await renderPage();

    await user.type(screen.getByLabelText("Nome"), "Ana");
    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.click(screen.getByRole("button", { name: "Agendar visita" }));

    expect(screen.getByRole("status")).toHaveTextContent("Pedido enviado!");
  });

  it("abre a galeria e navega entre as fotos", async () => {
    const { user } = await renderPage();

    await user.click(screen.getAllByRole("button", { name: /^Ampliar:/ })[0]);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("1 / 3");

    await user.click(within(dialog).getByRole("button", { name: "Próxima foto" }));
    expect(dialog).toHaveTextContent("2 / 3");

    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(dialog).toHaveTextContent("3 / 3");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("favorita pelo botão do cabeçalho do imóvel", async () => {
    const { user } = await renderPage();

    await user.click(screen.getByRole("button", { name: "Adicionar Casa ampla em condomínio náutico aos favoritos" }));
    expect(screen.getByRole("button", { name: /Remover Casa ampla em condomínio náutico/ })).toHaveTextContent("Salvo");
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
  });

  it("retorna 404 para um slug inexistente", async () => {
    await expect(PropertyPage(params("nao-existe"))).rejects.toThrow();
  });
});
