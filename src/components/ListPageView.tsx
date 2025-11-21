import React from "react";
import { ListPage } from "@/lib/types";
import Link from "next/link";

interface ListPageViewProps {
    page: ListPage;
}

export default function ListPageView({ page }: ListPageViewProps) {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                        {page.h1}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl">
                        {page.intro.description}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Ranking Table */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Ranked Breeds</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Why?</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {page.ranking_table.map((item, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-lg font-bold text-gray-900">#{item.rank}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-indigo-600">{item.breed_name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-green-600">{item.score}/10</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{item.one_line_reason}</div>
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
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    <Link href={`/breeds/${breed.breed_slug}`} className="hover:text-indigo-600 transition-colors">
                                        {breed.breed_name}
                                    </Link>
                                </h3>
                                <p className="text-gray-600 mb-4">{breed.description}</p>
                                <Link href={`/breeds/${breed.breed_slug}`} className="text-indigo-600 font-medium hover:underline">
                                    Read full profile →
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CTA */}
                <div className="mt-12 bg-indigo-600 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Find Your Perfect Match</h2>
                    <p className="text-indigo-100 mb-8">{page.cta.quiz_anchor}</p>
                    <Link href="/quiz/lifestyle-match" className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition-colors">
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
