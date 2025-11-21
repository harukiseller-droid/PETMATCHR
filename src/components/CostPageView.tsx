import React from "react";
import { CostPage, CTAConfig } from "@/lib/types";
import Link from "next/link";

interface CostPageViewProps {
    page: CostPage;
    ctaConfig: CTAConfig | null;
}

export default function CostPageView({ page, ctaConfig }: CostPageViewProps) {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                        {page.h1}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl">
                        {page.hero.one_line_summary}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">

                    {/* Summary Card */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="text-sm text-blue-600 font-semibold uppercase tracking-wide">First Year</div>
                                <div className="text-3xl font-bold text-blue-900 mt-1">
                                    ${page.summary.first_year_min_usd} - ${page.summary.first_year_max_usd}
                                </div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-sm text-green-600 font-semibold uppercase tracking-wide">Monthly After</div>
                                <div className="text-3xl font-bold text-green-900 mt-1">
                                    ${page.summary.ongoing_monthly_min_usd} - ${page.summary.ongoing_monthly_max_usd}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* First Year Breakdown */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">First Year Expenses</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Range</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {page.first_year_breakdown.map((item, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.category}</div>
                                                <div className="text-sm text-gray-500">{item.notes}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-gray-900 whitespace-nowrap">
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Monthly Expenses</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Range</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {page.monthly_breakdown.map((item, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.category}</div>
                                                <div className="text-sm text-gray-500">{item.notes}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-gray-900 whitespace-nowrap">
                                                ${item.min_usd} - ${item.max_usd}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Emergency Section */}
                    <section className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <h2 className="text-2xl font-bold text-red-900 mb-4">Emergency Costs</h2>
                        <p className="text-red-800 mb-4">{page.emergency_costs.one_line_warning}</p>
                        <div className="bg-white p-4 rounded-lg border border-red-100 mb-4">
                            <div className="text-sm text-gray-500 uppercase tracking-wide">Typical Emergency Bill</div>
                            <div className="text-2xl font-bold text-red-600">
                                ${page.emergency_costs.typical_emergency_range_usd.low} - ${page.emergency_costs.typical_emergency_range_usd.high}
                            </div>
                        </div>
                        <h3 className="font-bold text-red-900 mb-2">Common Issues:</h3>
                        <ul className="list-disc list-inside text-red-800">
                            {page.emergency_costs.common_emergencies.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Insurance Section */}
                    {page.insurance_section.recommended && (
                        <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Is Pet Insurance Worth It?</h2>
                            <p className="text-indigo-800 mb-4">{page.insurance_section.reason}</p>
                            <div className="bg-white p-4 rounded-lg border border-indigo-100 mb-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wide">Typical Monthly Premium</div>
                                <div className="text-2xl font-bold text-indigo-600">
                                    ${page.insurance_section.typical_premium_range_usd.low} - ${page.insurance_section.typical_premium_range_usd.high}
                                </div>
                            </div>

                            {ctaConfig?.offerPrimary && ctaConfig.offerPrimary.offerType === 'insurance' && (
                                <div className="text-center">
                                    <a
                                        href={ctaConfig.offerPrimary.deepLinkPlaceholder}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors w-full md:w-auto"
                                    >
                                        {ctaConfig.offerPrimary.label}
                                    </a>
                                    <p className="text-sm text-indigo-600 mt-2">{ctaConfig.offerPrimary.description}</p>
                                </div>
                            )}
                        </section>
                    )}

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Local Context */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Local Context: {page.local_context.city}</h3>
                        <p className="text-sm text-gray-600 mb-4">{page.local_context.cost_of_living_note}</p>
                        <p className="text-sm text-gray-600">{page.local_context.dog_friendly_note}</p>
                    </div>

                    {/* Quiz CTA */}
                    {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-xl text-white shadow-lg">
                            <h3 className="text-xl font-bold mb-2">{ctaConfig.quizPrimary.label}</h3>
                            <p className="text-indigo-100 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                            <Link
                                href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                                className="block w-full bg-white text-indigo-600 text-center font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors"
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
