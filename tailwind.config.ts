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
      },
      boxShadow: {
        royal: "0 0 0 1px rgba(46,111,242,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
