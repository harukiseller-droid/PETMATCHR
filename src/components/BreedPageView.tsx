import React from "react";
import { Breed, LifestyleScore, BreedPage, CostPage, ProblemPage, AnxietyPage, ComparisonPage } from "@/lib/types";
import Link from "next/link";

interface BreedPageViewProps {
    breed: Breed;
    scores: LifestyleScore | null;
    content: BreedPage;
    costPages?: CostPage[];
    problemPages?: ProblemPage[];
    anxietyPages?: AnxietyPage[];
    comparisonPages?: ComparisonPage[];
}

export default function BreedPageView({
    breed,
    scores,
    content,
    costPages = [],
    problemPages = [],
    anxietyPages = [],
    comparisonPages = []
}: BreedPageViewProps) {
    const hasRelatedGuides = costPages.length > 0 || problemPages.length > 0 || anxietyPages.length > 0 || comparisonPages.length > 0;

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                        {content.h1}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl">
                        {content.short_intro}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Good Fit / Avoid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <h3 className="text-lg font-bold text-green-900 mb-3">Good Fit If...</h3>
                            <ul className="space-y-2">
                                {content.good_fit_if.map((item, i) => (
                                    <li key={i} className="flex items-start text-green-800">
                                        <span className="mr-2">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <h3 className="text-lg font-bold text-red-900 mb-3">Avoid If...</h3>
                            <ul className="space-y-2">
                                {content.avoid_if.map((item, i) => (
                                    <li key={i} className="flex items-start text-red-800">
                                        <span className="mr-2">✗</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Personality */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.personality.title}</h2>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            {content.personality.paragraphs.map((p, i) => (
                                <p key={i} className="mb-4">{p}</p>
                            ))}
                        </div>
                    </section>

                    {/* Living Needs */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.living_needs.title}</h2>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            {content.living_needs.paragraphs.map((p, i) => (
                                <p key={i} className="mb-4">{p}</p>
                            ))}
                        </div>
                    </section>

                    {/* Time & Cost */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.time_and_cost.title}</h2>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            {content.time_and_cost.paragraphs.map((p, i) => (
                                <p key={i} className="mb-4">{p}</p>
                            ))}
                        </div>
                    </section>

                    {/* Lifestyle Summary */}
                    <section className="bg-blue-50 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">{content.lifestyle_summary.title}</h2>
                        <div className="prose prose-blue max-w-none text-blue-800">
                            {content.lifestyle_summary.paragraphs.map((p, i) => (
                                <p key={i} className="mb-4">{p}</p>
                            ))}
                        </div>
                    </section>

                    {/* Related Guides */}
                    {hasRelatedGuides && (
                        <section className="border-t border-gray-200 pt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Guides for {breed.name}s</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {costPages.map(page => (
                                    <Link key={page.slug} href={`/cost/${page.slug}`} className="block p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-sm transition-all">
                                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Cost</span>
                                        <h3 className="font-bold text-gray-900 mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {problemPages.map(page => (
                                    <Link key={page.slug} href={`/problems/${page.slug}`} className="block p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-sm transition-all">
                                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Problem</span>
                                        <h3 className="font-bold text-gray-900 mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {anxietyPages.map(page => (
                                    <Link key={page.slug} href={`/anxiety/${page.slug}`} className="block p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-sm transition-all">
                                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Anxiety</span>
                                        <h3 className="font-bold text-gray-900 mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {comparisonPages.map(page => (
                                    <Link key={page.slug} href={`/compare/${page.slug}`} className="block p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-sm transition-all">
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Compare</span>
                                        <h3 className="font-bold text-gray-900 mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Breed Stats</h3>

                        <div className="space-y-4">
                            <StatBar label="Energy" value={breed.energy_level} />
                            <StatBar label="Shedding" value={breed.shedding_level} />
                            <StatBar label="Barking" value={breed.barking_level} />
                            <StatBar label="Trainability" value={breed.trainability} />
                            <StatBar label="Kid Friendly" value={breed.kid_friendly} />
                            <StatBar label="Apartment Friendly" value={breed.apartment_suitable} />
                        </div>

                        {scores && (
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Lifestyle Scores</h3>
                                <div className="space-y-3">
                                    <ScoreBadge label="Apartment" score={scores.apartment_score} />
                                    <ScoreBadge label="Busy Worker" score={scores.busy_worker_score} />
                                    <ScoreBadge label="Family" score={scores.family_with_kids_score} />
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Size</div>
                            <div className="font-medium capitalize">{breed.size}</div>

                            <div className="text-sm text-gray-500 mb-1 mt-4">Lifespan</div>
                            <div className="font-medium">{breed.lifespan_min_years} - {breed.lifespan_max_years} years</div>
                        </div>

                    </div>
                </div>
            </div>

            {/* CTA Section */}
            {content.cta && (
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="bg-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">{content.cta.quiz_anchor_label || "Find Your Perfect Dog"}</h2>
                        <p className="text-indigo-100 mb-8 text-lg">{content.cta.quiz_anchor}</p>
                        <Link href="/quiz/lifestyle-match" className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition-colors">
                            Take the Quiz
                        </Link>
                    </div>
                </div>
            )}

        </main>
    );
}

function StatBar({ label, value }: { label: string; value: number }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{label}</span>
                <span className="font-medium text-gray-900">{value}/5</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${(value / 5) * 100}%` }}
                />
            </div>
        </div>
    );
}

function ScoreBadge({ label, score }: { label: string; score: number }) {
    let colorClass = "bg-gray-100 text-gray-800";
    if (score >= 8) colorClass = "bg-green-100 text-green-800";
    else if (score >= 5) colorClass = "bg-yellow-100 text-yellow-800";
    else colorClass = "bg-red-100 text-red-800";

    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{label}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${colorClass}`}>
                {score}/10
            </span>
        </div>
    )
}
