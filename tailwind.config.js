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
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "#4F7CAC",
                    50: "#F0F4F8",
                    100: "#D9E2EC",
                    200: "#BCCCDC",
                    300: "#9FB6CD",
                    400: "#829FBD",
                    500: "#4F7CAC", // Base
                    600: "#3E638A",
                    700: "#2D4A68",
                    800: "#1C3146",
                    900: "#0B1824",
                    950: "#050C12",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#F4A259",
                    50: "#FEF6EF",
                    100: "#FDEAD8",
                    200: "#FBD6B6",
                    300: "#F9C293",
                    400: "#F7AE71",
                    500: "#F4A259", // Base
                    600: "#C38247",
                    700: "#926135",
                    800: "#624124",
                    900: "#312012",
                    950: "#181009",
                    foreground: "#1C1C1E",
                },
                neutral: {
                    DEFAULT: "#1C1C1E",
                    50: "#F8F9FA", // Background
                    100: "#E9ECEF",
                    200: "#DEE2E6",
                    300: "#CED4DA",
                    400: "#ADB5BD",
                    500: "#6C757D",
                    600: "#4A4A4D", // Secondary Text
                    700: "#343A40",
                    800: "#212529",
                    900: "#1C1C1E", // Primary Text
                    950: "#0D0D0E",
                    foreground: "#F8F9FA",
                },
                destructive: {
                    DEFAULT: "#D9534F",
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
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Alias for backward compatibility if needed, but mapped to new neutrals
                slate: {
                    50: "#F8F9FA",
                    100: "#E9ECEF",
                    200: "#DEE2E6",
                    300: "#CED4DA",
                    400: "#ADB5BD",
                    500: "#6C757D",
                    600: "#4A4A4D",
                    700: "#343A40",
                    800: "#212529",
                    900: "#1C1C1E",
                    950: "#0D0D0E",
                },
                gray: {
                    50: "#F8F9FA",
                    100: "#E9ECEF",
                    200: "#DEE2E6",
                    300: "#CED4DA",
                    400: "#ADB5BD",
                    500: "#6C757D",
                    600: "#4A4A4D",
                    700: "#343A40",
                    800: "#212529",
                    900: "#1C1C1E",
                    950: "#0D0D0E",
                }
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
