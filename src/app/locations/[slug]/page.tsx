import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationPageBySlug, getLocationPageV7BySlug } from '@/lib/data';
import { getPageMonetization } from '@/lib/monetization';
import { resolvePageCTAs } from '@/lib/cta';
import LocationPageView from '@/components/LocationPageView';
import { legacyLocationPageToV7 } from '@/lib/v7-mappers';
import type { LocationV7Page } from '@/lib/types';
import JsonLd from '@/components/JsonLd';
import { getAllStaticParams } from "@/lib/static-params";

export async function generateStaticParams() {
    const { getAllStaticParams } = await import("@/lib/static-params");
    const params = getAllStaticParams();
    return params.location || [];
}

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const v7 = await getLocationPageV7BySlug(params.slug);
    if (v7) {
        return {
            title: v7.meta.title,
            description: v7.meta.description,
        };
    }

    const legacy = await getLocationPageBySlug(params.slug);
    if (!legacy) return {};

    const mapped = legacyLocationPageToV7(legacy);
    return {
        title: mapped.meta.title,
        description: mapped.meta.description,
    };
}

export default async function LocationPage({ params }: Props) {
    let page: LocationV7Page | null = await getLocationPageV7BySlug(params.slug);
    if (!page) {
        const legacy = await getLocationPageBySlug(params.slug);
        if (!legacy) notFound();
        page = legacyLocationPageToV7(legacy);
    }

    const monetization = await getPageMonetization(params.slug);
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
            "@id": `https://petmatchr.com/locations/${params.slug}`
        }
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
            <LocationPageView page={page} ctaConfig={ctaConfig} />
        </>
    );
}
