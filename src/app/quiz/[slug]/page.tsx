import { notFound } from "next/navigation";
import { getQuizBySlug } from "@/lib/quiz";
import QuizEngine from "@/components/QuizEngine";
import { Metadata } from "next";
import { getBreeds, getLifestyleScores } from "@/lib/data";
import LifestyleMatchClient from "./LifestyleMatchClient";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const quiz = await getQuizBySlug(params.slug);
    if (!quiz) return {};

    return {
        title: quiz.title,
        description: quiz.description,
    };
}

export default async function QuizPage({ params }: PageProps) {
    const { slug } = params;

    if (slug === "lifestyle-match") {
        const quiz = await getQuizBySlug(slug);
        if (!quiz) {
            notFound();
        }
        const breeds = await getBreeds();
        const lifestyleScores = await getLifestyleScores();

        return (
            <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{quiz.title}</h1>
                    <p className="text-xl text-gray-600">{quiz.description}</p>
                </div>
                <LifestyleMatchClient quiz={quiz} breeds={breeds} lifestyleScores={lifestyleScores} />
            </main>
        );
    }

    const quiz = await getQuizBySlug(slug);
    if (!quiz) notFound();

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{quiz.title}</h1>
                <p className="text-xl text-gray-600">{quiz.description}</p>
            </div>

            <QuizEngine quiz={quiz} />
        </main>
    );
}
