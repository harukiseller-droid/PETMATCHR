import fs from 'fs/promises';
import path from 'path';
import { callHybridLLM } from '@/lib/llmClient';
import { basicValidateOutput } from '@/lib/validators';
import { savePage } from '@/lib/savePage';
import {
    SYSTEM_PROMPT_PETMATCHR_V4,
    BREED_PAGE_PROMPT,
    LIST_PAGE_PROMPT,
    COMPARISON_PAGE_PROMPT,
    COST_PAGE_PROMPT,
    PROBLEM_PAGE_PROMPT,
    ANXIETY_PAGE_PROMPT,
    LOCATION_PAGE_PROMPT,
} from '@/lib/prompts';
import { updatePageIndexEntryForSlug } from '@/lib/internal-links';

type PageTypeV7 = 'breed' | 'list' | 'comparison' | 'cost' | 'problem' | 'anxiety' | 'location';

async function getBreedImages(slug: string): Promise<string[]> {
    const breedDir = path.join(process.cwd(), 'public/images/breeds', slug);
    try {
        const files = await fs.readdir(breedDir);
        return files
            .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
            .map(f => `/images/breeds/${slug}/${f}`);
    } catch {
        return [];
    }
}

export interface GeneratePageOptions {
    slug: string;
    page_type: PageTypeV7;
    input_data?: any;
    keywords?: any;
}

export async function generatePage(options: GeneratePageOptions): Promise<{ success: boolean; error?: string }> {
    const { slug, page_type, input_data, keywords } = options;

    let userPrompt = '';
    if (page_type === 'breed') {
        userPrompt = BREED_PAGE_PROMPT;
    } else if (page_type === 'cost') {
        userPrompt = COST_PAGE_PROMPT;
    } else if (page_type === 'problem') {
        userPrompt = PROBLEM_PAGE_PROMPT;
    } else if (page_type === 'comparison') {
        userPrompt = COMPARISON_PAGE_PROMPT;
    } else if (page_type === 'anxiety') {
        userPrompt = ANXIETY_PAGE_PROMPT;
    } else if (page_type === 'location') {
        userPrompt = LOCATION_PAGE_PROMPT;
    } else if (page_type === 'list') {
        userPrompt = LIST_PAGE_PROMPT;
    } else {
        return { success: false, error: `Unknown page type: ${page_type}` };
    }

    const jsonInput = {
        page_type,
        slug,
        ...keywords,
        target_country: 'US',
        target_audience: 'general',
        input_data,
    };

    console.log(`Generating ${page_type}/${slug} with V7 prompts...`);

    try {
        const data = await callHybridLLM({
            system: SYSTEM_PROMPT_PETMATCHR_V4,
            user: userPrompt,
            jsonInput,
            temperature: 0.7,
        });

        if (basicValidateOutput(page_type, data)) {
            data.slug = slug;

            // Image injection
            const images = await getBreedImages(slug);
            if (images.length > 0 && data.sections && Array.isArray(data.sections)) {
                const shuffled = images.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 3);
                let imgIdx = 0;
                for (let s = 0; s < data.sections.length; s++) {
                    if (imgIdx >= selected.length) break;
                    if (s > 0 || data.sections.length === 1) {
                        const section = data.sections[s];
                        section.content = (section.content || '') + `\n\n![${data.h1} - ${section.title}](${selected[imgIdx]})`;
                        imgIdx++;
                    }
                }
            }

            await savePage(page_type, slug, data);

            const extra: any = {};
            if (page_type === 'cost' || page_type === 'location') {
                const citySlug = input_data?.city?.city_slug;
                if (citySlug) {
                    extra.city_slug = citySlug;
                }
            }

            await updatePageIndexEntryForSlug(slug, page_type, data.meta, extra);
            return { success: true };
        } else {
            return { success: false, error: 'Validation failed' };
        }
    } catch (e: any) {
        console.error(`Failed to generate or validate JSON for ${slug}:`, e);
        return { success: false, error: e.message || 'Unknown error' };
    }
}
