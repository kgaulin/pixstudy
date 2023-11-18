import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: "#AE7AFF",
      "primary-dark": "#8B62CC",
      "primary-light": "#EEE3FF",
      gray: "#5F646D",
      "gray-light": "#E7E8EA",
      dark: "#000000",
      "dark-light": "rgba(0,0,0,.75)",
      light: "#FFFFFF",
      warning: "#FAE8A4",
      "warning-light": "rgba(250,232,164,0.20)",
      negative: "#E99898",
      "negative-light": "rgba(233,152,152,0.20)",
      positive: "#98E9AB",
      "positive-light": "rgba(152,233,171,0.20)",
      transparent: "transparent",
      ground: "#F9F4EF",
    },
    fontSize: {
      "label-sm": "12px",
      "label-md": "14px",
      "label-lg": "16px",
      "button-sm": "14px",
      "button-md": "16px",
      "heading-sm": "20px",
      "heading-md": "24px",
      "heading-lg": "28px",
      "heading-xl": "38px",
      "heading-2xl": "48px",
    },
    boxShadow: {
      none: "none",
      sm: "4px 4px 0px 0px #000",
      md: "6px 6px 0px 0px #000",
      lg: "8px 8px 0px 0px #000",
      "secondary-sm": "4px -4px 0px 0px #000",
      "secondary-md": "6px -6px 0px 0px #000",
      "secondary-lg": "8px -8px 0px 0px #000",
    },
    fontFamily: {
      sans: ["Roboto Flex", "sans-serif"],
    },
  },
  plugins: [],
} satisfies Config;