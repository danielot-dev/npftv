import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F2A4A",
          dark: "#091A30",
          light: "#1C3F66",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#111318",
        },
        royal: {
          DEFAULT: "#2E6FF2",
          light: "#6C97FF",
          dark: "#1B4FC4",
        },
        signal: {
          DEFAULT: "#0EA5E9",
          dark: "#0369A1",
        },
        offwhite: "#F4F5F7",
        bodylight: "#D9DCE1",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        condensed: ["var(--font-condensed)", "sans-serif"],
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(180deg, #1C3F66 0%, #0F2A4A 55%, #091A30 100%)",
        "mesh-glow":
          "radial-gradient(60% 50% at 15% 0%, rgba(46,111,242,0.16) 0%, rgba(46,111,242,0) 60%), radial-gradient(50% 40% at 100% 20%, rgba(14,165,233,0.14) 0%, rgba(14,165,233,0) 60%), radial-gradient(45% 45% at 50% 100%, rgba(46,111,242,0.10) 0%, rgba(46,111,242,0) 60%)",
      },
      boxShadow: {
        royal: "0 0 0 1px rgba(46,111,242,0.4)",
        glow: "0 0 0 1px rgba(46,111,242,0.15), 0 8px 30px rgba(46,111,242,0.14)",
        "glow-lg": "0 0 0 1px rgba(46,111,242,0.18), 0 20px 60px rgba(46,111,242,0.20)",
        "glass-sm": "0 4px 24px rgba(9,26,48,0.06)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        meshDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(1%, -1.5%, 0) scale(1.03)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.5s ease both",
        "mesh-drift": "meshDrift 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
