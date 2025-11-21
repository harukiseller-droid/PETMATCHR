import { notFound } from "next/navigation";
import { getListPageBySlug } from "@/lib/data";
import { getAllStaticParams } from "@/lib/static-params";
import ListPageView from "@/components/ListPageView";
import { Metadata } from "next";

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
    const page = await getListPageBySlug(params.slug);
    if (!page) return {};
    return {
        title: page.meta.title,
        description: page.meta.description,
    };
}

export default async function ListPage({ params }: PageProps) {
    const page = await getListPageBySlug(params.slug);

    if (!page) {
        notFound();
    }

    return <ListPageView page={page} />;
}
