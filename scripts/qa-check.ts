import fs from 'fs/promises';
import path from 'path';
import { basicValidateOutput } from './validators';

async function runQACheck() {
    const pagesDir = path.join(process.cwd(), 'src/data/pages');
    const pageTypes = ['cost', 'problem', 'breed', 'list'];

    let totalPages = 0;
    let errors = 0;

    for (const type of pageTypes) {
        const typeDir = path.join(pagesDir, type);
        try {
            const files = await fs.readdir(typeDir);
            for (const file of files) {
                if (!file.endsWith('.json')) continue;

                totalPages++;
                const filePath = path.join(typeDir, file);
                try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    const data = JSON.parse(content);

                    if (!basicValidateOutput(type, data)) {
                        console.error(`[FAIL] ${type}/${file}: Validation failed`);
                        errors++;
                    } else {
                        // console.log(`[PASS] ${type}/${file}`);
                    }
                } catch (e) {
                    console.error(`[FAIL] ${type}/${file}: Invalid JSON`);
                    errors++;
                }
            }
        } catch (e) {
            console.warn(`Directory not found or empty: ${typeDir}`);
        }
    }

    console.log(`QA Check Complete.`);
    console.log(`Total Pages: ${totalPages}`);
    console.log(`Errors: ${errors}`);

    if (errors > 0) process.exit(1);
}

runQACheck().catch(console.error);
