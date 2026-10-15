export type PropertyType = "apartamento" | "casa";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  /** Aluguel mensal em reais. */
  price: number;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  /** Área em m². */
  area: number;
  featured: boolean;
  image: string;
  coordinates: { lat: number; lng: number };
}

export interface PropertyFilters {
  /** Cidade ou bairro; string vazia = todos. */
  location: string;
  type: PropertyType | "all";
  /** Quantidade mínima de quartos; 0 = todos. */
  bedrooms: number;
}
