import { formatPriceShort } from "@/lib/properties";
import type { Property } from "@/types/property";

interface PricePinProps {
  property: Property;
  active: boolean;
  onSelect: () => void;
}

export function PricePin({ property, active, onSelect }: PricePinProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${property.title}, ${formatPriceShort(property.price)} por mês`}
      className={`rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-md transition-all hover:scale-105 ${
        active ? "bg-ocean text-white" : "bg-white text-ocean"
      }`}
    >
      {formatPriceShort(property.price)}
    </button>
  );
}

export function PinSummary({ property }: { property: Property }) {
  return (
    <div className="w-52 text-left">
      <p className="font-serif text-base leading-snug text-petroleum">{property.title}</p>
      <p className="mt-1 text-xs text-steel">
        {property.neighborhood}, {property.city}
      </p>
    </div>
  );
}
