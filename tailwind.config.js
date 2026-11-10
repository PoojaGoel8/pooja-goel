/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // The names are roles, not colours, so every component follows the
      // palette without being touched: `paper` is whatever the page sits on,
      // `ink` whatever is printed on it. The palette is a dark console —
      // warm black, bone text, and one signal orange.
      colors: {
        paper: "#0F0E0C",
        shell: "#181613",
        ink: "#F2EDE4",
        graphite: "#C9C1B5",
        muted: "#968D80",
        rule: "#2D2A25",
        accent: "#FF6B3D",
        "accent-soft": "#3A1F14",
        // Status green, used only for "online" and uptime marks.
        signal: "#5BE38E",
      },
      fontFamily: {
        // Headlines and sentence-length titles.
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        // Poster-size single words: the name, page titles, CONTACT.
        poster: ["Anton", "Impact", '"Arial Narrow"', "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        prose: "62ch",
        shell: "80rem",
      },
      letterSpacing: {
        label: "0.16em",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        rise: "rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 38s linear infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        blink: "blink 1.05s step-end infinite",
        ping: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
