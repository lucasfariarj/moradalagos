import type { Property } from "@/types/property";
import { GooglePropertyMap } from "./GooglePropertyMap";
import { IllustratedMap } from "./IllustratedMap";

export interface PropertyMapProps {
  properties: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
  apiKey?: string;
  mapId?: string;
}

/** Google Maps quando há chave configurada; caso contrário, o mapa ilustrado. */
export function PropertyMap({
  properties,
  center,
  zoom,
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID",
}: PropertyMapProps) {
  return apiKey ? (
    <GooglePropertyMap apiKey={apiKey} mapId={mapId} properties={properties} center={center} zoom={zoom} />
  ) : (
    <IllustratedMap properties={properties} />
  );
}
