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
        gold: {
          DEFAULT: "#C9A227",
          light: "#E0C158",
          dark: "#9C7D1C",
        },
        crimson: {
          DEFAULT: "#B3242A",
          dark: "#8C1B20",
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
        gold: "0 0 0 1px rgba(201,162,39,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
