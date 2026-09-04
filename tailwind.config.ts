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
        void: "#05010d",
        neon: {
          pink: "#ff2d95",
          cyan: "#00f0ff",
          lime: "#b8ff3c",
          purple: "#a855f7",
          yellow: "#ffe600",
          orange: "#ff6b00",
          hot: "#ff0055",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Haettenschweiler", "sans-serif"],
        pixel: ["var(--font-pixel)", "Courier New", "monospace"],
        wet: ["var(--font-wet)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        body: ["var(--font-body)", "Comic Sans MS", "system-ui", "sans-serif"],
      },
      animation: {
        glitch: "glitch 2.5s infinite linear alternate-reverse",
        pulseNeon: "pulseNeon 2s ease-in-out infinite",
        flicker: "flicker 3s infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-rev": "marqueeRev 32s linear infinite",
        sparkle: "sparkle 1.6s ease-in-out infinite",
        spinSlow: "spin 8s linear infinite",
        bounceSoft: "bounceSoft 1.4s ease-in-out infinite",
        wobble: "wobble 2.2s ease-in-out infinite",
        rainbow: "rainbow 3s linear infinite",
        arcadePulse: "arcadePulse 1.2s ease-in-out infinite",
        stickerPop: "stickerPop 2.8s ease-in-out infinite",
        hueShift: "hueShift 6s linear infinite",
        vhsShake: "vhsShake 0.35s steps(2) infinite",
      },
      keyframes: {
        glitch: {
          "0%": { textShadow: "2px 0 #ff2d95, -2px 0 #00f0ff" },
          "20%": { textShadow: "-2px 0 #ff2d95, 2px 0 #00f0ff" },
          "40%": { textShadow: "2px 0 #00f0ff, -2px 0 #b8ff3c" },
          "60%": { textShadow: "-3px 0 #ffe600, 3px 0 #ff2d95" },
          "80%": { textShadow: "1px 0 #a855f7, -1px 0 #00f0ff" },
          "100%": { textShadow: "2px 0 #ff2d95, -2px 0 #00f0ff" },
        },
        pulseNeon: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 8px #ff2d95) drop-shadow(0 0 16px #00f0ff)",
          },
          "50%": {
            filter: "drop-shadow(0 0 20px #ff2d95) drop-shadow(0 0 40px #00f0ff)",
          },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.35) rotate(18deg)", opacity: "0.35" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0) rotate(-6deg)" },
          "50%": { transform: "translateY(-10px) rotate(6deg)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(-8deg) scale(1)" },
          "50%": { transform: "rotate(8deg) scale(1.08)" },
        },
        rainbow: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        arcadePulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 0 rgba(255,230,0,0.7), 0 0 40px #ff2d95, 0 0 80px #00f0ff, inset 0 -8px 0 rgba(0,0,0,0.35)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow:
              "0 0 0 14px rgba(255,230,0,0), 0 0 60px #ffe600, 0 0 120px #ff2d95, inset 0 -8px 0 rgba(0,0,0,0.35)",
            transform: "scale(1.04)",
          },
        },
        stickerPop: {
          "0%, 100%": { transform: "rotate(-12deg) scale(1)" },
          "50%": { transform: "rotate(-6deg) scale(1.12)" },
        },
        hueShift: {
          "0%": { filter: "hue-rotate(0deg) saturate(1.4)" },
          "100%": { filter: "hue-rotate(360deg) saturate(1.4)" },
        },
        vhsShake: {
          "0%": { transform: "translate(0)" },
          "25%": { transform: "translate(-1px, 1px)" },
          "50%": { transform: "translate(1px, -1px)" },
          "75%": { transform: "translate(-1px, 0)" },
          "100%": { transform: "translate(0)" },
        },
      },
      backgroundImage: {
        "grid-neon":
          "linear-gradient(rgba(0,240,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,149,0.06) 1px, transparent 1px)",
        "rainbow-chrome":
          "linear-gradient(90deg, #ff2d95, #ffe600, #b8ff3c, #00f0ff, #a855f7, #ff2d95)",
      },
    },
  },
  plugins: [],
};

export default config;
