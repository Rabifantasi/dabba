import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        custom: "1400px",
      },
      animation: {
        dance: "dance 1.5s infinite ease-in-out", // Custom animation
      },
      keyframes: {
        dance: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(-10deg)" },
          "50%": { transform: "translateY(0) rotate(10deg)" },
          "75%": { transform: "translateY(-10px) rotate(-10deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
