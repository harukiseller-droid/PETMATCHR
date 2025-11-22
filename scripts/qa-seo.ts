import fs from 'fs/promises';
import path from 'path';

type PageType = 'breed' | 'list' | 'comparison' | 'cost' | 'problem' | 'anxiety' | 'location';

interface SeoIssue {
    page_type: PageType;
    slug: string;
    issues: string[];
}

const DATA_DIR = path.join(process.cwd(), 'src/data/pages');
const PAGE_TYPES: PageType[] = ['breed', 'list', 'comparison', 'cost', 'problem', 'anxiety', 'location'];

function lengthInChars(text: string | undefined | null): number {
    return text ? text.length : 0;
}

async function checkSeo() {
    const issues: SeoIssue[] = [];
    let pagesChecked = 0;

    for (const type of PAGE_TYPES) {
        const typeDir = path.join(DATA_DIR, type);
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
            const metaTitle = page.meta?.title || '';
            const metaDescription = page.meta?.description || '';
            const h1 = page.h1 || '';

            const pageIssues: string[] = [];

            const titleLen = lengthInChars(metaTitle);
            if (!metaTitle) pageIssues.push('MISSING_META_TITLE');
            else if (titleLen < 40) pageIssues.push('META_TITLE_TOO_SHORT');
            else if (titleLen > 70) pageIssues.push('META_TITLE_TOO_LONG');

            const descLen = lengthInChars(metaDescription);
            if (!metaDescription) pageIssues.push('MISSING_META_DESCRIPTION');
            else if (descLen < 100) pageIssues.push('META_DESCRIPTION_TOO_SHORT');
            else if (descLen > 200) pageIssues.push('META_DESCRIPTION_TOO_LONG');

            if (!h1) pageIssues.push('MISSING_H1');

            if (metaTitle && h1 && metaTitle.trim() === h1.trim()) {
                pageIssues.push('META_TITLE_EQUALS_H1');
            }

            const bodyText = JSON.stringify(page);
            if (type === 'cost' && !/\b(cost|price|per month|per year)\b/i.test(bodyText)) {
                pageIssues.push('MISSING_COST_KEYWORDS');
            }
            if ((type === 'problem' || type === 'anxiety') && !/\b(training|steps|plan|how to)\b/i.test(bodyText)) {
                pageIssues.push('MISSING_TRAINING_KEYWORDS');
            }

            const faqCount = Array.isArray(page.faq) ? page.faq.length : 0;
            const qaCount = Array.isArray(page.quick_answers) ? page.quick_answers.length : 0;
            if (faqCount < 2) pageIssues.push('FAQ_TOO_SHORT');
            if (qaCount < 1) pageIssues.push('QUICK_ANSWERS_TOO_SHORT');

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
    if (issues.length > 0) {
        process.exitCode = 1;
    }
}

checkSeo().catch((err) => {
    console.error('qa-seo failed:', err);
    process.exit(1);
});

