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
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <div className="relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-50 md:text-5xl mb-6">
                            Compare Dog Breeds
                        </h1>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Not sure which breed is right for you? Put them head-to-head to see
                            differences in energy, cost, training, and lifestyle fit.
                        </p>
                    </div>

                    <BreedComparisonSelector breeds={breeds} />

                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-slate-100 mb-4">Featured comparisons</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {comparisons.map((page) => (
                                <a
                                    key={page.slug}
                                    href={`/compare/${page.slug}`}
                                    className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/40 hover:bg-slate-900/60 transition-colors flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm text-emerald-400 uppercase tracking-wide font-semibold">Golden Retriever match-up</p>
                                        <p className="text-base font-bold text-slate-100">{page.title}</p>
                                    </div>
                                    <span className="text-emerald-400">→</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 grid gap-8 md:grid-cols-3 text-center">
                        <div>
                            <div className="w-12 h-12 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-4 text-emerald-400 font-bold text-lg border border-slate-800">
                                VS
                            </div>
                            <h3 className="text-lg font-bold text-slate-100 mb-2">Honest Verdicts</h3>
                            <p className="text-sm text-slate-400">We don't just list stats. We tell you who wins for apartments, kids, and busy schedules.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-4 text-emerald-400 font-bold text-lg border border-slate-800">
                                $
                            </div>
                            <h3 className="text-lg font-bold text-slate-100 mb-2">Cost Reality</h3>
                            <p className="text-sm text-slate-400">See which breed will actually cost you more in vet bills, food, and insurance.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-4 text-emerald-400 font-bold text-lg border border-slate-800">
                                B
                            </div>
                            <h3 className="text-lg font-bold text-slate-100 mb-2">Behavior Check</h3>
                            <p className="text-sm text-slate-400">Compare separation anxiety, barking, and training difficulty side-by-side.</p>
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
