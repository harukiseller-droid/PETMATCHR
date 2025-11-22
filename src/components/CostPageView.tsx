import React from "react";
import { CostV7Page, CTAConfig, PageIndexEntry } from "@/lib/types";
import Link from "next/link";

interface CostPageViewProps {
    page: CostV7Page;
    ctaConfig: CTAConfig | null;
    breedSlug?: string;
    relatedPages?: PageIndexEntry[];
}

export default function CostPageView({ page, ctaConfig, breedSlug, relatedPages = [] }: CostPageViewProps) {
    const cost = page.cost_breakdown;

    const oneTimeItems = cost?.line_items.filter((i) => i.frequency === "one_time") ?? [];
    const monthlyItems = cost?.line_items.filter((i) => i.frequency === "monthly") ?? [];

    return (
        <main className="min-h-screen bg-page pb-20">
            {/* Hero */}
            <div className="bg-white border-b border-brand-border">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    {breedSlug && (
                        <Link
                            href={`/breeds/${breedSlug}`}
                            className="text-brand-teal hover:text-brand-teal/80 font-bold mb-4 inline-block transition-colors"
                        >
                            &larr; Back to breed profile
                        </Link>
                    )}
                    <h1 className="text-4xl font-extrabold text-brand-navy tracking-tight sm:text-5xl mb-4">
                        {page.h1}
                    </h1>
                    <p className="text-xl text-brand-navy/80 max-w-2xl">
                        {page.intro.short_hook}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">

                    {/* Summary Card */}
                    {cost && (
                        <section className="bg-white p-6 rounded-card shadow-card border border-brand-border">
                            <h2 className="text-2xl font-bold text-brand-navy mb-6">Cost summary</h2>
                            <p className="text-brand-navy/90 mb-4">{cost.summary}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-brand-teal/5 p-4 rounded-lg border border-brand-teal/20">
                                    <div className="text-sm text-brand-teal font-bold uppercase tracking-wide">
                                        First year
                                    </div>
                                    <div className="text-3xl font-bold text-brand-navy mt-1">
                                        ${cost.first_year_range_usd[0]} - ${cost.first_year_range_usd[1]}
                                    </div>
                                </div>
                                <div className="bg-brand-navy/5 p-4 rounded-lg border border-brand-navy/10">
                                    <div className="text-sm text-brand-navy font-bold uppercase tracking-wide">
                                        Ongoing monthly
                                    </div>
                                    <div className="text-3xl font-bold text-brand-navy mt-1">
                                        ${cost.monthly_range_usd[0]} - ${cost.monthly_range_usd[1]}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* First Year Breakdown */}
                    {oneTimeItems.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">First-year expenses</h2>
                            <div className="bg-white rounded-card shadow-card border border-brand-border overflow-hidden">
                                <table className="min-w-full divide-y divide-brand-border">
                                    <thead className="bg-brand-gray">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-navy/90 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-bold text-brand-navy/90 uppercase tracking-wider">
                                                Cost range
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-border">
                                        {oneTimeItems.map((item, i) => (
                                            <tr key={i} className="hover:bg-brand-gray/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-bold text-brand-navy">{item.label}</div>
                                                    <div className="text-sm text-brand-navy/90">{item.notes}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm text-brand-navy/80 whitespace-nowrap font-medium">
                                                    ${item.estimated_range_usd[0]} - ${item.estimated_range_usd[1]}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* Monthly Breakdown */}
                    {monthlyItems.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Monthly expenses</h2>
                            <div className="bg-white rounded-card shadow-card border border-brand-border overflow-hidden">
                                <table className="min-w-full divide-y divide-brand-border">
                                    <thead className="bg-brand-gray">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-navy/90 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-bold text-brand-navy/90 uppercase tracking-wider">
                                                Cost range
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-border">
                                        {monthlyItems.map((item, i) => (
                                            <tr key={i} className="hover:bg-brand-gray/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-bold text-brand-navy">{item.label}</div>
                                                    <div className="text-sm text-brand-navy/90">{item.notes}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm text-brand-navy/80 whitespace-nowrap font-medium">
                                                    ${item.estimated_range_usd[0]} - ${item.estimated_range_usd[1]}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* Insurance Section */}
                    {page.insurance_section && (
                        <section className="bg-brand-gray p-6 rounded-card border border-brand-border">
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Is pet insurance worth it?</h2>
                            <p className="text-brand-navy/90 mb-4">{page.insurance_section.summary}</p>
                            <div className="grid gap-4 md:grid-cols-2 mb-6 text-sm text-brand-navy font-medium">
                                <div>
                                    <h3 className="font-bold mb-2">When insurance makes sense</h3>
                                    <p>{page.insurance_section.when_insurance_makes_sense}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">When you might skip it</h3>
                                    <p>{page.insurance_section.when_you_might_skip_it}</p>
                                </div>
                            </div>

                            {ctaConfig?.offerPrimary && ctaConfig.offerPrimary.offerType === "insurance" && (
                                <div className="text-center">
                                    <a
                                        href={ctaConfig.offerPrimary.deepLinkPlaceholder}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-brand-teal text-white font-bold py-3 px-8 rounded-full hover:brightness-95 transition-colors w-full md:w-auto shadow-md"
                                    >
                                        {ctaConfig.offerPrimary.label}
                                    </a>
                                    <p className="text-sm text-brand-navy/80 mt-2 font-medium">
                                        {ctaConfig.offerPrimary.description}
                                    </p>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Saving Tips */}
                    {page.saving_tips && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Ways to save without cutting essentials</h2>
                            <p className="text-brand-navy/90 mb-3">{page.saving_tips.summary}</p>
                            <ul className="list-disc pl-5 text-brand-navy/90 space-y-2">
                                {page.saving_tips.tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* FAQ */}
                    {page.faq && page.faq.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Frequently asked questions</h2>
                            <div className="space-y-4">
                                {page.faq.map((item, idx) => (
                                    <details key={idx} className="bg-white rounded-card border border-brand-border p-4">
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
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Quick answers</h2>
                            <div className="grid gap-4">
                                {page.quick_answers.map((qa, i) => (
                                    <div key={i} className="bg-white p-4 rounded-card border border-brand-border shadow-sm">
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

                    {/* Related Pages */}
                    {relatedPages.length > 0 && (
                        <section className="border-t border-brand-border pt-12">
                            <h2 className="text-2xl font-bold text-brand-navy mb-6">Related guides</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {relatedPages.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/${p.page_type === "breed" ? "breeds" : p.page_type === "problem" ? "problems" : p.page_type}/${p.slug}`}
                                        className="block p-4 rounded-card border border-brand-border bg-white hover:border-brand-teal hover:shadow-card transition-all group"
                                    >
                                        <span className="text-xs font-bold text-brand-teal uppercase tracking-wider group-hover:text-brand-teal/80">
                                            {p.page_type}
                                        </span>
                                        <h3 className="font-bold text-brand-navy mt-1">
                                            {p.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Quiz CTA */}
                    {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                        <div className="bg-brand-teal p-6 rounded-card text-white shadow-lg border border-brand-teal/20">
                            <h3 className="text-xl font-bold mb-2">{ctaConfig.quizPrimary.label}</h3>
                            <p className="text-white/90 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                            <Link
                                href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                                className="block w-full bg-white text-brand-teal text-center font-bold py-3 rounded-full hover:brightness-95 transition-colors shadow-md"
                            >
                                Start quiz
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

