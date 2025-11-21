import React from 'react';
import { ComparisonPage, CTAConfig } from '@/lib/types';
import Link from 'next/link';

interface Props {
    page: ComparisonPage;
    ctaConfig: CTAConfig;
}

export default function ComparisonPageView({ page, ctaConfig }: Props) {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero */}
            <header className="mb-12 text-center">
                <div className="flex justify-center gap-4 mb-6 text-sm">
                    <Link href={`/breeds/${page.breed_1}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        &larr; Back to {page.breed_1.replace(/-/g, ' ')}
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href={`/breeds/${page.breed_2}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Back to {page.breed_2.replace(/-/g, ' ')} &rarr;
                    </Link>
                </div>
                <h1 className="text-4xl font-bold mb-4">{page.h1}</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{page.intro}</p>
            </header>

            {/* Comparison Table */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Head-to-Head Comparison</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border p-4 text-left">Feature</th>
                                <th className="border p-4 text-left">{page.breed_1}</th>
                                <th className="border p-4 text-left">{page.breed_2}</th>
                                <th className="border p-4 text-left">Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {page.comparison_points.map((point, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border p-4 font-medium text-gray-900">{point.point}</td>
                                    <td className="border p-4 text-gray-900">{point.breed_1_val}</td>
                                    <td className="border p-4 text-gray-900">{point.breed_2_val}</td>
                                    <td className="border p-4">
                                        <span className={`px-2 py-1 rounded text-sm ${point.winner === page.breed_1 ? 'bg-blue-100 text-blue-800' :
                                            point.winner === page.breed_2 ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {point.winner === 'tie' ? 'Tie' : point.winner}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">{point.note}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Verdict */}
            <section className="mb-12 bg-blue-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{page.verdict.title}</h2>
                <p className="text-lg mb-6">{page.verdict.content}</p>
                {page.cta.quiz_anchor && (
                    <div className="text-center">
                        <Link
                            href={`/quiz/${ctaConfig.quizPrimary?.quizSlug || 'lifestyle-match-quiz'}`}
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                        >
                            {page.cta.quiz_anchor}
                        </Link>
                    </div>
                )}
            </section>

            {/* FAQ */}
            {page.faq.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {page.faq.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border">
                                <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
