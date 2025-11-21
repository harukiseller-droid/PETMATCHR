import { Metadata } from 'next';
import { getBreeds } from '@/lib/data';
import BreedComparisonSelector from '@/components/BreedComparisonSelector';

export const metadata: Metadata = {
    title: 'Compare Dog Breeds | PetMatchr',
    description: 'Compare any two dog breeds side-by-side. See which one fits your lifestyle, budget, and home better with our honest, data-driven comparison engine.',
};

export default async function ComparePage() {
    const breeds = await getBreeds();

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
