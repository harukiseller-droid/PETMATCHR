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
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-primary-600 p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-2">{resultBucket.title}</h2>
                    <p className="text-primary-100">Based on your answers</p>
                </div>
                <div className="p-8 text-center">
                    <p className="text-xl text-neutral-700 mb-8">{resultBucket.description}</p>

                    <a
                        href={ctaUrl}
                        className="inline-block bg-primary-600 text-white font-bold py-4 px-10 rounded-full hover:bg-primary-700 transition-transform transform hover:scale-105 shadow-lg"
                    >
                        {ctaLabel}
                    </a>

                    <button
                        onClick={() => window.location.reload()}
                        className="block mt-6 mx-auto text-neutral-500 hover:text-primary-600 text-sm underline"
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
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-right text-xs text-neutral-500 mt-1">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                    {currentQuestion.text}
                </h2>

                <div className="space-y-4">
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(option.score)}
                            className="w-full text-left p-4 rounded-xl border-2 border-neutral-200 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
                        >
                            <span className="font-medium text-neutral-700 group-hover:text-primary-700">
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
