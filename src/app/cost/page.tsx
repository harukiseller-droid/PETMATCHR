import Link from "next/link";
import { Metadata } from "next";
import { getPageIndex } from "@/lib/internal-links";
import { getCostPageBySlug } from "@/lib/data";

export const metadata: Metadata = {
    title: "Dog Cost Calculators | PetMatchr",
    description: "See real-world cost breakdowns for different dog breeds in various cities.",
};

export default function CostIndexPage() {
    return (
        <main className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-50 mb-4">Real-World Dog Costs</h1>
                    <p className="text-xl text-slate-400">
                        Stop guessing. See actual price tags for food, vet care, and emergencies.
                    </p>
                </div>

                <CostList />
            </div>
        </main>
    );
}

async function CostList() {
    const index = await getPageIndex();
    const costEntries = index.filter((entry) => entry.page_type === "cost");

    const pages = await Promise.all(
        costEntries.map(async (entry) => {
            const page = await getCostPageBySlug(entry.slug);
            if (!page) return null;
            return {
                slug: entry.slug,
                title: page.meta.title,
                description: page.meta.description,
                label: entry.short_label || page.meta.title
            };
        })
    );

    const costPages = pages.filter((p): p is NonNullable<typeof p> => !!p).sort((a, b) => a.title.localeCompare(b.title));

    const fallback = [
        {
            slug: "golden-retriever-austin-tx",
            title: "Golden Retriever Cost in Austin, Texas (First Year & Monthly Breakdown)",
            description: "First-year and monthly cost breakdown for a Golden Retriever in Austin.",
            label: "Golden Retriever in Austin, TX"
        }
    ];

    const list = costPages.length ? costPages : fallback;
    return (
        <div className="grid gap-6">
            {list.map((page) => (
                <Link
                    key={page.slug}
                    href={`/cost/${page.slug}`}
                    className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
                >
                    <h2 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                        {page.title}
                    </h2>
                    <p className="text-slate-400 mb-4">
                        {page.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-emerald-500">
                        See Breakdown <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
