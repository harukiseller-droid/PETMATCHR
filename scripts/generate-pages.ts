import fs from 'fs/promises';
import path from 'path';
import { callHybridLLM } from '../src/lib/llmClient';
import { basicValidateOutput } from '../src/lib/validators';
import { savePage } from './savePage';
import {
    SYSTEM_PROMPT_PETMATCHR_V4,
    BREED_PAGE_PROMPT,
    LIST_PAGE_PROMPT,
    COMPARISON_PAGE_PROMPT,
    COST_PAGE_PROMPT,
    PROBLEM_PAGE_PROMPT,
    ANXIETY_PAGE_PROMPT,
    LOCATION_PAGE_PROMPT,
} from '../src/lib/prompts';
import { updatePageIndexEntryForSlug } from '../src/lib/internal-links';

interface PageKeywordBundle {
    primary_keyword: string | null;
    secondary_keywords: string[];
    faq_keywords: string[];
    quick_answer_keywords: string[];
    internal_anchor_keywords: string[];
}

type PageTypeV7 = 'breed' | 'list' | 'comparison' | 'cost' | 'problem' | 'anxiety' | 'location';

interface PageMatrixItem {
    slug: string;
    page_type: PageTypeV7;
    input_data: any;
    ai_prompt_version: string;
    keywords: PageKeywordBundle;
    primary_intent: string;
}

async function generatePages() {
    const matrixPath = path.join(process.cwd(), 'pageMatrix.json');

    try {
        const matrixData = await fs.readFile(matrixPath, 'utf-8');
        const matrix: PageMatrixItem[] = JSON.parse(matrixData);

        console.log(`Found ${matrix.length} pages to generate.`);

        // Limit concurrency
        const BATCH_SIZE = 5;

        for (let i = 0; i < matrix.length; i += BATCH_SIZE) {
            const batch = matrix.slice(i, i + BATCH_SIZE);
            console.log(`Processing batch ${i / BATCH_SIZE + 1}...`);

            await Promise.all(batch.map(async (item) => {
                const targetFile = path.join(process.cwd(), 'src/data_v7/pages', item.page_type, `${item.slug}.json`);

                // Skip if exists
                try {
                    await fs.access(targetFile);
                    console.log(`Skipping ${item.slug} (already exists)`);
                    return;
                } catch {
                    // File doesn't exist, proceed
                }

                let userPrompt = '';
                if (item.page_type === 'breed') {
                    userPrompt = BREED_PAGE_PROMPT;
                } else if (item.page_type === 'cost') {
                    userPrompt = COST_PAGE_PROMPT;
                } else if (item.page_type === 'problem') {
                    userPrompt = PROBLEM_PAGE_PROMPT;
                } else if (item.page_type === 'comparison') {
                    userPrompt = COMPARISON_PAGE_PROMPT;
                } else if (item.page_type === 'anxiety') {
                    userPrompt = ANXIETY_PAGE_PROMPT;
                } else if (item.page_type === 'location') {
                    userPrompt = LOCATION_PAGE_PROMPT;
                } else if (item.page_type === 'list') {
                    userPrompt = LIST_PAGE_PROMPT;
                } else {
                    console.warn(`Unknown page type: ${item.page_type}`);
                    return;
                }

                const jsonInput = {
                    page_type: item.page_type,
                    slug: item.slug,
                    ...item.keywords,
                    target_country: 'US',
                    target_audience: 'general',
                    input_data: item.input_data,
                };

                console.log(`Generating ${item.page_type}/${item.slug} with V7 prompts...`);

                try {
                    const data = await callHybridLLM({
                        system: SYSTEM_PROMPT_PETMATCHR_V4,
                        user: userPrompt,
                        jsonInput,
                        temperature: 0.7,
                    });

                    if (basicValidateOutput(item.page_type, data)) {
                        data.slug = item.slug;
                        await savePage(item.page_type, item.slug, data);

                        const extra: any = {};
                        if (item.page_type === 'cost' || item.page_type === 'location') {
                            const citySlug = item.input_data?.city?.city_slug;
                            if (citySlug) {
                                extra.city_slug = citySlug;
                            }
                        }

                        await updatePageIndexEntryForSlug(item.slug, item.page_type, data.meta, extra);
                    } else {
                        console.error(`Validation failed for ${item.slug}`);
                    }
                } catch (e) {
                    console.error(`Failed to generate or validate JSON for ${item.slug}:`, e);
                }
            }));
        }

        console.log('Batch generation complete.');

    } catch (error) {
        console.error('Error reading page matrix:', error);
    }
}

generatePages().catch(console.error);
