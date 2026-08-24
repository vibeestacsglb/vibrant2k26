"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { faq } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 md:py-36">
      <div className="container-content max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
        >
          <p className="text-[12px] font-semibold tracking-[0.28em] uppercase text-ink-500 mb-4">
            Questions
          </p>
          <h2 className="text-4xl md:text-5xl">FAQ</h2>
        </motion.div>

        <div>
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-ink-700/20">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[15.5px] md:text-base font-medium text-ink-0">
                    {item.question}
                  </span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-ink-500 transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-shrinik-600" : ""
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: isOpen ? "200px" : "0px" }}
                >
                  <p className="pb-6 text-[14px] text-ink-300 leading-relaxed pr-8">
                    {item.answer || "Coming Soon"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
