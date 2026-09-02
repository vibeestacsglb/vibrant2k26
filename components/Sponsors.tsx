"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sponsors, sponsorTierOrder } from "@/data/sponsors";

export default function Sponsors() {
  const hasSponsors = sponsors.length > 0;

  return (
    <section id="sponsors" className="py-28 md:py-36">
      <div className="container-content text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
        >
          <p className="text-[12px] font-semibold tracking-[0.28em] uppercase text-ink-500 mb-4">
            Backed By
          </p>
          <h2 className="text-4xl md:text-5xl mb-14">
            POWERED BY THOSE
            <br />
            WHO BELIEVE IN <span className="accent-rule">IDEAS.</span>
          </h2>
        </motion.div>

        {hasSponsors ? (
          sponsorTierOrder.map((tier) => {
            const tierSponsors = sponsors.filter((s) => s.tier === tier);
            if (tierSponsors.length === 0) return null;
            return (
              <div key={tier} className="mb-12">
                <p className="text-[10.5px] font-semibold tracking-[0.24em] uppercase text-ink-500 mb-6">
                  {tier}
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  {tierSponsors.map((s) => (
                    <div
                      key={s.id}
                      className="relative w-32 h-14 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    >
                      {s.logo ? (
                        <Image src={s.logo} alt={s.name} fill sizes="128px" className="object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[11px] text-ink-500 border border-ink-700/25">
                          {s.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-ink-500 text-sm font-medium tracking-[0.06em]">
            Sponsor announcements coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
