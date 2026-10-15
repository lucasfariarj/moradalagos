import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { getProperties } from "@/lib/properties";

const [property] = getProperties();

describe("<PropertyCard />", () => {
  it("exibe as informações do imóvel", () => {
    render(
      <FavoritesProvider>
        <PropertyCard property={property} />
      </FavoritesProvider>,
    );

    expect(screen.getByRole("heading", { name: "Apartamento com luz natural" })).toBeInTheDocument();
    expect(screen.getByText("R$ 6.800")).toBeInTheDocument();
    expect(screen.getByText("Geribá, Armação dos Búzios")).toBeInTheDocument();
    expect(screen.getByText("Destaque")).toBeInTheDocument();
    expect(screen.getByText(/92 m²/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: property.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: property.title })).toHaveAttribute(
      "href",
      "/imoveis/apartamento-com-luz-natural",
    );
  });

  it("alterna o favorito e atualiza o contador do header", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <Header />
        <PropertyCard property={property} />
      </FavoritesProvider>,
    );

    expect(screen.queryByTestId("favorites-count")).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: /adicionar .* aos favoritos/i });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);
    expect(screen.getByRole("button", { name: /remover .* dos favoritos/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: /remover .* dos favoritos/i }));
    expect(screen.queryByTestId("favorites-count")).not.toBeInTheDocument();
  });
});
