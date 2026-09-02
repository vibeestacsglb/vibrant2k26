"use client";

import { EventCategory } from "@/lib/types";

export default function EventToggle({
  mode,
  onChange,
}: {
  mode: EventCategory;
  onChange: (mode: EventCategory) => void;
}) {
  return (
    <div className="inline-flex items-center gap-8" role="tablist" aria-label="Event category">
      <button
        role="tab"
        aria-selected={mode === "tech"}
        onClick={() => onChange("tech")}
        className={`relative pb-3 text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors ${
          mode === "tech" ? "text-ink-0" : "text-ink-500 hover:text-ink-300"
        }`}
      >
        Tech
        <span
          className={`absolute left-0 right-0 -bottom-px h-px bg-vibeesta-400 transition-transform duration-400 origin-left ${
            mode === "tech" ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>
      <span className="text-ink-700 text-xs">/</span>
      <button
        role="tab"
        aria-selected={mode === "creative"}
        onClick={() => onChange("creative")}
        className={`relative pb-3 text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors ${
          mode === "creative" ? "text-ink-0" : "text-ink-500 hover:text-ink-300"
        }`}
      >
        Creative
        <span
          className={`absolute left-0 right-0 -bottom-px h-px bg-shrinik-600 transition-transform duration-400 origin-left ${
            mode === "creative" ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>
    </div>
  );
}
