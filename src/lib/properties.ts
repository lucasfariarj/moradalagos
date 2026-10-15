import data from "@/data/properties.json";
import type { Property, PropertyFilters, PropertyType } from "@/types/property";

export const DEFAULT_FILTERS: PropertyFilters = { location: "", type: "all", bedrooms: 0 };

export const TYPE_LABELS: Record<PropertyType, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
};

export function getProperties(): Property[] {
  return data as Property[];
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return getProperties().find((p) => p.slug === slug);
}

/** Imóveis do mesmo tipo primeiro, depois os da mesma cidade, depois os demais. */
export function getSimilarProperties(property: Property, limit = 3): Property[] {
  const score = (p: Property) => (p.type === property.type ? 2 : 0) + (p.city === property.city ? 1 : 0);
  return getProperties()
    .filter((p) => p.id !== property.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

export function propertyHref(property: Pick<Property, "slug">): string {
  return `/imoveis/${property.slug}`;
}

/** Monta a URL do Unsplash no tamanho pedido. */
export function imageUrl(src: string, width: number): string {
  return `${src}?auto=format&fit=crop&w=${width}&q=75`;
}

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter(
    (p) =>
      (!filters.location || p.city === filters.location || p.neighborhood === filters.location) &&
      (filters.type === "all" || p.type === filters.type) &&
      p.bedrooms >= filters.bedrooms,
  );
}

/** Cidades e bairros únicos, em ordem alfabética, para o seletor de localização. */
export function getLocations(properties: Property[]) {
  const sorted = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b, "pt-BR"));
  return {
    cities: sorted(properties.map((p) => p.city)),
    neighborhoods: sorted(properties.map((p) => p.neighborhood)),
  };
}

/** 6800 → "R$ 6.800" */
export function formatPrice(value: number): string {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

/** 6800 → "R$ 6,8 mil" (marcadores do mapa) */
export function formatPriceShort(value: number): string {
  const thousands = (value / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  return `R$ ${thousands} mil`;
}

export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
