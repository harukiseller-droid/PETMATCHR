import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ComparisonPageView from '@/components/ComparisonPageView';
import { ensureComparisonPage } from '@/lib/comparison-generator';
import { CTAConfig } from '@/lib/types';
import JsonLd from '@/components/JsonLd';

export const dynamic = 'force-dynamic';

// Mock resolvePageCTAs if not available
function resolvePageCTAs(pageType: string, slug: string): CTAConfig {
    return {
        quizPrimary: {
            visible: true,
            quizSlug: 'lifestyle-match',
            label: 'Find your perfect match',
            description: 'Take our 60-second quiz'
        },
        quizSecondary: [],
        offerPrimary: null,
        offerSecondary: [],
        showAds: true,
        showEmailCapture: true
    };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const parts = params.slug.split('-vs-');
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
                <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 p-4 text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
                    <h1 className="text-2xl font-bold mb-2">Generating Comparison...</h1>
                    <p className="text-slate-400 max-w-md">
                        We're analyzing thousands of data points to compare {leftBreedSlug.replace(/-/g, ' ')} and {rightBreedSlug.replace(/-/g, ' ')} just for you.
                    </p>
                    <p className="text-slate-500 text-sm mt-4">
                        This usually takes about 20-30 seconds. Please refresh the page in a moment.
                    </p>
                </div>
            );
        } else if (result.reason === "INVALID_PAIR") {
            return notFound();
        } else {
            // MODE_OFF or LIMIT_REACHED
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 p-4 text-center">
                    <h1 className="text-2xl font-bold mb-2">Comparison Unavailable</h1>
                    <p className="text-slate-400 max-w-md">
                        We cannot generate this comparison at the moment. Please try again later or browse our existing comparisons.
                    </p>
                    <a href="/compare" className="mt-6 text-emerald-400 hover:underline">Back to Compare</a>
                </div>
            );
        }
    }

    const ctaConfig = resolvePageCTAs('comparison', slug);

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

    return (
        <>
            <JsonLd data={jsonLd} />
            <ComparisonPageView page={result.page} ctaConfig={ctaConfig} />
        </>
    );
}
