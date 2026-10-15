import Image from "next/image";
import type { ComponentProps } from "react";
import { SearchBar } from "./SearchBar";

export const HERO_IMAGE = "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2400&q=80";

export function Hero(props: ComponentProps<typeof SearchBar>) {
  return (
    <section className="relative isolate overflow-hidden bg-ocean-dark">
      <Image
        src={HERO_IMAGE}
        alt="Praia com coqueiros e morros verdes na Região dos Lagos"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ocean-dark/90 via-ocean-dark/55 to-ocean-dark/10"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ocean-dark/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-36 pb-16 md:pt-44 md:pb-24 lg:px-8">
        <p className="flex items-center gap-4 text-[0.7rem] font-bold tracking-[0.14em] sm:text-xs sm:tracking-[0.2em] text-coral-light uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-coral-light" />
          Seu novo capítulo começa aqui
        </p>
        <h1 className="mt-6 font-serif text-[2.3rem] leading-[1.08] text-white min-[400px]:text-[2.6rem] sm:text-6xl lg:text-[5.25rem]">
          Viva perto do mar.
          <br />
          Todos os dias.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
          Imóveis selecionados na Região dos Lagos para você morar, descansar e viver no seu ritmo.
        </p>

        <div className="mt-10 max-w-[64rem] md:mt-12">
          <SearchBar {...props} />
        </div>
      </div>
    </section>
  );
}
