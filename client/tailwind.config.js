export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: {
          950: "#0B0E14",
          900: "#111827",
          800: "#1F2937"
        },
        gain: "#22C55E",
        loss: "#EF4444",
        accent: "#3B82F6"
      },
      boxShadow: {
        panel: "0 18px 50px rgba(0, 0, 0, 0.22)"
      }
    }
  },
  plugins: []
};
