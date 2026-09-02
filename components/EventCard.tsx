"use client";

import { ArrowRight } from "lucide-react";
import EventMotif from "@/components/EventMotif";
import { FestEvent } from "@/lib/types";

export default function EventCard({
  event,
  onOpen,
  featured = false,
}: {
  event: FestEvent;
  onOpen: (event: FestEvent) => void;
  featured?: boolean;
}) {
  const isTech = event.category === "tech";
  const numColor = isTech ? "text-poster-cyan drop-shadow-[0_0_5px_#00f3ff]" : "text-poster-magenta drop-shadow-[0_0_5px_#ff003c]";
  const accent = isTech ? "text-poster-cyan" : "text-poster-magenta";
  const glow = isTech
    ? "radial-gradient(circle at 15% 100%, rgba(0,243,255,0.25), transparent 65%)"
    : "radial-gradient(circle at 85% 100%, rgba(255,0,60,0.25), transparent 65%)";
  const border = isTech ? "hover:border-poster-cyan/60 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]" : "hover:border-poster-magenta/60 hover:shadow-[0_0_20px_rgba(255,0,60,0.3)]";

  return (
    <button
      onClick={() => onOpen(event)}
      className={`group relative w-full h-full text-left border border-ink-700/20 ${border} bg-base-950 hover:bg-base-900 transition-colors duration-300 flex flex-col justify-between p-8 overflow-hidden ${
        featured ? "md:p-10 min-h-[320px]" : "min-h-[250px]"
      }`}
      aria-label={`View details for ${event.name}`}
    >
      {/* poster atmosphere — category-tinted glow, low but present */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glow }}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between">
        <span className={`font-display font-black text-[15px] ${numColor}`}>{event.number}</span>
        <EventMotif
          id={event.id}
          className={`w-9 h-9 opacity-60 group-hover:opacity-90 transition-opacity duration-300 ${accent}`}
        />
      </div>

      <div className="relative">
        <div
          className={`font-display font-bold uppercase text-ink-0 leading-[1.05] mb-2 ${
            featured ? "text-[28px] md:text-[34px]" : "text-[20px] md:text-[22px]"
          }`}
        >
          {event.name}
        </div>
        <div className="text-[12.5px] text-ink-300 tracking-[0.02em] mb-4">{event.tagline}</div>
        <div className={`flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase ${accent}`}>
          View Details
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </button>
  );
}
