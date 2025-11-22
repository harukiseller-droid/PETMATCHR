import fs from 'fs/promises';
import path from 'path';
import { callHybridLLM } from '../src/lib/llmClient';
import { basicValidateOutput } from '../src/lib/validators';
import { getPagesNeedingRefresh } from '../src/lib/refresh-planner';
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

const V7_DATA_DIR = path.join(process.cwd(), 'src/data_v7/pages');
const MATRIX_PATH = path.join(process.cwd(), 'pageMatrix.json');

async function ensureDir(dir: string) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

async function refreshPages() {
    console.log('Checking for pages needing refresh...');
    const toRefresh = await getPagesNeedingRefresh(30); // 30 days threshold

    if (toRefresh.length === 0) {
        console.log('No pages need refresh.');
        return;
    }

    console.log(`Found ${toRefresh.length} pages to refresh.`);

    // Load matrix to get input data
    let matrix: any[];
    try {
        const raw = await fs.readFile(MATRIX_PATH, 'utf-8');
        matrix = JSON.parse(raw);
    } catch (e) {
        console.error('Failed to read pageMatrix.json', e);
        return;
    }

    const BATCH_SIZE = 4;
    for (let i = 0; i < toRefresh.length; i += BATCH_SIZE) {
        const batch = toRefresh.slice(i, i + BATCH_SIZE);
        console.log(`Refreshing batch ${i / BATCH_SIZE + 1}...`);

        await Promise.all(batch.map(async (item) => {
            const matrixItem = matrix.find(m => m.slug === item.slug && m.page_type === item.page_type);
            if (!matrixItem) {
                console.warn(`Matrix item not found for ${item.page_type}/${item.slug}`);
                return;
            }

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
            else return;

            const jsonInput = {
                page_type: item.page_type,
                slug: item.slug,
                ...matrixItem.keywords,
                target_country: 'US',
                target_audience: 'general',
                input_data: matrixItem.input_data,
                refresh_reason: item.reason
            };

            console.log(`→ Refreshing ${item.page_type}/${item.slug} (${item.reason})`);

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
                    content_version: (data.content_version ?? 1) + 1,
                    last_refreshed_at: now,
                    last_generated_at: data.last_generated_at || now // Keep original gen date if possible, or use now
                };

                await fs.writeFile(targetFile, JSON.stringify(output, null, 2), 'utf-8');
            } catch (e) {
                console.error(`Error refreshing ${item.page_type}/${item.slug}:`, e);
            }
        }));
    }
    console.log('Refresh complete.');
}

refreshPages().catch(console.error);
