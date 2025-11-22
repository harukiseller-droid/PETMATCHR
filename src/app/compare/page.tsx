import { Metadata } from 'next';
import { getBreeds, getComparisonPageBySlug } from '@/lib/data';
import { getPageIndex } from "@/lib/internal-links";
import BreedComparisonSelector from '@/components/BreedComparisonSelector';

export const metadata: Metadata = {
    title: 'Compare Dog Breeds | PetMatchr',
    description: 'Compare any two dog breeds side-by-side. See which one fits your lifestyle, budget, and home better with our honest, data-driven comparison engine.',
};

export default async function ComparePage() {
    const breeds = await getBreeds();
    const comparisons = await getFeaturedComparisons();

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900">
            <div className="relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-secondary-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl mb-6">
                            Compare Dog Breeds
                        </h1>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Not sure which breed is right for you? Put them head-to-head to see
                            differences in energy, cost, training, and lifestyle fit.
                        </p>
                    </div>

                    <BreedComparisonSelector breeds={breeds} />

                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-neutral-900 mb-4">Featured comparisons</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {comparisons.map((page) => (
                                <a
                                    key={page.slug}
                                    href={`/compare/${page.slug}`}
                                    className="rounded-xl border border-neutral-200 bg-white p-4 hover:border-secondary-500/40 hover:shadow-md transition-all flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm text-secondary-600 uppercase tracking-wide font-semibold">Golden Retriever match-up</p>
                                        <p className="text-base font-bold text-neutral-900">{page.title}</p>
                                    </div>
                                    <span className="text-secondary-600">→</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 grid gap-8 md:grid-cols-3 text-center">
                        <div>
                            <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center mb-4 text-secondary-600 font-bold text-lg border border-neutral-200 shadow-sm">
                                VS
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Honest Verdicts</h3>
                            <p className="text-sm text-neutral-500">We don’t just list stats. We tell you who wins for apartments, kids, and busy schedules.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center mb-4 text-secondary-600 font-bold text-lg border border-neutral-200 shadow-sm">
                                $
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Cost Reality</h3>
                            <p className="text-sm text-neutral-500">See which breed will actually cost you more in vet bills, food, and insurance.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center mb-4 text-secondary-600 font-bold text-lg border border-neutral-200 shadow-sm">
                                B
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Behavior Check</h3>
                            <p className="text-sm text-neutral-500">Compare separation anxiety, barking, and training difficulty side-by-side.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

async function getFeaturedComparisons() {
    const index = await getPageIndex();
    const entries = index.filter((entry) => entry.page_type === "comparison");
    const pages = await Promise.all(entries.map(async (entry) => {
        const page = await getComparisonPageBySlug(entry.slug);
        return page ? { slug: entry.slug, title: page.meta.title } : null;
    }));
    const list = pages.filter((p): p is NonNullable<typeof p> => !!p);
    return list.length ? list.sort((a, b) => a.title.localeCompare(b.title)) : [];
}
