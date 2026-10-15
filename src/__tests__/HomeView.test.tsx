import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeView } from "@/components/HomeView";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { getProperties } from "@/lib/properties";

function renderHome() {
  render(
    <FavoritesProvider>
      <HomeView properties={getProperties()} />
    </FavoritesProvider>,
  );
  return { user: userEvent.setup() };
}

const results = () => screen.getByRole("region", { name: "Imóveis em destaque" });
const cardTitles = () =>
  within(results())
    .queryAllByRole("heading", { level: 3 })
    .map((h) => h.textContent);

describe("<HomeView />", () => {
  it("lista todos os imóveis inicialmente", () => {
    renderHome();
    expect(screen.getByText("6 imóveis encontrados para o seu perfil")).toBeInTheDocument();
    expect(cardTitles()).toHaveLength(6);
  });

  it("filtra pelas abas de tipo", async () => {
    const { user } = renderHome();

    await user.click(screen.getByRole("button", { name: "Casas" }));

    expect(screen.getByRole("button", { name: "Casas" })).toHaveAttribute("aria-pressed", "true");
    expect(cardTitles()).toEqual(["Casa contemporânea perto da praia", "Casa ampla em condomínio náutico"]);
    // A aba e o seletor da busca compartilham o mesmo estado
    expect(screen.getByLabelText("Tipo de imóvel")).toHaveValue("casa");
  });

  it("filtra pelos campos da busca", async () => {
    const { user } = renderHome();

    await user.selectOptions(screen.getByLabelText("Onde você quer morar?"), "Cabo Frio");
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    expect(screen.getByText("1 imóvel encontrado para o seu perfil")).toBeInTheDocument();
    expect(cardTitles()).toEqual(["Refúgio à beira-mar mobiliado"]);
  });

  it("aplica uma busca popular", async () => {
    const { user } = renderHome();

    await user.click(screen.getByRole("button", { name: "Praia Grande" }));

    expect(screen.getByLabelText("Onde você quer morar?")).toHaveValue("Praia Grande");
    expect(cardTitles()).toEqual(["Cobertura com vista para o mar"]);
  });

  it("mostra estado vazio e permite limpar os filtros", async () => {
    const { user } = renderHome();

    await user.selectOptions(screen.getByLabelText("Onde você quer morar?"), "Iguaba Grande");
    await user.selectOptions(screen.getByLabelText("Quartos"), "4");

    expect(screen.getByText("0 imóveis encontrados para o seu perfil")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));

    expect(cardTitles()).toHaveLength(6);
    expect(screen.getByLabelText("Quartos")).toHaveValue("0");
  });
});
