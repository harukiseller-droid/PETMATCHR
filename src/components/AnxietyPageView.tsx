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
            <header className="mb-12 text-center bg-purple-50 p-8 rounded-xl">
                {breedSlug && (
                    <div className="mb-4 text-left">
                        <Link href={`/breeds/${breedSlug}`} className="text-purple-600 hover:text-purple-800 font-medium inline-block">
                            &larr; Back to {page.breed} Profile
                        </Link>
                    </div>
                )}
                <h1 className="text-4xl font-bold mb-4">{page.h1}</h1>
                <h2 className="text-2xl text-purple-800 mb-4">{page.hero.title}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{page.hero.subtitle}</p>
            </header>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
                {/* Symptoms */}
                <section>
                    <h3 className="text-2xl font-bold mb-4 text-red-600">Signs of Anxiety</h3>
                    <ul className="space-y-3">
                        {page.symptoms_list.map((symptom, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="mr-2 text-red-500">•</span>
                                {symptom}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Causes */}
                <section>
                    <h3 className="text-2xl font-bold mb-4 text-orange-600">Common Causes</h3>
                    <ul className="space-y-3">
                        {page.causes_list.map((cause, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="mr-2 text-orange-500">•</span>
                                {cause}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Solutions */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-center">Proven Solutions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {page.solutions_list.map((solution, idx) => (
                        <div key={idx} className="border rounded-lg p-6 hover:shadow-lg transition">
                            <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                            <p className="text-gray-600 mb-4">{solution.description}</p>
                            {solution.recommended_product_type && (
                                <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                                    Recommended: {solution.recommended_product_type}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center bg-gray-900 text-white p-12 rounded-xl mb-12">
                <h2 className="text-2xl font-bold mb-6">Need Personalized Help?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {page.cta.quiz_anchor && (
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary?.quizSlug || 'anxiety-level-quiz'}`}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold transition"
                        >
                            {page.cta.quiz_anchor}
                        </Link>
                    )}
                    {page.cta.product_anchor && (
                        <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-bold transition">
                            {page.cta.product_anchor}
                        </button>
                    )}
                </div>
            </section>

            {/* Related Pages */}
            {relatedPages.length > 0 && (
                <section className="border-t border-gray-200 pt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {relatedPages.map(p => (
                            <Link key={p.slug} href={`/${p.page_type === 'breed' ? 'breeds' : p.page_type === 'problem' ? 'problems' : p.page_type}/${p.slug}`} className="block p-4 rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{p.page_type}</span>
                                <h3 className="font-bold text-gray-900 mt-1">{p.title}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
