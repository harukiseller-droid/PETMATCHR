import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAnxietyPageBySlug, getAnxietyPageV7BySlug } from '@/lib/data';
import { getPageMonetization } from '@/lib/monetization';
import { resolvePageCTAs } from '@/lib/cta';
import AnxietyPageView from '@/components/AnxietyPageView';
import { getRelatedForPage } from '@/lib/internal-links';
import JsonLd from '@/components/JsonLd';
import { legacyAnxietyPageToV7 } from '@/lib/v7-mappers';
import type { AnxietyV7Page } from '@/lib/types';

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const v7 = await getAnxietyPageV7BySlug(params.slug);
    if (v7) {
        return {
            title: v7.meta.title,
            description: v7.meta.description,
        };
    }

    const legacy = await getAnxietyPageBySlug(params.slug);
    if (!legacy) return {};

    const mapped = legacyAnxietyPageToV7(legacy);
    return {
        title: mapped.meta.title,
        description: mapped.meta.description,
    };
}

export default async function AnxietyPage({ params }: Props) {
    let page: AnxietyV7Page | null = await getAnxietyPageV7BySlug(params.slug);
    if (!page) {
        const legacy = await getAnxietyPageBySlug(params.slug);
        if (!legacy) notFound();
        page = legacyAnxietyPageToV7(legacy);
    }

    // Resolve breed slug for back navigation from URL prefix
    const { getBreeds } = await import("@/lib/data");
    const breeds = await getBreeds();
    const breed = breeds.find(b => params.slug.startsWith(b.slug));
    const breedSlug = breed?.slug;

    // Get related pages
    let relatedPages: any[] = [];
    if (breedSlug) {
        const related = await getRelatedForPage({
            page_type: 'anxiety',
            main_breed_slug: breedSlug,
            limit_per_type: 2
        });
        relatedPages = [...related.primary_links, ...related.secondary_links];
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
            "@id": `https://petmatchr.com/anxiety/${params.slug}`
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
            <AnxietyPageView page={page} ctaConfig={ctaConfig} breedSlug={breedSlug} relatedPages={relatedPages} />
        </>
    );
}
