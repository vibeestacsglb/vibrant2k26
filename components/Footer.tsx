import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

const LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/20 py-16 md:py-20">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
          <div>
            <div className="text-ink-0 font-display font-extrabold text-4xl md:text-5xl">
              VIBRANT<span className="text-ink-700 text-lg align-super ml-2">2K26</span>
            </div>
            <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-500 mt-2">
              Vibeesta × Shrinik
            </div>
          </div>
          <div className="text-[12.5px] text-ink-500 text-right">
            {siteConfig.venue}
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 pt-8 border-t border-ink-700/15 mb-10">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[13px] text-ink-300 hover:text-ink-0 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap justify-between gap-2 text-[11.5px] text-ink-500">
          <span>© 2026 VIBRANT 2K26. All Rights Reserved.</span>
          <span>{siteConfig.organizers.vibeesta.name} × {siteConfig.organizers.shrinik.name}</span>
        </div>
      </div>
    </footer>
  );
}
