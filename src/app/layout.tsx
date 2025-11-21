import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "PetMatchr",
    description: "Find your perfect dog breed match",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
                    <h1>PetMatchr</h1>
                </header>
                <main style={{ padding: "2rem" }}>{children}</main>
            </body>
        </html>
    );
}
