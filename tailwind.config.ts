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
        cream: {
          DEFAULT: "#FDFAF5",
          50: "#FEFDF9",
          100: "#FBF6EC",
        },
        parchment: {
          DEFAULT: "#F5ECD7",
          dark: "#E8D5B7",
        },
        terracotta: {
          DEFAULT: "#A0885C",
          light: "#BCA480",
          dark: "#8A7346",
        },
        sage: {
          DEFAULT: "#7A9E7E",
          light: "#9BB89E",
          dark: "#5C7E60",
        },
        bark: {
          DEFAULT: "#1A3C34",
          light: "#2B5248",
          50: "#3D685C",
        },
        gold: {
          DEFAULT: "#BCA480",
          light: "#D2BA96",
          dark: "#A08A64",
        },
        surface: "#FDFAF5",
        "surface-warm": "#F5ECD7",
        "surface-dark": "#1A3C34",
        border: "#E8D5B7",
        "border-light": "#F0E6D0",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 20px rgba(26, 60, 52, 0.08)",
        "warm-lg": "0 8px 40px rgba(26, 60, 52, 0.12)",
        "warm-xl": "0 12px 60px rgba(26, 60, 52, 0.16)",
        gold: "0 2px 12px rgba(188, 164, 128, 0.3)",
      },
      backgroundImage: {
        "botanical-pattern": "url('/images/patterns/botanical-tile.svg')",
        "mandala-pattern": "url('/images/patterns/mandala-tile.svg')",
        "paper-texture": "url('/images/patterns/paper-texture.png')",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "fade-in": "fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "fade-in-fast": "fadeIn 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "slide-in-left": "slideInLeft 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "slide-in-right": "slideInRight 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "ornament-draw": "ornamentDraw 1.2s ease-in-out forwards",
        "leaf-float": "leafFloat 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "gold-border": "goldBorder 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        ornamentDraw: {
          "0%": { strokeDashoffset: "100", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
        leafFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        goldBorder: {
          "0%": { borderColor: "transparent" },
          "100%": { borderColor: "#BCA480" },
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        sm: "2px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1A3C34",
            maxWidth: "65ch",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
