"use client";

import { useState, type FormEvent } from "react";
import { Logo } from "./Logo";
import { ArrowRightIcon } from "./icons";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer id="contato" className="bg-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-14 pb-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8 lg:pt-16">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-[0.95rem] leading-relaxed text-white/60">
            Uma curadoria cuidadosa de imóveis para viver bem entre o mar e a lagoa, na Região dos Lagos.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-coral-light uppercase">Atendimento</h2>
          <p className="mt-5 text-[0.95rem] text-white/85">Segunda a sexta, 9h às 18h</p>
          <a href="tel:+551134567890" className="mt-2 block text-[0.95rem] text-white/85 hover:text-white">
            (11) 3456-7890
          </a>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-coral-light uppercase">Receba novidades</h2>
          {subscribed ? (
            <p role="status" className="mt-5 text-[0.95rem] text-peach">
              Obrigado! Em breve você recebe nossas novidades.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex items-center border-b border-white/30 focus-within:border-coral-light"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Seu melhor e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Seu melhor e-mail"
                className="w-full bg-transparent py-2 text-[0.95rem] text-white placeholder:text-white/50 focus:outline-none"
              />
              <button type="submit" aria-label="Inscrever-se" className="p-2 text-coral-light hover:text-peach">
                <ArrowRightIcon className="size-5" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Morada Imóveis. Todos os direitos reservados.
      </div>
    </footer>
  );
}
