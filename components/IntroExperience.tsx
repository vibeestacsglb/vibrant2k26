"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const EASE_CINEMATIC = [0.16, 0.84, 0.44, 1] as const;

export default function IntroExperience() {
  const prefersReducedMotion = useReducedMotion();

  const [phase, setPhase] = useState<
    "idle" | "enter" | "converge" | "collide" | "reveal" | "exit" | "done"
  >("idle");

  useEffect(() => {
    document.body.classList.add("locked");

    if (prefersReducedMotion) {
      const t1 = setTimeout(() => setPhase("reveal"), 50);
      const t2 = setTimeout(() => setPhase("exit"), 700);
      const t3 = setTimeout(() => {
        setPhase("done");
        document.body.classList.remove("locked");
      }, 1100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    const timers = [
      setTimeout(() => setPhase("enter"), 50),
      setTimeout(() => setPhase("converge"), 1400),
      setTimeout(() => setPhase("collide"), 2000),
      setTimeout(() => setPhase("reveal"), 2500),
      setTimeout(() => setPhase("exit"), 3400),
      setTimeout(() => {
        setPhase("done");
        document.body.classList.remove("locked");
      }, 3900),
    ];

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion]);

  function skip() {
    setPhase("exit");

    setTimeout(() => {
      setPhase("done");
      document.body.classList.remove("locked");
    }, 500);
  }

  const collided =
    phase === "collide" || phase === "reveal" || phase === "exit";

  const revealed =
    phase === "reveal" || phase === "exit";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[500] bg-base-950 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          role="presentation"
          aria-hidden="true"
        >
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 85%)",
            }}
          />

          {/* Vibeesta orb — left */}
          <motion.div
            className="absolute flex flex-col items-center gap-4"
            initial={{ x: "-45vw", opacity: 0, scale: 0.85 }}
            animate={
              collided
                ? { x: 0, opacity: 0, scale: 0.5 }
                : { x: "-18vw", opacity: 0.95, scale: 1 }
            }
            transition={{
              duration: collided ? 0.6 : 1.0,
              ease: EASE_CINEMATIC,
            }}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
              <div className="absolute -inset-6 rounded-full bg-poster-cyan/40 blur-3xl" />
              <div className="absolute inset-0 rounded-full bg-poster-cyan/30 blur-xl" />
              <div className="absolute inset-0 rounded-full border border-poster-cyan/50 shadow-[0_0_15px_#00f3ff]" />

              <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden">
                <Image
                  src={siteConfig.organizers.vibeesta.logoMark}
                  alt="Vibeesta"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>

            <span className="text-[11px] md:text-xs font-display font-semibold tracking-[0.3em] text-poster-cyan drop-shadow-[0_0_8px_#00f3ff]">
              VIBEESTA
            </span>
          </motion.div>

          {/* Shrinik orb — right */}
          <motion.div
            className="absolute flex flex-col items-center gap-4"
            initial={{ x: "45vw", opacity: 0, scale: 0.85 }}
            animate={
              collided
                ? { x: 0, opacity: 0, scale: 0.5 }
                : { x: "18vw", opacity: 0.95, scale: 1 }
            }
            transition={{
              duration: collided ? 0.6 : 1.0,
              ease: EASE_CINEMATIC,
              delay: prefersReducedMotion ? 0 : 0.15,
            }}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
              <div className="absolute -inset-6 rounded-full bg-poster-magenta/40 blur-3xl" />
              <div className="absolute inset-0 rounded-full bg-poster-magenta/30 blur-xl" />
              <div className="absolute inset-0 rounded-full border border-poster-magenta/50 shadow-[0_0_15px_#ff003c]" />

              <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden">
                <Image
                  src={siteConfig.organizers.shrinik.logo}
                  alt="Shrinik Club"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>

            <span className="text-[11px] md:text-xs font-display font-semibold tracking-[0.3em] text-poster-magenta drop-shadow-[0_0_8px_#ff003c]">
              SHRINIK
            </span>
          </motion.div>

          {/* collision fusion flash — huge soft light explosion */}
          <motion.div
            className="absolute w-[80vw] h-[40vh] rounded-[100%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(0,243,255,0.8) 30%, rgba(255,0,60,0.6) 60%, transparent 100%)",
              filter: "blur(60px)",
              mixBlendMode: "screen"
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "collide"
                ? { scale: 1.5, opacity: 1 }
                : revealed
                ? { scale: 1.5, opacity: 0 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.7,
              ease: EASE_CINEMATIC,
            }}
          />

          {/* VIBRANT reveal */}
          <motion.div
            className="relative z-10 mx-auto w-fit px-6"
            initial={{
              opacity: 0,
              scale: 0.94,
              filter: "blur(6px)",
            }}
            animate={
              revealed
                ? {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    scale: 0.94,
                    filter: "blur(6px)",
                  }
            }
            transition={{
              duration: 0.7,
              ease: EASE_CINEMATIC,
            }}
          >
            <div className="font-marker text-poster-yellow text-[min(18vw,20vh)] leading-none drop-shadow-[0_0_15px_rgba(255,255,224,0.6)] -rotate-3 text-left">
              VIBRANT
            </div>

            <motion.div
              className="absolute -bottom-6 right-6 font-display font-black italic text-poster-purple text-[min(14vw,14vh)] leading-none drop-shadow-[0_0_20px_#a855f7]"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={
                revealed
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              transition={{
                duration: 0.5,
                delay: 0.25,
                ease: EASE_CINEMATIC,
              }}
            >
              2K26
            </motion.div>

            <motion.div
              className="mt-12 md:mt-16 text-[11px] md:text-xs font-semibold tracking-[0.35em] text-ink-300"
              initial={{ opacity: 0 }}
              animate={
                revealed
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{
                duration: 0.5,
                delay: 0.45,
              }}
            >
              {siteConfig.tagline}
            </motion.div>
          </motion.div>

          {/* Skip intro */}
          <button
            onClick={skip}
            className="absolute bottom-7 right-7 text-[11px] tracking-[0.14em] uppercase text-ink-500 hover:text-ink-0 border border-ink-700/40 rounded-full px-4 py-2.5 transition-colors"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );}
