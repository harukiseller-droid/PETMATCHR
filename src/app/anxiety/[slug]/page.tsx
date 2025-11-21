import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAnxietyPageBySlug } from '@/lib/data';
import { getPageMonetization } from '@/lib/monetization';
import { resolvePageCTAs } from '@/lib/cta';
import AnxietyPageView from '@/components/AnxietyPageView';
import { getRelatedForPage } from '@/lib/internal-links';
import JsonLd from '@/components/JsonLd';

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await getAnxietyPageBySlug(params.slug);
    if (!page) return {};

    return {
        title: page.meta.title,
        description: page.meta.description,
    };
}

export default async function AnxietyPage({ params }: Props) {
    const page = await getAnxietyPageBySlug(params.slug);
    if (!page) notFound();

    // Resolve breed slug for back navigation
    const { getBreeds } = await import("@/lib/data");
    const breeds = await getBreeds();
    const breed = breeds.find(b => b.name === page.breed); // Note: AnxietyPage uses 'breed' field, not 'hero.breed_name'
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

    return (
        <>
            <JsonLd data={jsonLd} />
            <AnxietyPageView page={page} ctaConfig={ctaConfig} breedSlug={breedSlug} relatedPages={relatedPages} />
        </>
    );
}
