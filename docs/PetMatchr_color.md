
  theme: {
    extend: {
      colors: {
        // Brand palette
        brand: {
          teal: "#2CA6AF",      // primary actions, menu, main CTA
          navy: "#00253A",      // headings, body text, header/footer
          orange: "#EE6644",    // accent for actions, icons, highlights
          red: "#DB1328",       // alerts, errors, warnings
          gray: "#E6EDF0",      // section bg, borders
          bg: "#F9FBFD",        // global light background
          border: "#D3E2E7",    // card borders, dividers
          text: "#00253A",      // main text color
          textMuted: "#405565", // secondary text, meta
        },
      },

      backgroundColor: {
        page: "#F9FBFD",  // dùng cho body / main wrapper
        card: "#FFFFFF",
      },

      textColor: {
        primary: "#00253A",
        muted: "#405565",
        inverse: "#FFFFFF",
      },

      borderColor: {
        subtle: "#D3E2E7",
        section: "#E6EDF0",
      },

      boxShadow: {
        card: "0 10px 25px rgba(0, 37, 58, 0.06)",
      },

      borderRadius: {
        card: "18px",
        button: "9999px",
      },
    },
  },
  plugins: [],
};
