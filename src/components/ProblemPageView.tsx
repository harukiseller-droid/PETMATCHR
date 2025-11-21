import React from "react";
import { ProblemPage, CTAConfig } from "@/lib/types";
import Link from "next/link";

interface ProblemPageViewProps {
    page: ProblemPage;
    ctaConfig: CTAConfig | null;
}

export default function ProblemPageView({ page, ctaConfig }: ProblemPageViewProps) {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-2">
                        {page.hero.breed_name} Problem Guide
                    </div>
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

                    {/* Intro */}
                    <section className="prose prose-blue max-w-none text-gray-600">
                        {page.intro.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </section>

                    {/* Symptoms & Causes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                            <h3 className="text-lg font-bold text-yellow-900 mb-3">Symptoms</h3>
                            <ul className="space-y-2">
                                {page.symptoms.map((item, i) => (
                                    <li key={i} className="flex items-start text-yellow-800">
                                        <span className="mr-2">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Root Causes</h3>
                            <ul className="space-y-2">
                                {page.root_causes.map((item, i) => (
                                    <li key={i} className="flex items-start text-gray-700">
                                        <span className="mr-2">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Expectations */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{page.section_home_alone_expectations.heading}</h2>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            {page.section_home_alone_expectations.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </section>

                    {/* Step by Step Plan */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{page.section_step_by_step_plan.heading}</h2>
                        <div className="space-y-6">
                            {page.section_step_by_step_plan.steps.map((step, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center mb-2">
                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full mr-3">
                                            Step {i + 1}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-600 ml-1">{step.detail}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Course Recommendation */}
                    <section className="bg-indigo-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">{page.course_recommendation.headline}</h2>
                        <p className="text-indigo-100 mb-6">{page.course_recommendation.body}</p>
                        <ul className="space-y-2 mb-8">
                            {page.course_recommendation.benefit_bullets.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="mr-2 text-green-300">✓</span> {item}
                                </li>
                            ))}
                        </ul>

                        {ctaConfig?.offerPrimary && ctaConfig.offerPrimary.offerType === 'training' && (
                            <a
                                href={ctaConfig.offerPrimary.deepLinkPlaceholder}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition-colors"
                            >
                                {ctaConfig.offerPrimary.label}
                            </a>
                        )}
                    </section>

                    {/* When to get help */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{page.section_when_to_get_help.heading}</h2>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            {page.section_when_to_get_help.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Quiz CTA */}
                    {ctaConfig?.quizPrimary && ctaConfig.quizPrimary.visible && (
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl text-white shadow-lg sticky top-8">
                            <h3 className="text-xl font-bold mb-2">{ctaConfig.quizPrimary.label}</h3>
                            <p className="text-orange-100 mb-6 text-sm">{ctaConfig.quizPrimary.description}</p>
                            <Link
                                href={`/quiz/${ctaConfig.quizPrimary.quizSlug}`}
                                className="block w-full bg-white text-orange-600 text-center font-bold py-3 rounded-lg hover:bg-orange-50 transition-colors"
                            >
                                Take Quiz
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
