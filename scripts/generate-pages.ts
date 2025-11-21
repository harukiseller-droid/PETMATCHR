import fs from 'fs/promises';
import path from 'path';
import { callLLM } from './llmClient';
import { basicValidateOutput } from './validators';
import { savePage } from './savePage';
import { SYSTEM_PROMPT, COST_PAGE_PROMPT, PROBLEM_PAGE_PROMPT, COMPARISON_PAGE_PROMPT, ANXIETY_PAGE_PROMPT, LOCATION_PAGE_PROMPT, LIST_PAGE_PROMPT } from './prompts';

interface PageMatrixItem {
    slug: string;
    page_type: 'cost' | 'problem' | 'comparison' | 'anxiety' | 'location' | 'list';
    data: any;
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
                const targetFile = path.join(process.cwd(), 'src/data/pages', item.page_type, `${item.slug}.json`);

                // Skip if exists
                try {
                    await fs.access(targetFile);
                    console.log(`Skipping ${item.slug} (already exists)`);
                    return;
                } catch {
                    // File doesn't exist, proceed
                }

                let prompt = '';
                if (item.page_type === 'cost') {
                    prompt = COST_PAGE_PROMPT(item.data.breed_name, item.data.city_name);
                } else if (item.page_type === 'problem') {
                    prompt = PROBLEM_PAGE_PROMPT(item.data.breed_name, item.data.problem_title);
                } else if (item.page_type === 'comparison') {
                    prompt = COMPARISON_PAGE_PROMPT(item.data.breed1_name, item.data.breed2_name);
                } else if (item.page_type === 'anxiety') {
                    prompt = ANXIETY_PAGE_PROMPT(item.data.breed_name);
                } else if (item.page_type === 'location') {
                    prompt = LOCATION_PAGE_PROMPT(item.data.city_name);
                } else if (item.page_type === 'list') {
                    prompt = LIST_PAGE_PROMPT(item.data.lifestyle_name);
                } else {
                    console.warn(`Unknown page type: ${item.page_type}`);
                    return;
                }

                console.log(`Generating ${item.slug}...`);
                const jsonString = await callLLM(SYSTEM_PROMPT, prompt);

                if (!jsonString) {
                    console.error(`Failed to generate content for ${item.slug}`);
                    return;
                }

                try {
                    const data = JSON.parse(jsonString);
                    if (basicValidateOutput(item.page_type, data)) {
                        // Inject slug if missing
                        data.slug = item.slug;
                        await savePage(item.page_type, item.slug, data);
                    } else {
                        console.error(`Validation failed for ${item.slug}`);
                    }
                } catch (e) {
                    console.error(`Failed to parse JSON for ${item.slug}:`, e);
                }
            }));
        }

        console.log('Batch generation complete.');

    } catch (error) {
        console.error('Error reading page matrix:', error);
    }
}

generatePages().catch(console.error);
