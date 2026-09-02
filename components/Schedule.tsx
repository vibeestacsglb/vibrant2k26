"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { schedule } from "@/data/schedule";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(schedule[0]?.day ?? 1);
  const day = schedule.find((d) => d.day === activeDay);

  return (
    <section id="schedule" className="py-28 md:py-36">
      <div className="container-content">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
        >
          <p className="text-[12px] font-semibold tracking-[0.28em] uppercase text-ink-500 mb-4">
            Two Days
          </p>
          <h2 className="text-5xl md:text-6xl">
            THE <span className="accent-rule">TIMELINE.</span>
          </h2>
        </motion.div>

        <div className="flex justify-center gap-1 mb-14">
          {schedule.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-7 py-3 text-[12.5px] font-semibold tracking-[0.1em] uppercase border transition-colors ${
                activeDay === d.day
                  ? "border-vibeesta-400/50 text-ink-0 bg-vibeesta-600/10"
                  : "border-ink-700/30 text-ink-500 hover:text-ink-300"
              }`}
            >
              {d.dateLabel}
            </button>
          ))}
        </div>

        {day?.items && day.items.length > 0 ? (
          <div className="flex md:flex-row flex-col gap-0 md:overflow-x-auto pb-4">
            {day.items.map((item, i) => (
              <div
                key={i}
                className="relative md:min-w-[210px] md:px-6 pl-6 pb-8 md:pb-0 border-l md:border-l md:border-t-0 border-ink-700/25 first:border-l-0"
              >
                <span className="absolute md:top-0 top-1 -left-[5px] w-2.5 h-2.5 rounded-full bg-vibeesta-400" />
                <div className="font-display font-bold text-lg text-ink-0 mb-1">{item.time}</div>
                <div className="text-[13.5px] text-ink-300">{item.title}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-ink-500 text-sm font-medium tracking-[0.08em] uppercase">
            Schedule Coming Soon
          </p>
        )}
      </div>
    </section>
  );
}
