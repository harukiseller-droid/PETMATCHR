import React from "react";
import { ProblemV7Page, CTAConfig, PageIndexEntry } from "@/lib/types";
import Link from "next/link";

interface ProblemPageViewProps {
    page: ProblemV7Page;
    ctaConfig: CTAConfig | null;
    breedSlug?: string;
    relatedPages?: PageIndexEntry[];
}

export default function ProblemPageView({ page, ctaConfig, breedSlug, relatedPages = [] }: ProblemPageViewProps) {
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
                    {(page.intro as any).who_struggles_with_this && (
                        <p className="mt-4 text-slate-300 max-w-2xl">
                            {(page.intro as any).who_struggles_with_this}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">
                    {/* Problem overview */}
                    {page.problem_overview && (
                        <section className="prose prose-invert max-w-none text-slate-300">
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">What this problem looks like</h2>
                            <p className="mb-4">{page.problem_overview.summary}</p>
                            {page.problem_overview.common_triggers.length > 0 && (
                                <>
                                    <h3 className="text-xl font-semibold text-slate-50 mt-4 mb-2">Common triggers</h3>
                                    <ul>
                                        {page.problem_overview.common_triggers.map((t, i) => (
                                            <li key={i}>{t}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {page.problem_overview.how_common_it_is && (
                                <p className="mt-4">{page.problem_overview.how_common_it_is}</p>
                            )}
                        </section>
                    )}

                    {/* Why it happens */}
                    {page.why_it_happens && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">Why this happens</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-50 mb-2">Breed factors</h3>
                                    <p className="text-slate-300">{page.why_it_happens.breed_drivers}</p>
                                </div>
                                <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-50 mb-2">Environment factors</h3>
                                    <p className="text-slate-300">{page.why_it_happens.environment_drivers}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* What you can try */}
                    {page.what_you_can_try && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">What you can try</h2>
                            <div className="space-y-6">
                                {page.what_you_can_try.at_home_strategies.length > 0 && (
                                    <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
                                        <h3 className="text-lg font-bold text-slate-50 mb-3">At-home strategies</h3>
                                        <ul className="space-y-2 list-disc pl-5 text-slate-300">
                                            {page.what_you_can_try.at_home_strategies.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-50 mb-2">When to consider a trainer</h3>
                                    <p className="text-slate-300">{page.what_you_can_try.when_to_consider_trainer}</p>
                                </div>
                                <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-50 mb-2">When to talk to your vet</h3>
                                    <p className="text-slate-300">{page.what_you_can_try.when_to_talk_to_vet}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Expectations */}
                    {page.realistic_expectations && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">Realistic expectations</h2>
                            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
                                <p className="text-slate-300 mb-3">{page.realistic_expectations.timeline}</p>
                                <p className="text-slate-300">{page.realistic_expectations.what_success_looks_like}</p>
                            </div>
                        </section>
                    )}

                    {/* Case study */}
                    {page.case_study && (
                        <section className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl shadow-indigo-900/20">
                            <h2 className="text-2xl font-bold mb-4">{page.case_study.title}</h2>
                            <p className="text-indigo-100 mb-6 whitespace-pre-line">{page.case_study.story}</p>
                            <p className="font-semibold">
                                Key takeaway: {page.case_study.key_takeaway}
                            </p>
                        </section>
                    )}

                    {/* FAQ */}
                    {page.faq && page.faq.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-50 mb-4">Frequently asked questions</h2>
                            <div className="space-y-4">
                                {page.faq.map((item, i) => (
                                    <details key={i} className="bg-slate-900/40 rounded-xl border border-slate-800 p-4">
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
                        <div className="bg-gradient-to-br from-orange-600 to-red-700 p-6 rounded-xl text-white shadow-lg sticky top-8 border border-orange-500/30">
                            <h3 className="text-xl font-bold mb-2">{ctaConfig.quizPrimary.label}</h3>
                            <p className="text-orange-100 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                            <Link
                                href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                                className="block w-full bg-white text-orange-600 text-center font-bold py-3 rounded-lg hover:bg-orange-50 transition-colors"
                            >
                                Take quiz
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

