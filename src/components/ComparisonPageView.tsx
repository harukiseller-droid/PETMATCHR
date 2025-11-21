import React from 'react';
import { ComparisonPage, CTAConfig } from '@/lib/types';
import Link from 'next/link';

interface Props {
    page: ComparisonPage;
    ctaConfig: CTAConfig;
}

export default function ComparisonPageView({ page, ctaConfig }: Props) {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero */}
            <header className="mb-12 text-center">
                <div className="flex justify-center gap-4 mb-6 text-sm">
                    <Link href={`/breeds/${page.breed_1}`} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        &larr; Back to {page.breed_1.replace(/-/g, ' ')}
                    </Link>
                    <span className="text-slate-600">|</span>
                    <Link href={`/breeds/${page.breed_2}`} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Back to {page.breed_2.replace(/-/g, ' ')} &rarr;
                    </Link>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-slate-50">{page.h1}</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">{page.intro}</p>
            </header>

            {/* Comparison Table */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-slate-50">Head-to-Head Comparison</h2>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50">
                                <th className="border-b border-slate-800 p-4 text-left text-slate-400">Feature</th>
                                <th className="border-b border-slate-800 p-4 text-left text-slate-200">{page.breed_1}</th>
                                <th className="border-b border-slate-800 p-4 text-left text-slate-200">{page.breed_2}</th>
                                <th className="border-b border-slate-800 p-4 text-left text-slate-400">Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {page.comparison_points.map((point, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-900/40'}>
                                    <td className="border-b border-slate-800 p-4 font-medium text-slate-300">{point.point}</td>
                                    <td className="border-b border-slate-800 p-4 text-slate-300">{point.breed_1_val}</td>
                                    <td className="border-b border-slate-800 p-4 text-slate-300">{point.breed_2_val}</td>
                                    <td className="border-b border-slate-800 p-4">
                                        <span className={`px-2 py-1 rounded text-sm border ${point.winner === page.breed_1 ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' :
                                            point.winner === page.breed_2 ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' :
                                                'bg-slate-800 text-slate-400 border-slate-700'
                                            }`}>
                                            {point.winner === 'tie' ? 'Tie' : point.winner}
                                        </span>
                                        <p className="text-xs text-slate-500 mt-1">{point.note}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Verdict */}
            <section className="mb-12 bg-blue-900/20 p-8 rounded-lg border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">{page.verdict.title}</h2>
                <p className="text-lg mb-6 text-slate-300">{page.verdict.content}</p>
                {page.cta.quiz_anchor && (
                    <div className="text-center">
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary?.quizSlug || 'lifestyle-match-quiz'}`}
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20"
                        >
                            {page.cta.quiz_anchor}
                        </Link>
                    </div>
                )}
            </section>

            {/* FAQ */}
            {page.faq.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-50">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {page.faq.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/30 p-6 rounded-lg shadow-sm border border-slate-800">
                                <h3 className="font-bold text-lg mb-2 text-slate-200">{item.question}</h3>
                                <p className="text-slate-400">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
