import { notFound } from "next/navigation";
import { getProblemPageBySlug } from "@/lib/data";
import { getPageMonetization } from "@/lib/monetization";
import { resolvePageCTAs } from "@/lib/cta";
import ProblemPageView from "@/components/ProblemPageView";
import { Metadata } from "next";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const page = await getProblemPageBySlug(params.slug);
    if (!page) return {};

    return {
        title: page.meta.title,
        description: page.meta.description,
    };
}

export default async function ProblemPage({ params }: PageProps) {
    const { slug } = params;
    const page = await getProblemPageBySlug(slug);
    const monetization = await getPageMonetization(slug);

    if (!page) {
        notFound();
    }

    const ctaConfig = monetization
        ? resolvePageCTAs(monetization, page)
        : null;

    return (
        <ProblemPageView
            page={page}
            ctaConfig={ctaConfig}
        />
    );
}
