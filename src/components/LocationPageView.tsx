import React from 'react';
import { LocationPage, CTAConfig } from '@/lib/types';
import Link from 'next/link';

interface Props {
    page: LocationPage;
    ctaConfig: CTAConfig;
}

export default function LocationPageView({ page, ctaConfig }: Props) {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero */}
            <header className="mb-12 text-center">
                <span className="text-blue-600 font-bold tracking-wide uppercase text-sm">
                    {page.city}, {page.state}
                </span>
                <h1 className="text-4xl font-bold mt-2 mb-4">{page.h1}</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{page.intro}</p>
            </header>

            {/* Top Breeds */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Top Breeds for {page.city}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {page.top_breeds_for_city.map((breed, idx) => (
                        <div key={idx} className="border rounded-lg p-6 hover:shadow-md transition">
                            <Link href={`/breeds/${breed.slug}`} className="text-xl font-bold text-blue-600 hover:underline mb-2 block">
                                {breed.name}
                            </Link>
                            <p className="text-gray-600">{breed.reason}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Local Tips */}
            <section className="mb-12 bg-green-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Local Dog Owner Tips</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {page.local_tips.map((tip, idx) => (
                        <div key={idx}>
                            <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                            <p className="text-gray-700">{tip.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            {page.cta.quiz_anchor && (
                <section className="text-center py-12 border-t">
                    <h2 className="text-2xl font-bold mb-6">Find Your Perfect Match in {page.city}</h2>
                    <Link
                        href={`/quiz/${ctaConfig.quizPrimary?.quizSlug || 'lifestyle-match-quiz'}`}
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                        {page.cta.quiz_anchor}
                    </Link>
                </section>
            )}
        </div>
    );
}
