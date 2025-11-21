import React from 'react';
import { AnxietyPage, CTAConfig, PageIndexEntry } from '@/lib/types';
import Link from 'next/link';

interface Props {
    page: AnxietyPage;
    ctaConfig: CTAConfig;
    breedSlug?: string;
    relatedPages?: PageIndexEntry[];
}

export default function AnxietyPageView({ page, ctaConfig, breedSlug, relatedPages = [] }: Props) {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero */}
            <header className="mb-12 text-center bg-slate-900/50 border border-slate-800 p-8 rounded-xl backdrop-blur-sm">
                {breedSlug && (
                    <div className="mb-4 text-left">
                        <Link href={`/breeds/${breedSlug}`} className="text-purple-400 hover:text-purple-300 font-medium inline-block transition-colors">
                            &larr; Back to {page.breed} Profile
                        </Link>
                    </div>
                )}
                <h1 className="text-4xl font-bold mb-4 text-slate-50">{page.h1}</h1>
                <h2 className="text-2xl text-purple-300 mb-4">{page.hero.title}</h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">{page.hero.subtitle}</p>
            </header>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
                {/* Symptoms */}
                <section>
                    <h3 className="text-2xl font-bold mb-4 text-red-400">Signs of Anxiety</h3>
                    <ul className="space-y-3">
                        {page.symptoms_list.map((symptom, idx) => (
                            <li key={idx} className="flex items-start text-slate-300">
                                <span className="mr-2 text-red-500">•</span>
                                {symptom}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Causes */}
                <section>
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Common Causes</h3>
                    <ul className="space-y-3">
                        {page.causes_list.map((cause, idx) => (
                            <li key={idx} className="flex items-start text-slate-300">
                                <span className="mr-2 text-orange-500">•</span>
                                {cause}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Solutions */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-center text-slate-50">Proven Solutions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {page.solutions_list.map((solution, idx) => (
                        <div key={idx} className="border border-slate-800 bg-slate-900/30 rounded-lg p-6 hover:bg-slate-900/50 hover:border-purple-500/30 transition duration-300">
                            <h3 className="text-xl font-bold mb-3 text-slate-100">{solution.title}</h3>
                            <p className="text-slate-400 mb-4">{solution.description}</p>
                            {solution.recommended_product_type && (
                                <span className="inline-block bg-slate-800 text-purple-300 px-3 py-1 rounded text-sm border border-slate-700">
                                    Recommended: {solution.recommended_product_type}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center bg-slate-900 border border-slate-800 text-white p-12 rounded-xl mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 pointer-events-none"></div>
                <h2 className="text-2xl font-bold mb-6 relative z-10">Need Personalized Help?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                    {page.cta.quiz_anchor && (
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary?.quizSlug || 'anxiety-level-quiz'}`}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg shadow-purple-900/20"
                        >
                            {page.cta.quiz_anchor}
                        </Link>
                    )}
                    {page.cta.product_anchor && (
                        <button className="bg-transparent border-2 border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-slate-200 px-8 py-3 rounded-lg font-bold transition">
                            {page.cta.product_anchor}
                        </button>
                    )}
                </div>
            </section>

            {/* Related Pages */}
            {relatedPages.length > 0 && (
                <section className="border-t border-slate-800 pt-12">
                    <h2 className="text-2xl font-bold text-slate-50 mb-6">Related Guides</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {relatedPages.map(p => (
                            <Link key={p.slug} href={`/${p.page_type === 'breed' ? 'breeds' : p.page_type === 'problem' ? 'problems' : p.page_type}/${p.slug}`} className="block p-4 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 hover:border-purple-500/50 hover:shadow-sm transition-all group">
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider group-hover:text-purple-300">{p.page_type}</span>
                                <h3 className="font-bold text-slate-200 mt-1 group-hover:text-white">{p.title}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
