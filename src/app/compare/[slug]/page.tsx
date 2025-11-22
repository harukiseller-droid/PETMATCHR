import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ComparisonPageView from '@/components/ComparisonPageView';
import { ensureComparisonPage } from '@/lib/comparison-generator';
import { resolvePageCTAs } from '@/lib/cta';
import JsonLd from '@/components/JsonLd';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const parts = params.slug.split('-vs-');
    if (parts.length === 1) {
        // Hub page metadata
        return {
            title: `${params.slug.replace(/-/g, ' ')} Comparisons - PetMatchr`,
            description: `Compare ${params.slug.replace(/-/g, ' ')} with other popular dog breeds. Find the best match for your lifestyle.`
        };
    }
    if (parts.length !== 2) return { title: 'Comparison Not Found' };

    const title = `${parts[0].replace(/-/g, ' ')} vs ${parts[1].replace(/-/g, ' ')} - Honest Comparison`;
    return {
        title: title,
        description: `Compare ${parts[0]} and ${parts[1]} side-by-side. See which breed is better for your lifestyle, budget, and home.`
    };
}

export default async function ComparisonPage({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const { slug } = params;
    const parts = slug.split('-vs-');

    // --- HUB PAGE LOGIC (Single Breed) ---
    if (parts.length === 1) {
        const { getBreedBySlug } = await import("@/lib/data");
        const { getPagesByBreed } = await import("@/lib/internal-links");

        const breed = await getBreedBySlug(slug);
        if (!breed) return notFound();

        const { comparisonPages } = await getPagesByBreed(slug);

        return (
            <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-neutral-900 mb-4 capitalize">
                            {breed.name} Comparisons
                        </h1>
                        <p className="text-xl text-neutral-600">
                            See how the {breed.name} stacks up against other popular breeds.
                        </p>
                    </div>

                    {comparisonPages.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {comparisonPages.map((page) => (
                                <a
                                    key={page.slug}
                                    href={`/compare/${page.slug}`}
                                    className="block bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md hover:border-primary-500 transition-all"
                                >
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                                        {page.title}
                                    </h3>
                                    <span className="text-primary-600 font-medium text-sm">
                                        Read comparison &rarr;
                                    </span>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center bg-white rounded-xl p-12 border border-neutral-200">
                            <p className="text-neutral-500">
                                No comparisons available for the {breed.name} yet. Check back soon!
                            </p>
                            <a href="/breeds" className="inline-block mt-4 text-primary-600 font-medium hover:underline">
                                Browse all breeds
                            </a>
                        </div>
                    )}
                </div>
            </main>
        );
    }

    // --- COMPARISON PAGE LOGIC (A vs B) ---
    if (parts.length !== 2) {
        return notFound();
    }

    const [leftBreedSlug, rightBreedSlug] = parts;
    const primary_concern = typeof searchParams.primary_concern === 'string' ? searchParams.primary_concern : undefined;
    const user_profile = typeof searchParams.user_profile === 'string' ? searchParams.user_profile : undefined;

    // Call ensureComparisonPage directly
    // This might take a while (10-30s) if generating from scratch
    const result = await ensureComparisonPage({
        leftBreedSlug,
        rightBreedSlug,
        context: {
            primary_concern,
            user_profile
        }
    });

    if (!result.ok) {
        if (result.reason === "LLM_FAILED" || result.reason === "TIMEOUT") {
            // Show pending state
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-neutral-900 p-4 text-center">
                    <div className="w-16 h-16 border-4 border-secondary-500/30 border-t-secondary-500 rounded-full animate-spin mb-6"></div>
                    <h1 className="text-2xl font-bold mb-2">Generating Comparison...</h1>
                    <p className="text-neutral-500 max-w-md">
                        We’re analyzing thousands of data points to compare {leftBreedSlug.replace(/-/g, ' ')} and {rightBreedSlug.replace(/-/g, ' ')} just for you.
                    </p>
                    <p className="text-neutral-400 text-sm mt-4">
                        This usually takes about 20-30 seconds. Please refresh the page in a moment.
                    </p>
                </div>
            );
        } else if (result.reason === "INVALID_PAIR") {
            return notFound();
        } else {
            // MODE_OFF or LIMIT_REACHED
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-neutral-900 p-4 text-center">
                    <h1 className="text-2xl font-bold mb-2">Comparison Unavailable</h1>
                    <p className="text-neutral-500 max-w-md">
                        We cannot generate this comparison at the moment. Please try again later or browse our existing comparisons.
                    </p>
                    <a href="/compare" className="mt-6 text-secondary-600 hover:underline">Back to Compare</a>
                </div>
            );
        }
    }

    const ctaConfig = resolvePageCTAs({
        slug,
        page_type: 'comparison',
        cluster: 'generic',
        primary_funnel: 'lifestyle_quiz',
        secondary_funnels: [],
        primary_offer_type: 'none',
        secondary_offer_types: [],
        show_ads: true,
        show_email_capture: true,
        primary_quiz_slug: 'lifestyle-match',
        secondary_quiz_slugs: [],
        primary_campaign_id: null,
    }, result.page);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": result.page.h1,
        "description": result.page.meta.description,
        "author": {
            "@type": "Organization",
            "name": "PetMatchr"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://petmatchr.com/compare/${slug}`
        }
    };

    const qaSource = (result.page.quick_answers && result.page.quick_answers.length > 0
        ? result.page.quick_answers.map((qa) => ({ question: qa.question, answer: qa.answer }))
        : result.page.faq.map((f) => ({ question: f.question, answer: f.answer }))
    ).slice(0, 10);

    const faqJsonLd = qaSource.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": qaSource.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            }
        }))
    } : null;

    return (
        <>
            <JsonLd data={jsonLd} />
            {faqJsonLd && <JsonLd data={faqJsonLd} />}
            <ComparisonPageView page={result.page} ctaConfig={ctaConfig} />
        </>
    );
}
