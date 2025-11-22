import fs from 'fs/promises';
import path from 'path';
import { PageIndexEntry, PageType } from '../src/lib/types';

const DATA_DIR = path.join(process.cwd(), 'src/data_v7');
const PAGES_DIR = path.join(DATA_DIR, 'pages');
const BREEDS_FILE = path.join(DATA_DIR, 'breeds.json');
const MONETIZATION_FILE = path.join(DATA_DIR, 'page_monetization.json');
const INDEX_FILE = path.join(DATA_DIR, 'page_index.json');

function slugifyCity(name?: string, state?: string): string | null {
    if (!name) return null;
    const base = state ? `${name} ${state}` : name;
    return base
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
}

async function buildPageIndex() {
    // Load breeds to help with mapping
    let breeds: any[] = [];
    try {
        const breedsContent = await fs.readFile(BREEDS_FILE, 'utf-8');
        breeds = JSON.parse(breedsContent);
    } catch (e) {
        console.warn("Could not load breeds.json, breed mapping might be incomplete.");
    }

    const breedNameMap = new Map<string, string>(); // Name -> Slug
    for (const breed of breeds) {
        breedNameMap.set(breed.name.toLowerCase(), breed.slug);
    }

    // Load monetization to infer cluster / intent
    let monetization: any[] = [];
    const monetizationMap = new Map<string, any>();
    try {
        const mContent = await fs.readFile(MONETIZATION_FILE, 'utf-8');
        monetization = JSON.parse(mContent);
        for (const m of monetization) {
            if (m && m.slug) monetizationMap.set(m.slug, m);
        }
    } catch {
        // optional
    }

    const entries: PageIndexEntry[] = [];
    const pageTypes: PageType[] = ['breed', 'cost', 'problem', 'anxiety', 'comparison', 'location', 'list'];

    for (const type of pageTypes) {
        const typeDir = path.join(PAGES_DIR, type);
        try {
            const files = await fs.readdir(typeDir);
            for (const file of files) {
                if (!file.endsWith('.json')) continue;

                const filePath = path.join(typeDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                const page = JSON.parse(content);

                const slug: string = page.slug || file.replace(/\.json$/, '');
                const metaTitle: string = page.meta?.title || page.h1 || slug;

                const baseEntry: PageIndexEntry = {
                    slug,
                    page_type: type,
                    title: metaTitle,
                    breed_slugs: [],
                    city_slug: null,
                    problem_slug: null,
                    primary_intent: 'informational',
                    primary_cluster: null,
                    short_label: metaTitle,
                };

                // Helper to resolve breed name to slug
                const resolveBreed = (name: string | undefined) => {
                    if (!name) return null;
                    return breedNameMap.get(name.toLowerCase()) || null;
                };

                // Extract metadata based on type
                if (type === 'breed') {
                    baseEntry.breed_slugs = [slug];
                    baseEntry.short_label = page.h1 || metaTitle;
                } else if (type === 'comparison') {
                    if (page.breed_1 && page.breed_2) {
                        const s1 = resolveBreed(page.breed_1) || page.breed_1;
                        const s2 = resolveBreed(page.breed_2) || page.breed_2;
                        baseEntry.breed_slugs = [s1, s2];
                        baseEntry.short_label = `${page.breed_1} vs ${page.breed_2}`;
                    } else {
                        const parts = slug.split('-vs-');
                        if (parts.length === 2) baseEntry.breed_slugs = parts;
                    }
                } else {
                    // Generic breed extraction for other types
                    let breedName = page.hero?.breed_name;
                    if (!breedName && typeof page.breed === 'string') breedName = page.breed;
                    if (!breedName && page.breed?.name) breedName = page.breed.name;

                    const breedSlug = resolveBreed(breedName);
                    if (breedSlug) baseEntry.breed_slugs = [breedSlug];

                    if (type === 'cost') {
                        const cityName = page.local_context?.city || page.city?.name;
                        const cityState = page.local_context?.state || page.city?.state_code;
                        baseEntry.city_slug = slugifyCity(cityName, cityState);
                        baseEntry.short_label = `Cost: ${cityName || 'Unknown City'}`;
                    } else if (type === 'problem' || type === 'anxiety') {
                        // Problem slug from URL part after breed slug
                        if (baseEntry.breed_slugs.length === 1 && slug.startsWith(baseEntry.breed_slugs[0] + '-')) {
                            baseEntry.problem_slug = slug.slice(baseEntry.breed_slugs[0].length + 1);
                        }
                        baseEntry.short_label = page.h1 || metaTitle;
                    } else if (type === 'location') {
                        baseEntry.city_slug = slug;
                        baseEntry.short_label = page.h1 || metaTitle;
                    } else if (type === 'list') {
                        baseEntry.short_label = page.h1 || metaTitle;
                    }
                }

                // Monetization-based fields
                const monet = monetizationMap.get(slug);
                if (monet) {
                    baseEntry.primary_cluster = monet.cluster ?? null;
                    if (monet.cluster && monet.cluster !== 'generic') {
                        baseEntry.primary_intent = 'commercial_high';
                    } else {
                        baseEntry.primary_intent = 'mixed';
                    }
                }

                entries.push(baseEntry);
            }
        } catch (e) {
            // Directory might not exist
        }
    }

    const output = {
        entries,
        generated_at: new Date().toISOString()
    };

    await fs.writeFile(INDEX_FILE, JSON.stringify(output, null, 2));
    console.log(`Built index with ${entries.length} entries.`);
}

buildPageIndex().catch(console.error);
