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
        <div className="min-h-screen bg-page pb-20">
            {/* Hero */}
            <header className="bg-white border-b border-brand-border mb-12">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold mt-2 mb-4 text-brand-navy">{page.h1}</h1>
                    <p className="text-xl text-brand-navy/80 max-w-2xl mx-auto">{page.intro.short_hook}</p>
                    {(page.intro as any).who_this_city_is_great_for && (
                        <p className="mt-4 text-brand-navy/60 max-w-2xl mx-auto font-medium">
                            {(page.intro as any).who_this_city_is_great_for}
                        </p>
                    )}
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Living with dogs here */}
                {living && (
                    <section className="mb-12 bg-brand-navy/5 p-8 rounded-card border border-brand-navy/10">
                        <h2 className="text-2xl font-bold mb-4 text-brand-navy">Living with dogs here</h2>
                        <p className="text-brand-navy/90 mb-3">{living.summary}</p>
                        <div className="grid md:grid-cols-2 gap-6 text-brand-navy/90 text-sm">
                            <div>
                                <h3 className="font-bold mb-2">Climate considerations</h3>
                                <p>{living.climate_considerations}</p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">Housing considerations</h3>
                                <p>{living.housing_considerations}</p>
                            </div>
                        </div>
                        <p className="text-brand-navy/80 mt-4 text-sm font-medium">
                            {living.dog_friendly_score_explained}
                        </p>
                    </section>
                )}

                {/* Cost snapshot */}
                {cost && (
                    <section className="mb-12 bg-white p-8 rounded-card border border-brand-border shadow-card">
                        <h2 className="text-2xl font-bold mb-4 text-brand-navy">Cost snapshot</h2>
                        <p className="text-brand-navy/90 mb-4">{cost.summary}</p>
                        <div className="flex flex-wrap items-baseline gap-6 text-brand-navy">
                            <div>
                                <div className="text-sm text-brand-navy/60 uppercase tracking-wide mb-1 font-bold">Vet cost level</div>
                                <div className="text-lg font-bold capitalize">{cost.vet_cost_level}</div>
                            </div>
                            <div>
                                <div className="text-sm text-brand-navy/60 uppercase tracking-wide mb-1 font-bold">
                                    Example monthly range
                                </div>
                                <div className="text-lg font-bold">
                                    ${cost.example_monthly_ranges_usd[0]} – ${cost.example_monthly_ranges_usd[1]}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Best-fit breeds & caution breeds */}
                <section className="mb-12 grid md:grid-cols-2 gap-8">
                    {page.best_fit_breeds_section && (
                        <div className="border border-brand-border bg-white rounded-card p-6 shadow-card">
                            <h2 className="text-2xl font-bold mb-3 text-brand-navy">Breeds that thrive here</h2>
                            <p className="text-brand-navy/90 mb-3">{page.best_fit_breeds_section.summary}</p>
                            <ul className="space-y-2">
                                {page.best_fit_breeds_section.breed_slugs.map((slug) => (
                                    <li key={slug}>
                                        <Link
                                            href={`/breeds/${slug}`}
                                            className="text-brand-teal hover:text-brand-teal/80 font-bold"
                                        >
                                            {slug.replace(/-/g, ' ')}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {page.breeds_to_be_cautious_with_section && (
                        <div className="border border-brand-border bg-white rounded-card p-6 shadow-card">
                            <h2 className="text-2xl font-bold mb-3 text-brand-navy">Breeds to think twice about</h2>
                            <p className="text-brand-navy/90 mb-3">{page.breeds_to_be_cautious_with_section.summary}</p>
                            <ul className="space-y-2">
                                {page.breeds_to_be_cautious_with_section.breed_slugs.map((slug) => (
                                    <li key={slug}>
                                        <Link
                                            href={`/breeds/${slug}`}
                                            className="text-brand-red hover:text-brand-red/80 font-bold"
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
                    <section className="mb-12 bg-white p-8 rounded-card border border-brand-border shadow-card">
                        <h2 className="text-2xl font-bold mb-3 text-brand-navy">{page.case_study.title}</h2>
                        <p className="text-brand-navy/90 mb-3 whitespace-pre-line">{page.case_study.story}</p>
                        <p className="text-sm font-bold text-brand-navy">
                            Key takeaway: {page.case_study.key_takeaway}
                        </p>
                    </section>
                )}

                {/* FAQ */}
                {page.faq && page.faq.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-brand-navy">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {page.faq.map((item, i) => (
                                <details key={i} className="bg-white rounded-card border border-brand-border p-4">
                                    <summary className="font-bold text-brand-navy cursor-pointer">
                                        {item.question}
                                    </summary>
                                    <p className="mt-2 text-brand-navy/90">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* Quick answers */}
                {page.quick_answers && page.quick_answers.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-brand-navy">Quick answers</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {page.quick_answers.map((qa, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-4 rounded-card border border-brand-border hover:border-brand-teal/50 transition duration-300 shadow-card"
                                >
                                    <div className="text-xs font-bold text-brand-teal uppercase mb-1">
                                        {qa.category}
                                    </div>
                                    <h3 className="text-sm font-bold text-brand-navy mb-1">{qa.question}</h3>
                                    <p className="text-sm text-brand-navy/90">{qa.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                    <section className="text-center py-12 border-t border-brand-border">
                        <h2 className="text-2xl font-bold mb-6 text-brand-navy">{ctaConfig.quizPrimary.label}</h2>
                        <p className="text-brand-navy/90 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                            className="inline-block bg-brand-teal text-white px-8 py-3 rounded-full font-bold hover:brightness-95 transition shadow-md"
                        >
                            Start quiz
                        </Link>
                    </section>
                )}
            </div>
        </div>
    );
}

