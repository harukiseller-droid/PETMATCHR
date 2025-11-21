import React from "react";
import { ListPage } from "@/lib/types";
import Link from "next/link";

interface ListPageViewProps {
    page: ListPage;
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
                        {page.intro.description}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Ranking Table */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-50 mb-6">Top Ranked Breeds</h2>
                    <div className="bg-slate-900/30 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-800">
                            <thead className="bg-slate-900/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Breed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Score</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Why?</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {page.ranking_table.map((item, i) => (
                                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-lg font-bold text-slate-200">#{item.rank}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-indigo-400">{item.breed_name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-emerald-400">{item.score}/10</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-400">{item.one_line_reason}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Breed Snippets */}
                <section className="space-y-8">
                    {page.breed_snippets.map((breed, i) => (
                        <div key={i} className="bg-slate-900/30 p-6 rounded-xl shadow-sm border border-slate-800 flex flex-col md:flex-row gap-6 hover:bg-slate-900/50 hover:border-indigo-500/30 transition duration-300">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-50 mb-2">
                                    <Link href={`/breeds/${breed.breed_slug}`} className="hover:text-indigo-400 transition-colors">
                                        {breed.breed_name}
                                    </Link>
                                </h3>
                                <p className="text-slate-300 mb-4">{breed.description}</p>
                                <Link href={`/breeds/${breed.breed_slug}`} className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline">
                                    Read full profile →
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CTA */}
                <div className="mt-12 bg-indigo-600 rounded-2xl p-8 text-center text-white shadow-xl shadow-indigo-900/20">
                    <h2 className="text-2xl font-bold mb-4">Find Your Perfect Match</h2>
                    <p className="text-indigo-100 mb-8">{page.cta.quiz_anchor}</p>
                    <Link href="/quiz/lifestyle-match" className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition-colors shadow-lg">
                        Take the Quiz
                    </Link>
                    {page.cta.secondary_anchor && (
                        <div className="mt-4">
                            <a href="#" className="text-indigo-200 hover:text-white text-sm underline">
                                {page.cta.secondary_anchor}
                            </a>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
