"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({
  children,
  initialFavorites = [],
}: {
  children: ReactNode;
  initialFavorites?: string[];
}) {
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => (current.includes(id) ? current.filter((f) => f !== id) : [...current, id]));
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite: (id: string) => favorites.includes(id), toggleFavorite }),
    [favorites, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites deve ser usado dentro de <FavoritesProvider>");
  return context;
}
