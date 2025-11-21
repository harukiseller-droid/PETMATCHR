import React from "react";
import { CostPage, CTAConfig, PageIndexEntry } from "@/lib/types";
import Link from "next/link";

interface CostPageViewProps {
    page: CostPage;
    ctaConfig: CTAConfig | null;
    breedSlug?: string;
    relatedPages?: PageIndexEntry[];
}

export default function CostPageView({ page, ctaConfig, breedSlug, relatedPages = [] }: CostPageViewProps) {
    return (
        <main className="min-h-screen bg-slate-950 pb-20">
            {/* Hero */}
            <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    {breedSlug && (
                        <Link href={`/breeds/${breedSlug}`} className="text-indigo-400 hover:text-indigo-300 font-medium mb-4 inline-block transition-colors">
                            &larr; Back to {page.hero.breed_name} Profile
                        </Link>
                    )}
                    <h1 className="text-4xl font-extrabold text-slate-50 tracking-tight sm:text-5xl mb-4">
                        {page.h1}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        {page.hero.one_line_summary}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">

                    {/* Summary Card */}
                    <section className="bg-slate-900/50 p-6 rounded-xl shadow-sm border border-slate-800 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-slate-50 mb-6">Cost Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
                                <div className="text-sm text-blue-400 font-semibold uppercase tracking-wide">First Year</div>
                                <div className="text-3xl font-bold text-blue-300 mt-1">
                                    ${page.summary.first_year_min_usd} - ${page.summary.first_year_max_usd}
                                </div>
                            </div>
                            <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/20">
                                <div className="text-sm text-emerald-400 font-semibold uppercase tracking-wide">Monthly After</div>
                                <div className="text-3xl font-bold text-emerald-300 mt-1">
                                    ${page.summary.ongoing_monthly_min_usd} - ${page.summary.ongoing_monthly_max_usd}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* First Year Breakdown */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-50 mb-4">First Year Expenses</h2>
                        <div className="bg-slate-900/30 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                            <table className="min-w-full divide-y divide-slate-800">
                                <thead className="bg-slate-900/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Cost Range</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {page.first_year_breakdown.map((item, i) => (
                                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-slate-200">{item.category}</div>
                                                <div className="text-sm text-slate-500">{item.notes}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-slate-300 whitespace-nowrap">
                                                ${item.min_usd} - ${item.max_usd}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Monthly Breakdown */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-50 mb-4">Monthly Expenses</h2>
                        <div className="bg-slate-900/30 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                            <table className="min-w-full divide-y divide-slate-800">
                                <thead className="bg-slate-900/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Cost Range</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {page.monthly_breakdown.map((item, i) => (
                                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-slate-200">{item.category}</div>
                                                <div className="text-sm text-slate-500">{item.notes}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-slate-300 whitespace-nowrap">
                                                ${item.min_usd} - ${item.max_usd}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Emergency Section */}
                    <section className="bg-red-900/20 p-6 rounded-xl border border-red-500/20">
                        <h2 className="text-2xl font-bold text-red-400 mb-4">Emergency Costs</h2>
                        <p className="text-red-300 mb-4">{page.emergency_costs.one_line_warning}</p>
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-red-500/20 mb-4">
                            <div className="text-sm text-slate-400 uppercase tracking-wide">Typical Emergency Bill</div>
                            <div className="text-2xl font-bold text-red-400">
                                ${page.emergency_costs.typical_emergency_range_usd.low} - ${page.emergency_costs.typical_emergency_range_usd.high}
                            </div>
                        </div>
                        <h3 className="font-bold text-red-300 mb-2">Common Issues:</h3>
                        <ul className="list-disc list-inside text-red-200/80">
                            {page.emergency_costs.common_emergencies.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Insurance Section */}
                    {page.insurance_section.recommended && (
                        <section className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/20">
                            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Is Pet Insurance Worth It?</h2>
                            <p className="text-indigo-300 mb-4">{page.insurance_section.reason}</p>
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-indigo-500/20 mb-6">
                                <div className="text-sm text-slate-400 uppercase tracking-wide">Typical Monthly Premium</div>
                                <div className="text-2xl font-bold text-indigo-400">
                                    ${page.insurance_section.typical_premium_range_usd.low} - ${page.insurance_section.typical_premium_range_usd.high}
                                </div>
                            </div>

                            {ctaConfig?.offerPrimary && ctaConfig.offerPrimary.offerType === 'insurance' && (
                                <div className="text-center">
                                    <a
                                        href={ctaConfig.offerPrimary.deepLinkPlaceholder}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-500 transition-colors w-full md:w-auto shadow-lg shadow-indigo-900/20"
                                    >
                                        {ctaConfig.offerPrimary.label}
                                    </a>
                                    <p className="text-sm text-indigo-400 mt-2">{ctaConfig.offerPrimary.description}</p>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Related Pages */}
                    {relatedPages.length > 0 && (
                        <section className="border-t border-slate-800 pt-12">
                            <h2 className="text-2xl font-bold text-slate-50 mb-6">Related Guides</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {relatedPages.map(p => (
                                    <Link key={p.slug} href={`/${p.page_type === 'breed' ? 'breeds' : p.page_type === 'problem' ? 'problems' : p.page_type}/${p.slug}`} className="block p-4 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 hover:border-emerald-500/50 hover:shadow-sm transition-all group">
                                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider group-hover:text-emerald-300">{p.page_type}</span>
                                        <h3 className="font-bold text-slate-200 mt-1 group-hover:text-white">{p.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Local Context */}
                    <div className="bg-slate-900/50 p-6 rounded-xl shadow-sm border border-slate-800 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-slate-50 mb-4">Local Context: {page.local_context.city}</h3>
                        <p className="text-sm text-slate-400 mb-4">{page.local_context.cost_of_living_note}</p>
                        <p className="text-sm text-slate-400">{page.local_context.dog_friendly_note}</p>
                    </div>

                    {/* Quiz CTA */}
                    {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                        <div className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 p-6 rounded-xl text-white shadow-lg border border-indigo-500/30">
                            <h3 className="text-xl font-bold mb-2">{ctaConfig.quizPrimary.label}</h3>
                            <p className="text-indigo-200 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                            <Link
                                href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                                className="block w-full bg-white text-indigo-900 text-center font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors"
                            >
                                Start Quiz
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
