import React from "react";
import { ListV7Page } from "@/lib/types";
import Link from "next/link";

interface ListPageViewProps {
    page: ListV7Page;
}

export default function ListPageView({ page }: ListPageViewProps) {
    return (
        <main className="min-h-screen bg-slate-950 pb-20">
            {/* Hero */}
            <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-slate-50 tracking-tight sm:text-5xl mb-4">
                        {page.h1}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        {page.intro.short_hook}
                    </p>
                    {(page.intro as any).who_this_list_is_for && (
                        <p className="mt-4 text-slate-300 max-w-2xl">
                            {(page.intro as any).who_this_list_is_for}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* How we chose */}
                {(page.intro as any).how_we_chose_these_breeds && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-50 mb-3">How we chose these breeds</h2>
                        <p className="text-slate-300">
                            {(page.intro as any).how_we_chose_these_breeds}
                        </p>
                    </section>
                )}

                {/* Sections */}
                {page.sections && page.sections.length > 0 && (
                    <section className="mb-10 space-y-8">
                        {page.sections.map((section) => (
                            <div key={section.id}>
                                <h2 className="text-2xl font-bold text-slate-50 mb-3">{section.title}</h2>
                                <div className="prose prose-invert max-w-none text-slate-300">
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
                        <h2 className="text-2xl font-bold text-slate-50 mb-4">Top breeds on this list</h2>
                        {page.breed_cards.map((breed, i) => (
                            <div
                                key={`${breed.breed_slug}-${i}`}
                                className="bg-slate-900/30 p-6 rounded-xl shadow-sm border border-slate-800 flex flex-col md:flex-row gap-6 hover:bg-slate-900/50 hover:border-indigo-500/30 transition duration-300"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-50 mb-1">
                                        <Link
                                            href={`/breeds/${breed.breed_slug}`}
                                            className="hover:text-indigo-400 transition-colors"
                                        >
                                            {breed.breed_name}
                                        </Link>
                                    </h3>
                                    <p className="text-slate-300 mb-2">{breed.one_line_summary}</p>
                                    <p className="text-slate-400 mb-3">
                                        {breed.why_it_works_for_this_lifestyle}
                                    </p>
                                    {breed.major_caveats.length > 0 && (
                                        <ul className="list-disc pl-5 text-slate-400 text-sm space-y-1">
                                            {breed.major_caveats.map((caveat, j) => (
                                                <li key={j}>{caveat}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <Link
                                        href={`/breeds/${breed.breed_slug}`}
                                        className="mt-3 inline-block text-indigo-400 font-medium hover:text-indigo-300 hover:underline"
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
                    <section className="mb-12 bg-slate-900/40 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-2xl font-bold text-slate-50 mb-3">{page.case_study.title}</h2>
                        <p className="text-slate-300 mb-3 whitespace-pre-line">{page.case_study.story}</p>
                        <p className="text-sm font-semibold text-slate-200">
                            Key takeaway: {page.case_study.key_takeaway}
                        </p>
                    </section>
                )}

                {/* FAQ */}
                {page.faq && page.faq.length > 0 && (
                    <section className="mb-12">
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
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-50 mb-4">Quick answers</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {page.quick_answers.map((qa, i) => (
                                <div
                                    key={i}
                                    className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 hover:bg-slate-900/60 hover:border-indigo-500/50 transition duration-300"
                                >
                                    <div className="text-xs font-semibold text-indigo-400 uppercase mb-1">
                                        {qa.category}
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-100 mb-1">{qa.question}</h3>
                                    <p className="text-sm text-slate-300">{qa.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <div className="mt-12 bg-indigo-600 rounded-2xl p-8 text-center text-white shadow-xl shadow-indigo-900/20">
                    <h2 className="text-2xl font-bold mb-4">Narrowed it down but still unsure?</h2>
                    <p className="text-indigo-100 mb-8">
                        Take the Lifestyle Match quiz to see which of these breeds truly fits your day-to-day life.
                    </p>
                    <Link
                        href="/quiz/lifestyle-match"
                        className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
                    >
                        Take the quiz
                    </Link>
                </div>
            </div>
        </main>
    );
}

