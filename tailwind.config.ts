import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-fraunces)", "var(--font-noto-serif-malayalam)", "serif"],
        sans: ["var(--font-poppins)", "var(--font-noto-sans-malayalam)", "sans-serif"],
      },
      colors: {
        ink: "#010101",
        parchment: "#FEFEFE",
        gold: {
          DEFAULT: "#E6AF2E",
          soft: "#F0CF7A",
        },
        seal: "#6B0F1A",
        slate: "#3B3F4A",
        mist: "#8A8577",
      },
      letterSpacing: {
        "wide-xl": "0.2em",
        "wide-2xl": "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
