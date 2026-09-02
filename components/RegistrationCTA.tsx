"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Atmosphere from "@/components/Atmosphere";
import { siteConfig, getRegistrationUrl } from "@/config/siteConfig";

export default function RegistrationCTA() {
  const registrationUrl = getRegistrationUrl();

  return (
    <section id="register" className="py-28 md:py-40 text-center relative overflow-hidden">
      <Atmosphere variant="fusion" fog />


      <motion.div
        className="container-content relative"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
      >
        <h2 className="text-[9vw] sm:text-5xl md:text-6xl leading-[1.02] text-ink-0">
          READY TO MAKE
          <br />
          IT <span className="accent-rule">VIBRANT?</span>
        </h2>
        <p className="mt-5 mb-10 text-ink-300 text-[15px]">
          Your ideas. Your talent. Your moment.
        </p>
        {registrationUrl ? (
          <a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full fusion-gradient text-ink-0 text-[15px] font-semibold px-10 py-5 transition-transform hover:-translate-y-0.5"
          >
            Register Now <ArrowRight size={17} />
          </a>
        ) : (
          <span className="inline-flex items-center rounded-full border border-ink-700/50 text-ink-300 text-[15px] font-medium px-10 py-5">
            Registration Opening Soon
          </span>
        )}
        <p className="mt-8 text-[12.5px] font-semibold tracking-[0.28em] uppercase text-ink-500">
          {siteConfig.eventDateLabel}
        </p>
      </motion.div>
    </section>
  );
}
