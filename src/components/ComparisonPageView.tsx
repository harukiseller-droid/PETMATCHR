import React from 'react';
import { ComparisonV7Page, CTAConfig } from '@/lib/types';
import Link from 'next/link';

interface Props {
    page: ComparisonV7Page;
    ctaConfig: CTAConfig | null;
}

export default function ComparisonPageView({ page, ctaConfig }: Props) {
    const [leftSlug, rightSlug] = page.slug.split('-vs-');
    const leftLabel = leftSlug?.replace(/-/g, ' ') ?? 'Breed A';
    const rightLabel = rightSlug?.replace(/-/g, ' ') ?? 'Breed B';

    const rows = page.side_by_side_table?.rows ?? [];

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Hero */}
            <header className="bg-white border-b border-neutral-200 mb-12">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center gap-4 mb-6 text-sm">
                        <Link href={`/breeds/${leftSlug}`} className="text-primary-600 hover:text-primary-500 font-medium transition-colors">
                            &larr; Back to {leftLabel}
                        </Link>
                        <span className="text-neutral-400">|</span>
                        <Link href={`/breeds/${rightSlug}`} className="text-primary-600 hover:text-primary-500 font-medium transition-colors">
                            Back to {rightLabel} &rarr;
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-neutral-900">{page.h1}</h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">{page.intro.short_hook}</p>
                    {(page.intro as any).who_is_asking_this && (
                        <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
                            {(page.intro as any).who_is_asking_this}
                        </p>
                    )}
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Summary verdict */}
                {page.summary_verdict && (
                    <section className="mb-12 bg-primary-50 p-8 rounded-lg border border-primary-100">
                        <h2 className="text-2xl font-bold mb-4 text-primary-900">Quick verdict</h2>
                        <p className="text-lg mb-4 text-primary-800">{page.summary_verdict.one_sentence_verdict}</p>
                        <div className="grid md:grid-cols-2 gap-6 text-primary-800 text-sm">
                            <div>
                                <h3 className="font-semibold mb-2">Choose {leftLabel} if...</h3>
                                <p>{page.summary_verdict.when_to_pick_a}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Choose {rightLabel} if...</h3>
                                <p>{page.summary_verdict.when_to_pick_b}</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Comparison Table */}
                {rows.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Head-to-head comparison</h2>
                        <div className="overflow-x-auto rounded-xl border border-neutral-200 shadow-sm">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50">
                                        <th className="border-b border-neutral-200 p-4 text-left text-neutral-500">Feature</th>
                                        <th className="border-b border-neutral-200 p-4 text-left text-neutral-900">{leftLabel}</th>
                                        <th className="border-b border-neutral-200 p-4 text-left text-neutral-900">{rightLabel}</th>
                                        <th className="border-b border-neutral-200 p-4 text-left text-neutral-500">Winner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, idx) => (
                                        <tr
                                            key={idx}
                                            className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                                        >
                                            <td className="border-b border-neutral-200 p-4 font-medium text-neutral-700">
                                                {row.label}
                                            </td>
                                            <td className="border-b border-neutral-200 p-4 text-neutral-600">
                                                {row.breed_a_value}
                                            </td>
                                            <td className="border-b border-neutral-200 p-4 text-neutral-600">
                                                {row.breed_b_value}
                                            </td>
                                            <td className="border-b border-neutral-200 p-4">
                                                <span
                                                    className={`px-2 py-1 rounded text-sm border ${row.who_wins === 'a'
                                                            ? 'bg-primary-50 text-primary-700 border-primary-200'
                                                            : row.who_wins === 'b'
                                                                ? 'bg-secondary-50 text-secondary-700 border-secondary-200'
                                                                : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                                                        }`}
                                                >
                                                    {row.who_wins === 'tie'
                                                        ? 'Tie'
                                                        : row.who_wins === 'a'
                                                            ? leftLabel
                                                            : rightLabel}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Deep dive sections */}
                {page.deep_dive_sections && page.deep_dive_sections.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Deep dive</h2>
                        <div className="space-y-6">
                            {page.deep_dive_sections.map((section) => (
                                <div
                                    key={section.id}
                                    className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-neutral-900">{section.title}</h3>
                                    <p className="text-neutral-600 whitespace-pre-line">{section.content}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* FAQ */}
                {page.faq.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Frequently asked questions</h2>
                        <div className="space-y-6">
                            {page.faq.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
                                >
                                    <h3 className="font-bold text-lg mb-2 text-neutral-900">{item.question}</h3>
                                    <p className="text-neutral-600">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                    <section className="mb-12 bg-primary-50 p-8 rounded-lg border border-primary-100 text-center">
                        <h2 className="text-2xl font-bold mb-4 text-primary-900">{ctaConfig.quizPrimary.label}</h2>
                        <p className="text-lg mb-6 text-primary-800">{ctaConfig.quizPrimary.description}</p>
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-500 transition shadow-lg shadow-primary-900/20"
                        >
                            Take quiz
                        </Link>
                    </section>
                )}
            </div>
        </div>
    );
}

