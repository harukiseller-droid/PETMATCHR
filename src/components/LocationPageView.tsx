import React from 'react';
import { LocationV7Page, CTAConfig } from '@/lib/types';
import Link from 'next/link';

interface Props {
    page: LocationV7Page;
    ctaConfig: CTAConfig | null;
}

export default function LocationPageView({ page, ctaConfig }: Props) {
    const living = page.living_with_dogs_here;
    const cost = page.cost_snapshot;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero */}
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mt-2 mb-4 text-slate-50">{page.h1}</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">{page.intro.short_hook}</p>
                {(page.intro as any).who_this_city_is_great_for && (
                    <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
                        {(page.intro as any).who_this_city_is_great_for}
                    </p>
                )}
            </header>

            {/* Living with dogs here */}
            {living && (
                <section className="mb-12 bg-emerald-900/20 p-8 rounded-lg border border-emerald-500/20">
                    <h2 className="text-2xl font-bold mb-4 text-emerald-400">Living with dogs here</h2>
                    <p className="text-slate-300 mb-3">{living.summary}</p>
                    <div className="grid md:grid-cols-2 gap-6 text-slate-200 text-sm">
                        <div>
                            <h3 className="font-semibold mb-2">Climate considerations</h3>
                            <p>{living.climate_considerations}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Housing considerations</h3>
                            <p>{living.housing_considerations}</p>
                        </div>
                    </div>
                    <p className="text-slate-300 mt-4 text-sm">
                        {living.dog_friendly_score_explained}
                    </p>
                </section>
            )}

            {/* Cost snapshot */}
            {cost && (
                <section className="mb-12 bg-slate-900/30 p-8 rounded-lg border border-slate-800">
                    <h2 className="text-2xl font-bold mb-4 text-slate-50">Cost snapshot</h2>
                    <p className="text-slate-300 mb-4">{cost.summary}</p>
                    <div className="flex flex-wrap items-baseline gap-6 text-slate-200">
                        <div>
                            <div className="text-sm text-slate-400 uppercase tracking-wide mb-1">Vet cost level</div>
                            <div className="text-lg font-semibold capitalize">{cost.vet_cost_level}</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-400 uppercase tracking-wide mb-1">
                                Example monthly range
                            </div>
                            <div className="text-lg font-semibold">
                                ${cost.example_monthly_ranges_usd[0]} – ${cost.example_monthly_ranges_usd[1]}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Best-fit breeds & caution breeds */}
            <section className="mb-12 grid md:grid-cols-2 gap-8">
                {page.best_fit_breeds_section && (
                    <div className="border border-slate-800 bg-slate-900/30 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-3 text-slate-50">Breeds that thrive here</h2>
                        <p className="text-slate-300 mb-3">{page.best_fit_breeds_section.summary}</p>
                        <ul className="space-y-2">
                            {page.best_fit_breeds_section.breed_slugs.map((slug) => (
                                <li key={slug}>
                                    <Link
                                        href={`/breeds/${slug}`}
                                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                                    >
                                        {slug.replace(/-/g, ' ')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {page.breeds_to_be_cautious_with_section && (
                    <div className="border border-slate-800 bg-slate-900/30 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-3 text-slate-50">Breeds to think twice about</h2>
                        <p className="text-slate-300 mb-3">{page.breeds_to_be_cautious_with_section.summary}</p>
                        <ul className="space-y-2">
                            {page.breeds_to_be_cautious_with_section.breed_slugs.map((slug) => (
                                <li key={slug}>
                                    <Link
                                        href={`/breeds/${slug}`}
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        {slug.replace(/-/g, ' ')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            {/* Case study */}
            {page.case_study && (
                <section className="mb-12 bg-slate-900/40 p-8 rounded-lg border border-slate-800">
                    <h2 className="text-2xl font-bold mb-3 text-slate-50">{page.case_study.title}</h2>
                    <p className="text-slate-300 mb-3 whitespace-pre-line">{page.case_study.story}</p>
                    <p className="text-sm font-semibold text-slate-200">
                        Key takeaway: {page.case_study.key_takeaway}
                    </p>
                </section>
            )}

            {/* FAQ */}
            {page.faq && page.faq.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-slate-50">Frequently asked questions</h2>
                    <div className="space-y-4">
                        {page.faq.map((item, i) => (
                            <details key={i} className="bg-slate-900/40 rounded-xl border border-slate-800 p-4">
                                <summary className="font-medium text-slate-100 cursor-pointer">
                                    {item.question}
                                </summary>
                                <p className="mt-2 text-slate-300">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
            )}

            {/* Quick answers */}
            {page.quick_answers && page.quick_answers.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-slate-50">Quick answers</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {page.quick_answers.map((qa, i) => (
                            <div
                                key={i}
                                className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 hover:bg-slate-900/60 hover:border-indigo-500/50 transition duration-300"
                            >
                                <div className="text-xs font-semibold text-indigo-400 uppercase mb-1">
                                    {qa.category}
                                </div>
                                <h3 className="text-sm font-bold text-slate-100 mb-1">{qa.question}</h3>
                                <p className="text-sm text-slate-300">{qa.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                <section className="text-center py-12 border-t border-slate-800">
                    <h2 className="text-2xl font-bold mb-6 text-slate-50">{ctaConfig.quizPrimary.label}</h2>
                    <p className="text-slate-300 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                    <Link
                        href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20"
                    >
                        Start quiz
                    </Link>
                </section>
            )}
        </div>
    );
}

