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
    <section className="py-16 md:py-20">
      <div className="container-content">
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-10 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 0.84, 0.44, 1] }}
            >
              <div className="font-display font-black text-[15vw] sm:text-6xl md:text-7xl leading-none text-ink-0">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold tracking-[0.24em] uppercase text-ink-500 mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
