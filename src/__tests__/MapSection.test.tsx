import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { MapSection } from "@/components/MapSection";
import { projectProperties } from "@/components/map/IllustratedMap";
import { getProperties } from "@/lib/properties";

jest.mock("@vis.gl/react-google-maps", () => ({
  APIProvider: ({ children, apiKey }: { children: ReactNode; apiKey: string }) => (
    <div data-testid="google-map" data-api-key={apiKey}>
      {children}
    </div>
  ),
  Map: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AdvancedMarker: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  InfoWindow: ({ children }: { children: ReactNode }) => <div role="dialog">{children}</div>,
}));

const properties = getProperties();

describe("<MapSection />", () => {
  it("usa o mapa ilustrado quando não há chave do Google Maps", () => {
    render(<MapSection properties={properties} apiKey="" />);

    const map = screen.getByTestId("illustrated-map");
    expect(screen.queryByTestId("google-map")).not.toBeInTheDocument();
    expect(within(map).getByRole("button", { name: /R\$ 6,8 mil/ })).toBeInTheDocument();
    expect(within(map).getAllByRole("button", { pressed: false })).toHaveLength(properties.length);
  });

  it("mostra o resumo ao clicar em um marcador e controla o zoom", async () => {
    const user = userEvent.setup();
    render(<MapSection properties={properties} apiKey="" />);

    await user.click(screen.getByRole("button", { name: /Studio a poucos passos da lagoa/ }));
    expect(screen.getByText("Centro, Iguaba Grande")).toBeInTheDocument();

    const zoomOut = screen.getByRole("button", { name: "Afastar" });
    expect(zoomOut).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Aproximar" }));
    expect(zoomOut).toBeEnabled();
  });

  it("usa o Google Maps quando há chave configurada", async () => {
    const user = userEvent.setup();
    render(<MapSection properties={properties} apiKey="test-key" />);

    expect(screen.getByTestId("google-map")).toHaveAttribute("data-api-key", "test-key");
    await user.click(screen.getByRole("button", { name: /Casa ampla em condomínio náutico/ }));
    expect(within(screen.getByRole("dialog")).getByText("Nova São Pedro, São Pedro da Aldeia")).toBeInTheDocument();
  });

  it("projeta as coordenadas dentro da área do mapa", () => {
    for (const { x, y } of projectProperties(properties)) {
      expect(x).toBeGreaterThanOrEqual(0.14);
      expect(x).toBeLessThanOrEqual(0.86);
      expect(y).toBeGreaterThanOrEqual(0.14);
      expect(y).toBeLessThanOrEqual(0.86);
    }
  });
});
