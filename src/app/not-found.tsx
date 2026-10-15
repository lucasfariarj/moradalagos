import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header solid />
      <main className="grid min-h-[70vh] place-items-center bg-offwhite px-6 pt-[74px] text-center">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-coral uppercase">Página não encontrada</p>
          <h1 className="mt-4 font-serif text-4xl text-petroleum md:text-5xl">Esse endereço não existe.</h1>
          <p className="mt-4 text-steel">O imóvel pode ter sido alugado ou o link está incorreto.</p>
          <Link
            href="/#imoveis"
            className="mt-8 inline-block rounded-full bg-ocean px-7 py-3.5 font-semibold text-white hover:bg-ocean-dark"
          >
            Ver imóveis disponíveis
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
