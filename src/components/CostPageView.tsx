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
        <main className="min-h-screen bg-neutral-50 pb-20">
            {/* Hero */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    {breedSlug && (
                        <Link
                            href={`/breeds/${breedSlug}`}
                            className="text-primary-600 hover:text-primary-500 font-medium mb-4 inline-block transition-colors"
                        >
                            &larr; Back to breed profile
                        </Link>
                    )}
                    <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl mb-4">
                        {page.h1}
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl">
                        {page.intro.short_hook}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">

                    {/* Summary Card */}
                    {cost && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Cost summary</h2>
                            <p className="text-neutral-600 mb-4">{cost.summary}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                                    <div className="text-sm text-primary-700 font-semibold uppercase tracking-wide">
                                        First year
                                    </div>
                                    <div className="text-3xl font-bold text-primary-900 mt-1">
                                        ${cost.first_year_range_usd[0]} - ${cost.first_year_range_usd[1]}
                                    </div>
                                </div>
                                <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-100">
                                    <div className="text-sm text-secondary-700 font-semibold uppercase tracking-wide">
                                        Ongoing monthly
                                    </div>
                                    <div className="text-3xl font-bold text-secondary-900 mt-1">
                                        ${cost.monthly_range_usd[0]} - ${cost.monthly_range_usd[1]}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* First Year Breakdown */}
                    {oneTimeItems.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">First-year expenses</h2>
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                                <table className="min-w-full divide-y divide-neutral-200">
                                    <thead className="bg-neutral-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                                Cost range
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200">
                                        {oneTimeItems.map((item, i) => (
                                            <tr key={i} className="hover:bg-neutral-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-neutral-900">{item.label}</div>
                                                    <div className="text-sm text-neutral-500">{item.notes}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm text-neutral-600 whitespace-nowrap">
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
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Monthly expenses</h2>
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                                <table className="min-w-full divide-y divide-neutral-200">
                                    <thead className="bg-neutral-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                                Cost range
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200">
                                        {monthlyItems.map((item, i) => (
                                            <tr key={i} className="hover:bg-neutral-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-neutral-900">{item.label}</div>
                                                    <div className="text-sm text-neutral-500">{item.notes}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm text-neutral-600 whitespace-nowrap">
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
                        <section className="bg-primary-50 p-6 rounded-xl border border-primary-100">
                            <h2 className="text-2xl font-bold text-primary-900 mb-4">Is pet insurance worth it?</h2>
                            <p className="text-primary-800 mb-4">{page.insurance_section.summary}</p>
                            <div className="grid gap-4 md:grid-cols-2 mb-6 text-sm text-primary-900">
                                <div>
                                    <h3 className="font-semibold mb-2">When insurance makes sense</h3>
                                    <p>{page.insurance_section.when_insurance_makes_sense}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">When you might skip it</h3>
                                    <p>{page.insurance_section.when_you_might_skip_it}</p>
                                </div>
                            </div>

                            {ctaConfig?.offerPrimary && ctaConfig.offerPrimary.offerType === "insurance" && (
                                <div className="text-center">
                                    <a
                                        href={ctaConfig.offerPrimary.deepLinkPlaceholder}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded-full hover:bg-primary-500 transition-colors w-full md:w-auto shadow-lg shadow-primary-900/20"
                                    >
                                        {ctaConfig.offerPrimary.label}
                                    </a>
                                    <p className="text-sm text-primary-700 mt-2">
                                        {ctaConfig.offerPrimary.description}
                                    </p>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Saving Tips */}
                    {page.saving_tips && (
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Ways to save without cutting essentials</h2>
                            <p className="text-neutral-600 mb-3">{page.saving_tips.summary}</p>
                            <ul className="list-disc pl-5 text-neutral-600 space-y-2">
                                {page.saving_tips.tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* FAQ */}
                    {page.faq && page.faq.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Frequently asked questions</h2>
                            <div className="space-y-4">
                                {page.faq.map((item, idx) => (
                                    <details key={idx} className="bg-white rounded-xl border border-neutral-200 p-4">
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
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Quick answers</h2>
                            <div className="grid gap-4">
                                {page.quick_answers.map((qa, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-neutral-200">
                                        <div className="text-xs font-semibold text-secondary-600 uppercase mb-1">
                                            {qa.category}
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 mb-1">{qa.question}</h3>
                                        <p className="text-sm text-neutral-600">{qa.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Related Pages */}
                    {relatedPages.length > 0 && (
                        <section className="border-t border-neutral-200 pt-12">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Related guides</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {relatedPages.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/${p.page_type === "breed" ? "breeds" : p.page_type === "problem" ? "problems" : p.page_type}/${p.slug}`}
                                        className="block p-4 rounded-xl border border-neutral-200 bg-white hover:border-secondary-500 hover:shadow-sm transition-all group"
                                    >
                                        <span className="text-xs font-bold text-secondary-600 uppercase tracking-wider">
                                            {p.page_type}
                                        </span>
                                        <h3 className="font-bold text-neutral-900 mt-1">
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
                        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-xl text-white shadow-lg border border-primary-500/30">
                            <h3 className="text-xl font-bold mb-2">{ctaConfig.quizPrimary.label}</h3>
                            <p className="text-primary-100 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                            <Link
                                href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                                className="block w-full bg-white text-primary-900 text-center font-bold py-3 rounded-lg hover:bg-primary-50 transition-colors"
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

