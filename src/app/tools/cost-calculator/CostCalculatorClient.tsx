"use client";

import { useMemo, useState } from "react";
import type { Breed, City } from "@/lib/types";
import Link from "next/link";

interface Props {
    breeds: Breed[];
    cities: City[];
}

type Result = {
    monthly_min: number;
    monthly_max: number;
    first_year_min: number;
    first_year_max: number;
    status: "within" | "stretch" | "unrealistic" | "no_budget";
};

export default function CostCalculatorClient({ breeds, cities }: Props) {
    const [breedSlug, setBreedSlug] = useState("");
    const [cityName, setCityName] = useState("");
    const [budget, setBudget] = useState<string>("");
    const [result, setResult] = useState<Result | null>(null);

    const selectedBreed = useMemo(
        () => breeds.find((b) => b.slug === breedSlug) || null,
        [breeds, breedSlug]
    );
    const selectedCity = useMemo(
        () => cities.find((c) => `${c.name}, ${c.state}` === cityName) || null,
        [cities, cityName]
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedBreed || !selectedCity) return;

        const budgetNum = Number(budget);

        // Very simple heuristic breakdown based on stored costs and city factors
        const foodMin = selectedBreed.monthly_cost_min_usd;
        const foodMax = selectedBreed.monthly_cost_max_usd;

        const cityFactor = selectedCity.cost_of_living_factor ?? 1;
        const vetFactor = selectedCity.vet_cost_factor ?? 1;

        const monthly_min = Math.round(foodMin * cityFactor + 30 * vetFactor);
        const monthly_max = Math.round(foodMax * cityFactor + 60 * vetFactor);

        const year1Base = selectedBreed.year1_cost_min_usd;
        const year1High = selectedBreed.year1_cost_max_usd;
        const first_year_min = Math.round(year1Base * cityFactor);
        const first_year_max = Math.round(year1High * cityFactor);

        let status: Result["status"] = "no_budget";
        if (!budgetNum || budgetNum <= 0) {
            status = "no_budget";
        } else if (budgetNum >= monthly_min && budgetNum <= monthly_max * 1.2) {
            status = "within";
        } else if (budgetNum >= monthly_min * 0.6 && budgetNum < monthly_min) {
            status = "stretch";
        } else {
            status = "unrealistic";
        }

        setResult({
            monthly_min,
            monthly_max,
            first_year_min,
            first_year_max,
            status,
        });
    }

    return (
        <div className="max-w-3xl mx-auto space-y-10">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Dog Cost Calculator</h2>
                <p className="text-sm text-gray-600">
                    Choose a breed, city, and rough monthly budget to see whether your plans are likely realistic, a stretch, or
                    not aligned with this dog’s typical costs.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Breed
                        </label>
                        <select
                            value={breedSlug}
                            onChange={(e) => setBreedSlug(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        >
                            <option value="">Select a breed</option>
                            {breeds.map((b) => (
                                <option key={b.slug} value={b.slug}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            City
                        </label>
                        <select
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        >
                            <option value="">Select a city</option>
                            {cities.map((c) => (
                                <option key={`${c.name}-${c.state}`} value={`${c.name}, ${c.state}`}>
                                    {c.name}, {c.state}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Monthly budget (USD)
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        placeholder="e.g. 250"
                    />
                    <p className="text-xs text-gray-500">
                        Include food, routine vet care, preventatives, grooming, and training in this number.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={!breedSlug || !cityName}
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Calculate costs
                </button>
            </form>

            {result && selectedBreed && selectedCity && (
                <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-slate-50 space-y-6">
                    <div>
                        <h3 className="text-lg font-bold">
                            {selectedBreed.name} in {selectedCity.name}, {selectedCity.state}
                        </h3>
                        <p className="text-sm text-slate-300 mt-1">
                            Costs are ballpark ranges based on food, vet care, and typical supplies – not exact quotes.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-slate-950/40 rounded-xl border border-slate-700 p-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
                                First year total
                            </h4>
                            <p className="text-2xl font-bold">
                                ${result.first_year_min.toLocaleString()} – ${result.first_year_max.toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Includes purchase/adoption, vet startup, and setup gear.
                            </p>
                        </div>
                        <div className="bg-slate-950/40 rounded-xl border border-slate-700 p-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
                                Ongoing monthly range
                            </h4>
                            <p className="text-2xl font-bold">
                                ${result.monthly_min} – ${result.monthly_max}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Food, preventatives, routine vet, grooming, and training.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-100">How does that compare to your budget?</h4>
                        {result.status === "no_budget" && (
                            <p className="text-sm text-slate-300">
                                Add a monthly budget above to see whether this range is realistic for you.
                            </p>
                        )}
                        {result.status === "within" && (
                            <p className="text-sm text-emerald-300">
                                Your budget is generally in the right range for this breed and city. You still need an emergency
                                fund or insurance for big surprises.
                            </p>
                        )}
                        {result.status === "stretch" && (
                            <p className="text-sm text-amber-300">
                                This is a stretch. You might make it work with careful choices and good luck, but you’d have very
                                little buffer for emergencies.
                            </p>
                        )}
                        {result.status === "unrealistic" && (
                            <p className="text-sm text-red-300">
                                This budget is likely not realistic for this breed and city. Consider a lower-cost breed, a higher
                                budget, or both.
                            </p>
                        )}
                    </div>

                    <div className="border-t border-slate-800 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="text-xs text-slate-400">
                            This tool is for planning only. Always talk to a vet and your own budget before making decisions.
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                            <Link
                                href={`/cost`}
                                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-3 py-1.5 font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
                            >
                                Browse cost guides
                            </Link>
                            <Link
                                href="/quiz/insurance-fit-quiz"
                                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-1.5 font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
                            >
                                Check insurance fit
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

