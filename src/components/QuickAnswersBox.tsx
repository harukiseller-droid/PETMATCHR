import React from "react";
import Link from "next/link";
import type { QuickAnswer, QuickAnswerCategory } from "@/lib/types";

export interface QuickAnswersBoxProps {
    title?: string;
    items: Pick<QuickAnswer, "question" | "answer" | "category">[];
    showViewAllLink?: boolean;
}

const categoryColors: Record<QuickAnswerCategory, string> = {
    Living: "text-emerald-500",
    Costs: "text-amber-500",
    Health: "text-rose-500",
    Training: "text-indigo-500",
};

export default function QuickAnswersBox({
    title = "Quick answers",
    items,
    showViewAllLink = true,
}: QuickAnswersBoxProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                {showViewAllLink && (
                    <Link
                        href="/answers"
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        View more answers
                    </Link>
                )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {items.map((qa, i) => (
                    <article
                        key={i}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
                    >
                        <div
                            className={`text-xs font-semibold uppercase mb-1 ${categoryColors[qa.category] ?? "text-gray-500"
                                }`}
                        >
                            {qa.category}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1">{qa.question}</h3>
                        <p className="text-sm text-gray-600">{qa.answer}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

