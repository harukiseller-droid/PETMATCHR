import React from "react";
import { ListV7Page } from "@/lib/types";
import Link from "next/link";

interface ListPageViewProps {
    page: ListV7Page;
}

export default function ListPageView({ page }: ListPageViewProps) {
    return (
        <main className="min-h-screen bg-neutral-50 pb-20">
            {/* Hero */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl mb-4">
                        {page.h1}
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl">
                        {page.intro.short_hook}
                    </p>
                    {(page.intro as any).who_this_list_is_for && (
                        <p className="mt-4 text-neutral-600 max-w-2xl">
                            {(page.intro as any).who_this_list_is_for}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* How we chose */}
                {(page.intro as any).how_we_chose_these_breeds && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-3">How we chose these breeds</h2>
                        <p className="text-neutral-600">
                            {(page.intro as any).how_we_chose_these_breeds}
                        </p>
                    </section>
                )}

                {/* Sections */}
                {page.sections && page.sections.length > 0 && (
                    <section className="mb-10 space-y-8">
                        {page.sections.map((section) => (
                            <div key={section.id}>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-3">{section.title}</h2>
                                <div className="prose prose-neutral max-w-none text-neutral-600">
                                    {section.content && (
                                        <p className="mb-4 whitespace-pre-line">{section.content}</p>
                                    )}
                                    {section.type === "list" && section.items && (
                                        <ul className="list-disc pl-5 space-y-1">
                                            {section.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Breed cards */}
                {page.breed_cards && page.breed_cards.length > 0 && (
                    <section className="mb-12 space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Top breeds on this list</h2>
                        {page.breed_cards.map((breed, i) => (
                            <div
                                key={`${breed.breed_slug}-${i}`}
                                className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex flex-col md:flex-row gap-6 hover:border-primary-500/50 transition duration-300"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-neutral-900 mb-1">
                                        <Link
                                            href={`/breeds/${breed.breed_slug}`}
                                            className="hover:text-primary-600 transition-colors"
                                        >
                                            {breed.breed_name}
                                        </Link>
                                    </h3>
                                    <p className="text-neutral-600 mb-2">{breed.one_line_summary}</p>
                                    <p className="text-neutral-500 mb-3">
                                        {breed.why_it_works_for_this_lifestyle}
                                    </p>
                                    {breed.major_caveats.length > 0 && (
                                        <ul className="list-disc pl-5 text-neutral-500 text-sm space-y-1">
                                            {breed.major_caveats.map((caveat, j) => (
                                                <li key={j}>{caveat}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <Link
                                        href={`/breeds/${breed.breed_slug}`}
                                        className="mt-3 inline-block text-primary-600 font-medium hover:text-primary-500 hover:underline"
                                    >
                                        Read full profile &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Case study */}
                {page.case_study && (
                    <section className="mb-12 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-3">{page.case_study.title}</h2>
                        <p className="text-neutral-600 mb-3 whitespace-pre-line">{page.case_study.story}</p>
                        <p className="text-sm font-semibold text-neutral-900">
                            Key takeaway: {page.case_study.key_takeaway}
                        </p>
                    </section>
                )}

                {/* FAQ */}
                {page.faq && page.faq.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {page.faq.map((item, i) => (
                                <details key={i} className="bg-white rounded-xl border border-neutral-200 p-4">
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
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Quick answers</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {page.quick_answers.map((qa, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-4 rounded-xl border border-neutral-200 hover:border-primary-500/50 transition duration-300 shadow-sm"
                                >
                                    <div className="text-xs font-semibold text-primary-600 uppercase mb-1">
                                        {qa.category}
                                    </div>
                                    <h3 className="text-sm font-bold text-neutral-900 mb-1">{qa.question}</h3>
                                    <p className="text-sm text-neutral-600">{qa.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <div className="mt-12 bg-primary-600 rounded-2xl p-8 text-center text-white shadow-xl shadow-primary-900/20">
                    <h2 className="text-2xl font-bold mb-4">Narrowed it down but still unsure?</h2>
                    <p className="text-primary-100 mb-8">
                        Take the Lifestyle Match quiz to see which of these breeds truly fits your day-to-day life.
                    </p>
                    <Link
                        href="/quiz/lifestyle-match"
                        className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-full hover:bg-primary-50 transition-colors shadow-lg"
                    >
                        Take the quiz
                    </Link>
                </div>
            </div>
        </main>
    );
}

