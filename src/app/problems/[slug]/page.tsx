import { notFound } from "next/navigation";
import { getProblemPageBySlug, getProblemPageV7BySlug } from "@/lib/data";
import { getAllStaticParams } from "@/lib/static-params";
import { getPageMonetization } from "@/lib/monetization";
import { resolvePageCTAs } from "@/lib/cta";
import ProblemPageView from "@/components/ProblemPageView";
import { Metadata } from "next";
import { getRelatedForPage } from "@/lib/internal-links";
import JsonLd from "@/components/JsonLd";
import { legacyProblemPageToV7 } from "@/lib/v7-mappers";
import type { ProblemV7Page } from "@/lib/types";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const v7 = await getProblemPageV7BySlug(params.slug);
    if (v7) {
        return {
            title: v7.meta.title,
            description: v7.meta.description,
        };
    }

    const legacy = await getProblemPageBySlug(params.slug);
    if (!legacy) return {};

    const mapped = legacyProblemPageToV7(legacy);
    return {
        title: mapped.meta.title,
        description: mapped.meta.description,
    };
}

export default async function ProblemPage({ params }: PageProps) {
    const { slug } = params;

    let page: ProblemV7Page | null = await getProblemPageV7BySlug(slug);
    if (!page) {
        const legacy = await getProblemPageBySlug(slug);
        if (!legacy) {
            notFound();
        }
        page = legacyProblemPageToV7(legacy);
    }

    const monetization = await getPageMonetization(slug);

    // Resolve breed slug from URL prefix
    const { getBreeds } = await import("@/lib/data");
    const breeds = await getBreeds();
    const breed = breeds.find((b) => slug.startsWith(b.slug));
    const breedSlug = breed?.slug;

    // Get related pages
    let relatedPages: any[] = [];
    if (breedSlug) {
        const related = await getRelatedForPage({
            page_type: "problem",
            main_breed_slug: breedSlug,
            problem_slug: slug.replace(`${breedSlug}-`, ""),
            limit_per_type: 2,
        });
        relatedPages = [...related.primary_links, ...related.secondary_links];
    }

    const ctaConfig = monetization ? resolvePageCTAs(monetization, page) : null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": page.h1,
        "description": page.meta.description,
        "step": page.what_you_can_try?.at_home_strategies?.map((step) => ({
            "@type": "HowToStep",
            "name": step,
            "text": step,
        })) || [],
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://petmatchr.com/problems/${slug}`,
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
            <ProblemPageView
                page={page}
                ctaConfig={ctaConfig}
                breedSlug={breedSlug}
                relatedPages={relatedPages}
            />
        </>
    );
}
