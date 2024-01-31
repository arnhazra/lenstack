import type { Config } from "tailwindcss"
import { nextui } from "@nextui-org/react"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    layout: {
      spacingUnit: 4,
      disabledOpacity: 0.5,
      dividerWeight: "1px",
      fontSize: {
        tiny: "0.75rem",
        small: "0.875rem",
        medium: "1rem",
        large: "1.125rem",
      },
      lineHeight: {
        tiny: "1rem",
        small: "1.25rem",
        medium: "1.5rem",
        large: "1.75rem",
      },
      radius: {
        small: "8px",
        medium: "12px",
        large: "14px",
      },
      borderWidth: {
        small: "1px",
        medium: "2px",
        large: "3px",
      },
    },
    themes: {
      light: {
        colors: {
          background: "#FAFAFA",
          foreground: "#11181C",
          primary: {
            foreground: "#FAFAFA",
            DEFAULT: "#006FEE",
          },
        },
        layout: {
          hoverOpacity: 0.8,
          boxShadow: {
            small: "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            medium: "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            large: "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
          },
        },
      },
      dark: {
        colors: {
          background: "#2B3336",
          foreground: "#ECEDEE",
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
        },
        layout: {
          hoverOpacity: 0.9,
          boxShadow: {
            small: "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            medium: "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            large: "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
          },
        },
      },
    },
  })],
}

export default config