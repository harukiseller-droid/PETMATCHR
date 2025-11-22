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
                    {(page.intro as any).who_struggles_with_this && (
                        <p className="mt-4 text-brand-navy/60 max-w-2xl font-medium">
                            {(page.intro as any).who_struggles_with_this}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">
                    {/* Problem overview */}
                    {page.problem_overview && (
                        <section className="prose prose-brand-navy max-w-none text-brand-navy/90">
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">What this problem looks like</h2>
                            <p className="mb-4">{page.problem_overview.summary}</p>
                            {page.problem_overview.common_triggers.length > 0 && (
                                <>
                                    <h3 className="text-xl font-bold text-brand-navy mt-4 mb-2">Common triggers</h3>
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
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Why this happens</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-card border border-brand-border shadow-card">
                                    <h3 className="text-lg font-bold text-brand-navy mb-2">Breed factors</h3>
                                    <p className="text-brand-navy/90">{page.why_it_happens.breed_drivers}</p>
                                </div>
                                <div className="bg-white p-6 rounded-card border border-brand-border shadow-card">
                                    <h3 className="text-lg font-bold text-brand-navy mb-2">Environment factors</h3>
                                    <p className="text-brand-navy/90">{page.why_it_happens.environment_drivers}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* What you can try */}
                    {page.what_you_can_try && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">What you can try</h2>
                            <div className="space-y-6">
                                {page.what_you_can_try.at_home_strategies.length > 0 && (
                                    <div className="bg-white p-6 rounded-card border border-brand-border shadow-card">
                                        <h3 className="text-lg font-bold text-brand-navy mb-3">At-home strategies</h3>
                                        <ul className="space-y-2 list-disc pl-5 text-brand-navy/90">
                                            {page.what_you_can_try.at_home_strategies.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="bg-white p-6 rounded-card border border-brand-border shadow-card">
                                    <h3 className="text-lg font-bold text-brand-navy mb-2">When to consider a trainer</h3>
                                    <p className="text-brand-navy/90">{page.what_you_can_try.when_to_consider_trainer}</p>
                                </div>
                                <div className="bg-white p-6 rounded-card border border-brand-border shadow-card">
                                    <h3 className="text-lg font-bold text-brand-navy mb-2">When to talk to your vet</h3>
                                    <p className="text-brand-navy/90">{page.what_you_can_try.when_to_talk_to_vet}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Expectations */}
                    {page.realistic_expectations && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Realistic expectations</h2>
                            <div className="bg-white p-6 rounded-card border border-brand-border shadow-card">
                                <p className="text-brand-navy/90 mb-3">{page.realistic_expectations.timeline}</p>
                                <p className="text-brand-navy/90">{page.realistic_expectations.what_success_looks_like}</p>
                            </div>
                        </section>
                    )}

                    {/* Case study */}
                    {page.case_study && (
                        <section className="bg-brand-teal rounded-card p-8 text-white shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">{page.case_study.title}</h2>
                            <p className="text-white/90 mb-6 whitespace-pre-line">{page.case_study.story}</p>
                            <p className="font-bold">
                                Key takeaway: {page.case_study.key_takeaway}
                            </p>
                        </section>
                    )}

                    {/* FAQ */}
                    {page.faq && page.faq.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Frequently asked questions</h2>
                            <div className="space-y-4">
                                {page.faq.map((item, i) => (
                                    <details key={i} className="bg-white rounded-card border border-brand-border p-4">
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
                        <div className="bg-brand-teal p-6 rounded-card text-white shadow-lg sticky top-8 border border-brand-teal/20">
                            <h3 className="text-xl font-bold mb-2">{ctaConfig.quizPrimary.label}</h3>
                            <p className="text-white/90 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                            <Link
                                href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                                className="block w-full bg-white text-brand-teal text-center font-bold py-3 rounded-full hover:brightness-95 transition-colors shadow-md"
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

