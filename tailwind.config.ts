import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#07070B",
          900: "#0B0A10",
          850: "#0F0D16",
          800: "#14121C",
        },
        vibeesta: {
          300: "#9d8cf2", // lighter blue-purple
          400: "#7c3aed", // rich purple (tw-violet-600)
          500: "#6d28d9", // deeper blue-purple
          600: "#5b21b6",
        },
        shrinik: {
          900: "#5A0018",
          800: "#7F1028",
          700: "#9F1239",
          600: "#B91C3D",
          gold: "#C9A24B",
        },
        poster: {
          cyan: "#00f3ff",
          magenta: "#ff003c",
          purple: "#a855f7",
          yellow: "#ffffe0"
        },
        ink: {
          0: "#F5F3F7",
          300: "#B8B3C4",
          500: "#7C7690",
          700: "#524D63",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        marker: ["var(--font-marker)", "cursive"],
      },
      maxWidth: {
        content: "1360px",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(.16,.84,.44,1)",
        soft: "cubic-bezier(.22,.61,.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
