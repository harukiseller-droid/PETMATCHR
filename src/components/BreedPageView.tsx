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
        <main className="min-h-screen bg-page pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-brand-border">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-brand-navy tracking-tight sm:text-5xl mb-4">
                        {content.h1}
                    </h1>
                    <p className="text-xl text-brand-navy/80 max-w-2xl">
                        {content.intro.short_hook}
                    </p>
                    {(content.intro as any).who_this_breed_is_for && (
                        <p className="mt-4 text-brand-navy font-medium">
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
                            <div className="bg-brand-navy/5 p-6 rounded-card border border-brand-navy/10">
                                <h3 className="text-lg font-bold text-brand-navy mb-3">Good fit if...</h3>
                                <ul className="space-y-2">
                                    {lifestyle.best_for.map((item, i) => (
                                        <li key={i} className="flex items-start text-brand-navy">
                                            <span className="mr-2">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-brand-red/5 p-6 rounded-card border border-brand-red/10">
                                <h3 className="text-lg font-bold text-brand-red mb-3">Probably avoid if...</h3>
                                <ul className="space-y-2">
                                    {lifestyle.not_for.map((item, i) => (
                                        <li key={i} className="flex items-start text-brand-red">
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
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">{section.title}</h2>
                            <div className="prose prose-brand-navy max-w-none text-brand-navy/90">
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
                                                <h3 className="font-bold text-brand-teal mb-2">Pros</h3>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {section.pros.map((p, i) => (
                                                        <li key={i}>{p}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {section.cons && (
                                            <div>
                                                <h3 className="font-bold text-brand-red mb-2">Cons</h3>
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
                        <section className="bg-brand-gray p-6 rounded-card border border-brand-border">
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Cost snapshot</h2>
                            <p className="text-brand-navy/90 mb-4">{content.cost_snapshot.summary}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-brand-navy font-medium">
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
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Health & risks</h2>
                            <p className="text-brand-navy/90 mb-3">{content.health_and_risks.summary}</p>
                            {content.health_and_risks.common_issues.length > 0 && (
                                <ul className="list-disc pl-5 text-brand-navy/90 mb-3">
                                    {content.health_and_risks.common_issues.map((issue, i) => (
                                        <li key={i}>{issue}</li>
                                    ))}
                                </ul>
                            )}
                            <p className="text-brand-navy/90">{content.health_and_risks.lifecycle_considerations}</p>
                        </section>
                    )}

                    {/* Training & Behavior */}
                    {content.training_and_behavior && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Training & behavior</h2>
                            <p className="text-brand-navy/90 mb-3">{content.training_and_behavior.summary}</p>
                            {content.training_and_behavior.typical_challenges.length > 0 && (
                                <ul className="list-disc pl-5 text-brand-navy/90 mb-3">
                                    {content.training_and_behavior.typical_challenges.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            )}
                            <p className="text-brand-navy/90">{content.training_and_behavior.who_needs_professional_help}</p>
                        </section>
                    )}

                    {/* Case Study */}
                    {content.case_study && (
                        <section className="bg-brand-teal/5 p-6 rounded-card border border-brand-teal/20">
                            <h2 className="text-2xl font-bold text-brand-navy mb-2">{content.case_study.title}</h2>
                            <p className="text-brand-navy/90 mb-3 whitespace-pre-line">{content.case_study.story}</p>
                            <p className="text-sm font-bold text-brand-teal">
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
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Frequently asked questions</h2>
                            <div className="space-y-4">
                                {content.faq.map((item, i) => (
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

                    {/* Internal link suggestions */}
                    {content.internal_link_suggestions && content.internal_link_suggestions.length > 0 && (
                        <section className="border-t border-brand-border pt-8">
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Related PetMatchr guides</h2>
                            <ul className="space-y-2 text-sm">
                                {content.internal_link_suggestions.map((link, i) => (
                                    <li key={i} className="text-brand-navy/90">
                                        <span className="font-bold">{link.anchor_text}</span>
                                        <span className="text-brand-navy/60"> – {link.reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Related Guides (from index) */}
                    {hasRelatedGuides && (
                        <section className="border-t border-brand-border pt-12">
                            <h2 className="text-2xl font-bold text-brand-navy mb-6">More guides for {breed.name}</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {costPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/cost/${page.slug}`}
                                        className="block p-4 rounded-card border border-brand-border hover:border-brand-teal hover:shadow-card transition-all"
                                    >
                                        <span className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                                            Cost guide
                                        </span>
                                        <h3 className="font-bold text-brand-navy mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {problemPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/problems/${page.slug}`}
                                        className="block p-4 rounded-card border border-brand-border hover:border-brand-teal hover:shadow-card transition-all"
                                    >
                                        <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                                            Behavior issue
                                        </span>
                                        <h3 className="font-bold text-brand-navy mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {anxietyPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/anxiety/${page.slug}`}
                                        className="block p-4 rounded-card border border-brand-border hover:border-brand-teal hover:shadow-card transition-all"
                                    >
                                        <span className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                                            Anxiety
                                        </span>
                                        <h3 className="font-bold text-brand-navy mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                                {comparisonPages.map((page) => (
                                    <Link
                                        key={page.slug}
                                        href={`/compare/${page.slug}`}
                                        className="block p-4 rounded-card border border-brand-border hover:border-brand-teal hover:shadow-card transition-all"
                                    >
                                        <span className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                                            Compare
                                        </span>
                                        <h3 className="font-bold text-brand-navy mt-1">{page.meta.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-6 rounded-card shadow-card border border-brand-border sticky top-8">
                        <h3 className="text-lg font-bold text-brand-navy mb-6">Breed stats</h3>

                        <div className="space-y-4">
                            <StatBar label="Energy" value={breed.energy_level} />
                            <StatBar label="Shedding" value={breed.shedding_level} />
                            <StatBar label="Barking" value={breed.barking_level} />
                            <StatBar label="Trainability" value={breed.trainability} />
                            <StatBar label="Kid friendly" value={breed.kid_friendly} />
                            <StatBar label="Apartment friendly" value={breed.apartment_suitable} />
                        </div>

                        {scores && (
                            <div className="mt-8 pt-8 border-t border-brand-border">
                                <h3 className="text-lg font-bold text-brand-navy mb-4">Lifestyle scores</h3>
                                <div className="space-y-3">
                                    <ScoreBadge label="Apartment" score={scores.apartment_score} />
                                    <ScoreBadge label="Busy worker" score={scores.busy_worker_score} />
                                    <ScoreBadge label="Family" score={scores.family_with_kids_score} />
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-8 border-t border-brand-border">
                            <div className="text-sm text-brand-navy/60 mb-1 font-medium">Size</div>
                            <div className="font-bold capitalize text-brand-navy">{breed.size}</div>

                            <div className="text-sm text-brand-navy/60 mb-1 mt-4 font-medium">Lifespan</div>
                            <div className="font-bold text-brand-navy">
                                {breed.lifespan_min_years} - {breed.lifespan_max_years} years
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-brand-teal rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">
                        Still deciding if {breed.name} is your match?
                    </h2>
                    <p className="text-white/90 mb-8 text-lg">
                        Take the Lifestyle Match quiz to see how this breed fits your day-to-day life, schedule, and budget.
                    </p>
                    <Link
                        href="/quiz/lifestyle-match"
                        className="inline-block bg-white text-brand-teal font-bold py-3 px-8 rounded-full hover:brightness-95 transition-colors shadow-md"
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
        <div className="mb-4 text-brand-navy/90">
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
                                <figcaption className="text-center text-sm text-brand-navy/60 mt-2 italic font-medium">
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
                <span className="text-brand-navy/60 font-medium">{label}</span>
                <span className="font-bold text-brand-navy">{value}/5</span>
            </div>
            <div className="h-2 bg-brand-gray rounded-full overflow-hidden">
                <div
                    className="h-full bg-brand-teal rounded-full"
                    style={{ width: `${(value / 5) * 100}%` }}
                />
            </div>
        </div>
    );
}

function ScoreBadge({ label, score }: { label: string; score: number }) {
    let colorClass = "bg-brand-gray text-brand-navy";
    if (score >= 8) colorClass = "bg-brand-orange/10 text-brand-orange";
    else if (score >= 5) colorClass = "bg-brand-teal/10 text-brand-teal";
    else colorClass = "bg-brand-red/10 text-brand-red";

    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-brand-navy/60 font-medium">{label}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${colorClass}`}>
                {score}/10
            </span>
        </div>
    );
}
