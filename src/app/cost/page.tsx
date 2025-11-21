import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dog Cost Calculators | PetMatchr",
    description: "See real-world cost breakdowns for different dog breeds in various cities.",
};

export default function CostIndexPage() {
    // In a real app, we might fetch a list of available cost pages dynamically.
    // For now, we'll link to the ones we know exist or have data for.
    const costExamples = [
        {
            title: "Golden Retriever in Austin, TX",
            slug: "golden-retriever-austin-tx",
            description: "First-year and monthly cost breakdown for a Golden Retriever in Austin."
        },
        {
            title: "Golden Retriever in New York, NY",
            slug: "golden-retriever-new-york-ny",
            description: "High-cost city breakdown for owning a Golden in NYC."
        }
    ];

    return (
        <main className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-50 mb-4">Real-World Dog Costs</h1>
                    <p className="text-xl text-slate-400">
                        Stop guessing. See actual price tags for food, vet care, and emergencies.
                    </p>
                </div>

                <div className="grid gap-6">
                    {costExamples.map((example) => (
                        <Link
                            key={example.slug}
                            href={`/cost/${example.slug}`}
                            className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
                        >
                            <h2 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                                {example.title}
                            </h2>
                            <p className="text-slate-400 mb-4">
                                {example.description}
                            </p>
                            <div className="flex items-center text-sm font-medium text-emerald-500">
                                See Breakdown <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
