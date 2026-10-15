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
