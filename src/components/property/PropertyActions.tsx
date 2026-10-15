"use client";

import { useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { HeartIcon, ShareIcon } from "../icons";

const pill =
  "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors";

export function PropertyActions({ id, title }: { id: string; title: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);
  const favorite = isFavorite(id);

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Sem permissão para a área de transferência: não faz nada.
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={share}
        className={`${pill} border-water bg-white text-petroleum hover:border-ocean hover:text-ocean`}
      >
        <ShareIcon className="size-4" strokeWidth={2} />
        <span aria-live="polite">{copied ? "Link copiado" : "Compartilhar"}</span>
      </button>
      <button
        type="button"
        onClick={() => toggleFavorite(id)}
        aria-pressed={favorite}
        aria-label={favorite ? `Remover ${title} dos favoritos` : `Adicionar ${title} aos favoritos`}
        className={`${pill} ${
          favorite
            ? "border-ocean bg-ocean text-white"
            : "border-water bg-white text-petroleum hover:border-ocean hover:text-ocean"
        }`}
      >
        <HeartIcon filled={favorite} className="size-4" strokeWidth={2} />
        {favorite ? "Salvo" : "Favoritar"}
      </button>
    </div>
  );
}
