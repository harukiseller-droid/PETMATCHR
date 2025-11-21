import { notFound } from "next/navigation";
import { getProblemPageBySlug } from "@/lib/data";
import { getPageMonetization } from "@/lib/monetization";
import { resolvePageCTAs } from "@/lib/cta";
import ProblemPageView from "@/components/ProblemPageView";
import { Metadata } from "next";
import { getRelatedForPage } from "@/lib/internal-links";
import JsonLd from "@/components/JsonLd";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const page = await getProblemPageBySlug(params.slug);
    if (!page) return {};

    return {
        title: page.meta.title,
        description: page.meta.description,
    };
}

export default async function ProblemPage({ params }: PageProps) {
    const { slug } = params;
    const page = await getProblemPageBySlug(slug);
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
        const related = await getRelatedForPage({
            page_type: 'problem',
            main_breed_slug: breedSlug,
            problem_slug: page.problem.toLowerCase().replace(/ /g, '-'), // Approximate slug
            limit_per_type: 2
        });
        relatedPages = [...related.primary_links, ...related.secondary_links];
    }

    const ctaConfig = monetization
        ? resolvePageCTAs(monetization, page)
        : null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": page.h1,
        "description": page.meta.description,
        "step": page.section_step_by_step_plan.steps.map(step => ({
            "@type": "HowToStep",
            "name": step.title,
            "text": step.detail
        })),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://petmatchr.com/problems/${slug}`
        }
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <ProblemPageView
                page={page}
                ctaConfig={ctaConfig}
                breedSlug={breedSlug}
                relatedPages={relatedPages}
            />
        </>
    );
}
