"use client";

import { useState } from "react";

const DEFAULT_QUERY = "police stations in Nigeria";

function buildEmbedSrc(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export default function PoliceStationFinder() {
  const [query, setQuery] = useState("");
  const [mapSrc, setMapSrc] = useState(buildEmbedSrc(DEFAULT_QUERY));
  const [lastSearched, setLastSearched] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const searchTerm = `police station near ${trimmed}, Nigeria`;
    setMapSrc(buildEmbedSrc(searchTerm));
    setLastSearched(trimmed);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="station-query" className="sr-only">
          Enter your city, area, or state
        </label>
        <input
          id="station-query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your city, area, or state e.g. Wuse, Abuja"
          className="w-full flex-1 border border-navy/20 bg-white px-4 py-3 text-navy-dark outline-none focus:border-royal"
        />
        <button
          type="submit"
          className="bg-navy px-6 py-3 font-heading text-sm font-semibold text-white transition hover:bg-navy-light"
        >
          Find Nearest Station
        </button>
      </form>

      {lastSearched && (
        <p className="mt-3 text-sm text-navy-dark/70">
          Showing police stations near <span className="font-semibold text-navy">{lastSearched}</span>.
          You can drag, zoom, and click markers on the map for directions and contact details.
        </p>
      )}

      <div className="mt-6 aspect-video w-full overflow-hidden border border-navy/10">
        <iframe
          title="Police station map"
          src={mapSrc}
          className="h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="mt-3 text-xs text-navy-dark/50">
        Map data provided by Google Maps. For an emergency, do not wait to locate a station — call the
        112 emergency line immediately.
      </p>
    </div>
  );
}
