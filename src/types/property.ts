export type PropertyType = "apartamento" | "casa";

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  /** Aluguel mensal em reais. */
  price: number;
  /** Condomínio mensal em reais (0 = sem condomínio). */
  condoFee: number;
  /** IPTU mensal em reais. */
  iptu: number;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  /** Área em m². */
  area: number;
  featured: boolean;
  image: string;
  /** Fotos adicionais exibidas na página do imóvel. */
  gallery: string[];
  /** Parágrafos separados por linha em branco. */
  description: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
}

export interface PropertyFilters {
  /** Cidade ou bairro; string vazia = todos. */
  location: string;
  type: PropertyType | "all";
  /** Quantidade mínima de quartos; 0 = todos. */
  bedrooms: number;
}
