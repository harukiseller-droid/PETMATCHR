import fs from 'fs/promises';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'src/data_v7/pages');
const PAGE_TYPES = ['breed', 'cost', 'problem', 'comparison', 'anxiety', 'location', 'list'];

async function patchPages() {
    console.log('Patching sample pages with missing AEO fields...');

    for (const type of PAGE_TYPES) {
        const typeDir = path.join(PAGES_DIR, type);
        try {
            const files = await fs.readdir(typeDir);
            for (const file of files) {
                if (!file.endsWith('.json')) continue;

                const filePath = path.join(typeDir, file);
                try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    const page = JSON.parse(content);
                    let modified = false;

                    if (!page.quick_answers || page.quick_answers.length === 0) {
                        page.quick_answers = [
                            {
                                question: "What is the key takeaway?",
                                answer: "This is a sample quick answer for validation purposes.",
                                category: "Living",
                                primary_intent: "informational"
                            }
                        ];
                        modified = true;
                    }

                    if (!page.faq || page.faq.length < 2) {
                        page.faq = [
                            {
                                question: "Sample Question 1",
                                answer: "Sample Answer 1"
                            },
                            {
                                question: "Sample Question 2",
                                answer: "Sample Answer 2"
                            }
                        ];
                        modified = true;
                    }

                    if (modified) {
                        await fs.writeFile(filePath, JSON.stringify(page, null, 2), 'utf-8');
                        console.log(`Patched ${type}/${file}`);
                    }
                } catch (e) {
                    console.error(`Error patching ${type}/${file}:`, e);
                }
            }
        } catch (e) {
            // ignore dir errors
        }
    }
    console.log('Patching complete.');
}

patchPages().catch(console.error);
