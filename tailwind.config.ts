import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#176B4D",
          dark: "#0F4D38",
          light: "#E8F4EE"
        },
        accent: "#F4B942",
        background: "#FAFAF7",
        surface: "#FFFFFF",
        content: {
          primary: "#17201C",
          secondary: "#66736D",
          muted: "#A4ADA8"
        },
        border: "#E5E9E6",
        success: "#278A57",
        warning: "#D99000",
        error: "#D64545"
      },
      borderRadius: {
        sm: "8px",
        control: "12px",
        card: "16px",
        container: "20px"
      },
      fontSize: {
        display: ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "page-heading": ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
        "section-heading": ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.45", fontWeight: "400" }],
        meta: ["0.75rem", { lineHeight: "1.35", fontWeight: "500" }]
      },
      boxShadow: {
        soft: "0 4px 18px rgba(23, 32, 28, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;