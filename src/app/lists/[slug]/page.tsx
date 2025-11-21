import { notFound } from "next/navigation";
import { getListPageBySlug, getPagesFromCategory } from "@/lib/data";
import ListPageView from "@/components/ListPageView";
import { Metadata } from "next";

export async function generateStaticParams() {
    const pages = await getPagesFromCategory("list");
    return pages.map((p) => ({ slug: p.slug }));
}

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const page = await getListPageBySlug(params.slug);
    if (!page) return {};

    return {
        title: page.meta.title,
        description: page.meta.description,
    };
}

export default async function ListPage({ params }: PageProps) {
    const { slug } = params;
    const page = await getListPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return <ListPageView page={page} />;
}
