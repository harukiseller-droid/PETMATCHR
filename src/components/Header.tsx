"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 z-50 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                <Link href="/" className="text-lg font-bold tracking-tight text-neutral-900 hover:text-secondary-600 transition-colors z-50 relative">
                    PetMatchr
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-900">
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

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 relative p-2 text-neutral-900 hover:text-secondary-600 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
                        <nav className="flex flex-col items-center gap-8 text-lg font-medium text-neutral-900">
                            <Link href="/quiz/lifestyle-match" onClick={() => setIsOpen(false)} className="hover:text-secondary-600 transition-colors">Quiz</Link>
                            <Link href="/breeds" onClick={() => setIsOpen(false)} className="hover:text-secondary-600 transition-colors">Breeds</Link>
                            <Link href="/compare" onClick={() => setIsOpen(false)} className="hover:text-secondary-600 transition-colors">Compare</Link>
                            <Link href="/cost" onClick={() => setIsOpen(false)} className="hover:text-secondary-600 transition-colors">Costs</Link>
                            <Link href="/anxiety" onClick={() => setIsOpen(false)} className="hover:text-secondary-600 transition-colors">Anxiety</Link>
                            <Link href="/problems" onClick={() => setIsOpen(false)} className="hover:text-secondary-600 transition-colors">Problems</Link>
                            <Link href="/answers" onClick={() => setIsOpen(false)} className="hover:text-secondary-600 transition-colors">Answers</Link>
                            <Link
                                href="/quiz/lifestyle-match"
                                onClick={() => setIsOpen(false)}
                                className="rounded-full bg-secondary-500/10 px-6 py-3 text-secondary-600 ring-1 ring-inset ring-secondary-500/20 hover:bg-secondary-500/20 transition-all mt-4"
                            >
                                Find My Dog
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
