"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { Logo } from "./Logo";
import { CloseIcon, HeartIcon, MenuIcon } from "./icons";

export const NAV_LINKS = [
  { label: "Imóveis", href: "#imoveis" },
  { label: "Regiões", href: "#mapa" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const { favorites } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-transparent bg-ocean-dark/95 shadow-lg backdrop-blur" : "border-white/20 bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <a href="#" aria-label="Morada Lagos, início" className="rounded-full">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[0.95rem] font-medium text-white transition-opacity hover:opacity-75">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-7 md:flex">
          <a href="#imoveis" className="flex items-center gap-2 text-[0.95rem] font-medium text-white hover:opacity-80">
            <HeartIcon className="size-[18px]" strokeWidth={2} />
            Favoritos
            {favorites.length > 0 && (
              <span
                data-testid="favorites-count"
                className="grid size-5 place-items-center rounded-full bg-coral-light text-xs font-semibold text-petroleum"
              >
                {favorites.length}
              </span>
            )}
          </a>
          <a
            href="#contato"
            className="rounded-full bg-white px-5 py-2.5 text-[0.95rem] font-semibold text-ocean transition-colors hover:bg-sand"
          >
            Anuncie seu imóvel
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="grid size-10 place-items-center rounded-full text-white md:hidden"
        >
          {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Menu móvel" className="border-t border-white/10 px-6 pt-2 pb-6 md:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-white/10 py-4 text-lg text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-white">
              <HeartIcon className="size-[18px]" strokeWidth={2} />
              Favoritos ({favorites.length})
            </span>
            <a
              href="#contato"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-white px-5 py-2.5 font-semibold text-ocean"
            >
              Anuncie seu imóvel
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
