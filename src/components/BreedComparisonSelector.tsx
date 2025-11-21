'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breed } from '@/lib/types';

interface BreedComparisonSelectorProps {
    breeds: Breed[];
}

export default function BreedComparisonSelector({ breeds }: BreedComparisonSelectorProps) {
    const router = useRouter();
    const [breed1, setBreed1] = useState<string>('');
    const [breed2, setBreed2] = useState<string>('');
    const [primaryConcern, setPrimaryConcern] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sortedBreeds = [...breeds].sort((a, b) => a.name.localeCompare(b.name));

    const handleCompare = () => {
        if (!breed1 || !breed2) return;
        if (breed1 === breed2) {
            alert("Please select two different breeds.");
            return;
        }

        setIsSubmitting(true);

        // Canonical slug
        const slugs = [breed1, breed2].sort();
        const slug = `${slugs[0]}-vs-${slugs[1]}`;

        let url = `/compare/${slug}`;
        if (primaryConcern) {
            url += `?primary_concern=${encodeURIComponent(primaryConcern)}`;
        }

        router.push(url);
    };

    return (
        <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto border border-slate-800 bg-slate-900/50">
            <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">
                Compare Two Breeds
            </h2>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Breed 1</label>
                    <select
                        value={breed1}
                        onChange={(e) => setBreed1(e.target.value)}
                        className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-3 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    >
                        <option value="">Select a breed</option>
                        {sortedBreeds.map((breed) => (
                            <option key={breed.slug} value={breed.slug} disabled={breed.slug === breed2}>
                                {breed.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Breed 2</label>
                    <select
                        value={breed2}
                        onChange={(e) => setBreed2(e.target.value)}
                        className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-3 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    >
                        <option value="">Select a breed</option>
                        {sortedBreeds.map((breed) => (
                            <option key={breed.slug} value={breed.slug} disabled={breed.slug === breed1}>
                                {breed.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-8 space-y-2">
                <label className="text-sm font-medium text-slate-400">
                    What matters most to you? (Optional)
                </label>
                <select
                    value={primaryConcern}
                    onChange={(e) => setPrimaryConcern(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-3 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                >
                    <option value="">General comparison</option>
                    <option value="apartment_living">Apartment Living</option>
                    <option value="family_with_kids">Family with Kids</option>
                    <option value="busy_worker">Busy Schedule / Home Alone</option>
                    <option value="health_costs">Health & Costs</option>
                    <option value="low_maintenance">Low Maintenance</option>
                    <option value="active_outdoor">Active / Outdoor Companion</option>
                </select>
            </div>

            <button
                onClick={handleCompare}
                disabled={!breed1 || !breed2 || breed1 === breed2 || isSubmitting}
                className="w-full rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Loading...' : 'Compare Breeds'}
            </button>
        </div>
    );
}
