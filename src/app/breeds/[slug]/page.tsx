import { notFound } from "next/navigation";
import {
    getBreedBySlug,
    getLifestyleScoreForBreed,
    getBreedPageBySlug,
    getBreedPageV7BySlug,
    getCostPagesForBreed,
    getProblemPagesForBreed,
    getAnxietyPagesForBreed,
    getComparisonPagesForBreed,
} from "@/lib/data";
import BreedPageView from "@/components/BreedPageView";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { legacyBreedPageToV7 } from "@/lib/v7-mappers";
import type { BreedV7Page } from "@/lib/types";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const v7 = await getBreedPageV7BySlug(params.slug);
    if (v7) {
        return {
            title: v7.meta.title,
            description: v7.meta.description,
        };
    }

    const legacy = await getBreedPageBySlug(params.slug);
    if (!legacy) return {};

    const mapped = legacyBreedPageToV7(legacy);
    return {
        title: mapped.meta.title,
        description: mapped.meta.description,
    };
}

export async function generateStaticParams() {
    const { getAllStaticParams } = await import("@/lib/static-params");
    const params = getAllStaticParams();
    return params.breed || [];
}

export default async function BreedPage({ params }: PageProps) {
    const { slug } = params;
    const breed = await getBreedBySlug(slug);
    if (!breed) {
        notFound();
    }

    const scores = await getLifestyleScoreForBreed(breed.id);

    let content: BreedV7Page | null = await getBreedPageV7BySlug(slug);
    if (!content) {
        const legacy = await getBreedPageBySlug(slug);
        if (!legacy) {
            notFound();
        }
        content = legacyBreedPageToV7(legacy);
    }

    const costPages = await getCostPagesForBreed(slug);
    const problemPages = await getProblemPagesForBreed(slug);
    const anxietyPages = await getAnxietyPagesForBreed(slug);
    const comparisonPages = await getComparisonPagesForBreed(slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": content.h1,
        "description": content.meta.description,
        "image": breed.primary_image_url,
        "author": {
            "@type": "Organization",
            "name": "PetMatchr",
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://petmatchr.com/breeds/${slug}`,
        },
    };

    const qaSource = (content.quick_answers && content.quick_answers.length > 0
        ? content.quick_answers.map((qa) => ({ question: qa.question, answer: qa.answer }))
        : content.faq.map((f) => ({ question: f.question, answer: f.answer }))
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
            <BreedPageView
                breed={breed}
                scores={scores}
                content={content}
                costPages={costPages}
                problemPages={problemPages}
                anxietyPages={anxietyPages}
                comparisonPages={comparisonPages}
            />
        </>
    );
}
