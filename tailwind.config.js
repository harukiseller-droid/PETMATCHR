/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
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
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "#2CA6AF",
                    50: "#EAF6F7",
                    100: "#CBE9EB",
                    200: "#9DCCD0",
                    300: "#6EB0B5",
                    400: "#40939A",
                    500: "#2CA6AF", // Base Teal
                    600: "#23858C",
                    700: "#1A6469",
                    800: "#124246",
                    900: "#092123",
                    950: "#041011",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#00253A",
                    50: "#E6E9EB",
                    100: "#C0C8CE",
                    200: "#99A8B1",
                    300: "#738794",
                    400: "#4C6677",
                    500: "#00253A", // Base Navy
                    600: "#001E2F",
                    700: "#001623",
                    800: "#000F18",
                    900: "#00070C",
                    950: "#000000",
                    foreground: "#FFFFFF",
                },
                neutral: {
                    DEFAULT: "#00253A",
                    50: "#F2F5F7", // Off-white for table backgrounds
                    100: "#E6EDF0", // Light Gray
                    200: "#CDD9DE",
                    300: "#B4C5CC",
                    400: "#9BB1BA",
                    500: "#829DA8",
                    600: "#00253A", // Forced to Navy for 100% opacity/darkness
                    700: "#00253A", // Forced to Navy
                    800: "#00253A", // Forced to Navy
                    900: "#00253A", // Navy
                    950: "#00121D",
                    foreground: "#FFFFFF",
                },
                destructive: {
                    DEFAULT: "#DB1328", // Red
                    foreground: "#FFFFFF",
                },
                success: {
                    DEFAULT: "#7BAE7F",
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "#EE6644", // Orange
                    foreground: "#FFFFFF",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Alias for backward compatibility
                slate: {
                    50: "#F2F5F7",
                    100: "#E6EDF0",
                    200: "#CDD9DE",
                    300: "#B4C5CC",
                    400: "#9BB1BA",
                    500: "#829DA8",
                    600: "#00253A",
                    700: "#00253A",
                    800: "#00253A",
                    900: "#00253A",
                    950: "#00121D",
                },
                gray: {
                    50: "#F2F5F7",
                    100: "#E6EDF0",
                    200: "#CDD9DE",
                    300: "#B4C5CC",
                    400: "#9BB1BA",
                    500: "#829DA8",
                    600: "#00253A",
                    700: "#00253A",
                    800: "#00253A",
                    900: "#00253A",
                    950: "#00121D",
                }
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
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
