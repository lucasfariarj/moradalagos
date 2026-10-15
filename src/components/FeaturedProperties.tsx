"use client";

import { pluralize } from "@/lib/properties";
import type { Property, PropertyFilters } from "@/types/property";
import { PropertyCard } from "./PropertyCard";
import { ArrowRightIcon } from "./icons";

const TABS: { label: string; value: PropertyFilters["type"] }[] = [
  { label: "Todos os imóveis", value: "all" },
  { label: "Apartamentos", value: "apartamento" },
  { label: "Casas", value: "casa" },
];

interface FeaturedPropertiesProps {
  properties: Property[];
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  onClearFilters: () => void;
}

export function FeaturedProperties({ properties, filters, onFiltersChange, onClearFilters }: FeaturedPropertiesProps) {
  return (
    <section id="imoveis" aria-labelledby="imoveis-title" className="scroll-mt-20 bg-offwhite py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-coral uppercase">Escolhas especiais</p>
            <h2 id="imoveis-title" className="mt-3 font-serif text-4xl text-petroleum md:text-[2.75rem]">
              Imóveis em destaque
            </h2>
            <p aria-live="polite" className="mt-2 text-steel">
              {pluralize(properties.length, "imóvel encontrado", "imóveis encontrados")} para o seu perfil
            </p>
          </div>

          <div role="group" aria-label="Filtrar por tipo" className="flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const active = filters.type === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onFiltersChange({ ...filters, type: tab.value })}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "border-ocean bg-ocean text-white"
                      : "border-water bg-white text-petroleum hover:border-ocean hover:text-ocean"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {properties.length > 0 ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-water bg-white px-6 py-16 text-center">
            <p className="font-serif text-2xl text-petroleum">Nenhum imóvel com esse perfil, por enquanto.</p>
            <p className="mt-2 text-steel">Experimente ampliar a busca para ver mais opções.</p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white hover:bg-ocean-dark"
            >
              Limpar filtros
            </button>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <a href="#imoveis" onClick={onClearFilters} className="group flex items-center gap-4 font-semibold text-ocean">
            Ver todos os imóveis
            <span className="grid size-10 place-items-center rounded-full border border-water transition-colors group-hover:border-ocean group-hover:bg-ocean group-hover:text-white">
              <ArrowRightIcon className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
