import fs from 'fs/promises';
import path from 'path';
import { callHybridLLM } from '../src/lib/llmClient';
import { basicValidateOutput } from '../src/lib/validators';
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

type PageTypeV7 = 'breed' | 'list' | 'comparison' | 'cost' | 'problem' | 'anxiety' | 'location';

interface PageKeywordBundle {
    primary_keyword: string | null;
    secondary_keywords: string[];
    faq_keywords: string[];
    quick_answer_keywords: string[];
    internal_anchor_keywords: string[];
}

interface PageMatrixItem {
    slug: string;
    page_type: PageTypeV7;
    input_data: any;
    ai_prompt_version: string;
    keywords: PageKeywordBundle;
    primary_intent: string;
}

const V7_DATA_DIR = path.join(process.cwd(), 'src/data_v7/pages');

async function ensureDir(dir: string) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

async function regenerateAllPagesV7() {
    const matrixPath = path.join(process.cwd(), 'pageMatrix.json');
    let matrix: PageMatrixItem[];

    try {
        const raw = await fs.readFile(matrixPath, 'utf-8');
        matrix = JSON.parse(raw);
    } catch (e) {
        console.error('Failed to read pageMatrix.json. Make sure you ran `npm run gen:matrix`.', e);
        process.exit(1);
        return;
    }

    console.log(`Regenerating V7 content for ${matrix.length} items...`);

    const BATCH_SIZE = 4;

    for (let i = 0; i < matrix.length; i += BATCH_SIZE) {
        const batch = matrix.slice(i, i + BATCH_SIZE);
        console.log(`Batch ${i / BATCH_SIZE + 1} of ${Math.ceil(matrix.length / BATCH_SIZE)}...`);

        await Promise.all(
            batch.map(async (item) => {
                const targetDir = path.join(V7_DATA_DIR, item.page_type);
                await ensureDir(targetDir);
                const targetFile = path.join(targetDir, `${item.slug}.json`);

                let userPrompt = '';
                if (item.page_type === 'breed') userPrompt = BREED_PAGE_PROMPT;
                else if (item.page_type === 'cost') userPrompt = COST_PAGE_PROMPT;
                else if (item.page_type === 'problem') userPrompt = PROBLEM_PAGE_PROMPT;
                else if (item.page_type === 'comparison') userPrompt = COMPARISON_PAGE_PROMPT;
                else if (item.page_type === 'anxiety') userPrompt = ANXIETY_PAGE_PROMPT;
                else if (item.page_type === 'location') userPrompt = LOCATION_PAGE_PROMPT;
                else if (item.page_type === 'list') userPrompt = LIST_PAGE_PROMPT;
                else {
                    console.warn(`Unknown page type: ${item.page_type} for slug ${item.slug}`);
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

                console.log(`→ Regenerating ${item.page_type}/${item.slug}`);

                try {
                    const data = await callHybridLLM({
                        system: SYSTEM_PROMPT_PETMATCHR_V4,
                        user: userPrompt,
                        jsonInput,
                        temperature: 0.7,
                    });

                    if (!basicValidateOutput(item.page_type, data)) {
                        console.error(`Validation failed for ${item.slug}, skipping.`);
                        return;
                    }

                    const now = new Date().toISOString();
                    const output = {
                        ...data,
                        page_type: item.page_type,
                        slug: item.slug,
                        content_version: (data.content_version ?? 1),
                        last_generated_at: now,
                    };

                    await fs.writeFile(targetFile, JSON.stringify(output, null, 2), 'utf-8');
                } catch (e) {
                    console.error(`Error regenerating ${item.page_type}/${item.slug}:`, e);
                }
            })
        );
    }

    console.log('V7 regeneration complete. Files written to src/data_v7/pages.');
}

regenerateAllPagesV7().catch((err) => {
    console.error('Unexpected error in regenerate_all_pages_v7:', err);
    process.exit(1);
});

