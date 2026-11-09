/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF8F4",
        shell: "#F4EEE6",
        ink: "#1A1714",
        graphite: "#4A423A",
        muted: "#766B60",
        rule: "#E4DACE",
        accent: "#B9472A",
        "accent-soft": "#F2DCD2",
        moss: "#4C5A46",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "62ch",
        shell: "74rem",
      },
      letterSpacing: {
        label: "0.18em",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
