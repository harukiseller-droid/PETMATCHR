"use client";

import React, { useState } from 'react';
import { QuizDefinition, QuizResultBucket } from '@/lib/quiz-types';

interface QuizEngineProps {
    quiz: QuizDefinition;
}

export default function QuizEngine({ quiz }: QuizEngineProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResult, setShowResult] = useState(false);
    const [resultBucket, setResultBucket] = useState<QuizResultBucket | null>(null);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;
    const progress = ((currentQuestionIndex) / totalQuestions) * 100;

    const handleOptionSelect = (score: number) => {
        const newAnswers = { ...answers, [currentQuestion.id]: score };
        setAnswers(newAnswers);

        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: Record<string, number>) => {
        const totalScore = Object.values(finalAnswers).reduce((a, b) => a + b, 0);

        const results = quiz.result_mapping || quiz.results || [];
        const bucket = results.find(
            (r) => totalScore >= r.min_score && totalScore <= r.max_score
        );

        setResultBucket(bucket || results[0]); // Fallback to first result
        setShowResult(true);
    };

    const getCtaUrl = (action: string) => {
        switch (action) {
            case 'show_top_apartment_breeds': return '/lists/best-dogs-for-apartments';
            case 'show_family_friendly_breeds': return '/lists/best-family-dogs';
            case 'show_active_dog_breeds': return '/lists/best-active-dogs';
            case 'show_low_energy_breeds': return '/lists/best-low-energy-dogs';
            default: return '/breeds';
        }
    };

    if (showResult && resultBucket) {
        const ctaUrl = resultBucket.cta_url || getCtaUrl(resultBucket.primary_call_to_action);
        const ctaLabel = resultBucket.cta_label || "See Your Matches";

        return (
            <div className="max-w-2xl mx-auto bg-white rounded-card shadow-card overflow-hidden">
                <div className="bg-brand-teal p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-2">{resultBucket.title}</h2>
                    <p className="text-white/90">Based on your answers</p>
                </div>
                <div className="p-8 text-center">
                    <p className="text-xl text-brand-navy/90 mb-8">{resultBucket.description}</p>

                    <a
                        href={ctaUrl}
                        className="inline-block bg-brand-teal text-white font-bold py-4 px-10 rounded-full hover:brightness-95 transition-transform transform hover:scale-105 shadow-md"
                    >
                        {ctaLabel}
                    </a>

                    <button
                        onClick={() => window.location.reload()}
                        className="block mt-6 mx-auto text-brand-navy/60 hover:text-brand-teal text-sm underline font-medium"
                    >
                        Retake Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="h-2 bg-brand-gray rounded-full overflow-hidden">
                    <div
                        className="h-full bg-brand-teal transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-right text-xs text-brand-navy/60 mt-1 font-medium">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-card shadow-card p-8 border border-brand-border">
                <h2 className="text-2xl font-bold text-brand-navy mb-8">
                    {currentQuestion.text}
                </h2>

                <div className="space-y-4">
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(option.score)}
                            className="w-full text-left p-4 rounded-xl border-2 border-brand-border hover:border-brand-teal hover:bg-brand-teal/5 transition-all duration-200 group"
                        >
                            <span className="font-bold text-brand-navy group-hover:text-brand-teal">
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
