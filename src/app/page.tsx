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
        <div className="relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Hero */}
            <section className="relative border-b border-slate-800/60">
                <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-20 md:flex-row md:items-center md:justify-between md:py-28">
                    <div className="max-w-xl space-y-8">
                        <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-sm">
                            <span className="mr-2 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            </span>
                            PetMatchr · Dog Decision Engine
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-slate-50 md:text-5xl lg:text-6xl text-balance leading-[1.1]">
                            Find the right dog breed{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                                for your real life
                            </span>,
                            not just a cute photo.
                        </h1>

                        <p className="text-lg text-slate-300 text-balance leading-relaxed">
                            PetMatchr looks at your lifestyle, schedule, budget, and home,
                            then shows you which breeds actually fit — with honest pros,
                            cons, and long-term costs in plain English.
                        </p>

                        {/* Primary CTAs */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/quiz/lifestyle-match"
                                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
                            >
                                Take the 60-second lifestyle quiz
                            </Link>
                            <Link
                                href="/breeds/golden-retriever"
                                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                            >
                                See a real breed example
                            </Link>
                        </div>

                        {/* Trust bullets */}
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Honest pros and cons by lifestyle, not generic blog fluff.
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Realistic cost ranges and emergency risk for your situation.
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Behavior and anxiety risks explained in simple, actionable steps.
                            </li>
                        </ul>
                    </div>

                    {/* Preview Card */}
                    <div className="glass-panel mt-8 w-full max-w-sm rounded-2xl p-6 shadow-2xl shadow-black/50 md:mt-0 transform transition hover:scale-[1.02] duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                                Golden Retriever
                            </h2>
                            <span className="px-2 py-1 rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">POPULAR</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mb-6">
                            Friendly, social, high-shedding, and needs real exercise. Great
                            for active families with time and budget — rough fit for tiny
                            apartments and low-energy homes.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="rounded-xl bg-slate-950/50 p-3 border border-slate-800">
                                <p className="font-semibold text-emerald-400 text-xs mb-1">Living fit</p>
                                <p className="text-[10px] text-slate-400 leading-snug">
                                    Best with active owners and space to move.
                                </p>
                            </div>
                            <div className="rounded-xl bg-slate-950/50 p-3 border border-slate-800">
                                <p className="font-semibold text-emerald-400 text-xs mb-1">Cost & risk</p>
                                <p className="text-[10px] text-slate-400 leading-snug">
                                    Medium–high ongoing costs.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 text-xs border-t border-slate-800 pt-4">
                            <Link
                                href="/cost/golden-retriever-austin-tx"
                                className="flex items-center justify-between text-slate-300 hover:text-emerald-300 transition-colors group"
                            >
                                <span>See real-life cost breakdown</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <Link
                                href="/problems/golden-retriever-separation-anxiety"
                                className="flex items-center justify-between text-slate-300 hover:text-emerald-300 transition-colors group"
                            >
                                <span>See behavior & anxiety issues</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="border-b border-slate-800/60 bg-slate-950/50">
                <div className="mx-auto max-w-5xl px-4 py-20">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-50 md:text-4xl mb-4">
                            How PetMatchr works
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Instead of dumping a giant list of breeds on you, we score
                            each breed against your lifestyle, money, and home.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                step: "Step 1",
                                title: "Tell us how you live",
                                desc: "Quick quiz about your schedule, space, family, energy, and budget. No judgment, just reality."
                            },
                            {
                                step: "Step 2",
                                title: "We score every breed",
                                desc: "Our engine weighs energy, shedding, health risks, training difficulty, and more to flag good and bad matches."
                            },
                            {
                                step: "Step 3",
                                title: "Get honest next steps",
                                desc: "See best-fit breeds, cost expectations, behavior risks, and where training or insurance really matter."
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel rounded-2xl p-8 hover:border-emerald-500/30 transition-colors group">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">
                                    {item.step}
                                </p>
                                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/quiz/lifestyle-match"
                            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
                        >
                            Start the lifestyle quiz
                        </Link>
                    </div>
                </div>
            </section>

            {/* Browse by what you care about */}
            <section className="border-b border-slate-800/60">
                <div className="mx-auto max-w-5xl px-4 py-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold text-slate-50 md:text-4xl mb-4">
                                Browse by what you actually care about
                            </h2>
                            <p className="text-slate-400">
                                Already have a few breeds in mind? Or just worried about costs or
                                behavior? Jump straight into the area that matters most to you.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                title: "Explore breeds",
                                desc: "Honest guides for each breed: personality, exercise, shedding, kids, apartments, and more.",
                                link: "/breeds/golden-retriever",
                                linkText: "View a breed guide"
                            },
                            {
                                title: "See real-world costs",
                                desc: "First-year vs monthly costs, emergency fund ranges, and when insurance actually makes sense.",
                                link: "/cost/golden-retriever-austin-tx",
                                linkText: "Check a cost breakdown"
                            },
                            {
                                title: "Fix behavior & anxiety",
                                desc: "Separation anxiety, barking, reactivity, and more — explained by breed with step-by-step plans.",
                                link: "/problems/golden-retriever-separation-anxiety",
                                linkText: "See a problem guide"
                            },
                            {
                                title: "Compare two breeds",
                                desc: "Torn between two options? Get a clear verdict with trade-offs for your home.",
                                link: "/compare/golden-retriever-vs-labrador-apartments",
                                linkText: "See a comparison example"
                            },
                            {
                                title: "Anxiety & calming",
                                desc: "Understand anxiety patterns by breed and when calming tools or vet guidance are worth exploring.",
                                link: "/anxiety/golden-retriever-separation-anxiety",
                                linkText: "Explore an anxiety profile"
                            },
                            {
                                title: "Dog life in your city",
                                desc: "Climate, vet costs, and dog-friendliness for your city — plus breeds that thrive there.",
                                link: "/locations/austin-tx",
                                linkText: "See a city example"
                            }
                        ].map((card, i) => (
                            <div key={i} className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/30 p-6 hover:bg-slate-900/50 transition-colors">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-100 mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-6">
                                        {card.desc}
                                    </p>
                                </div>
                                <Link
                                    href={card.link}
                                    className="text-sm font-semibold text-emerald-400 flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    {card.linkText} <span>→</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who it's for */}
            <section className="border-b border-slate-800/60 bg-slate-900/20">
                <div className="mx-auto max-w-5xl px-4 py-20">
                    <h2 className="text-3xl font-bold text-slate-50 md:text-4xl text-center max-w-3xl mx-auto mb-16 text-balance">
                        Built for people who want a dog for the next 10–15 years,{" "}
                        <span className="text-emerald-400">not just the next 10 days</span>.
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                title: "First-time dog owners",
                                desc: "You want your first dog to be a good fit, not a constant crisis. PetMatchr flags breeds that are too intense for beginners."
                            },
                            {
                                title: "Busy city workers",
                                desc: "Long hours, kids, small spaces — we highlight breeds that cope well and warn you when the match is risky."
                            },
                            {
                                title: "Burned by bad matches",
                                desc: "If you've had a rough experience with behavior, reactivity, or big bills, PetMatchr helps you choose differently this time."
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4 text-emerald-400 font-bold text-lg">
                                    {i + 1}
                                </div>
                                <h3 className="text-lg font-bold text-slate-100 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ / Answers tease */}
            <section className="bg-slate-950">
                <div className="mx-auto max-w-5xl px-4 py-20">
                    <div className="grid gap-12 md:grid-cols-[1.5fr,1fr] md:items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-50 md:text-3xl mb-8">
                                Common questions about picking a dog
                            </h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        q: "What if I'm torn between two breeds?",
                                        a: "Use our comparison pages to see a clear verdict and trade-offs for your home, not generic pros and cons."
                                    },
                                    {
                                        q: "Can PetMatchr replace talking to a breeder?",
                                        a: "No. PetMatchr helps you narrow down options and spot red flags before you fall in love with a photo."
                                    },
                                    {
                                        q: "Does this tell me exactly how much I'll spend?",
                                        a: "We give realistic ranges and risk levels. Exact costs depend on your city, vet, and choices."
                                    }
                                ].map((faq, i) => (
                                    <details key={i} className="group rounded-xl border border-slate-800 bg-slate-900/40 open:bg-slate-900/80 transition-colors">
                                        <summary className="cursor-pointer p-4 font-semibold text-slate-100 flex items-center justify-between">
                                            {faq.q}
                                            <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="px-4 pb-4 pt-0 text-sm text-slate-400 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel rounded-2xl p-8 text-center">
                            <h3 className="text-lg font-bold text-slate-100 mb-3">
                                Prefer quick answers?
                            </h3>
                            <p className="text-sm text-slate-400 mb-6">
                                We maintain a living library of bite-sized answers around costs,
                                behavior, and daily life with different breeds.
                            </p>
                            <Link
                                href="/answers"
                                className="inline-flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 px-6 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white w-full mb-6"
                            >
                                Browse quick answers
                            </Link>

                            <div className="border-t border-slate-800 pt-6">
                                <p className="text-xs text-slate-500 mb-3">
                                    Ready to find your match?
                                </p>
                                <Link
                                    href="/quiz/lifestyle-match"
                                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 w-full"
                                >
                                    Take the lifestyle quiz
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-slate-950 py-12">
                <div className="mx-auto max-w-5xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-lg font-bold text-slate-100">PetMatchr</p>
                        <p className="text-sm text-slate-500">© {new Date().getFullYear()} PetMatchr. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-400">
                        <Link href="/privacy" className="hover:text-slate-200">Privacy</Link>
                        <Link href="/terms" className="hover:text-slate-200">Terms</Link>
                        <Link href="/contact" className="hover:text-slate-200">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
