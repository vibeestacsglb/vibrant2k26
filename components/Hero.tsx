"use client";

import { ArrowRight } from "lucide-react";
import Atmosphere from "@/components/Atmosphere";
import OrbitRing from "@/components/OrbitRing";
import { siteConfig, getRegistrationUrl } from "@/config/siteConfig";

export default function Hero() {
  const registrationUrl = getRegistrationUrl();

  return (
    <header
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-16 overflow-hidden"
    >
      <Atmosphere variant="fusion" fog />

      {/* LEFT — technical influence: fine grid, sitting on top of the glow */}
      <div
        className="absolute inset-y-0 left-0 w-[38%] pointer-events-none hidden md:block opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,170,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(200,170,255,0.16) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(90deg, black, transparent 85%)",
          WebkitMaskImage: "linear-gradient(90deg, black, transparent 85%)",
        }}
      />

      {/* RIGHT — creative influence: flowing thin lines over the crimson glow */}
      <svg
        className="absolute right-0 top-0 bottom-0 w-[42%] h-full pointer-events-none hidden md:block opacity-70"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M 420 30 C 260 170, 340 330, 200 450 C 90 540, 210 640, 120 780" fill="none" stroke="rgba(225,29,72,0.5)" strokeWidth="1" />
        <path d="M 420 130 C 300 250, 370 390, 240 510" fill="none" stroke="rgba(219,39,119,0.3)" strokeWidth="0.7" />
        <path d="M 400 250 C 320 330, 360 420, 280 500" fill="none" stroke="rgba(219,39,119,0.2)" strokeWidth="0.6" />
      </svg>

      <OrbitRing size={520} color="vibeesta" className="absolute -left-40 top-[6%] pointer-events-none hidden lg:block opacity-80" />
      <OrbitRing size={360} color="shrinik" dashed className="absolute -right-24 bottom-[4%] pointer-events-none hidden lg:block opacity-80" />

      <div className="absolute top-28 left-6 md:left-10 hidden sm:block micro-label">
        VBRNT / 2K26
        <br />
        TECH × CULTURE
      </div>
      <div className="absolute top-28 right-6 md:right-10 hidden sm:block micro-label text-right">
        16—17 OCT / 2026
        <br />
        G.L. BAJAJ
      </div>

      <div className="container-content relative z-10 text-center">
        <p className="text-[12px] font-semibold tracking-[0.3em] uppercase text-ink-300 mb-3 opacity-0 animate-[fadeUp_0.8s_ease-out_0.1s_forwards]">
          Vibeesta Creative Society × Shrinik Club present
        </p>

        <h1 className="leading-[0.88] opacity-0 animate-[fadeUp_0.9s_ease-out_0.2s_forwards]">
          <span className="block fusion-text text-[16vw] sm:text-[13vw] md:text-[9vw] lg:text-[7.5vw]">
            VIBRANT
          </span>
          <span className="block text-ink-0 text-[16vw] sm:text-[13vw] md:text-[9vw] lg:text-[7.5vw]">
            2K26
          </span>
        </h1>

        <p className="mt-6 text-[13px] md:text-sm font-semibold tracking-[0.35em] uppercase text-ink-300 opacity-0 animate-[fadeUp_0.8s_ease-out_0.4s_forwards]">
          {siteConfig.tagline}
        </p>

        <p className="mt-5 text-[15px] text-ink-300 opacity-0 animate-[fadeUp_0.8s_ease-out_0.5s_forwards]">
          {siteConfig.eventDateLabel}
        </p>
        <p className="text-[13.5px] text-ink-500 opacity-0 animate-[fadeUp_0.8s_ease-out_0.55s_forwards]">
          {siteConfig.venue}
        </p>

        <div className="mt-9 mb-2 opacity-0 animate-[fadeUp_0.8s_ease-out_0.65s_forwards]">
          <div className="font-display font-extrabold text-[28px] md:text-4xl text-ink-0">
            {siteConfig.prizePool}
          </div>
          <div className="text-[11px] font-semibold tracking-[0.24em] uppercase text-ink-500 mt-1">
            Prize Pool
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 opacity-0 animate-[fadeUp_0.8s_ease-out_0.75s_forwards]">
          {registrationUrl ? (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full fusion-gradient text-ink-0 text-sm font-semibold px-8 py-4 transition-transform hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_rgba(219,39,119,0.5)]"
            >
              Register Now <ArrowRight size={16} />
            </a>
          ) : (
            <span className="inline-flex items-center rounded-full border border-ink-700/50 text-ink-300 text-sm font-medium px-8 py-4">
              Registration Opening Soon
            </span>
          )}
          <a
            href="#events"
            className="inline-flex items-center gap-2 border-b border-ink-700/50 text-ink-0 text-sm font-medium px-1 py-2 transition-colors hover:border-ink-0"
          >
            Explore Events
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeUp_0.8s_ease-out_0.95s_forwards]">
        <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-ink-500">
          Scroll
        </span>
        <span className="w-px h-8 bg-gradient-to-b from-ink-500 to-transparent" />
      </div>
    </header>
  );
}
