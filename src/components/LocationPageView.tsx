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
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Hero */}
            <header className="bg-white border-b border-neutral-200 mb-12">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mt-2 mb-4 text-neutral-900">{page.h1}</h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">{page.intro.short_hook}</p>
                    {(page.intro as any).who_this_city_is_great_for && (
                        <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
                            {(page.intro as any).who_this_city_is_great_for}
                        </p>
                    )}
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Living with dogs here */}
                {living && (
                    <section className="mb-12 bg-secondary-50 p-8 rounded-lg border border-secondary-100">
                        <h2 className="text-2xl font-bold mb-4 text-secondary-900">Living with dogs here</h2>
                        <p className="text-secondary-800 mb-3">{living.summary}</p>
                        <div className="grid md:grid-cols-2 gap-6 text-secondary-800 text-sm">
                            <div>
                                <h3 className="font-semibold mb-2">Climate considerations</h3>
                                <p>{living.climate_considerations}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Housing considerations</h3>
                                <p>{living.housing_considerations}</p>
                            </div>
                        </div>
                        <p className="text-secondary-700 mt-4 text-sm">
                            {living.dog_friendly_score_explained}
                        </p>
                    </section>
                )}

                {/* Cost snapshot */}
                {cost && (
                    <section className="mb-12 bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cost snapshot</h2>
                        <p className="text-neutral-600 mb-4">{cost.summary}</p>
                        <div className="flex flex-wrap items-baseline gap-6 text-neutral-900">
                            <div>
                                <div className="text-sm text-neutral-500 uppercase tracking-wide mb-1">Vet cost level</div>
                                <div className="text-lg font-semibold capitalize">{cost.vet_cost_level}</div>
                            </div>
                            <div>
                                <div className="text-sm text-neutral-500 uppercase tracking-wide mb-1">
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
                        <div className="border border-neutral-200 bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold mb-3 text-neutral-900">Breeds that thrive here</h2>
                            <p className="text-neutral-600 mb-3">{page.best_fit_breeds_section.summary}</p>
                            <ul className="space-y-2">
                                {page.best_fit_breeds_section.breed_slugs.map((slug) => (
                                    <li key={slug}>
                                        <Link
                                            href={`/breeds/${slug}`}
                                            className="text-secondary-600 hover:text-secondary-500 font-medium"
                                        >
                                            {slug.replace(/-/g, ' ')}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {page.breeds_to_be_cautious_with_section && (
                        <div className="border border-neutral-200 bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold mb-3 text-neutral-900">Breeds to think twice about</h2>
                            <p className="text-neutral-600 mb-3">{page.breeds_to_be_cautious_with_section.summary}</p>
                            <ul className="space-y-2">
                                {page.breeds_to_be_cautious_with_section.breed_slugs.map((slug) => (
                                    <li key={slug}>
                                        <Link
                                            href={`/breeds/${slug}`}
                                            className="text-red-600 hover:text-red-500 font-medium"
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
                    <section className="mb-12 bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
                        <h2 className="text-2xl font-bold mb-3 text-neutral-900">{page.case_study.title}</h2>
                        <p className="text-neutral-600 mb-3 whitespace-pre-line">{page.case_study.story}</p>
                        <p className="text-sm font-semibold text-neutral-900">
                            Key takeaway: {page.case_study.key_takeaway}
                        </p>
                    </section>
                )}

                {/* FAQ */}
                {page.faq && page.faq.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-900">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {page.faq.map((item, i) => (
                                <details key={i} className="bg-white rounded-xl border border-neutral-200 p-4">
                                    <summary className="font-medium text-neutral-900 cursor-pointer">
                                        {item.question}
                                    </summary>
                                    <p className="mt-2 text-neutral-600">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* Quick answers */}
                {page.quick_answers && page.quick_answers.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-900">Quick answers</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {page.quick_answers.map((qa, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-4 rounded-xl border border-neutral-200 hover:border-primary-500/50 transition duration-300 shadow-sm"
                                >
                                    <div className="text-xs font-semibold text-primary-600 uppercase mb-1">
                                        {qa.category}
                                    </div>
                                    <h3 className="text-sm font-bold text-neutral-900 mb-1">{qa.question}</h3>
                                    <p className="text-sm text-neutral-600">{qa.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                    <section className="text-center py-12 border-t border-neutral-200">
                        <h2 className="text-2xl font-bold mb-6 text-neutral-900">{ctaConfig.quizPrimary.label}</h2>
                        <p className="text-neutral-600 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-500 transition shadow-lg shadow-primary-900/20"
                        >
                            Start quiz
                        </Link>
                    </section>
                )}
            </div>
        </div>
    );
}

