import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#12372A",
          50: "#F2F7F4",
          100: "#E1EFEA",
          200: "#B8DCD0",
          300: "#8AC4B1",
          400: "#4B9F85",
          500: "#16845B",
          600: "#12372A",
          700: "#0E2B21",
          800: "#0A1F18",
          900: "#06130F",
        },
        emerald: {
          DEFAULT: "#16845B",
          hover: "#14734F",
          light: "#E3F4EC",
        },
        fresh: {
          DEFAULT: "#65B96E",
          light: "#EBF7EC",
        },
        lime: {
          DEFAULT: "#C8F169",
          hover: "#B8E454",
          muted: "#E4F8AC",
        },
        ivory: {
          DEFAULT: "#F7F6EF",
          surface: "#FBFBF7",
          dark: "#EFECE1",
        },
        charcoal: {
          DEFAULT: "#202722",
          light: "#2E3831",
        },
        muted: {
          DEFAULT: "#69756D",
          light: "#8B978F",
        },
        border: {
          light: "#DDE5DC",
          dark: "#2A4137",
        },
        critical: {
          DEFAULT: "#C74646",
          light: "#FDEDED",
          dark: "#471919",
        },
        // Dark theme specific surfaces
        dark: {
          bg: "#0D1F18",
          surface: "#142A22",
          elevated: "#1B352B",
          border: "#244236",
          text: "#F3F7F4",
          muted: "#8EA397",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        btn: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
