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
        <div className="min-h-screen bg-page pb-20">
            {/* Hero */}
            <header className="bg-white border-b border-brand-border mb-12">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center gap-4 mb-6 text-sm">
                        <Link href={`/breeds/${leftSlug}`} className="text-brand-teal hover:text-brand-teal/80 font-bold transition-colors">
                            &larr; Back to {leftLabel}
                        </Link>
                        <span className="text-brand-border">|</span>
                        <Link href={`/breeds/${rightSlug}`} className="text-brand-teal hover:text-brand-teal/80 font-bold transition-colors">
                            Back to {rightLabel} &rarr;
                        </Link>
                    </div>
                    <h1 className="text-4xl font-extrabold mb-4 text-brand-navy">{page.h1}</h1>
                    <p className="text-xl text-brand-navy/80 max-w-2xl mx-auto">{page.intro.short_hook}</p>
                    {(page.intro as any).who_is_asking_this && (
                        <p className="mt-4 text-brand-navy/60 max-w-2xl mx-auto font-medium">
                            {(page.intro as any).who_is_asking_this}
                        </p>
                    )}
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Summary verdict */}
                {page.summary_verdict && (
                    <section className="mb-12 bg-brand-gray p-8 rounded-card border border-brand-border">
                        <h2 className="text-2xl font-bold mb-4 text-brand-navy">Quick verdict</h2>
                        <p className="text-lg mb-4 text-brand-navy/90">{page.summary_verdict.one_sentence_verdict}</p>
                        <div className="grid md:grid-cols-2 gap-6 text-brand-navy text-sm font-medium">
                            <div>
                                <h3 className="font-bold mb-2">Choose {leftLabel} if...</h3>
                                <p>{page.summary_verdict.when_to_pick_a}</p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">Choose {rightLabel} if...</h3>
                                <p>{page.summary_verdict.when_to_pick_b}</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Comparison Table */}
                {rows.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-brand-navy">Head-to-head comparison</h2>
                        <div className="overflow-x-auto rounded-card border border-brand-border shadow-card">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-brand-gray">
                                        <th className="border-b border-brand-border p-4 text-left text-brand-navy/60 font-bold">Feature</th>
                                        <th className="border-b border-brand-border p-4 text-left text-brand-navy font-bold">{leftLabel}</th>
                                        <th className="border-b border-brand-border p-4 text-left text-brand-navy font-bold">{rightLabel}</th>
                                        <th className="border-b border-brand-border p-4 text-left text-brand-navy/60 font-bold">Winner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, idx) => (
                                        <tr
                                            key={idx}
                                            className={idx % 2 === 0 ? 'bg-white' : 'bg-brand-gray/30'}
                                        >
                                            <td className="border-b border-brand-border p-4 font-bold text-brand-navy">
                                                {row.label}
                                            </td>
                                            <td className="border-b border-brand-border p-4 text-brand-navy/80">
                                                {row.breed_a_value}
                                            </td>
                                            <td className="border-b border-brand-border p-4 text-brand-navy/80">
                                                {row.breed_b_value}
                                            </td>
                                            <td className="border-b border-brand-border p-4">
                                                <span
                                                    className={`px-2 py-1 rounded text-sm font-bold border ${row.who_wins === 'a'
                                                        ? 'bg-brand-teal/10 text-brand-teal border-brand-teal/20'
                                                        : row.who_wins === 'b'
                                                            ? 'bg-brand-navy/10 text-brand-navy border-brand-navy/20'
                                                            : 'bg-brand-gray text-brand-navy/60 border-brand-border'
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
                        <h2 className="text-2xl font-bold mb-6 text-brand-navy">Deep dive</h2>
                        <div className="space-y-6">
                            {page.deep_dive_sections.map((section) => (
                                <div
                                    key={section.id}
                                    className="bg-white p-6 rounded-card shadow-card border border-brand-border"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-brand-navy">{section.title}</h3>
                                    <p className="text-brand-navy/90 whitespace-pre-line">{section.content}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* FAQ */}
                {page.faq.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-brand-navy">Frequently asked questions</h2>
                        <div className="space-y-6">
                            {page.faq.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-6 rounded-card shadow-card border border-brand-border"
                                >
                                    <h3 className="font-bold text-lg mb-2 text-brand-navy">{item.question}</h3>
                                    <p className="text-brand-navy/90">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                    <section className="mb-12 bg-brand-teal rounded-card p-8 border border-brand-teal/20 text-center shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-white">{ctaConfig.quizPrimary.label}</h2>
                        <p className="text-lg mb-6 text-white/90">{ctaConfig.quizPrimary.description}</p>
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                            className="inline-block bg-white text-brand-teal px-8 py-3 rounded-full font-bold hover:brightness-95 transition shadow-md"
                        >
                            Take quiz
                        </Link>
                    </section>
                )}
            </div>
        </div>
    );
}

