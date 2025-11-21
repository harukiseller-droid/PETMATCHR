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
            <body className="bg-slate-950 text-slate-50 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
                <header className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
                    <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                        <Link href="/" className="text-lg font-bold tracking-tight text-slate-100 hover:text-emerald-400 transition-colors">
                            PetMatchr
                        </Link>
                        <nav className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium text-slate-300">
                            <Link href="/quiz/lifestyle-match" className="hover:text-emerald-400 transition-colors">Quiz</Link>
                            <Link href="/breeds" className="hover:text-emerald-400 transition-colors">Breeds</Link>
                            <Link href="/compare" className="hover:text-emerald-400 transition-colors">Compare</Link>
                            <Link href="/cost" className="hover:text-emerald-400 transition-colors">Costs</Link>
                            <Link href="/anxiety" className="hover:text-emerald-400 transition-colors">Anxiety</Link>
                            <Link href="/problems" className="hover:text-emerald-400 transition-colors">Problems</Link>
                            <Link href="/answers" className="hover:text-emerald-400 transition-colors">Answers</Link>
                            <Link
                                href="/quiz/lifestyle-match"
                                className="rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-400 ring-1 ring-inset ring-emerald-500/20 hover:bg-emerald-500/20 transition-all"
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
