import React from "react";
import { AnxietyV7Page, CTAConfig, PageIndexEntry } from "@/lib/types";
import Link from "next/link";

interface Props {
    page: AnxietyV7Page;
    ctaConfig: CTAConfig | null;
    breedSlug?: string;
    relatedPages?: PageIndexEntry[];
}

export default function AnxietyPageView({ page, ctaConfig, breedSlug, relatedPages = [] }: Props) {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero */}
            <header className="mb-12 text-center bg-slate-900/50 border border-slate-800 p-8 rounded-xl backdrop-blur-sm">
                {breedSlug && (
                    <div className="mb-4 text-left">
                        <Link
                            href={`/breeds/${breedSlug}`}
                            className="text-purple-400 hover:text-purple-300 font-medium inline-block transition-colors"
                        >
                            &larr; Back to breed profile
                        </Link>
                    </div>
                )}
                <h1 className="text-4xl font-bold mb-4 text-slate-50">{page.h1}</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">{page.intro.short_hook}</p>
                {(page.intro as any).who_this_is_for && (
                    <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
                        {(page.intro as any).who_this_is_for}
                    </p>
                )}
            </header>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
                {/* Anxiety pattern */}
                {page.anxiety_pattern && (
                    <section>
                        <h3 className="text-2xl font-bold mb-4 text-red-400">What this anxiety looks like</h3>
                        <p className="text-slate-300 mb-4">{page.anxiety_pattern.summary}</p>
                        <h4 className="text-lg font-semibold text-slate-100 mb-2">Common signs</h4>
                        <ul className="space-y-2 mb-4 list-disc pl-5 text-slate-300">
                            {page.anxiety_pattern.common_signs.map((symptom, idx) => (
                                <li key={idx}>{symptom}</li>
                            ))}
                        </ul>
                        <h4 className="text-lg font-semibold text-slate-100 mb-2">When it tends to show up</h4>
                        <ul className="space-y-2 list-disc pl-5 text-slate-300">
                            {page.anxiety_pattern.situations_where_it_shows_up.map((s, idx) => (
                                <li key={idx}>{s}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Support options */}
                {page.support_options && (
                    <section>
                        <h3 className="text-2xl font-bold mb-4 text-emerald-400">Support options</h3>
                        <div className="space-y-4">
                            {page.support_options.at_home_strategies.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-100 mb-2">At-home strategies</h4>
                                    <ul className="space-y-2 list-disc pl-5 text-slate-300">
                                        {page.support_options.at_home_strategies.map((s, idx) => (
                                            <li key={idx}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {page.support_options.environment_changes.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-100 mb-2">Environment changes</h4>
                                    <ul className="space-y-2 list-disc pl-5 text-slate-300">
                                        {page.support_options.environment_changes.map((s, idx) => (
                                            <li key={idx}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <h4 className="text-lg font-semibold text-slate-100 mb-2">
                                    When to consider professional training
                                </h4>
                                <p className="text-slate-300">{page.support_options.when_to_consider_professional_training}</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <h4 className="text-lg font-semibold text-slate-100 mb-2">
                                    When to talk to a vet or behaviorist
                                </h4>
                                <p className="text-slate-300">{page.support_options.when_to_talk_to_vet_or_behaviorist}</p>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Tools & products */}
            {page.tools_and_products && (
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-slate-50">Tools & products that can help</h2>
                    <p className="text-slate-300 mb-3">{page.tools_and_products.summary}</p>
                    <ul className="list-disc pl-5 text-slate-300 space-y-2">
                        {page.tools_and_products.types_of_tools.map((t, idx) => (
                            <li key={idx}>{t}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Case study */}
            {page.case_study && (
                <section className="mb-12 bg-slate-900 border border-slate-800 text-white p-12 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-500/5 pointer-events-none"></div>
                    <h2 className="text-2xl font-bold mb-4 relative z-10">{page.case_study.title}</h2>
                    <p className="relative z-10 text-slate-100 mb-4 whitespace-pre-line">
                        {page.case_study.story}
                    </p>
                    <p className="relative z-10 text-sm font-semibold text-purple-200">
                        Key takeaway: {page.case_study.key_takeaway}
                    </p>
                </section>
            )}

            {/* CTA */}
            {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                <section className="text-center bg-slate-900 border border-slate-800 text-white p-12 rounded-xl mb-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-500/5 pointer-events-none"></div>
                    <h2 className="text-2xl font-bold mb-6 relative z-10">{ctaConfig.quizPrimary.label}</h2>
                    <p className="text-purple-100 mb-6 text-sm relative z-10">{ctaConfig.quizPrimary.description}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg shadow-purple-900/20"
                        >
                            Take quiz
                        </Link>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {page.faq && page.faq.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-50">Frequently asked questions</h2>
                    <div className="space-y-4">
                        {page.faq.map((item, idx) => (
                            <div key={idx} className="border border-slate-800 bg-slate-900/30 rounded-lg p-6">
                                <h3 className="font-bold text-slate-100 mb-2">{item.question}</h3>
                                <p className="text-slate-300">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Quick answers */}
            {page.quick_answers && page.quick_answers.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-50">Quick answers</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {page.quick_answers.map((qa, idx) => (
                            <div
                                key={idx}
                                className="border border-slate-800 bg-slate-900/30 rounded-lg p-6 hover:bg-slate-900/50 hover:border-purple-500/50 transition duration-300"
                            >
                                <div className="text-xs font-semibold text-purple-400 uppercase mb-1">
                                    {qa.category}
                                </div>
                                <h3 className="text-sm font-bold text-slate-100 mb-2">{qa.question}</h3>
                                <p className="text-slate-300">{qa.answer}</p>
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
                                className="block p-4 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 hover:border-purple-500/50 hover:shadow-sm transition-all group"
                            >
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider group-hover:text-purple-300">
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
    );
}

