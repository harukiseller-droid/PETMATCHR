import fs from 'fs/promises';
import path from 'path';

const MATRIX_SOURCE = path.join(process.cwd(), 'pageMatrix.json');
const V7_DATA_DIR = path.join(process.cwd(), 'src/data_v7/pages');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data_v7/content_matrix_management.json');

export async function buildMatrix() {
    console.log('Building content matrix...');

    let matrixSource: any[] = [];
    try {
        const raw = await fs.readFile(MATRIX_SOURCE, 'utf-8');
        matrixSource = JSON.parse(raw);
    } catch (e) {
        console.warn('Could not read pageMatrix.json, falling back to empty.');
    }

    const pages: any[] = [];
    const summary: any = {
        total_pages: matrixSource.length,
        by_page_type: {}
    };

    // Initialize summary
    const PAGE_TYPES = ['breed', 'cost', 'problem', 'comparison', 'anxiety', 'location', 'list'];
    for (const type of PAGE_TYPES) {
        summary.by_page_type[type] = { planned: 0, generated: 0, published: 0 };
    }

    for (const item of matrixSource) {
        const type = item.page_type;
        if (!summary.by_page_type[type]) {
            summary.by_page_type[type] = { planned: 0, generated: 0, published: 0 };
        }
        summary.by_page_type[type].planned++;

        const targetFile = path.join(V7_DATA_DIR, type, `${item.slug}.json`);
        let status = 'planned';

        try {
            await fs.access(targetFile);
            status = 'generated';
            summary.by_page_type[type].generated++;
        } catch {
            // Not generated yet
        }

        pages.push({
            slug: item.slug,
            page_type: type,
            status: status,
            primary_intent: item.primary_intent || 'informational',
            keywords: item.keywords || {},
            input_data: item.input_data // Pass input data for regeneration
        });
    }

    const output = {
        version: 2,
        last_built_at: new Date().toISOString(),
        summary,
        pages
    };

    // Ensure output dir exists
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`Matrix built with ${pages.length} pages.`);
    console.log(`Summary saved to: ${OUTPUT_FILE}`);
}

if (require.main === module) {
    buildMatrix().catch(console.error);
}
