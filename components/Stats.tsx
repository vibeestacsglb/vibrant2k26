"use client";

import { motion } from "framer-motion";
import { events } from "@/data/events";
import { siteConfig } from "@/config/siteConfig";

export default function Stats() {
  const stats = [
    { value: "02", label: "Days" },
    { value: String(events.length), label: "Events" },
    { value: siteConfig.prizePool, label: "Prize Pool" },
  ];

  return (
    <section className="py-14 md:py-20 border-b border-ink-700/10">
      <div className="container-content">
        {/* Equal-width 3-column grid to ensure exact symmetry and alignment */}
        <div className="grid grid-cols-3 divide-x divide-ink-700/15 max-w-4xl mx-auto">
          {stats.map((s, i) => {
            const isLong = s.value.length > 4;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 0.84, 0.44, 1] }}
                className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:px-6"
              >
                <div
                  className={`font-display font-black leading-none text-ink-0 whitespace-nowrap tracking-tight ${
                    isLong
                      ? "text-xl sm:text-3xl md:text-4xl lg:text-5xl"
                      : "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                  }`}
                >
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-ink-500 mt-2.5 sm:mt-3">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
