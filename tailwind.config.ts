import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        dark1: "#020617", // slate-950
        dark2: "#0f172a", // slate-900
        dark3: "#1e293b", // slate-800
        dark4: "#334155", // slate-700
        dark5: "#475569", // slate-600
        dark6: "#64748b", // slate-500
        light1: "#cbd5e1", // slate-400
        light2: "#e2e8f0", // slate-300
        light3: "#e2e8f0", // slate-200
        light4: "#f1f5f9", // slate-100
        light5: "#f8fafc", // slate-50
        light6: "#ffffff", // white
      },

      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
        heartBeat: {
          "0%": { transform: "scale(1);" },
          "50%": { transform: "scale(1.05);" },
          "100%": { transform: "scale(1);" },
        },
        loader: {
          to: {
            opacity: "0.1",
            transform: "translate3d(0, -1rem, 0)",
          },
        },
        loadingDots: {
          "0%": { content: '"."' },
          "33%": { content: '".."' },
          "66%": { content: '"..."' },
          "100%": { content: '"."' },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        heartBeat: "heartBeat 2s ",
        loader: "loader 0.6s infinite alternate",
        loadingDots: "loadingDots 1.5s infinite step-start",
      },
    },
  },
  plugins: [],
};
export default config;
