import { Metadata } from "next";
import { getBreeds, getCities } from "@/lib/data";

export const metadata: Metadata = {
    title: "Breed Cost Comparison | PetMatchr",
    description:
        "Compare rough first-year and monthly cost ranges for two dog breeds side-by-side, adjusted for your city.",
};

function computeCosts(breed: any, city: any) {
    const foodMin = breed.monthly_cost_min_usd;
    const foodMax = breed.monthly_cost_max_usd;
    const cityFactor = city.cost_of_living_factor ?? 1;
    const vetFactor = city.vet_cost_factor ?? 1;

    const monthly_min = Math.round(foodMin * cityFactor + 30 * vetFactor);
    const monthly_max = Math.round(foodMax * cityFactor + 60 * vetFactor);

    const year1Base = breed.year1_cost_min_usd;
    const year1High = breed.year1_cost_max_usd;
    const first_year_min = Math.round(year1Base * cityFactor);
    const first_year_max = Math.round(year1High * cityFactor);

    return { monthly_min, monthly_max, first_year_min, first_year_max };
}

export default async function BreedCostComparisonPage() {
    const [breeds, cities] = await Promise.all([getBreeds(), getCities()]);
    const city = cities[0];
    const [b1, b2] = breeds;

    if (!city || !b1 || !b2) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Breed Cost Comparison</h1>
                    <p className="text-sm text-slate-400">
                        Add more breeds and cities to the data directory to enable this view.
                    </p>
                </div>
            </main>
        );
    }

    const c1 = computeCosts(b1, city);
    const c2 = computeCosts(b2, city);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
            <div className="max-w-5xl mx-auto space-y-10">
                <header className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Breed Cost Comparison
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 max-w-2xl">
                        This is a simple, internal-facing view to compare two example breeds in{" "}
                        {city.name}, {city.state}. You can expand it later into a full tool if it proves useful.
                    </p>
                </header>

                <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-xs uppercase tracking-wide text-slate-400">
                                <th className="py-2 pr-4 text-left">Metric</th>
                                <th className="py-2 px-4 text-left">{b1.name}</th>
                                <th className="py-2 px-4 text-left">{b2.name}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="py-3 pr-4 text-slate-400">First year total (approx)</td>
                                <td className="py-3 px-4">
                                    ${c1.first_year_min.toLocaleString()} – ${c1.first_year_max.toLocaleString()}
                                </td>
                                <td className="py-3 px-4">
                                    ${c2.first_year_min.toLocaleString()} – ${c2.first_year_max.toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 pr-4 text-slate-400">Ongoing monthly cost</td>
                                <td className="py-3 px-4">
                                    ${c1.monthly_min} – ${c1.monthly_max}
                                </td>
                                <td className="py-3 px-4">
                                    ${c2.monthly_min} – ${c2.monthly_max}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 pr-4 text-slate-400">Cost level (1–5)</td>
                                <td className="py-3 px-4">{b1.cost_level}</td>
                                <td className="py-3 px-4">{b2.cost_level}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </main>
    );
}

