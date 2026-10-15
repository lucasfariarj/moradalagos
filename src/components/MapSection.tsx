import { PropertyMap, type PropertyMapProps } from "./map/PropertyMap";
import { PinIcon } from "./icons";

export function MapSection(props: PropertyMapProps) {
  return (
    <section id="mapa" aria-labelledby="mapa-title" className="scroll-mt-20 bg-mist py-16 md:py-24">
      <div className="mx-auto max-w-[88rem] px-6">
        <div className="grid overflow-hidden rounded-[2rem] lg:grid-cols-[0.4fr_0.6fr]">
          <div className="bg-ocean px-8 py-12 sm:px-14 sm:py-16">
            <p className="text-xs font-bold tracking-[0.2em] text-coral-light uppercase">Explore o mapa</p>
            <h2 id="mapa-title" className="mt-4 font-serif text-4xl leading-tight text-white md:text-[2.75rem]">
              Descubra seu lugar à beira-mar.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/80">
              Explore imóveis perto das melhores praias, lagoas, marinas e de tudo o que torna a Região dos Lagos
              única.
            </p>
            <a
              href="#imoveis"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-sand px-7 py-3.5 text-sm font-semibold text-petroleum transition-colors hover:bg-peach"
            >
              <PinIcon className="size-4" strokeWidth={2} />
              Buscar pelo mapa
            </a>
          </div>

          <div className="min-h-[360px] lg:min-h-[450px]">
            <PropertyMap {...props} />
          </div>
        </div>
      </div>
    </section>
  );
}

