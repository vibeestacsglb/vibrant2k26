"use client";

import { useEffect, useState } from "react";
import { getRegistrationUrl } from "@/config/siteConfig";

export default function StickyRegisterCta() {
  const [show, setShow] = useState(false);
  const registrationUrl = getRegistrationUrl();

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > window.innerHeight * 0.85);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[150] transition-all duration-500 sm:hidden ${
        show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
      style={{ transform: `translateX(-50%) translateY(${show ? 0 : 96}px)` }}
    >
      {registrationUrl ? (
        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full fusion-gradient text-ink-0 text-[13px] font-semibold px-6 py-3.5 shadow-lg shadow-black/40"
        >
          Register Now →
        </a>
      ) : (
        <span className="inline-flex items-center rounded-full border border-ink-700/50 bg-base-950/90 backdrop-blur text-ink-300 text-[12px] font-medium px-6 py-3.5">
          Registration Opening Soon
        </span>
      )}
    </div>
  );
}
