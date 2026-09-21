"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl items-center gap-2">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search news, videos, programs…"
        className="w-full border border-navy/20 bg-white px-4 py-2.5 text-navy-dark outline-none focus:border-gold"
      />
      <button
        type="submit"
        className="shrink-0 bg-navy px-5 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-navy-light"
      >
        Search
      </button>
    </form>
  );
}
