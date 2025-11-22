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
        <div className="container mx-auto px-4 py-8">
            {/* Hero */}
            <header className="mb-12 text-center">
                <div className="flex justify-center gap-4 mb-6 text-sm">
                    <Link href={`/breeds/${leftSlug}`} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        &larr; Back to {leftLabel}
                    </Link>
                    <span className="text-slate-600">|</span>
                    <Link href={`/breeds/${rightSlug}`} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Back to {rightLabel} &rarr;
                    </Link>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-slate-50">{page.h1}</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">{page.intro.short_hook}</p>
                {(page.intro as any).who_is_asking_this && (
                    <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                        {(page.intro as any).who_is_asking_this}
                    </p>
                )}
            </header>

            {/* Summary verdict */}
            {page.summary_verdict && (
                <section className="mb-12 bg-blue-900/20 p-8 rounded-lg border border-blue-500/20">
                    <h2 className="text-2xl font-bold mb-4 text-blue-400">Quick verdict</h2>
                    <p className="text-lg mb-4 text-slate-200">{page.summary_verdict.one_sentence_verdict}</p>
                    <div className="grid md:grid-cols-2 gap-6 text-slate-200 text-sm">
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
                    <h2 className="text-2xl font-bold mb-6 text-slate-50">Head-to-head comparison</h2>
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-900/50">
                                    <th className="border-b border-slate-800 p-4 text-left text-slate-400">Feature</th>
                                    <th className="border-b border-slate-800 p-4 text-left text-slate-200">{leftLabel}</th>
                                    <th className="border-b border-slate-800 p-4 text-left text-slate-200">{rightLabel}</th>
                                    <th className="border-b border-slate-800 p-4 text-left text-slate-400">Winner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={idx % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-900/40'}
                                    >
                                        <td className="border-b border-slate-800 p-4 font-medium text-slate-300">
                                            {row.label}
                                        </td>
                                        <td className="border-b border-slate-800 p-4 text-slate-300">
                                            {row.breed_a_value}
                                        </td>
                                        <td className="border-b border-slate-800 p-4 text-slate-300">
                                            {row.breed_b_value}
                                        </td>
                                        <td className="border-b border-slate-800 p-4">
                                            <span
                                                className={`px-2 py-1 rounded text-sm border ${
                                                    row.who_wins === 'a'
                                                        ? 'bg-blue-900/30 text-blue-400 border-blue-500/30'
                                                        : row.who_wins === 'b'
                                                        ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30'
                                                        : 'bg-slate-800 text-slate-400 border-slate-700'
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
                    <h2 className="text-2xl font-bold mb-6 text-slate-50">Deep dive</h2>
                    <div className="space-y-6">
                        {page.deep_dive_sections.map((section) => (
                            <div
                                key={section.id}
                                className="bg-slate-900/30 p-6 rounded-lg shadow-sm border border-slate-800"
                            >
                                <h3 className="text-xl font-bold mb-2 text-slate-200">{section.title}</h3>
                                <p className="text-slate-300 whitespace-pre-line">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQ */}
            {page.faq.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-50">Frequently asked questions</h2>
                    <div className="space-y-6">
                        {page.faq.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-900/30 p-6 rounded-lg shadow-sm border border-slate-800"
                            >
                                <h3 className="font-bold text-lg mb-2 text-slate-200">{item.question}</h3>
                                <p className="text-slate-400">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                <section className="mb-12 bg-blue-900/20 p-8 rounded-lg border border-blue-500/20 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-blue-400">{ctaConfig.quizPrimary.label}</h2>
                    <p className="text-lg mb-6 text-slate-200">{ctaConfig.quizPrimary.description}</p>
                    <Link
                        href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20"
                    >
                        Take quiz
                    </Link>
                </section>
            )}
        </div>
    );
}

