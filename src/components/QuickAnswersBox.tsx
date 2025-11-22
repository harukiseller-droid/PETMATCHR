import React from "react";
import Link from "next/link";
import type { QuickAnswer, QuickAnswerCategory } from "@/lib/types";

export interface QuickAnswersBoxProps {
    title?: string;
    items: Pick<QuickAnswer, "question" | "answer" | "category">[];
    showViewAllLink?: boolean;
}

const categoryColors: Record<QuickAnswerCategory, string> = {
    Living: "text-brand-orange",
    Costs: "text-brand-teal",
    Health: "text-brand-red",
    Training: "text-brand-teal",
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
                <h2 className="text-2xl font-bold text-brand-navy">{title}</h2>
                {showViewAllLink && (
                    <Link
                        href="/answers"
                        className="text-xs font-bold text-brand-teal hover:text-brand-teal/80"
                    >
                        View more answers
                    </Link>
                )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {items.map((qa, i) => (
                    <article
                        key={i}
                        className="bg-white rounded-card border border-brand-border shadow-card p-4"
                    >
                        <div
                            className={`text-xs font-bold uppercase mb-1 ${categoryColors[qa.category] ?? "text-brand-navy/60"
                                }`}
                        >
                            {qa.category}
                        </div>
                        <h3 className="text-sm font-bold text-brand-navy mb-1">{qa.question}</h3>
                        <p className="text-sm text-brand-navy/90">{qa.answer}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

