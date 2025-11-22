import { notFound } from "next/navigation";
import { getCostPageBySlug, getCostPageV7BySlug } from "@/lib/data";
import { getPageMonetization } from "@/lib/monetization";
import { resolvePageCTAs } from "@/lib/cta";
import CostPageView from "@/components/CostPageView";
import { Metadata } from "next";
import { getRelatedForPage } from "@/lib/internal-links";
import JsonLd from "@/components/JsonLd";
import { legacyCostPageToV7 } from "@/lib/v7-mappers";
import type { CostV7Page } from "@/lib/types";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const v7 = await getCostPageV7BySlug(params.slug);
    if (v7) {
        return {
            title: v7.meta.title,
            description: v7.meta.description,
        };
    }

    const legacy = await getCostPageBySlug(params.slug);
    if (!legacy) return {};

    const mapped = legacyCostPageToV7(legacy);
    return {
        title: mapped.meta.title,
        description: mapped.meta.description,
    };
}

export default async function CostPage({ params }: PageProps) {
    const { slug } = params;

    let page: CostV7Page | null = await getCostPageV7BySlug(slug);
    if (!page) {
        const legacy = await getCostPageBySlug(slug);
        if (!legacy) {
            notFound();
        }
        page = legacyCostPageToV7(legacy);
    }

    const monetization = await getPageMonetization(slug);

    // Resolve breed slug for back navigation from URL prefix
    const { getBreeds } = await import("@/lib/data");
    const breeds = await getBreeds();
    const breed = breeds.find((b) => slug.startsWith(b.slug));
    const breedSlug = breed?.slug;

    // Get related pages
    let relatedPages: any[] = [];
    if (breedSlug) {
        try {
            const related = await getRelatedForPage({
                page_type: "cost",
                main_breed_slug: breedSlug,
                city_slug: undefined,
                limit_per_type: 2,
            });
            relatedPages = [...related.primary_links, ...related.secondary_links];
        } catch (error) {
            console.error(`Failed to fetch related pages for cost page ${slug}:`, error);
        }
    }

    const ctaConfig = monetization
        ? resolvePageCTAs(monetization, page)
        : {
            quizPrimary: null,
            quizSecondary: [],
            offerPrimary: null,
            offerSecondary: [],
            showAds: false,
            showEmailCapture: false,
        };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": page.h1,
        "description": page.meta.description,
        "author": {
            "@type": "Organization",
            "name": "PetMatchr",
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://petmatchr.com/cost/${slug}`,
        },
    };

    const qaSource = (page.quick_answers && page.quick_answers.length > 0
        ? page.quick_answers.map((qa) => ({ question: qa.question, answer: qa.answer }))
        : page.faq.map((f) => ({ question: f.question, answer: f.answer }))
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
            <CostPageView page={page} ctaConfig={ctaConfig} breedSlug={breedSlug} relatedPages={relatedPages} />
        </>
    );
}
