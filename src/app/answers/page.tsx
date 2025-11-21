import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "PetMatchr Answers Hub - Quizzes & Quick Guides",
    description: "Find quick answers to your dog questions and take our interactive quizzes.",
};

export default function AnswersHubPage() {
    const quizzes = [
        {
            slug: "insurance-fit-quiz",
            title: "Is Pet Insurance Worth It?",
            description: "Find out if you need insurance in 60 seconds.",
            color: "bg-blue-500"
        },
        {
            slug: "behavior-check-quiz",
            title: "Behavior Assessment",
            description: "Is your dog's behavior normal or anxiety?",
            color: "bg-purple-500"
        },
        {
            slug: "lifestyle-match-quiz",
            title: "Breed Lifestyle Match",
            description: "Find the perfect dog breed for your life.",
            color: "bg-green-500"
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                        Answers Hub
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Interactive tools and quick guides to help you be the best dog parent possible.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Quizzes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {quizzes.map((quiz) => (
                        <Link
                            key={quiz.slug}
                            href={`/quiz/${quiz.slug}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className={`h-2 ${quiz.color}`} />
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {quiz.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 flex-1">
                                        {quiz.description}
                                    </p>
                                    <span className="text-indigo-600 font-medium text-sm group-hover:underline">
                                        Take Quiz →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Guides</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                        <p className="text-gray-600 mb-4">
                            Browse our extensive library of breed guides, cost breakdowns, and problem solving articles.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/breeds/golden-retriever" className="text-indigo-600 hover:underline">Golden Retrievers</Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/cost/golden-retriever-cost-austin-texas" className="text-indigo-600 hover:underline">Cost Guides</Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/problems/golden-retriever-separation-anxiety" className="text-indigo-600 hover:underline">Problem Solving</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
