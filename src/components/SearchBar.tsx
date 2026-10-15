"use client";

import type { ComponentType, FormEvent, ReactNode, SVGProps } from "react";
import type { PropertyFilters } from "@/types/property";
import { BedIcon, ChevronDownIcon, HomeIcon, PinIcon, SearchIcon } from "./icons";

export const POPULAR_SEARCHES = ["Geribá", "Passagem", "Praia Grande"];

interface SearchBarProps {
  filters: PropertyFilters;
  locations: { cities: string[]; neighborhoods: string[] };
  onChange: (filters: PropertyFilters) => void;
  onSubmit: () => void;
}

export function SearchBar({ filters, locations, onChange, onSubmit }: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div>
      <form
        role="search"
        aria-label="Buscar imóveis"
        onSubmit={handleSubmit}
        className="flex flex-col rounded-2xl bg-white p-3 shadow-2xl shadow-ocean-dark/20 md:flex-row md:items-stretch"
      >
        <Field id="search-location" label="Onde você quer morar?" icon={PinIcon}>
          <select
            id="search-location"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className={selectClass}
          >
            <option value="">Todos</option>
            <optgroup label="Cidades">
              {locations.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </optgroup>
            <optgroup label="Bairros">
              {locations.neighborhoods.map((neighborhood) => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </optgroup>
          </select>
        </Field>

        <Field id="search-type" label="Tipo de imóvel" icon={HomeIcon}>
          <select
            id="search-type"
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value as PropertyFilters["type"] })}
            className={selectClass}
          >
            <option value="all">Todos</option>
            <option value="apartamento">Apartamento</option>
            <option value="casa">Casa</option>
          </select>
        </Field>

        <Field id="search-bedrooms" label="Quartos" icon={BedIcon}>
          <select
            id="search-bedrooms"
            value={filters.bedrooms}
            onChange={(e) => onChange({ ...filters, bedrooms: Number(e.target.value) })}
            className={selectClass}
          >
            <option value={0}>Todos</option>
            <option value={1}>1+ quarto</option>
            <option value={2}>2+ quartos</option>
            <option value={3}>3+ quartos</option>
            <option value={4}>4+ quartos</option>
          </select>
        </Field>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ocean px-8 py-4 font-semibold text-white transition-colors hover:bg-ocean-dark md:mt-0 md:min-w-[130px]"
        >
          <SearchIcon className="size-[18px]" strokeWidth={2} />
          Buscar
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem] text-white/80">
        <span>Buscas populares:</span>
        {POPULAR_SEARCHES.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              onChange({ ...filters, location: term });
              onSubmit();
            }}
            className="border-b border-white/40 pb-0.5 text-white transition-colors hover:border-coral-light hover:text-coral-light"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

const selectClass =
  "w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[0.95rem] font-semibold text-petroleum focus:outline-none";

function Field({
  id,
  label,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
}) {
  return (
    <div className="relative flex-1 border-b border-mist px-5 py-4 last-of-type:border-0 focus-within:rounded-xl focus-within:bg-offwhite md:border-r md:border-b-0 md:px-6">
      <label htmlFor={id} className="block text-[0.68rem] font-bold tracking-[0.12em] text-steel uppercase">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2.5">
        <Icon className="size-4 shrink-0 text-coral" />
        {children}
      </div>
      <ChevronDownIcon className="pointer-events-none absolute right-5 bottom-[1.15rem] size-4 text-petroleum md:right-6" />
    </div>
  );
}
