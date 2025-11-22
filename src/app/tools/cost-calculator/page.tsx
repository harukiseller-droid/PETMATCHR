import { Metadata } from "next";
import { getBreeds, getCities } from "@/lib/data";
import CostCalculatorClient from "./CostCalculatorClient";

export const metadata: Metadata = {
    title: "Dog Cost Calculator | PetMatchr",
    description:
        "Rough calculator to see if your monthly budget matches the real-world costs of owning different dog breeds in your city.",
};

export default async function CostCalculatorPage() {
    const [breeds, cities] = await Promise.all([getBreeds(), getCities()]);

    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900 py-12 px-4">
            <div className="max-w-5xl mx-auto space-y-10">
                <header className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Dog Cost Calculator
                    </h1>
                    <p className="text-sm md:text-base text-neutral-600 max-w-2xl">
                        Use this quick, opinionated calculator to sanity-check whether your monthly budget fits the real cost
                        ranges for different breeds in different cities. It’s not exact quotes – it’s a reality check.
                    </p>
                </header>
                <CostCalculatorClient breeds={breeds} cities={cities} />
            </div>
        </main>
    );
}

