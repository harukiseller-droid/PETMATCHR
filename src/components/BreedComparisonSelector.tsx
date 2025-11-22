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
        <div className="bg-white p-8 rounded-card max-w-2xl mx-auto border border-brand-border shadow-card">
            <h2 className="text-2xl font-bold text-brand-navy mb-6 text-center">
                Compare Two Breeds
            </h2>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-brand-navy/60">Breed 1</label>
                    <select
                        value={breed1}
                        onChange={(e) => setBreed1(e.target.value)}
                        className="w-full rounded-lg bg-white border border-brand-border px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
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
                    <label className="text-sm font-medium text-brand-navy/60">Breed 2</label>
                    <select
                        value={breed2}
                        onChange={(e) => setBreed2(e.target.value)}
                        className="w-full rounded-lg bg-white border border-brand-border px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
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
                <label className="text-sm font-medium text-brand-navy/60">
                    What matters most to you? (Optional)
                </label>
                <select
                    value={primaryConcern}
                    onChange={(e) => setPrimaryConcern(e.target.value)}
                    className="w-full rounded-lg bg-white border border-brand-border px-4 py-3 text-brand-navy focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
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
                className="w-full rounded-full bg-brand-teal px-8 py-4 text-sm font-bold text-white transition-all hover:brightness-95 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Loading...' : 'Compare Breeds'}
            </button>
        </div>
    );
}
