import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getComparisonPageBySlug } from '@/lib/data';
import { getPageMonetization } from '@/lib/monetization';
import { resolvePageCTAs } from '@/lib/cta';
import ComparisonPageView from '@/components/ComparisonPageView';

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await getComparisonPageBySlug(params.slug);
    if (!page) return {};

    return {
        title: page.meta.title,
        description: page.meta.description,
    };
}

export default async function ComparisonPage({ params }: Props) {
    const page = await getComparisonPageBySlug(params.slug);
    if (!page) notFound();

    const monetization = await getPageMonetization(params.slug);
    const ctaConfig = monetization ? resolvePageCTAs(monetization, page) : {
        quizPrimary: null, quizSecondary: [], offerPrimary: null, offerSecondary: [], showAds: false, showEmailCapture: false
    };

    return <ComparisonPageView page={page} ctaConfig={ctaConfig} />;
}
