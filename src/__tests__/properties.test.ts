import {
  DEFAULT_FILTERS,
  filterProperties,
  formatPrice,
  formatPriceShort,
  getLocations,
  getProperties,
  getPropertyBySlug,
  getSimilarProperties,
  pluralize,
  propertyHref,
} from "@/lib/properties";

describe("lib/properties", () => {
  const properties = getProperties();

  it("carrega os imóveis do JSON local", () => {
    expect(properties).toHaveLength(6);
    expect(properties[0]).toMatchObject({ id: "1", title: "Apartamento com luz natural", type: "apartamento" });
  });

  describe("filterProperties", () => {
    it("retorna tudo com os filtros padrão", () => {
      expect(filterProperties(properties, DEFAULT_FILTERS)).toHaveLength(6);
    });

    it("filtra por tipo", () => {
      const casas = filterProperties(properties, { ...DEFAULT_FILTERS, type: "casa" });
      expect(casas.map((p) => p.id)).toEqual(["2", "6"]);
    });

    it("filtra por cidade ou por bairro", () => {
      expect(filterProperties(properties, { ...DEFAULT_FILTERS, location: "Armação dos Búzios" })).toHaveLength(2);
      expect(filterProperties(properties, { ...DEFAULT_FILTERS, location: "Passagem" }).map((p) => p.id)).toEqual(["3"]);
    });

    it("filtra por quantidade mínima de quartos", () => {
      const result = filterProperties(properties, { ...DEFAULT_FILTERS, bedrooms: 3 });
      expect(result.every((p) => p.bedrooms >= 3)).toBe(true);
      expect(result).toHaveLength(4);
    });

    it("combina filtros", () => {
      const result = filterProperties(properties, { location: "Armação dos Búzios", type: "casa", bedrooms: 4 });
      expect(result).toEqual([]);
    });
  });

  it("busca imóvel pelo slug e monta o link", () => {
    const property = getPropertyBySlug("refugio-a-beira-mar-mobiliado");
    expect(property?.id).toBe("3");
    expect(getPropertyBySlug("inexistente")).toBeUndefined();
    expect(propertyHref(property!)).toBe("/imoveis/refugio-a-beira-mar-mobiliado");
  });

  it("tem slugs únicos", () => {
    const slugs = properties.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("sugere semelhantes do mesmo tipo e cidade primeiro", () => {
    const [first] = properties; // apartamento em Armação dos Búzios
    const similar = getSimilarProperties(first);
    expect(similar).toHaveLength(3);
    expect(similar.every((p) => p.type === "apartamento")).toBe(true);
    expect(similar.map((p) => p.id)).not.toContain(first.id);
  });

  it("lista cidades e bairros únicos e ordenados", () => {
    const { cities, neighborhoods } = getLocations(properties);
    expect(cities).toEqual(["Armação dos Búzios", "Arraial do Cabo", "Cabo Frio", "Iguaba Grande", "São Pedro da Aldeia"]);
    expect(neighborhoods).toContain("Geribá");
    expect(new Set(neighborhoods).size).toBe(neighborhoods.length);
  });

  it("formata preços", () => {
    expect(formatPrice(6800)).toBe("R$ 6.800");
    expect(formatPrice(11200)).toBe("R$ 11.200");
    expect(formatPriceShort(6800)).toBe("R$ 6,8 mil");
    expect(formatPriceShort(5000)).toBe("R$ 5 mil");
  });

  it("pluraliza", () => {
    expect(pluralize(1, "imóvel", "imóveis")).toBe("1 imóvel");
    expect(pluralize(6, "imóvel", "imóveis")).toBe("6 imóveis");
  });
});
