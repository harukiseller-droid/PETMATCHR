import { notFound } from "next/navigation";
import { getGuidePageBySlug } from "@/lib/data";
import ListPageView from "@/components/ListPageView";
import { Metadata } from "next";
import { legacyListPageToV7 } from "@/lib/v7-mappers";
import JsonLd from "@/components/JsonLd";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const legacy = await getGuidePageBySlug(params.slug);
    if (!legacy) return {};

    const mapped = legacyListPageToV7(legacy);
    return {
        title: mapped.meta.title,
        description: mapped.meta.description,
    };
}

export default async function GuidePage({ params }: PageProps) {
    const legacy = await getGuidePageBySlug(params.slug);
    if (!legacy) {
        notFound();
    }
    const page = legacyListPageToV7(legacy);

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
            "@id": `https://petmatchr.com/guides/${params.slug}`,
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
            <ListPageView page={page} />
        </>
    );
}
