import fs from 'fs/promises';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'src/data_v7/pages');
const PAGE_TYPES = ['breed', 'list', 'comparison', 'cost', 'problem', 'anxiety', 'location'];

async function qaContentStyle() {
    const issues: { page_type: string; slug: string; issues: string[] }[] = [];
    let pagesChecked = 0;

    for (const type of PAGE_TYPES) {
        const typeDir = path.join(PAGES_DIR, type);
        let files: string[] = [];
        try {
            files = await fs.readdir(typeDir);
        } catch {
            continue;
        }

        for (const file of files) {
            if (!file.endsWith('.json')) continue;
            const filePath = path.join(typeDir, file);
            let page: any;
            try {
                const raw = await fs.readFile(filePath, 'utf-8');
                page = JSON.parse(raw);
            } catch {
                issues.push({ page_type: type, slug: file.replace(/\.json$/, ''), issues: ['INVALID_JSON'] });
                continue;
            }

            const slug: string = page.slug || file.replace(/\.json$/, '');
            const bodyText = JSON.stringify(page);
            const words = bodyText.split(/\s+/).filter(Boolean);

            const pageIssues: string[] = [];

            if (words.length < 400) {
                pageIssues.push('CONTENT_TOO_SHORT');
            }

            if (!/\b(good fit|not a good fit|should avoid)\b/i.test(bodyText) && type === 'breed') {
                pageIssues.push('BREED_NOT_OPINIONATED_ENOUGH');
            }

            if (/\bmg\b|\bmilligram\b|\bdosage\b|\bonce a day\b/i.test(bodyText)) {
                pageIssues.push('POTENTIAL_MEDICAL_ADVICE');
            }

            if (pageIssues.length) {
                issues.push({ page_type: type, slug, issues: pageIssues });
            }

            pagesChecked++;
        }
    }

    const report = {
        summary: {
            pages_checked: pagesChecked,
            pages_failed: issues.length,
        },
        items: issues,
    };

    console.log(JSON.stringify(report, null, 2));
    if (issues.length > 0) process.exitCode = 1;
}

qaContentStyle().catch((err) => {
    console.error('qa-content-style failed:', err);
    process.exit(1);
});

