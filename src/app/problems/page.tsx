import Link from "next/link";
import { Metadata } from "next";
import { getPageIndex } from "@/lib/internal-links";

export const metadata: Metadata = {
    title: "Common Dog Problems & Solutions | PetMatchr",
    description: "Real solutions for shedding, chewing, barking, and other common dog behavior issues.",
};

export default async function ProblemIndexPage() {
    const index = await getPageIndex();
    const problemEntries = index.filter((entry) => entry.page_type === "problem");

    const normalizedPages = (problemEntries.length ? problemEntries : [
        { slug: "golden-retriever", title: "Golden Retriever Problems & Solutions", blurb: "Shedding, chewing, and pulling fixes for Golden Retrievers." }
    ]).map((entry) => ({
        slug: entry.slug,
        title: "short_label" in entry && entry.short_label ? entry.short_label : entry.title,
        description: "blurb" in entry && entry.blurb ? entry.blurb : entry.title
    })).sort((a, b) => a.title.localeCompare(b.title));

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
                    {normalizedPages.map((page) => (
                        <Link
                            key={page.slug}
                            href={`/problems/${page.slug}`}
                            className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-amber-500/50 hover:bg-slate-900 transition-all"
                        >
                            <h2 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-amber-400 transition-colors">
                                {page.title}
                            </h2>
                            <p className="text-slate-400 mb-4">
                                {page.description}
                            </p>
                            <div className="flex items-center text-sm font-medium text-amber-500">
                                See Solutions <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
