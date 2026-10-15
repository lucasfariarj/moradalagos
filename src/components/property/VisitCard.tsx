"use client";

import { useState, type FormEvent } from "react";
import { formatPrice } from "@/lib/properties";
import type { Property } from "@/types/property";
import { CheckIcon } from "../icons";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-mist bg-offwhite px-4 py-3 text-[0.95rem] text-petroleum placeholder:text-steel/70 focus:border-ocean focus:bg-white focus:outline-none";

export function VisitCard({ property }: { property: Property }) {
  const [sent, setSent] = useState(false);
  const total = property.price + property.condoFee + property.iptu;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <aside
      id="agendar"
      aria-label="Valores e agendamento de visita"
      className="scroll-mt-24 rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(18,52,59,0.45)] sm:p-8"
    >
      <p className="text-xs font-bold tracking-[0.14em] text-steel uppercase">Aluguel</p>
      <p className="mt-1 text-steel">
        <span className="font-serif text-4xl text-ocean">{formatPrice(property.price)}</span>/mês
      </p>

      <dl className="mt-6 space-y-3 border-y border-mist py-5 text-sm">
        <CostRow label="Aluguel" value={property.price} />
        <CostRow label="Condomínio" value={property.condoFee} />
        <CostRow label="IPTU" value={property.iptu} />
        <div className="flex justify-between pt-2 text-[0.95rem] font-bold text-petroleum">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      {sent ? (
        <div role="status" className="mt-6 rounded-2xl bg-sand-rose p-5 text-center">
          <span className="mx-auto grid size-10 place-items-center rounded-full bg-ocean text-white">
            <CheckIcon className="size-5" strokeWidth={2.5} />
          </span>
          <p className="mt-3 font-serif text-xl text-petroleum">Pedido enviado!</p>
          <p className="mt-1 text-sm text-steel">Nossa equipe retorna em até 24h para confirmar a visita.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <h2 id="visit-title" className="font-serif text-2xl text-petroleum">
            Agende uma visita
          </h2>
          <div>
            <label htmlFor="visit-name" className="text-xs font-bold tracking-[0.12em] text-steel uppercase">
              Nome
            </label>
            <input id="visit-name" required autoComplete="name" placeholder="Seu nome" className={inputClass} />
          </div>
          <div>
            <label htmlFor="visit-email" className="text-xs font-bold tracking-[0.12em] text-steel uppercase">
              E-mail
            </label>
            <input
              id="visit-email"
              type="email"
              required
              autoComplete="email"
              placeholder="voce@email.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="visit-message" className="text-xs font-bold tracking-[0.12em] text-steel uppercase">
              Mensagem
            </label>
            <textarea
              id="visit-message"
              rows={3}
              defaultValue={`Olá! Tenho interesse no imóvel "${property.title}".`}
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-ocean px-6 py-4 font-semibold text-white transition-colors hover:bg-ocean-dark"
          >
            Agendar visita
          </button>
          <p className="text-center text-xs text-steel">Resposta em até 24h, sem compromisso.</p>
        </form>
      )}
    </aside>
  );
}

function CostRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-steel">
      <dt>{label}</dt>
      <dd>{value > 0 ? formatPrice(value) : "Isento"}</dd>
    </div>
  );
}
