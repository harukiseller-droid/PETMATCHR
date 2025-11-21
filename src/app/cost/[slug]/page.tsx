import { notFound } from "next/navigation";
import { getCostPageBySlug } from "@/lib/data";
import { getPageMonetization } from "@/lib/monetization";
import { resolvePageCTAs } from "@/lib/cta";
import CostPageView from "@/components/CostPageView";
import { Metadata } from "next";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const page = await getCostPageBySlug(params.slug);
    if (!page) return {};

    return {
        title: page.meta.title,
        description: page.meta.description,
    };
}

export default async function CostPage({ params }: PageProps) {
    const { slug } = params;
    const page = await getCostPageBySlug(slug);
    const monetization = await getPageMonetization(slug);

    if (!page) {
        notFound();
    }

    // If no monetization config found, use a default or empty one to avoid crashing
    // In production, we should probably have defaults.
    const ctaConfig = monetization
        ? resolvePageCTAs(monetization, page)
        : null;

    return (
        <CostPageView
            page={page}
            ctaConfig={ctaConfig}
        />
    );
}
