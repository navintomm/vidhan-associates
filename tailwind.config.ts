import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-fraunces)", "var(--font-noto-serif-malayalam)", "serif"],
        sans: ["var(--font-ibm-plex-sans)", "var(--font-noto-sans-malayalam)", "sans-serif"],
      },
      colors: {
        ink: "#12141A",
        parchment: "#F6F1E4",
        gold: {
          DEFAULT: "#A9812D",
          soft: "#D8C48A",
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
