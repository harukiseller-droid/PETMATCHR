import fs from 'fs/promises';
import path from 'path';
import { PageIndexEntry, PageType } from '@/lib/types';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const INDEX_FILE = path.join(DATA_DIR, 'page_index.json');

export async function getPageIndex(): Promise<PageIndexEntry[]> {
    try {
        const data = await fs.readFile(INDEX_FILE, 'utf-8');
        const json = JSON.parse(data);
        return json.entries || [];
    } catch (error) {
        // If file doesn't exist or error, return empty
        return [];
    }
}

export async function getPagesByBreed(
    breedSlug: string
): Promise<{
    breedPage?: PageIndexEntry;
    costPages: PageIndexEntry[];
    problemPages: PageIndexEntry[];
    anxietyPages: PageIndexEntry[];
    comparisonPages: PageIndexEntry[];
    locationPages: PageIndexEntry[];
    listPages: PageIndexEntry[];
}> {
    const index = await getPageIndex();
    const relevant = index.filter(entry => entry.breed_slugs.includes(breedSlug));

    return {
        breedPage: relevant.find(e => e.page_type === 'breed'),
        costPages: relevant.filter(e => e.page_type === 'cost'),
        problemPages: relevant.filter(e => e.page_type === 'problem'),
        anxietyPages: relevant.filter(e => e.page_type === 'anxiety'),
        comparisonPages: relevant.filter(e => e.page_type === 'comparison'),
        locationPages: relevant.filter(e => e.page_type === 'location'),
        listPages: relevant.filter(e => e.page_type === 'list'),
    };
}

export async function getRelatedForPage(params: {
    page_type: PageType;
    main_breed_slug: string;
    city_slug?: string | null;
    problem_slug?: string | null;
    limit_per_type?: number;
}): Promise<{
    primary_links: PageIndexEntry[];
    secondary_links: PageIndexEntry[];
}> {
    const { page_type, main_breed_slug, limit_per_type = 3 } = params;
    const byBreed = await getPagesByBreed(main_breed_slug);

    const primary: PageIndexEntry[] = [];
    const secondary: PageIndexEntry[] = [];

    // Simple logic based on plan recommendations
    if (page_type === 'breed') {
        primary.push(...byBreed.costPages.slice(0, 2));
        primary.push(...byBreed.problemPages.slice(0, 2));
        primary.push(...byBreed.comparisonPages.slice(0, 2));

        secondary.push(...byBreed.costPages.slice(2));
        secondary.push(...byBreed.problemPages.slice(2));
        secondary.push(...byBreed.comparisonPages.slice(2));
    } else if (page_type === 'cost') {
        if (byBreed.breedPage) primary.push(byBreed.breedPage);
        primary.push(...byBreed.costPages.filter(p => p.city_slug !== params.city_slug).slice(0, 2));
        primary.push(...byBreed.problemPages.slice(0, 2));
    } else if (page_type === 'problem' || page_type === 'anxiety') {
        if (byBreed.breedPage) primary.push(byBreed.breedPage);
        primary.push(...byBreed.costPages.slice(0, 2));
        primary.push(...byBreed.comparisonPages.slice(0, 1));
    } else if (page_type === 'comparison') {
        // For comparison, we might want links for both breeds, but here we only have main_breed_slug
        // The caller should probably call this for both breeds if needed.
        if (byBreed.breedPage) primary.push(byBreed.breedPage);
        primary.push(...byBreed.costPages.slice(0, 1));
        primary.push(...byBreed.problemPages.slice(0, 1));
    }

    return {
        primary_links: primary.slice(0, limit_per_type * 2), // Cap total
        secondary_links: secondary
    };
}

export async function updatePageIndexEntryForSlug(
    slug: string,
    page_type: PageType,
    meta: { title: string },
    extra?: {
        breed_slugs?: string[];
        city_slug?: string;
        problem_slug?: string;
    }
) {
    const index = await getPageIndex();
    const existingIdx = index.findIndex(e => e.slug === slug);

    const entry: PageIndexEntry = {
        slug,
        page_type,
        title: meta.title,
        breed_slugs: extra?.breed_slugs || [],
        city_slug: extra?.city_slug || null,
        problem_slug: extra?.problem_slug || null,
        primary_intent: 'informational', // Default, logic to refine later
        short_label: meta.title, // Default
    };

    // Refine short_label
    if (page_type === 'cost' && extra?.city_slug) {
        entry.short_label = `Cost in ${extra.city_slug.replace(/-/g, ' ')}`;
    } else if (page_type === 'comparison' && extra?.breed_slugs?.length === 2) {
        entry.short_label = `vs ${extra.breed_slugs[1].replace(/-/g, ' ')}`; // Assuming main breed context
    }

    if (existingIdx >= 0) {
        index[existingIdx] = { ...index[existingIdx], ...entry };
    } else {
        index.push(entry);
    }

    await fs.writeFile(INDEX_FILE, JSON.stringify({ entries: index, generated_at: new Date().toISOString() }, null, 2));
}
