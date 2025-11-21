import Link from "next/link";
import { getBreeds } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Dog Breeds | PetMatchr",
    description: "Browse our comprehensive list of dog breeds with honest pros, cons, and lifestyle ratings.",
};

export default async function BreedsIndexPage() {
    const breeds = await getBreeds();

    return (
        <main className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-50 mb-4">Explore Dog Breeds</h1>
                    <p className="text-xl text-slate-400">
                        Find the perfect match for your lifestyle with our honest breed guides.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {breeds.map((breed) => (
                        <Link
                            key={breed.id}
                            href={`/breeds/${breed.slug}`}
                            className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                                    {breed.name}
                                </h2>
                                <span className="px-2 py-1 rounded bg-slate-800 text-xs font-medium text-slate-400">
                                    {breed.size}
                                </span>
                            </div>

                            <p className="text-sm text-slate-400 line-clamp-3 mb-4">
                                {breed.notes_internal}
                            </p>

                            <div className="flex items-center text-sm font-medium text-emerald-500">
                                View Guide <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
