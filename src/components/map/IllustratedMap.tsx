"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/types/property";
import { MinusIcon, PlusIcon } from "../icons";
import { PinSummary, PricePin } from "./PricePin";

const PADDING = 0.14;
const MIN_ZOOM = 1;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;

/** Converte lat/lng em posições percentuais dentro da caixa que envolve todos os imóveis. */
export function projectProperties(properties: Property[]) {
  const lats = properties.map((p) => p.coordinates.lat);
  const lngs = properties.map((p) => p.coordinates.lng);
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)];
  const [minLng, maxLng] = [Math.min(...lngs), Math.max(...lngs)];
  const span = 1 - PADDING * 2;
  // Sem variação no eixo (ex.: um único imóvel), o ponto fica centralizado.
  const project = (value: number, min: number, max: number) =>
    max === min ? 0.5 : PADDING + ((value - min) / (max - min)) * span;

  return properties.map((property) => ({
    property,
    x: project(property.coordinates.lng, minLng, maxLng),
    y: 1 - project(property.coordinates.lat, minLat, maxLat),
  }));
}

/** Mapa estilizado usado quando não há chave do Google Maps configurada. */
export function IllustratedMap({ properties }: { properties: Property[] }) {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [activeId, setActiveId] = useState<string | null>(null);
  const points = useMemo(() => projectProperties(properties), [properties]);

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden bg-water" data-testid="illustrated-map">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `scale(${zoom})` }}
        aria-hidden="true"
      >
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 450">
          <g stroke="#E7F3F4" strokeOpacity="0.75" strokeWidth="6" fill="none">
            {Array.from({ length: 14 }, (_, i) => (
              <line key={`a${i}`} x1={-200 + i * 90} y1={-20} x2={-60 + i * 90} y2={470} />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <line key={`b${i}`} x1={-100} y1={-60 + i * 55} x2={900} y2={140 + i * 55} strokeWidth="5" />
            ))}
          </g>
          <g stroke="#E7F3F4" strokeWidth="18" fill="none" strokeLinecap="round">
            <ellipse cx="400" cy="235" rx="300" ry="160" transform="rotate(8 400 235)" />
            <path d="M-20 300 C 200 240, 500 200, 820 140" />
          </g>
        </svg>
      </div>

      <ul>
        {points.map(({ property, x, y }) => {
          const left = 50 + (x * 100 - 50) * zoom;
          const top = 50 + (y * 100 - 50) * zoom;
          const active = activeId === property.id;
          return (
            <li
              key={property.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${active ? "z-10" : ""}`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <PricePin
                property={property}
                active={active}
                onSelect={() => setActiveId(active ? null : property.id)}
              />
              {active && (
                <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-xl bg-white p-3 shadow-xl">
                  <PinSummary property={property} />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="absolute right-5 bottom-5 flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
        <button
          type="button"
          aria-label="Aproximar"
          disabled={zoom >= MAX_ZOOM}
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
          className="grid size-10 place-items-center text-petroleum hover:bg-mist disabled:opacity-40"
        >
          <PlusIcon className="size-4" />
        </button>
        <span aria-hidden="true" className="h-px bg-mist" />
        <button
          type="button"
          aria-label="Afastar"
          disabled={zoom <= MIN_ZOOM}
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
          className="grid size-10 place-items-center text-petroleum hover:bg-mist disabled:opacity-40"
        >
          <MinusIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
