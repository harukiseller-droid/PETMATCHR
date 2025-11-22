// FILE: src/lib/quick-answers.ts

import fs from 'fs/promises';
import path from 'path';
import { PageType, QuickAnswerCategory } from '@/lib/types';
import { getPageMonetization } from '@/lib/monetization';

const DATA_DIR = path.join(process.cwd(), 'src/data_v7');
const PAGES_DIR = path.join(DATA_DIR, 'pages');

export type QuickAnswerEntry = {
    id: string;
    page_slug: string;
    page_type: PageType;
    question: string;
    answer: string;
    category: QuickAnswerCategory;
    primary_quiz_slug: string | null;
};

const PAGE_TYPE_DIRS: { dir: string; page_type: PageType }[] = [
    { dir: 'breed', page_type: 'breed' },
    { dir: 'cost', page_type: 'cost' },
    { dir: 'problem', page_type: 'problem' },
    { dir: 'comparison', page_type: 'comparison' },
    { dir: 'anxiety', page_type: 'anxiety' },
    { dir: 'location', page_type: 'location' },
    { dir: 'list', page_type: 'list' },
];

export async function getAllQuickAnswers(): Promise<QuickAnswerEntry[]> {
    const entries: Omit<QuickAnswerEntry, 'id' | 'primary_quiz_slug'>[] = [];

    for (const { dir, page_type } of PAGE_TYPE_DIRS) {
        const typeDir = path.join(PAGES_DIR, dir);
        try {
            const files = await fs.readdir(typeDir);
            for (const file of files) {
                if (!file.endsWith('.json')) continue;
                const filePath = path.join(typeDir, file);
                try {
                    const raw = await fs.readFile(filePath, 'utf-8');
                    const page = JSON.parse(raw) as any;
                    const slug: string = page.slug || file.replace(/\.json$/, '');
                    const qaList: any[] = Array.isArray(page.quick_answers) ? page.quick_answers : [];
                    for (const qa of qaList) {
                        if (!qa || typeof qa.question !== 'string' || typeof qa.answer !== 'string') continue;
                        const category = qa.category as QuickAnswerCategory | undefined;
                        if (!category || !['Living', 'Costs', 'Health', 'Training'].includes(category)) continue;

                        entries.push({
                            page_slug: slug,
                            page_type,
                            question: qa.question,
                            answer: qa.answer,
                            category,
                        });
                    }
                } catch {
                    // ignore malformed file
                }
            }
        } catch {
            // directory may not exist yet
        }
    }

    // Attach primary_quiz_slug if available from monetization
    const uniqueSlugs = Array.from(new Set(entries.map(e => e.page_slug)));
    const monetizationMap = new Map<string, string | null>();

    await Promise.all(
        uniqueSlugs.map(async (slug) => {
            try {
                const m = await getPageMonetization(slug);
                monetizationMap.set(slug, m?.primary_quiz_slug ?? null);
            } catch {
                monetizationMap.set(slug, null);
            }
        })
    );

    return entries.map((e, index) => ({
        id: `${e.page_slug}#${index}`,
        page_slug: e.page_slug,
        page_type: e.page_type,
        question: e.question,
        answer: e.answer,
        category: e.category,
        primary_quiz_slug: monetizationMap.get(e.page_slug) ?? null,
    }));
}

