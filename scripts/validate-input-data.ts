import fs from 'fs';
import path from 'path';

const INPUT_DIR = path.join(process.cwd(), 'input_data');

async function validateInputData() {
    console.log('Validating input_data JSON files...');
    const files = fs.readdirSync(INPUT_DIR);
    let hasError = false;

    for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(INPUT_DIR, file);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            JSON.parse(content);
            console.log(`✅ ${file} is valid JSON.`);
        } catch (e) {
            console.error(`❌ ${file} is INVALID JSON:`, e.message);
            hasError = true;
        }
    }

    if (hasError) {
        console.error('Validation FAILED.');
        process.exit(1);
    } else {
        console.log('Validation SUCCESS.');
    }
}

validateInputData();
