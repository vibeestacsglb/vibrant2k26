"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

function Row({ label, value, href }: { label: string; value: string; href?: string | null }) {
  const content = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-ink-0 transition-colors">
      {value}
    </a>
  ) : (
    <span>{value}</span>
  );
  return (
    <li className="flex items-center justify-between py-4 border-b border-ink-700/20 text-[14.5px]">
      <span className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-ink-500">
        {label}
      </span>
      <span className="text-ink-0">{content}</span>
    </li>
  );
}

export default function Contact() {
  const { contact, socialLinks } = siteConfig;

  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="container-content">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
        >
          <p className="text-[12px] font-semibold tracking-[0.28em] uppercase text-ink-500 mb-4">
            Reach Out
          </p>
          <h2 className="text-5xl md:text-6xl">
            LET&apos;S <span className="accent-rule">CONNECT.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 0.84, 0.44, 1] }}
          >
            <ul>
              <Row label="Email" value={contact.email ?? "Coming Soon"} href={contact.email ? `mailto:${contact.email}` : null} />
              <Row label="Phone" value={contact.phone ?? "Coming Soon"} href={contact.phone ? `tel:${contact.phone}` : null} />
              <Row label="Location" value={contact.location} />
              <Row label="Coordinators" value={contact.coordinators ?? "Coming Soon"} />
            </ul>

            <div className="flex gap-3 mt-8">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full border border-ink-700/30 flex items-center justify-center hover:border-vibeesta-400/50 hover:text-vibeesta-300 transition-colors"
                >
                  <Instagram size={16} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-full border border-ink-700/30 flex items-center justify-center hover:border-vibeesta-400/50 hover:text-vibeesta-300 transition-colors"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  aria-label="Email"
                  className="w-11 h-11 rounded-full border border-ink-700/30 flex items-center justify-center hover:border-vibeesta-400/50 hover:text-vibeesta-300 transition-colors"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            className="aspect-[4/3.2] border border-ink-700/25 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 0.84, 0.44, 1] }}
          >
            {/* Replace with a confirmed embed URL/coordinates once provided by organizers. */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <p className="text-ink-500 text-[13px]">
                Map embed coming soon.
                <br />
                {contact.location}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
