import fs from 'fs/promises';
import path from 'path';
import { basicValidateOutput } from './validators';

async function runQACheck() {
    const pagesDir = path.join(process.cwd(), 'src/data_v7/pages');
    const pageTypes = ['breed', 'cost', 'problem', 'comparison', 'anxiety', 'location', 'list'];

    let totalPages = 0;
    let errors = 0;
    const failed: { type: string; file: string; reason: string }[] = [];

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

                    const validationErrors = [];
                    if (!basicValidateOutput(type, data)) {
                        validationErrors.push("Basic validation failed");
                    }

                    // AEO Validation
                    if (!data.quick_answers || !Array.isArray(data.quick_answers) || data.quick_answers.length === 0) {
                        validationErrors.push("Missing or empty 'quick_answers'");
                    }
                    if (!data.faq || !Array.isArray(data.faq) || data.faq.length < 2) {
                        validationErrors.push("FAQ missing or has fewer than 2 items");
                    }

                    if (validationErrors.length > 0) {
                        const msg = validationErrors.join("; ");
                        console.error(`[FAIL] ${type}/${file}: ${msg}`);
                        failed.push({ type, file, reason: msg });
                        errors++;
                    }
                } catch (e) {
                    const msg = `Invalid JSON`;
                    console.error(`[FAIL] ${type}/${file}: ${msg}`);
                    failed.push({ type, file, reason: msg });
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

    if (failed.length) {
        console.log(`Failed pages detail:`);
        for (const f of failed) {
            console.log(`- ${f.type}/${f.file}: ${f.reason}`);
        }
    }

    if (errors > 0) process.exit(1);
}

runQACheck().catch(console.error);
