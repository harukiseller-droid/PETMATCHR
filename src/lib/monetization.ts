// FILE: src/lib/monetization.ts
import pageMonetization from "@/data_v7/page_monetization.json";
import { PageMonetization } from "@/lib/types";

export async function getPageMonetization(slug: string): Promise<PageMonetization | null> {
    const data = pageMonetization.find((p) => p.slug === slug);
    // Cast to PageMonetization because JSON import might be inferred loosely
    return (data as unknown as PageMonetization) || null;
}
