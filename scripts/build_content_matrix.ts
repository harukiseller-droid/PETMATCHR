import fs from 'fs/promises';
import path from 'path';

const V7_DATA_DIR = path.join(process.cwd(), 'src/data/pages');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data_v7/content_matrix_management.json');
const PAGE_TYPES = ['breed', 'cost', 'problem', 'comparison', 'anxiety', 'location', 'list'];

async function buildMatrix() {
    console.log('Building content matrix...');

    const pages: any[] = [];
    const summary: any = {
        total_pages: 0,
        by_page_type: {}
    };

    for (const type of PAGE_TYPES) {
        summary.by_page_type[type] = { planned: 0, generated: 0, published: 0 };
        const typeDir = path.join(V7_DATA_DIR, type);

        try {
            // Ensure dir exists
            try {
                await fs.access(typeDir);
            } catch {
                continue;
            }

            const files = await fs.readdir(typeDir);
            for (const file of files) {
                if (!file.endsWith('.json')) continue;

                const filePath = path.join(typeDir, file);
                try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    const page = JSON.parse(content);

                    pages.push({
                        slug: page.slug,
                        page_type: type,
                        status: 'generated', // Default to generated if file exists
                        primary_intent: page.primary_intent || 'informational',
                        keywords: {
                            primary_keyword: page.meta?.title || '',
                            secondary_keywords: [],
                            faq_keywords: [],
                            quick_answer_keywords: [],
                            internal_anchor_keywords: []
                        }
                    });

                    summary.total_pages++;
                    summary.by_page_type[type].generated++;
                } catch (e) {
                    console.warn(`Failed to parse ${type}/${file}`);
                }
            }
        } catch (e) {
            console.warn(`Error reading dir ${type}`);
        }
    }

    const output = {
        version: 1,
        last_built_at: new Date().toISOString(),
        summary,
        pages
    };

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`Matrix built with ${pages.length} pages.`);
}

buildMatrix().catch(console.error);
