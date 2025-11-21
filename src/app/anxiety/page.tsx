import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dog Anxiety Guides | PetMatchr",
    description: "Expert guides on handling separation anxiety, noise phobias, and travel stress in dogs.",
};

export default function AnxietyIndexPage() {
    return (
        <main className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-50 mb-4">Dog Anxiety Guides</h1>
                    <p className="text-xl text-slate-400">
                        Help your dog feel safe, calm, and confident.
                    </p>
                </div>

                <div className="grid gap-6">
                    <Link
                        href="/anxiety/golden-retriever"
                        className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-purple-500/50 hover:bg-slate-900 transition-all"
                    >
                        <h2 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors">
                            Golden Retriever Anxiety
                        </h2>
                        <p className="text-slate-400 mb-4">
                            Specific tips for calming the sensitive Golden Retriever soul.
                        </p>
                        <div className="flex items-center text-sm font-medium text-purple-500">
                            Read Guide <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
