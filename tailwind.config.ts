/**
 * tailwind.config.ts
 * 
 * Tailwind CSS configuration file for a React project using TypeScript.
 * 
 * This file defines the custom theme, colors, fonts, and other configurations
 * for Tailwind CSS in the project.
 */
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dartmouth-green": "rgb(0, 105, 62)",
        "forest-green": "rgb(18, 49, 43)",
        "rich-forest-green": "rgb(13, 30, 28)",
        "spring-green": "rgb(196, 221, 136)",
        "rich-spring-green": "rgb(165, 215, 95)",
        "granite-gray": "rgb(66, 65, 65)",
        background: "rgb(247, 247, 247)",
        surface: "rgb(226, 226, 226)",
        "surface-secondary": "rgb(112, 112, 112)",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      },
      spacing: {
        nav: "5rem",
      },
      height: {
        nav: "5rem",
      },
      zIndex: {
        top: "9999",
      },
    },
  },
  plugins: [],
} satisfies Config;
