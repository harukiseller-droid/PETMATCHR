import fs from 'fs/promises';
import path from 'path';
import { generatePage } from '../src/lib/generator';

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

                await generatePage({
                    slug: item.slug,
                    page_type: item.page_type,
                    input_data: item.input_data,
                    keywords: item.keywords
                });
            }));
        }

        console.log('Batch generation complete.');

    } catch (error) {
        console.error('Error reading page matrix:', error);
    }
}

generatePages().catch(console.error);
