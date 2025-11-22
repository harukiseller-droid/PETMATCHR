import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
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
        <html lang="en" className="scroll-smooth">
            <body className="bg-neutral-50 text-neutral-900 antialiased selection:bg-secondary-500/30 selection:text-secondary-900">
                <Header />
                <main className="pt-16 min-h-screen flex flex-col">
                    {children}
                </main>
            </body>
        </html>
    );
}
