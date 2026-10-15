"use client";

import { useState } from "react";
import { AdvancedMarker, APIProvider, InfoWindow, Map } from "@vis.gl/react-google-maps";
import type { Property } from "@/types/property";
import { PinSummary, PricePin } from "./PricePin";

const REGIAO_DOS_LAGOS = { lat: -22.87, lng: -42.06 };

interface GooglePropertyMapProps {
  apiKey: string;
  mapId: string;
  properties: Property[];
}

export function GooglePropertyMap({ apiKey, mapId, properties }: GooglePropertyMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = properties.find((p) => p.id === activeId);

  return (
    <APIProvider apiKey={apiKey} language="pt-BR" region="BR">
      <Map
        className="h-full min-h-[360px] w-full"
        mapId={mapId}
        defaultCenter={REGIAO_DOS_LAGOS}
        defaultZoom={10}
        gestureHandling="cooperative"
        disableDefaultUI
        zoomControl
      >
        {properties.map((property) => (
          <AdvancedMarker key={property.id} position={property.coordinates} zIndex={property.id === activeId ? 10 : 1}>
            <PricePin
              property={property}
              active={property.id === activeId}
              onSelect={() => setActiveId(property.id === activeId ? null : property.id)}
            />
          </AdvancedMarker>
        ))}

        {active && (
          <InfoWindow position={active.coordinates} pixelOffset={[0, -36]} onCloseClick={() => setActiveId(null)}>
            <PinSummary property={active} />
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
