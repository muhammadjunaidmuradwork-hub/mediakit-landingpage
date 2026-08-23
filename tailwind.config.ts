import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { sun: "#F5D90A", ink: "#11110F", paper: "#F4F1E8", cream: "#FFFDF7" },
      fontFamily: { sans: ["var(--font-sans)"], display: ["var(--font-display)"] },
      spacing: { "18": "4.5rem", "22": "5.5rem", "30": "7.5rem" },
      fontSize: { hero: ["clamp(3.4rem, 7.8vw, 8.6rem)", { lineHeight: ".82", letterSpacing: "-.075em" }] },
    },
  },
  plugins: [],
} satisfies Config;
