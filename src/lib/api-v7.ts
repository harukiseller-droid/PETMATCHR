// FILE: src/lib/api-v7.ts
// Thin helpers for API routes to prefer V7 pages, with legacy fallback via mappers.

import {
    BreedV7Page,
    CostV7Page,
    ProblemV7Page,
    AnxietyV7Page,
    ListV7Page,
    LocationV7Page,
} from '@/lib/types';
import {
    getBreedPageBySlug,
    getBreedPageV7BySlug,
    getCostPageBySlug,
    getCostPageV7BySlug,
    getProblemPageBySlug,
    getProblemPageV7BySlug,
    getAnxietyPageBySlug,
    getAnxietyPageV7BySlug,
    getListPageBySlug,
    getListPageV7BySlug,
    getLocationPageBySlug,
    getLocationPageV7BySlug,
} from '@/lib/data';
import {
    legacyAnxietyPageToV7,
    legacyCostPageToV7,
    legacyListPageToV7,
    legacyLocationPageToV7,
    legacyProblemPageToV7,
} from '@/lib/v7-mappers';

export async function loadBreedV7(slug: string): Promise<BreedV7Page | null> {
    const v7 = await getBreedPageV7BySlug(slug);
    if (v7) return v7;
    const legacy = await getBreedPageBySlug(slug);
    return legacy ? (await import('@/lib/v7-mappers')).legacyBreedPageToV7(legacy) : null;
}

export async function loadCostV7(slug: string): Promise<CostV7Page | null> {
    const v7 = await getCostPageV7BySlug(slug);
    if (v7) return v7;
    const legacy = await getCostPageBySlug(slug);
    return legacy ? legacyCostPageToV7(legacy) : null;
}

export async function loadProblemV7(slug: string): Promise<ProblemV7Page | null> {
    const v7 = await getProblemPageV7BySlug(slug);
    if (v7) return v7;
    const legacy = await getProblemPageBySlug(slug);
    return legacy ? legacyProblemPageToV7(legacy) : null;
}

export async function loadAnxietyV7(slug: string): Promise<AnxietyV7Page | null> {
    const v7 = await getAnxietyPageV7BySlug(slug);
    if (v7) return v7;
    const legacy = await getAnxietyPageBySlug(slug);
    return legacy ? legacyAnxietyPageToV7(legacy) : null;
}

export async function loadListV7(slug: string): Promise<ListV7Page | null> {
    const v7 = await getListPageV7BySlug(slug);
    if (v7) return v7;
    const legacy = await getListPageBySlug(slug);
    return legacy ? legacyListPageToV7(legacy) : null;
}

export async function loadLocationV7(slug: string): Promise<LocationV7Page | null> {
    const v7 = await getLocationPageV7BySlug(slug);
    if (v7) return v7;
    const legacy = await getLocationPageBySlug(slug);
    return legacy ? legacyLocationPageToV7(legacy) : null;
}

