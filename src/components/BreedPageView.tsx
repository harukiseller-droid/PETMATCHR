import React from "react";
import {
    Breed,
    LifestyleScore,
    BreedV7Page,
    CostPage,
    ProblemPage,
    AnxietyPage,
    ComparisonPage,
} from "@/lib/types";
import Link from "next/link";
import QuickAnswersBox from "@/components/QuickAnswersBox";

interface BreedPageViewProps {
    breed: Breed;
    scores: LifestyleScore | null;
    content: BreedV7Page;
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
    comparisonPages = [],
}: BreedPageViewProps) {
    const hasRelatedGuides =
        costPages.length > 0 || problemPages.length > 0 || anxietyPages.length > 0 || comparisonPages.length > 0;

    const lifestyle = content.lifestyle_match;
    const sections = content.sections || [];

    return (
        <main className="min-h-screen bg-neutral-50 pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl mb-4">
                        {content.h1}
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl">
                        {content.intro.short_hook}
                    </p>
                    {(content.intro as any).who_this_breed_is_for && (
                        <p className="mt-4 text-neutral-700">
                            {(content.intro as any).who_this_breed_is_for}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Good Fit / Avoid */}
                    {lifestyle && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-secondary-50 p-6 rounded-xl border border-secondary-100">
                                <h3 className="text-lg font-bold text-secondary-900 mb-3">Good fit if...</h3>
                                <ul className="space-y-2">
                                    {lifestyle.best_for.map((item, i) => (
                                        <li key={i} className="flex items-start text-secondary-800">
                                            <span className="mr-2">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                <h3 className="text-lg font-bold text-red-900 mb-3">Probably avoid if...</h3>
                                <ul className="space-y-2">
                                    {lifestyle.not_for.map((item, i) => (
                                        <li key={i} className="flex items-start text-red-800">
                                            <span className="mr-2">!</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Dynamic sections from V7 outline */}
                    {sections.map((section) => (
                        <section key={section.id}>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">{section.title}</h2>
                            <div className="prose prose-primary max-w-none text-neutral-700">
                                {section.content && <MarkdownWithImages content={section.content} />}
                                {section.type === "list" && section.items && (
                                    <ul className="list-disc pl-5 space-y-2">
                                        {section.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                                {section.type === "pros_cons" && (section.pros || section.cons) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {section.pros && (
                                            <div>
                                                <h3 className="font-semibold text-secondary-700 mb-2">Pros</h3>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {section.pros.map((p, i) => (
                                                        <li key={i}>{p}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {section.cons && (
                                            <div>
                                                <h3 className="font-semibold text-red-700 mb-2">Cons</h3>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {section.cons.map((c, i) => (
                                                        <li key={i}>{c}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}

                    {/* Cost Snapshot */}
                    {content.cost_snapshot && (
                        <section className="bg-primary-50 p-6 rounded-2xl border border-primary-100">
                            <h2 className="text-2xl font-bold text-primary-900 mb-4">Cost snapshot</h2>
                            <p className="text-primary-800 mb-4">{content.cost_snapshot.summary}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-primary-900">
                                {content.cost_snapshot.first_year_range_usd && (
                                    <div>
                                        <div className="font-semibold">First year range</div>
                                        <div>
                                            ${content.cost_snapshot.first_year_range_usd[0]} – ${content.cost_snapshot.first_year_range_usd[1]}
                                        </div>
                                    </div>
                                )}
                                {content.cost_snapshot.monthly_range_usd && (
                                    <div>
                                        <div className="font-semibold">Monthly after year one</div>
                                        <div>
                                            ${content.cost_snapshot.monthly_range_usd[0]} – ${content.cost_snapshot.monthly_range_usd[1]}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Health & Risks */}
                    {content.health_and_risks && (
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Health & risks</h2>
                            <p className="text-neutral-700 mb-3">{content.health_and_risks.summary}</p>
                            {content.health_and_risks.common_issues.length > 0 && (
                                <ul className="list-disc pl-5 text-neutral-700 mb-3">
                                    {content.health_and_risks.common_issues.map((issue, i) => (
                                        <li key={i}>{issue}</li>
                                    ))}
                                </ul>
                            )}
                            <p className="text-neutral-700">{content.health_and_risks.lifecycle_considerations}</p>
                        </section>
                    )}

                    {/* Training & Behavior */}
                    {content.training_and_behavior && (
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Training & behavior</h2>
                            <p className="text-neutral-700 mb-3">{content.training_and_behavior.summary}</p>
                            {content.training_and_behavior.typical_challenges.length > 0 && (
                                <ul className="list-disc pl-5 text-neutral-700 mb-3">
                                    {content.training_and_behavior.typical_challenges.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            )}
                            <p className="text-neutral-700">{content.training_and_behavior.who_needs_professional_help}</p>
                        </section>
                    )}

                    {/* Case Study */}
                    {content.case_study && (
                        <section className="bg-primary-50 p-6 rounded-2xl border border-primary-100">
                            <h2 className="text-2xl font-bold text-primary-900 mb-2">{content.case_study.title}</h2>
                            <p className="text-primary-900 mb-3 whitespace-pre-line">{content.case_study.story}</p>
                            <p className="text-sm font-semibold text-primary-800">
                                Key takeaway: {content.case_study.key_takeaway}
                            </p>
                        </section>
                    )}

                    {/* Quick Answers */}
                    {content.quick_answers && content.quick_answers.length > 0 && (
                        <QuickAnswersBox items={content.quick_answers} />
                    )}

                    {/* FAQ */}
                    {content.faq && content.faq.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Frequently asked questions</h2>
                            <div className="space-y-4">
                                {content.faq.map((item, i) => (
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

                    {/* Internal link suggestions */}
                    {content.internal_link_suggestions && content.internal_link_suggestions.length > 0 && (
                        <section className="border-t border-neutral-200 pt-8">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Related PetMatchr guides</h2>
                            <ul className="space-y-2 text-sm">
                                {content.internal_link_suggestions.map((link, i) => (
                                    <li key={i} className="text-neutral-700">
                                        <span className="font-semibold">{link.anchor_text}</span>
                                        <span className="text-neutral-500"> – {link.reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Related Guides (from index) */}
                    {hasRelatedGuides && (
                        <section className="border-t border-neutral-200 pt-12">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6">More guides for {breed.name}</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {costPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/cost/${page.slug}`}
                                        className="block p-4 rounded-xl border border-neutral-200 hover:border-secondary-500 hover:shadow-sm transition-all"
                                    >
                                        <span className="text-xs font-bold text-secondary-600 uppercase tracking-wider">
                                            Cost guide
                                        </span>
                                        <h3 className="font-bold text-neutral-900 mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {problemPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/problems/${page.slug}`}
                                        className="block p-4 rounded-xl border border-neutral-200 hover:border-secondary-500 hover:shadow-sm transition-all"
                                    >
                                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                                            Behavior issue
                                        </span>
                                        <h3 className="font-bold text-neutral-900 mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {anxietyPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/anxiety/${page.slug}`}
                                        className="block p-4 rounded-xl border border-neutral-200 hover:border-secondary-500 hover:shadow-sm transition-all"
                                    >
                                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                                            Anxiety
                                        </span>
                                        <h3 className="font-bold text-neutral-900 mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {comparisonPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/compare/${page.slug}`}
                                        className="block p-4 rounded-xl border border-neutral-200 hover:border-secondary-500 hover:shadow-sm transition-all"
                                    >
                                        <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                                            Compare
                                        </span>
                                        <h3 className="font-bold text-neutral-900 mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 sticky top-8">
                        <h3 className="text-lg font-bold text-neutral-900 mb-6">Breed stats</h3>

                        <div className="space-y-4">
                            <StatBar label="Energy" value={breed.energy_level} />
                            <StatBar label="Shedding" value={breed.shedding_level} />
                            <StatBar label="Barking" value={breed.barking_level} />
                            <StatBar label="Trainability" value={breed.trainability} />
                            <StatBar label="Kid friendly" value={breed.kid_friendly} />
                            <StatBar label="Apartment friendly" value={breed.apartment_suitable} />
                        </div>

                        {scores && (
                            <div className="mt-8 pt-8 border-t border-neutral-100">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4">Lifestyle scores</h3>
                                <div className="space-y-3">
                                    <ScoreBadge label="Apartment" score={scores.apartment_score} />
                                    <ScoreBadge label="Busy worker" score={scores.busy_worker_score} />
                                    <ScoreBadge label="Family" score={scores.family_with_kids_score} />
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-8 border-t border-neutral-100">
                            <div className="text-sm text-neutral-500 mb-1">Size</div>
                            <div className="font-medium capitalize">{breed.size}</div>

                            <div className="text-sm text-neutral-500 mb-1 mt-4">Lifespan</div>
                            <div className="font-medium">
                                {breed.lifespan_min_years} - {breed.lifespan_max_years} years
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Still deciding if {breed.name} is your match?
                    </h2>
                    <p className="text-primary-100 mb-8 text-lg">
                        Take the Lifestyle Match quiz to see how this breed fits your day-to-day life, schedule, and budget.
                    </p>
                    <Link
                        href="/quiz/lifestyle-match"
                        className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-full hover:bg-primary-50 transition-colors"
                    >
                        Take the quiz
                    </Link>
                </div>
            </div>
        </main>
    );
}

function MarkdownWithImages({ content }: { content: string }) {
    if (!content) return null;

    // Split by image regex: ![alt](url)
    const parts = content.split(/(!\[.*?\]\(.*?\))/g);

    return (
        <div className="mb-4 text-neutral-700">
            {parts.map((part, i) => {
                const imgMatch = part.match(/!\[(.*?)\]\((.*?)\)/);
                if (imgMatch) {
                    return (
                        <figure key={i} className="my-6">
                            <img
                                src={imgMatch[2]}
                                alt={imgMatch[1]}
                                className="w-full h-auto rounded-xl shadow-md object-cover max-h-[500px]"
                            />
                            {imgMatch[1] && (
                                <figcaption className="text-center text-sm text-neutral-500 mt-2 italic">
                                    {imgMatch[1]}
                                </figcaption>
                            )}
                        </figure>
                    );
                }
                // Render text with newlines, avoiding empty spans
                if (!part) return null;
                return <span key={i} className="whitespace-pre-line">{part}</span>;
            })}
        </div>
    );
}

function StatBar({ label, value }: { label: string; value: number }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">{label}</span>
                <span className="font-medium text-neutral-900">{value}/5</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${(value / 5) * 100}%` }}
                />
            </div>
        </div>
    );
}

function ScoreBadge({ label, score }: { label: string; score: number }) {
    let colorClass = "bg-neutral-100 text-neutral-800";
    if (score >= 8) colorClass = "bg-secondary-100 text-secondary-800";
    else if (score >= 5) colorClass = "bg-primary-100 text-primary-800";
    else colorClass = "bg-red-100 text-red-800";

    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">{label}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${colorClass}`}>
                {score}/10
            </span>
        </div>
    );
}
