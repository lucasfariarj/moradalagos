"use client";

import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";
import { formatPrice, TYPE_LABELS } from "@/lib/properties";
import type { Property } from "@/types/property";
import { AreaIcon, BathIcon, BedIcon, HeartIcon, PinIcon } from "./icons";

export function PropertyCard({ property }: { property: Property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-24px_rgba(18,52,59,0.35)] transition-shadow hover:shadow-[0_24px_50px_-20px_rgba(18,52,59,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`${property.image}?auto=format&fit=crop&w=900&q=75`}
          alt={property.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {property.featured && (
          <span className="absolute top-4 left-4 rounded-full bg-sand-rose px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] text-ocean uppercase">
            Destaque
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-pressed={favorite}
          aria-label={favorite ? `Remover ${property.title} dos favoritos` : `Adicionar ${property.title} aos favoritos`}
          className={`absolute top-4 right-4 grid size-10 place-items-center rounded-full transition-colors ${
            favorite ? "bg-ocean text-white" : "bg-white/90 text-petroleum hover:bg-white hover:text-coral"
          }`}
        >
          <HeartIcon filled={favorite} className="size-[18px]" strokeWidth={2} />
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.7rem] font-bold tracking-[0.14em] text-steel uppercase">
            {TYPE_LABELS[property.type]}
          </span>
          <p className="text-sm text-steel">
            <span className="font-bold text-ocean">{formatPrice(property.price)}</span>/mês
          </p>
        </div>
        <h3 className="mt-3 font-serif text-[1.35rem] leading-snug text-petroleum">{property.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-steel">
          <PinIcon className="size-4 shrink-0" />
          {property.neighborhood}, {property.city}
        </p>

        <ul className="mt-5 flex items-center gap-5 border-t border-mist pt-5 text-sm text-steel">
          <li className="flex items-center gap-1.5" title="Quartos">
            <BedIcon className="size-[18px]" />
            <span className="sr-only">Quartos:</span> {property.bedrooms}
          </li>
          <li className="flex items-center gap-1.5" title="Banheiros">
            <BathIcon className="size-[18px]" />
            <span className="sr-only">Banheiros:</span> {property.bathrooms}
          </li>
          <li className="flex items-center gap-1.5" title="Área">
            <AreaIcon className="size-4" />
            <span className="sr-only">Área:</span> {property.area} m²
          </li>
        </ul>
      </div>
    </article>
  );
}
