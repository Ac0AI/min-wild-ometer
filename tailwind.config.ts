import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1b1035",
        cream: "#fff7e8",
        pop: {
          pink: "#ff4f9a",
          yellow: "#ffd23f",
          cyan: "#3ddcff",
          lime: "#a6f04d",
          purple: "#8b5cf6",
          orange: "#ff8a3d",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        pop: "4px 4px 0 #1b1035",
        "pop-lg": "8px 8px 0 #1b1035",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        wiggle: "wiggle 2.4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(2deg)" },
          "50%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
