"use client";

import { useMemo, useState } from "react";
import { DEFAULT_FILTERS, filterProperties, getLocations } from "@/lib/properties";
import type { Property, PropertyFilters } from "@/types/property";
import { About } from "./About";
import { FeaturedProperties } from "./FeaturedProperties";
import { Hero } from "./Hero";
import { MapSection } from "./MapSection";

export function HomeView({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<PropertyFilters>(DEFAULT_FILTERS);
  const locations = useMemo(() => getLocations(properties), [properties]);
  const results = useMemo(() => filterProperties(properties, filters), [properties, filters]);

  function scrollToResults() {
    document.getElementById("imoveis")?.scrollIntoView?.({ behavior: "smooth" });
  }

  return (
    <main>
      <Hero filters={filters} locations={locations} onChange={setFilters} onSubmit={scrollToResults} />
      <FeaturedProperties
        properties={results}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters(DEFAULT_FILTERS)}
      />
      <MapSection properties={properties} />
      <About />
    </main>
  );
}
