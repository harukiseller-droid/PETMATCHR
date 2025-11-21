import { notFound } from "next/navigation";
import {
    getBreedBySlug,
    getLifestyleScoreForBreed,
    getBreedPageBySlug,
    getCostPagesForBreed,
    getProblemPagesForBreed,
    getAnxietyPagesForBreed,
    getComparisonPagesForBreed
} from "@/lib/data";
import BreedPageView from "@/components/BreedPageView";
import { Metadata } from "next";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const breedPage = await getBreedPageBySlug(params.slug);
    if (!breedPage) return {};

    return {
        title: breedPage.meta.title,
        description: breedPage.meta.description,
    };
}

import JsonLd from "@/components/JsonLd";

export default async function BreedPage({ params }: PageProps) {
    const { slug } = params;
    const breed = await getBreedBySlug(slug);
    const scores = breed ? await getLifestyleScoreForBreed(breed.id) : null;
    const content = await getBreedPageBySlug(slug);

    if (!breed || !content) {
        notFound();
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
            "name": "PetMatchr"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://petmatchr.com/breeds/${slug}`
        }
    };

    return (
        <>
            <JsonLd data={jsonLd} />
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
