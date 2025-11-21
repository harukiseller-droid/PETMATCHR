import fs from 'fs/promises';
import path from 'path';
import { PageIndexEntry, PageType } from '../src/lib/types';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const PAGES_DIR = path.join(DATA_DIR, 'pages');
const BREEDS_FILE = path.join(DATA_DIR, 'breeds.json');
const INDEX_FILE = path.join(DATA_DIR, 'page_index.json');

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

    const entries: PageIndexEntry[] = [];
    const pageTypes = ['breed', 'cost', 'problem', 'anxiety', 'comparison', 'location', 'list'];

    for (const type of pageTypes) {
        const typeDir = path.join(PAGES_DIR, type);
        try {
            const files = await fs.readdir(typeDir);
            for (const file of files) {
                if (!file.endsWith('.json')) continue;

                const filePath = path.join(typeDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                const page = JSON.parse(content);

                const entry: PageIndexEntry = {
                    slug: page.slug,
                    page_type: type as PageType,
                    title: page.meta?.title || page.h1 || page.slug,
                    breed_slugs: [],
                    primary_intent: 'informational',
                    short_label: page.meta?.title || page.slug
                };

                // Helper to resolve breed name to slug
                const resolveBreed = (name: string | undefined) => {
                    if (!name) return null;
                    return breedNameMap.get(name.toLowerCase()) || null;
                };

                // Extract metadata based on type
                if (type === 'breed') {
                    entry.breed_slugs = [page.slug];
                    entry.short_label = page.h1;
                } else if (type === 'comparison') {
                    if (page.breed_1 && page.breed_2) {
                        const s1 = resolveBreed(page.breed_1) || page.breed_1;
                        const s2 = resolveBreed(page.breed_2) || page.breed_2;
                        entry.breed_slugs = [s1, s2];
                        entry.short_label = `${page.breed_1} vs ${page.breed_2}`;
                    } else {
                        const parts = page.slug.split('-vs-');
                        if (parts.length === 2) entry.breed_slugs = parts;
                    }
                } else {
                    // Generic breed extraction for other types
                    let breedName = page.hero?.breed_name;
                    if (!breedName && typeof page.breed === 'string') breedName = page.breed;
                    if (!breedName && page.breed?.name) breedName = page.breed.name;

                    const slug = resolveBreed(breedName);
                    if (slug) entry.breed_slugs = [slug];

                    if (type === 'cost') {
                        entry.short_label = `Cost: ${page.local_context?.city || page.city?.name || 'Unknown City'}`;
                    } else if (type === 'problem' || type === 'anxiety') {
                        entry.short_label = page.h1;
                    }
                }

                entries.push(entry);
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
