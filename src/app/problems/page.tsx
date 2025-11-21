import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Common Dog Problems & Solutions | PetMatchr",
    description: "Real solutions for shedding, chewing, barking, and other common dog behavior issues.",
};

export default function ProblemIndexPage() {
    return (
        <main className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-50 mb-4">Common Dog Problems</h1>
                    <p className="text-xl text-slate-400">
                        Every dog has challenges. Here is how to solve them.
                    </p>
                </div>

                <div className="grid gap-6">
                    <Link
                        href="/problems/golden-retriever"
                        className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-amber-500/50 hover:bg-slate-900 transition-all"
                    >
                        <h2 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-amber-400 transition-colors">
                            Golden Retriever Problems
                        </h2>
                        <p className="text-slate-400 mb-4">
                            Shedding, chewing, and hip issues explained.
                        </p>
                        <div className="flex items-center text-sm font-medium text-amber-500">
                            See Solutions <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
