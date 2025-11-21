// FILE: src/app/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "PetMatchr | Find the Right Dog Breed for Your Real Life",
    description:
        "Use PetMatchr to find the right dog breed for your lifestyle, budget, and home. See real ownership costs, behavior risks, and anxiety patterns before you bring a dog home.",
    openGraph: {
        title: "PetMatchr | Find the Right Dog Breed for Your Real Life",
        description:
            "Match with dog breeds based on your lifestyle, not just cute photos. See costs, behavior risks, and anxiety patterns in plain language.",
        url: "https://petmatchr.com",
        type: "website"
    }
};

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            {/* Hero */}
            <section className="border-b border-slate-800">
                <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:justify-between md:py-20">
                    <div className="max-w-xl space-y-6">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">
                            PetMatchr · Dog Decision Engine
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
                            Find the right dog breed{" "}
                            <span className="text-emerald-300">for your real life</span>,
                            not just a cute photo.
                        </h1>
                        <p className="text-base text-slate-200 md:text-lg">
                            PetMatchr looks at your lifestyle, schedule, budget, and home,
                            then shows you which breeds actually fit — with honest pros,
                            cons, and long-term costs in plain English.
                        </p>

                        {/* Primary CTAs */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <Link
                                href="/quiz/lifestyle-match"
                                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                            >
                                Take the 60-second lifestyle quiz
                            </Link>
                            <Link
                                href="/breeds/golden-retriever"
                                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:text-white"
                            >
                                See a real breed example
                            </Link>
                        </div>

                        {/* Trust bullets */}
                        <ul className="space-y-1 text-sm text-slate-300">
                            <li>• Honest pros and cons by lifestyle, not generic blog fluff.</li>
                            <li>• Realistic cost ranges and emergency risk for your situation.</li>
                            <li>• Behavior and anxiety risks explained in simple, actionable steps.</li>
                        </ul>
                    </div>

                    <div className="mt-4 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg shadow-black/40 md:mt-0">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Quick preview: Golden Retriever
                        </h2>
                        <p className="mt-2 text-xs text-slate-300">
                            Friendly, social, high-shedding, and needs real exercise. Great
                            for active families with time and budget — rough fit for tiny
                            apartments and low-energy homes.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-200">
                            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                                <p className="font-semibold text-emerald-300">Living fit</p>
                                <p className="mt-1 text-[11px] text-slate-300">
                                    Best with active owners and space to move. Not ideal for
                                    ultra-busy single owners.
                                </p>
                            </div>
                            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                                <p className="font-semibold text-emerald-300">Cost & risk</p>
                                <p className="mt-1 text-[11px] text-slate-300">
                                    Medium–high ongoing costs. Insurance often makes sense for
                                    surprise vet bills.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 text-xs">
                            <Link
                                href="/cost/golden-retriever-austin-tx"
                                className="text-emerald-300 underline-offset-2 hover:underline"
                            >
                                See real-life cost breakdown →
                            </Link>
                            <Link
                                href="/problems/golden-retriever-separation-anxiety"
                                className="text-emerald-300 underline-offset-2 hover:underline"
                            >
                                See common behavior & anxiety issues →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="border-b border-slate-800 bg-slate-950">
                <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
                    <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                        How PetMatchr works
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                        Instead of dumping a giant list of breeds on you, PetMatchr scores
                        each breed against your lifestyle, money, and home — then shows you
                        where things are likely to go wrong.
                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                                Step 1
                            </p>
                            <h3 className="mt-2 text-base font-semibold text-slate-50">
                                Tell us how you actually live
                            </h3>
                            <p className="mt-2 text-sm text-slate-300">
                                Quick quiz about your schedule, space, family, energy, and
                                budget. No judgment, just reality.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                                Step 2
                            </p>
                            <h3 className="mt-2 text-base font-semibold text-slate-50">
                                We score every breed against you
                            </h3>
                            <p className="mt-2 text-sm text-slate-300">
                                Our engine weighs energy, shedding, health risks, training
                                difficulty, and more to flag good and bad matches.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                                Step 3
                            </p>
                            <h3 className="mt-2 text-base font-semibold text-slate-50">
                                You get clear, honest next steps
                            </h3>
                            <p className="mt-2 text-sm text-slate-300">
                                See best-fit breeds, cost expectations, behavior risks, and
                                where training or insurance really matter.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/quiz/lifestyle-match"
                            className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                        >
                            Start the lifestyle quiz
                        </Link>
                    </div>
                </div>
            </section>

            {/* Browse by what you care about */}
            <section className="border-b border-slate-800 bg-slate-950">
                <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
                    <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                        Browse by what you actually care about
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                        Already have a few breeds in mind? Or just worried about costs or
                        behavior? Jump straight into the area that matters most to you.
                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                Explore breeds
                            </h3>
                            <p className="text-sm text-slate-300">
                                Honest guides for each breed: personality, exercise, shedding,
                                kids, apartments, and more.
                            </p>
                            <Link
                                href="/breeds/golden-retriever"
                                className="text-sm font-semibold text-emerald-300 underline-offset-2 hover:underline"
                            >
                                View a breed guide →
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                See real-world costs
                            </h3>
                            <p className="text-sm text-slate-300">
                                First-year vs monthly costs, emergency fund ranges, and when
                                insurance actually makes sense.
                            </p>
                            <Link
                                href="/cost/golden-retriever-austin-tx"
                                className="text-sm font-semibold text-emerald-300 underline-offset-2 hover:underline"
                            >
                                Check a cost breakdown →
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                Fix behavior & anxiety
                            </h3>
                            <p className="text-sm text-slate-300">
                                Separation anxiety, barking, reactivity, and more — explained
                                by breed with step-by-step plans.
                            </p>
                            <Link
                                href="/problems/golden-retriever-separation-anxiety"
                                className="text-sm font-semibold text-emerald-300 underline-offset-2 hover:underline"
                            >
                                See a problem guide →
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                Compare two breeds
                            </h3>
                            <p className="text-sm text-slate-300">
                                Torn between two options? Get a clear verdict with trade-offs
                                for your home, not someone else&apos;s.
                            </p>
                            <Link
                                href="/compare/golden-retriever-vs-labrador-apartments"
                                className="text-sm font-semibold text-emerald-300 underline-offset-2 hover:underline"
                            >
                                See a comparison example →
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                Anxiety & calming support
                            </h3>
                            <p className="text-sm text-slate-300">
                                Understand anxiety patterns by breed and when calming tools or
                                vet guidance are worth exploring.
                            </p>
                            <Link
                                href="/anxiety/golden-retriever-separation-anxiety"
                                className="text-sm font-semibold text-emerald-300 underline-offset-2 hover:underline"
                            >
                                Explore an anxiety profile →
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                Dog life in your city
                            </h3>
                            <p className="text-sm text-slate-300">
                                Climate, vet costs, and dog-friendliness for your city — plus
                                breeds that thrive (or struggle) there.
                            </p>
                            <Link
                                href="/locations/austin-tx"
                                className="text-sm font-semibold text-emerald-300 underline-offset-2 hover:underline"
                            >
                                See a city example →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who it's for */}
            <section className="border-b border-slate-800 bg-slate-950">
                <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
                    <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                        Built for people who want a dog for the next 10–15 years,{" "}
                        <span className="text-emerald-300">not just the next 10 days</span>.
                    </h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                First-time dog owners
                            </h3>
                            <p className="mt-2 text-sm text-slate-300">
                                You want your first dog to be a good fit, not a constant
                                crisis. PetMatchr flags breeds that are too intense for beginners.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                Busy city workers & families
                            </h3>
                            <p className="mt-2 text-sm text-slate-300">
                                Long hours, kids, small spaces — we highlight breeds that cope
                                well and warn you when the match is risky.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                People burned by bad matches before
                            </h3>
                            <p className="mt-2 text-sm text-slate-300">
                                If you&apos;ve had a rough experience with behavior, reactivity,
                                or big bills, PetMatchr helps you choose differently this time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ / Answers tease */}
            <section className="bg-slate-950">
                <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
                    <div className="grid gap-10 md:grid-cols-[1.5fr,1fr] md:items-start">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                                Common questions about picking a dog
                            </h2>
                            <div className="mt-6 space-y-4 text-sm text-slate-200">
                                <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <summary className="cursor-pointer text-sm font-semibold text-slate-50">
                                        What if I&apos;m torn between two breeds?
                                    </summary>
                                    <p className="mt-3 text-sm text-slate-300">
                                        Use our comparison pages to see a clear verdict and
                                        trade-offs for your home, not generic pros and cons.
                                        You&apos;ll see where each breed shines, where it struggles,
                                        and what that means for your daily life.
                                    </p>
                                </details>
                                <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <summary className="cursor-pointer text-sm font-semibold text-slate-50">
                                        Can PetMatchr replace talking to a breeder, rescue, or vet?
                                    </summary>
                                    <p className="mt-3 text-sm text-slate-300">
                                        No. PetMatchr helps you narrow down options and spot
                                        red flags before you fall in love with a photo. Final
                                        decisions should still involve real conversations with
                                        breeders, rescues, and your vet.
                                    </p>
                                </details>
                                <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <summary className="cursor-pointer text-sm font-semibold text-slate-50">
                                        Does this tell me exactly how much I&apos;ll spend?
                                    </summary>
                                    <p className="mt-3 text-sm text-slate-300">
                                        We give realistic ranges and risk levels, not precise
                                        dollar predictions. Exact costs depend on your city,
                                        vet, and choices — but PetMatchr keeps you out of the
                                        &quot;I had no idea it would cost this much&quot; trap.
                                    </p>
                                </details>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                            <h3 className="text-base font-semibold text-slate-50">
                                Prefer quick answers?
                            </h3>
                            <p className="mt-2 text-sm text-slate-300">
                                We maintain a living library of bite-sized answers around costs,
                                behavior, and daily life with different breeds.
                            </p>
                            <Link
                                href="/answers"
                                className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                            >
                                Browse quick answers
                            </Link>
                            <p className="mt-4 text-xs text-slate-400">
                                Or jump straight into the quiz if you&apos;re ready to see which
                                breeds fit your real life, budget, and energy:
                            </p>
                            <Link
                                href="/quiz/lifestyle-match"
                                className="mt-2 inline-flex items-center justify-center rounded-full border border-emerald-400 px-5 py-2.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950"
                            >
                                Take the lifestyle quiz
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
