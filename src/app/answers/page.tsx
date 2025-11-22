import Link from "next/link";
import { Metadata } from "next";
import { getAllQuickAnswers } from "@/lib/quick-answers";
import QuickAnswersClient from "./QuickAnswersClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "PetMatchr Answers Hub - Quizzes & Quick Guides",
    description: "Find quick answers to your dog questions and take our interactive quizzes.",
};

export default async function AnswersHubPage() {
    const quizzes = [
        {
            slug: "insurance-fit-quiz",
            title: "Is Pet Insurance Worth It?",
            description: "Find out if you need insurance in 60 seconds.",
            color: "bg-primary-500"
        },
        {
            slug: "behavior-check-quiz",
            title: "Behavior Assessment",
            description: "Is your dog's behavior normal or anxiety?",
            color: "bg-secondary-500"
        },
        {
            slug: "anxiety-level",
            title: "Anxiety Level Check",
            description: "See if your dog's anxiety is mild or needs pro help.",
            color: "bg-red-500"
        },
        {
            slug: "lifestyle-match",
            title: "Breed Lifestyle Match",
            description: "Find the perfect dog breed for your life.",
            color: "bg-secondary-600"
        }
    ];

    const quickAnswers = await getAllQuickAnswers();
    const faqEntities = quickAnswers.slice(0, 10).map((qa) => ({
        "@type": "Question",
        "name": qa.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": qa.answer,
        }
    }));

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqEntities
    };

    return (
        <main className="min-h-screen bg-neutral-50 pb-20">
            <JsonLd data={faqJsonLd} />
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl mb-4">
                        Answers Hub
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Interactive tools and quick guides to help you be the best dog parent possible.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-8">Popular Quizzes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {quizzes.map((quiz) => (
                        <Link
                            key={quiz.slug}
                            href={`/quiz/${quiz.slug}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className={`h-2 ${quiz.color}`} />
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {quiz.title}
                                    </h3>
                                    <p className="text-neutral-600 mb-4 flex-1">
                                        {quiz.description}
                                    </p>
                                    <span className="text-primary-600 font-medium text-sm group-hover:underline">
                                        Take Quiz →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Quick Guides</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
                        <p className="text-neutral-600 mb-4">
                            Browse our extensive library of breed guides, cost breakdowns, and problem solving articles.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/breeds/golden-retriever" className="text-primary-600 hover:underline">Golden Retrievers</Link>
                            <span className="text-neutral-300">|</span>
                            <Link href="/cost/golden-retriever-austin-tx" className="text-primary-600 hover:underline">Cost Guides</Link>
                            <span className="text-neutral-300">|</span>
                            <Link href="/problems/golden-retriever-separation-anxiety" className="text-primary-600 hover:underline">Problem Solving</Link>
                        </div>
                    </div>
                </div>

                <QuickAnswersClient items={quickAnswers} />
            </div>
        </main>
    );
}
