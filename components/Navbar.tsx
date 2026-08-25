"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig, getRegistrationUrl } from "@/config/siteConfig";

const NAV_ITEMS = [
  { label: "Home", hash: "hero" },
  { label: "About", hash: "about" },
  { label: "Events", hash: "events" },
  { label: "Schedule", hash: "schedule" },
  { label: "Sponsors", hash: "sponsors" },
  { label: "FAQ", hash: "faq" },
  { label: "Contact", hash: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const registrationUrl = getRegistrationUrl();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
      if (!isHome) return;
      const sections = NAV_ITEMS.map((i) => document.getElementById(i.hash)).filter(
        Boolean
      ) as HTMLElement[];
      let current = "hero";
      for (const sec of sections) {
        if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.classList.toggle("locked", menuOpen);
  }, [menuOpen]);

  function hrefFor(hash: string) {
    return isHome ? `#${hash}` : `/#${hash}`;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled
            ? "bg-base-950/80 backdrop-blur-md border-b border-ink-700/30 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container-content flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="VIBRANT 2K26 home">
            <span className="relative w-6 h-6 rounded-sm overflow-hidden">
              <Image
                src={siteConfig.organizers.vibeesta.logoMark}
                alt=""
                fill
                sizes="24px"
                className="object-cover"
              />
            </span>
            <span className="text-[11px] font-display font-semibold tracking-[0.08em] text-vibeesta-300">
              VIBEESTA
            </span>
            <span className="text-ink-500 text-xs">×</span>
            <span className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={siteConfig.organizers.shrinik.logo}
                alt=""
                fill
                sizes="24px"
                className="object-cover"
              />
            </span>
            <span className="text-[11px] font-display font-semibold tracking-[0.08em] text-shrinik-600">
              SHRINIK
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.hash}
                href={hrefFor(item.hash)}
                className={`relative px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  active === item.hash ? "text-ink-0" : "text-ink-300 hover:text-ink-0"
                }`}
              >
                {item.label}
                {active === item.hash && isHome && (
                  <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-vibeesta-400" />
                )}
              </a>
            ))}
            <Link
              href="/gallery"
              className={`relative px-4 py-2 text-[13.5px] font-medium transition-colors ${
                pathname === "/gallery" ? "text-ink-0" : "text-ink-300 hover:text-ink-0"
              }`}
            >
              Gallery
              {pathname === "/gallery" && <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-shrinik-600" />}
            </Link>
            <Link
              href="/campus-ambassador"
              className={`relative px-4 py-2 text-[13.5px] font-medium transition-colors ${
                pathname === "/campus-ambassador" ? "text-ink-0" : "text-ink-300 hover:text-ink-0"
              }`}
            >
              Ambassador
              {pathname === "/campus-ambassador" && <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-vibeesta-400" />}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {registrationUrl ? (
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center rounded-full fusion-gradient text-ink-0 text-[13px] font-semibold px-5 py-2.5 transition-transform hover:-translate-y-0.5"
              >
                Register Now
              </a>
            ) : (
              <span className="hidden sm:inline-flex items-center rounded-full border border-ink-700/50 text-ink-300 text-[12px] font-medium px-5 py-2.5">
                Registration Opening Soon
              </span>
            )}
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-ink-0"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[190] bg-base-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-2 transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.hash}
            href={hrefFor(item.hash)}
            onClick={() => setMenuOpen(false)}
            className="font-display font-bold text-2xl py-3 text-ink-300 hover:text-ink-0 transition-colors"
          >
            {item.label}
          </a>
        ))}
        <Link
          href="/gallery"
          onClick={() => setMenuOpen(false)}
          className="font-display font-bold text-2xl py-3 text-ink-300 hover:text-ink-0 transition-colors"
        >
          Gallery
        </Link>
        <Link
          href="/campus-ambassador"
          onClick={() => setMenuOpen(false)}
          className="font-display font-bold text-2xl py-3 text-ink-300 hover:text-ink-0 transition-colors"
        >
          Ambassador
        </Link>
        {registrationUrl ? (
          <a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-full fusion-gradient text-ink-0 text-sm font-semibold px-7 py-3.5"
          >
            Register Now
          </a>
        ) : (
          <span className="mt-6 inline-flex items-center rounded-full border border-ink-700/50 text-ink-300 text-sm px-7 py-3.5">
            Registration Opening Soon
          </span>
        )}
      </div>
    </>
  );
}
