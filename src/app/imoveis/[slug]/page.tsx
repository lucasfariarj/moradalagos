import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { AreaIcon, BathIcon, BedIcon, CarIcon, CheckIcon, ChevronRightIcon, PinIcon } from "@/components/icons";
import { PropertyMap } from "@/components/map/PropertyMap";
import { PropertyActions } from "@/components/property/PropertyActions";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { VisitCard } from "@/components/property/VisitCard";
import {
  formatPrice,
  getProperties,
  getPropertyBySlug,
  getSimilarProperties,
  imageUrl,
  pluralize,
  TYPE_LABELS,
} from "@/lib/properties";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getProperties().map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const property = getPropertyBySlug((await params).slug);
  if (!property) return {};

  const title = `${property.title} | Morada Lagos`;
  const description = `${TYPE_LABELS[property.type]} para alugar em ${property.neighborhood}, ${property.city}. ${formatPrice(property.price)}/mês.`;
  return {
    title,
    description,
    openGraph: { title, description, images: [imageUrl(property.image, 1200)] },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = getPropertyBySlug((await params).slug);
  if (!property) notFound();

  const similar = getSimilarProperties(property);
  const specs: { label: string; value: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
    { label: "Quartos", value: String(property.bedrooms), icon: BedIcon },
    { label: "Banheiros", value: String(property.bathrooms), icon: BathIcon },
    { label: "Vagas", value: String(property.parking), icon: CarIcon },
    { label: "Área", value: `${property.area} m²`, icon: AreaIcon },
  ];

  return (
    <>
      <Header solid />

      <main className="bg-offwhite pt-[74px]">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-20 md:pt-10 md:pb-28 lg:px-8">
          <nav aria-label="Trilha de navegação">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-steel">
              <li>
                <Link href="/" className="hover:text-ocean">
                  Início
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRightIcon className="size-4" />
                <Link href="/#imoveis" className="hover:text-ocean">
                  Imóveis
                </Link>
              </li>
              <li aria-current="page" className="flex items-center gap-1.5 font-medium text-petroleum">
                <ChevronRightIcon className="size-4" />
                {property.title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-coral uppercase">
                {TYPE_LABELS[property.type]} para alugar
                {property.featured && <span className="text-steel"> · Destaque</span>}
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-petroleum md:text-5xl">{property.title}</h1>
              <p className="mt-3 flex items-center gap-1.5 text-steel">
                <PinIcon className="size-4 shrink-0" />
                {property.neighborhood}, {property.city}
              </p>
            </div>
            <PropertyActions id={property.id} title={property.title} />
          </div>

          <div className="mt-8">
            <PropertyGallery title={property.title} images={[property.image, ...property.gallery]} />
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <div className="min-w-0">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {specs.map(({ label, value, icon: Icon }) => (
                  <li key={label} className="rounded-2xl bg-white p-5">
                    <Icon className="size-5 text-coral" />
                    <p className="mt-3 font-serif text-2xl text-petroleum">{value}</p>
                    <p className="text-sm text-steel">{label}</p>
                  </li>
                ))}
              </ul>

              <section aria-labelledby="sobre-imovel" className="mt-12">
                <p className="text-xs font-bold tracking-[0.2em] text-coral uppercase">O imóvel</p>
                <h2 id="sobre-imovel" className="mt-3 font-serif text-3xl text-petroleum">
                  Sobre este lugar
                </h2>
                <div className="mt-5 space-y-4 leading-relaxed text-steel">
                  {property.description.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section aria-labelledby="comodidades" className="mt-12 border-t border-water/70 pt-12">
                <p className="text-xs font-bold tracking-[0.2em] text-coral uppercase">Comodidades</p>
                <h2 id="comodidades" className="mt-3 font-serif text-3xl text-petroleum">
                  O que você vai encontrar
                </h2>
                <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-3 text-petroleum">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand-rose text-coral">
                        <CheckIcon className="size-4" strokeWidth={2.25} />
                      </span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="localizacao" className="mt-12 border-t border-water/70 pt-12">
                <p className="text-xs font-bold tracking-[0.2em] text-coral uppercase">Localização</p>
                <h2 id="localizacao" className="mt-3 font-serif text-3xl text-petroleum">
                  {property.neighborhood}, {property.city}
                </h2>
                <p className="mt-3 text-steel">
                  A localização exata é enviada após o agendamento da visita.
                </p>
                <div className="mt-6 h-[360px] overflow-hidden rounded-3xl">
                  <PropertyMap properties={[property]} center={property.coordinates} zoom={14} />
                </div>
              </section>
            </div>

            <div className="lg:sticky lg:top-[98px] lg:self-start">
              <VisitCard property={property} />
            </div>
          </div>
        </div>

        <section aria-labelledby="semelhantes" className="bg-mist py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-coral uppercase">Continue explorando</p>
                <h2 id="semelhantes" className="mt-3 font-serif text-4xl text-petroleum">
                  Imóveis semelhantes
                </h2>
              </div>
              <p className="text-steel">{pluralize(similar.length, "sugestão", "sugestões")} para você</p>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <li key={p.id}>
                  <PropertyCard property={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile: o card de valores fica no fim do conteúdo, então o preço acompanha a rolagem. */}
      <div className="h-20 bg-deep lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-mist bg-white/95 px-6 py-3.5 backdrop-blur lg:hidden">
        <p className="text-sm text-steel">
          <span className="font-serif text-2xl text-ocean">{formatPrice(property.price)}</span>/mês
        </p>
        <a
          href="#agendar"
          className="rounded-xl bg-ocean px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-dark"
        >
          Agendar visita
        </a>
      </div>
    </>
  );
}
