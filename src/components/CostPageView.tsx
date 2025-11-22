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
        <main className="min-h-screen bg-slate-950 pb-20">
            {/* Hero */}
            <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    {breedSlug && (
                        <Link
                            href={`/breeds/${breedSlug}`}
                            className="text-indigo-400 hover:text-indigo-300 font-medium mb-4 inline-block transition-colors"
                        >
                            &larr; Back to breed profile
                        </Link>
                    )}
                    <h1 className="text-4xl font-extrabold text-slate-50 tracking-tight sm:text-5xl mb-4">
                        {page.h1}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        {page.intro.short_hook}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">

                    {/* Summary Card */}
                    {cost && (
                        <section className="bg-slate-900/50 p-6 rounded-xl shadow-sm border border-slate-800 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-slate-50 mb-6">Cost summary</h2>
                            <p className="text-slate-300 mb-4">{cost.summary}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
                                    <div className="text-sm text-blue-400 font-semibold uppercase tracking-wide">
                                        First year
                                    </div>
                                    <div className="text-3xl font-bold text-blue-300 mt-1">
                                        ${cost.first_year_range_usd[0]} - ${cost.first_year_range_usd[1]}
                                    </div>
                                </div>
                                <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/20">
                                    <div className="text-sm text-emerald-400 font-semibold uppercase tracking-wide">
                                        Ongoing monthly
                                    </div>
                                    <div className="text-3xl font-bold text-emerald-300 mt-1">
                                        ${cost.monthly_range_usd[0]} - ${cost.monthly_range_usd[1]}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* First Year Breakdown */}
                    {oneTimeItems.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">First-year expenses</h2>
                            <div className="bg-slate-900/30 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                Cost range
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {oneTimeItems.map((item, i) => (
                                            <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-slate-200">{item.label}</div>
                                                    <div className="text-sm text-slate-500">{item.notes}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm text-slate-300 whitespace-nowrap">
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
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">Monthly expenses</h2>
                            <div className="bg-slate-900/30 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                Cost range
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {monthlyItems.map((item, i) => (
                                            <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-slate-200">{item.label}</div>
                                                    <div className="text-sm text-slate-500">{item.notes}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm text-slate-300 whitespace-nowrap">
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
                        <section className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/20">
                            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Is pet insurance worth it?</h2>
                            <p className="text-indigo-300 mb-4">{page.insurance_section.summary}</p>
                            <div className="grid gap-4 md:grid-cols-2 mb-6 text-sm text-indigo-100">
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
                                        className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-500 transition-colors w-full md:w-auto shadow-lg shadow-indigo-900/20"
                                    >
                                        {ctaConfig.offerPrimary.label}
                                    </a>
                                    <p className="text-sm text-indigo-400 mt-2">
                                        {ctaConfig.offerPrimary.description}
                                    </p>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Saving Tips */}
                    {page.saving_tips && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">Ways to save without cutting essentials</h2>
                            <p className="text-slate-300 mb-3">{page.saving_tips.summary}</p>
                            <ul className="list-disc pl-5 text-slate-300 space-y-2">
                                {page.saving_tips.tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* FAQ */}
                    {page.faq && page.faq.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">Frequently asked questions</h2>
                            <div className="space-y-4">
                                {page.faq.map((item, idx) => (
                                    <details key={idx} className="bg-slate-900/40 rounded-xl border border-slate-800 p-4">
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
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">Quick answers</h2>
                            <div className="grid gap-4">
                                {page.quick_answers.map((qa, i) => (
                                    <div key={i} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                                        <div className="text-xs font-semibold text-emerald-400 uppercase mb-1">
                                            {qa.category}
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-50 mb-1">{qa.question}</h3>
                                        <p className="text-sm text-slate-300">{qa.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Related Pages */}
                    {relatedPages.length > 0 && (
                        <section className="border-t border-slate-800 pt-12">
                            <h2 className="text-2xl font-bold text-slate-50 mb-6">Related guides</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {relatedPages.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/${p.page_type === "breed" ? "breeds" : p.page_type === "problem" ? "problems" : p.page_type}/${p.slug}`}
                                        className="block p-4 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 hover:border-emerald-500/50 hover:shadow-sm transition-all group"
                                    >
                                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider group-hover:text-emerald-300">
                                            {p.page_type}
                                        </span>
                                        <h3 className="font-bold text-slate-200 mt-1 group-hover:text-white">
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
                        <div className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 p-6 rounded-xl text-white shadow-lg border border-indigo-500/30">
                            <h3 className="text-xl font-bold mb-2">{ctaConfig.quizPrimary.label}</h3>
                            <p className="text-indigo-200 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                            <Link
                                href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                                className="block w-full bg-white text-indigo-900 text-center font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors"
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

