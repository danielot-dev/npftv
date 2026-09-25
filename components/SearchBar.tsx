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
        className="glass w-full rounded-xl px-4 py-2.5 text-navy-dark outline-none placeholder:text-navy-dark/40 focus:border-royal focus:shadow-glow"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-navy px-5 py-2.5 font-heading text-sm font-semibold text-white shadow-glass-sm transition hover:bg-navy-light hover:shadow-glow"
      >
        Search
      </button>
    </form>
  );
}
