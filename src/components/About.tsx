import Image from "next/image";

const STATS = [
  { value: "850+", label: "imóveis ativos" },
  { value: "4,9", label: "avaliação média" },
  { value: "24h", label: "retorno rápido" },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="scroll-mt-20 bg-offwhite py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2 lg:gap-24 lg:px-8">
        <div className="relative mr-6 md:mr-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1200&q=75"
              alt="Coqueiros sobre a areia clara e o mar azul-turquesa"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-6 bottom-8 w-44 rounded-2xl bg-peach/80 p-5 shadow-xl shadow-ocean-dark/10 backdrop-blur md:-right-12">
            <p className="font-serif text-3xl text-ocean">12 anos</p>
            <p className="mt-1 text-sm leading-snug text-steel">conectando pessoas a novos lares</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-coral uppercase">Uma escolha tranquila</p>
          <h2 id="sobre-title" className="mt-4 font-serif text-4xl leading-tight text-petroleum md:text-[2.75rem]">
            Seu lugar entre a lagoa e o mar.
          </h2>
          <p className="mt-6 leading-relaxed text-steel">
            Conhecemos cada canto da Região dos Lagos. Cuidamos da sua busca com transparência, curadoria e olhar local
            para você encontrar o imóvel certo, sem complicação.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-water/70 pt-8 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-steel">{stat.label}</dt>
                <dd className="font-serif text-3xl text-ocean">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
