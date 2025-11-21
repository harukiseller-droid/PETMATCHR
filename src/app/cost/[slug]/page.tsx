import { notFound } from "next/navigation";
import { getCostPageBySlug } from "@/lib/data";
import { getPageMonetization } from "@/lib/monetization";
import { resolvePageCTAs } from "@/lib/cta";
import CostPageView from "@/components/CostPageView";
import { Metadata } from "next";
import { getRelatedForPage } from "@/lib/internal-links";
import JsonLd from "@/components/JsonLd";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const page = await getCostPageBySlug(params.slug);
    if (!page) return {};

    return {
        title: page.meta.title,
        description: page.meta.description,
    };
}

export default async function CostPage({ params }: PageProps) {
    const { slug } = params;
    const page = await getCostPageBySlug(slug);
    const monetization = await getPageMonetization(slug);

    if (!page) {
        notFound();
    }

    // Resolve breed slug for back navigation
    const { getBreeds } = await import("@/lib/data");
    const breeds = await getBreeds();
    const breed = breeds.find(b => b.name === page.hero.breed_name);
    const breedSlug = breed?.slug;

    // Get related pages
    let relatedPages: any[] = [];
    if (breedSlug) {
        try {
            const related = await getRelatedForPage({
                page_type: 'cost',
                main_breed_slug: breedSlug,
                city_slug: page.local_context.city.toLowerCase().replace(/ /g, '-'), // Approximate slug
                limit_per_type: 2
            });
            relatedPages = [...related.primary_links, ...related.secondary_links];
        } catch (error) {
            console.error(`Failed to fetch related pages for cost page ${slug}:`, error);
            // Continue rendering page without related links
        }
    }

    const ctaConfig = monetization ? resolvePageCTAs(monetization, page) : {
        quizPrimary: null, quizSecondary: [], offerPrimary: null, offerSecondary: [], showAds: false, showEmailCapture: false
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": page.h1,
        "description": page.meta.description,
        "author": {
            "@type": "Organization",
            "name": "PetMatchr"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://petmatchr.com/cost/${slug}`
        }
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <CostPageView page={page} ctaConfig={ctaConfig} breedSlug={breedSlug} relatedPages={relatedPages} />
        </>
    );
}
