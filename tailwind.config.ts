import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        nvidia: {
          50: "#f4fbf0",
          100: "#e6f8dd",
          200: "#cbf1be",
          300: "#a3e592",
          400: "#76b900", // Signature NVIDIA Green
          500: "#63a000",
          600: "#4d7f00",
          700: "#3b6204",
          800: "#324e09",
          900: "#2a420c",
          glow: "#76b900",
        },
        cyber: {
          dark: "#05080c",
          surface: "#0a0f18",
          card: "#0e1624",
          border: "#1a2638",
          accent: "#00f0ff",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
