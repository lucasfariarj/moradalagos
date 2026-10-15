import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FavoritesProvider } from "@/context/FavoritesContext";

describe("<Header />", () => {
  it("exibe a navegação e o contador de favoritos", () => {
    render(
      <FavoritesProvider initialFavorites={["3"]}>
        <Header />
      </FavoritesProvider>,
    );

    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(nav).toHaveTextContent("Imóveis");
    expect(nav).toHaveTextContent("Contato");
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
  });

  it("abre e fecha o menu móvel", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <Header />
      </FavoritesProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("navigation", { name: "Menu móvel" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(screen.queryByRole("navigation", { name: "Menu móvel" })).not.toBeInTheDocument();
  });
});

describe("<Footer />", () => {
  it("confirma a inscrição na newsletter", async () => {
    const user = userEvent.setup();
    render(<Footer />);

    await user.type(screen.getByLabelText("Seu melhor e-mail"), "ana@example.com");
    await user.click(screen.getByRole("button", { name: "Inscrever-se" }));

    expect(screen.getByRole("status")).toHaveTextContent("Obrigado!");
  });
});
