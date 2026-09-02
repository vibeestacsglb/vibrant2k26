"use client";

import { galleryFilters } from "@/data/gallery";
import { GalleryImage } from "@/lib/types";

export default function GalleryFilters({
  active,
  onChange,
}: {
  active: GalleryImage["category"] | "all";
  onChange: (value: GalleryImage["category"] | "all") => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery filters">
      {galleryFilters.map((f) => (
        <button
          key={f.value}
          role="tab"
          aria-selected={active === f.value}
          onClick={() => onChange(f.value)}
          className={`px-5 py-2.5 text-[11.5px] font-semibold tracking-[0.1em] uppercase border transition-colors ${
            active === f.value
              ? "border-vibeesta-400/50 text-ink-0 bg-vibeesta-600/10"
              : "border-ink-700/25 text-ink-500 hover:text-ink-300"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
