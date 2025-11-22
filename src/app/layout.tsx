import type { Metadata } from "next";
import Link from "next/link";
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
                <header className="fixed top-0 z-50 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl">
                    <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                        <Link href="/" className="text-lg font-bold tracking-tight text-neutral-900 hover:text-secondary-600 transition-colors">
                            PetMatchr
                        </Link>
                        <nav className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium text-neutral-600">
                            <Link href="/quiz/lifestyle-match" className="hover:text-secondary-600 transition-colors">Quiz</Link>
                            <Link href="/breeds" className="hover:text-secondary-600 transition-colors">Breeds</Link>
                            <Link href="/compare" className="hover:text-secondary-600 transition-colors">Compare</Link>
                            <Link href="/cost" className="hover:text-secondary-600 transition-colors">Costs</Link>
                            <Link href="/anxiety" className="hover:text-secondary-600 transition-colors">Anxiety</Link>
                            <Link href="/problems" className="hover:text-secondary-600 transition-colors">Problems</Link>
                            <Link href="/answers" className="hover:text-secondary-600 transition-colors">Answers</Link>
                            <Link
                                href="/quiz/lifestyle-match"
                                className="rounded-full bg-secondary-500/10 px-4 py-2 text-secondary-600 ring-1 ring-inset ring-secondary-500/20 hover:bg-secondary-500/20 transition-all"
                            >
                                Find My Dog
                            </Link>
                        </nav>
                    </div>
                </header>
                <main className="pt-16 min-h-screen flex flex-col">
                    {children}
                </main>
            </body>
        </html>
    );
}
