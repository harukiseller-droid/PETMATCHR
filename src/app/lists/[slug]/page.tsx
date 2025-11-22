import { notFound } from "next/navigation";
import { getListPageBySlug, getListPageV7BySlug } from "@/lib/data";
import ListPageView from "@/components/ListPageView";
import { Metadata } from "next";
import { legacyListPageToV7 } from "@/lib/v7-mappers";
import type { ListV7Page } from "@/lib/types";
import JsonLd from "@/components/JsonLd";
import { getAllStaticParams } from "@/lib/static-params";

export async function generateStaticParams() {
    const params = getAllStaticParams();
    // folder trong data là "list", không phải "lists"
    return params.list ?? [];
}

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const v7 = await getListPageV7BySlug(params.slug);
    if (v7) {
        return {
            title: v7.meta.title,
            description: v7.meta.description,
        };
    }

    const legacy = await getListPageBySlug(params.slug);
    if (!legacy) return {};

    const mapped = legacyListPageToV7(legacy);
    return {
        title: mapped.meta.title,
        description: mapped.meta.description,
    };
}

export default async function ListPage({ params }: PageProps) {
    let page: ListV7Page | null = await getListPageV7BySlug(params.slug);
    if (!page) {
        const legacy = await getListPageBySlug(params.slug);
        if (!legacy) {
            notFound();
        }
        page = legacyListPageToV7(legacy);
    }

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
            "@id": `https://petmatchr.com/lists/${params.slug}`,
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
