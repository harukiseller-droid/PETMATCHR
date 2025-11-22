import Link from "next/link";
import { Metadata } from "next";
import { getPageIndex } from "@/lib/internal-links";

export const metadata: Metadata = {
    title: "Dog Anxiety Guides | PetMatchr",
    description: "Expert guides on handling separation anxiety, noise phobias, and travel stress in dogs.",
};

export default async function AnxietyIndexPage() {
    const index = await getPageIndex();
    const anxietyEntries = index.filter((entry) => entry.page_type === "anxiety");

    // Normalize entries and fall back to a single known guide if index data is empty
    const normalizedPages = (anxietyEntries.length ? anxietyEntries : [
        { slug: "golden-retriever", title: "Golden Retriever Anxiety", blurb: "Do Golden Retrievers get anxiety? Learn the signs and how to help your anxious Golden." }
    ]).map((entry) => ({
        slug: entry.slug,
        title: "short_label" in entry && entry.short_label ? entry.short_label : entry.title,
        description: "blurb" in entry && entry.blurb ? entry.blurb : entry.title
    })).sort((a, b) => a.title.localeCompare(b.title));

    return (
        <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-neutral-900 mb-4">Dog Anxiety Guides</h1>
                    <p className="text-xl text-neutral-500">
                        Help your dog feel safe, calm, and confident.
                    </p>
                </div>

                <div className="grid gap-6">
                    {normalizedPages.map((page) => (
                        <Link
                            key={page.slug}
                            href={`/anxiety/${page.slug}`}
                            className="group block rounded-2xl border border-neutral-200 bg-white p-8 hover:border-primary-500/50 hover:shadow-md transition-all"
                        >
                            <h2 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {page.title}
                            </h2>
                            <p className="text-neutral-500 mb-4">
                                {page.description}
                            </p>
                            <div className="flex items-center text-sm font-medium text-primary-600">
                                Read Guide <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
