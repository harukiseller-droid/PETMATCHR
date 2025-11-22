"use client";

import { useMemo, useState } from "react";
import type { QuizDefinition, QuizQuestion } from "@/lib/quiz-types";
import type { Breed, LifestyleScore } from "@/lib/types";
import { matchBreedsForPersona, LifestyleMatchResult } from "@/lib/lifestyle-match";
import Link from "next/link";

interface LifestyleMatchClientProps {
    quiz: QuizDefinition;
    breeds: Breed[];
    lifestyleScores: LifestyleScore[];
}

type AnswersMap = Record<string, string | string[]>;

export default function LifestyleMatchClient({ quiz, breeds, lifestyleScores }: LifestyleMatchClientProps) {
    const [phase, setPhase] = useState<1 | 2 | "result">(1);
    const [indexInPhase, setIndexInPhase] = useState(0);
    const [answers, setAnswers] = useState<AnswersMap>({});
    const [result, setResult] = useState<LifestyleMatchResult | null>(null);

    const phase1Questions = useMemo(
        () => quiz.questions.filter((q) => q.id.startsWith("profile_")),
        [quiz.questions]
    );
    const phase2Questions = useMemo(
        () => quiz.questions.filter((q) => q.id.startsWith("deep_")),
        [quiz.questions]
    );

    const currentQuestion: QuizQuestion | null =
        phase === 1
            ? phase1Questions[indexInPhase] ?? null
            : phase === 2
                ? phase2Questions[indexInPhase] ?? null
                : null;

    const totalQuestionsPhase1 = phase1Questions.length;
    const totalQuestionsPhase2 = phase2Questions.length;
    const answeredPhase1 = Object.keys(answers).filter((id) => id.startsWith("profile_")).length;
    const answeredPhase2 = Object.keys(answers).filter((id) => id.startsWith("deep_")).length;

    function handleSelect(questionId: string, value: string) {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));

        if (phase === 1) {
            if (indexInPhase < phase1Questions.length - 1) {
                setIndexInPhase(indexInPhase + 1);
            } else {
                // Phase 1 complete
                setPhase(2);
                setIndexInPhase(0);
            }
        } else if (phase === 2) {
            if (indexInPhase < phase2Questions.length - 1) {
                setIndexInPhase(indexInPhase + 1);
            } else {
                runMatch();
            }
        }
    }

    function runMatch() {
        const matchResult = matchBreedsForPersona({
            answers,
            breeds,
            lifestyleScores,
        });
        setResult(matchResult);
        setPhase("result");
    }

    const progressPhase1 = totalQuestionsPhase1
        ? Math.min(100, Math.round((answeredPhase1 / totalQuestionsPhase1) * 100))
        : 0;
    const progressPhase2 = totalQuestionsPhase2
        ? Math.min(100, Math.round((answeredPhase2 / totalQuestionsPhase2) * 100))
        : 0;

    if (phase === "result" && result) {
        return (
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="bg-indigo-600 rounded-2xl p-8 text-white text-center shadow-lg">
                    <h2 className="text-3xl font-bold mb-2">Your Dog Match Profile</h2>
                    <p className="text-xl font-semibold mb-3">{result.profile_label}</p>
                    <p className="text-indigo-100 max-w-2xl mx-auto">{result.description}</p>
                </div>

                <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Top breed matches</h3>
                    <p className="text-sm text-gray-600 mb-6">
                        These breeds line up best with your home, schedule, budget, and experience. They are not perfect guarantees,
                        but they are much safer starting points than random scrolling.
                    </p>
                    <div className="space-y-4">
                        {result.top_matches.map((match) => (
                            <div
                                key={match.breed_slug}
                                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="text-lg font-bold text-gray-900 capitalize">
                                            {match.breed_slug.replace(/-/g, " ")}
                                        </p>
                                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                            Match score: {match.match_score} / 100
                                        </span>
                                    </div>
                                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                                        {match.explanation_bullets.map((b, idx) => (
                                            <li key={idx}>{b}</li>
                                        ))}
                                    </ul>
                                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                                        <div>
                                            <dt className="font-medium text-gray-600">Energy</dt>
                                            <dd>{match.key_traits.energy_label}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-600">Apartment score</dt>
                                            <dd>{match.key_traits.apartment_score}/10</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-600">Kid friendly</dt>
                                            <dd>{match.key_traits.kid_friendly_score}/10</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-600">Shedding</dt>
                                            <dd className="capitalize">{match.key_traits.shedding_level} shedding</dd>
                                        </div>
                                        {match.key_traits.monthly_cost_range && (
                                            <div className="col-span-2">
                                                <dt className="font-medium text-gray-600">Typical monthly cost</dt>
                                                <dd>
                                                    ${match.key_traits.monthly_cost_range[0]} – ${match.key_traits.monthly_cost_range[1]}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                                <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
                                    <Link
                                        href={`/breeds/${match.breed_slug}`}
                                        className="col-span-2 inline-flex justify-center items-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                                    >
                                        View Full Profile
                                    </Link>
                                    <Link
                                        href={`/cost/${match.breed_slug}`}
                                        className="inline-flex justify-center items-center rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                                    >
                                        Cost
                                    </Link>
                                    <Link
                                        href={`/problems/${match.breed_slug}`}
                                        className="inline-flex justify-center items-center rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                                    >
                                        Health
                                    </Link>
                                    <Link
                                        href={`/anxiety/${match.breed_slug}`}
                                        className="inline-flex justify-center items-center rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                                    >
                                        Anxiety
                                    </Link>
                                    <Link
                                        href={`/compare/${match.breed_slug}`}
                                        className="inline-flex justify-center items-center rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                                    >
                                        Compare
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">What to do next</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        <li>Read at least one full breed guide for any match you’re serious about.</li>
                        <li>Open a cost breakdown for your top 1–2 breeds to reality-check your budget.</li>
                        <li>Share this list with anyone you live with so you’re aligned before you fall in love with a photo.</li>
                    </ul>
                </section>
            </div>
        );
    }

    if (!currentQuestion) {
        return null;
    }

    const totalQuestions = phase === 1 ? totalQuestionsPhase1 : totalQuestionsPhase2;
    const progress = phase === 1 ? progressPhase1 : progressPhase2;
    const questionNumberInPhase = indexInPhase + 1;

    const handleSkipDeepDive = () => {
        // Run matching based on whatever we have so far
        runMatch();
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center justify-between text-xs text-gray-500">
                <div>
                    <span className="font-semibold text-indigo-600">
                        {phase === 1 ? "Step 1 of 2 – Quick Profile" : "Step 2 of 2 – Deep Dive (optional)"}
                    </span>
                </div>
                <div>
                    Question {questionNumberInPhase} of {totalQuestions}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {currentQuestion.text}
                </h2>

                <div className="space-y-4">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(currentQuestion.id, option.value)}
                            className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
                        >
                            <span className="font-medium text-gray-700 group-hover:text-indigo-700">
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>

                {phase === 2 && (
                    <button
                        type="button"
                        onClick={handleSkipDeepDive}
                        className="mt-6 inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                    >
                        Skip deep dive and see matches
                    </button>
                )}
            </div>
        </div>
    );
}

