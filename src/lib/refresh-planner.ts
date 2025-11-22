import fs from 'fs/promises';
import path from 'path';

const V7_DATA_DIR = path.join(process.cwd(), 'src/data_v7/pages');
const MATRIX_PATH = path.join(process.cwd(), 'pageMatrix.json');

export interface RefreshItem {
    slug: string;
    page_type: string;
    reason: 'missing' | 'stale' | 'manual';
    last_updated?: string;
}

export async function getPagesNeedingRefresh(daysThreshold = 30): Promise<RefreshItem[]> {
    let matrix: any[];
    try {
        const raw = await fs.readFile(MATRIX_PATH, 'utf-8');
        matrix = JSON.parse(raw);
    } catch (e) {
        console.error('Failed to read pageMatrix.json', e);
        return [];
    }

    const toRefresh: RefreshItem[] = [];
    const now = new Date();

    for (const item of matrix) {
        const filePath = path.join(V7_DATA_DIR, item.page_type, `${item.slug}.json`);
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const page = JSON.parse(content);

            const lastDate = page.last_refreshed_at || page.last_generated_at;
            if (!lastDate) {
                toRefresh.push({ slug: item.slug, page_type: item.page_type, reason: 'stale' });
                continue;
            }

            const date = new Date(lastDate);
            const diffTime = Math.abs(now.getTime() - date.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > daysThreshold) {
                toRefresh.push({
                    slug: item.slug,
                    page_type: item.page_type,
                    reason: 'stale',
                    last_updated: lastDate
                });
            }
        } catch (e) {
            // File doesn't exist or read error
            toRefresh.push({ slug: item.slug, page_type: item.page_type, reason: 'missing' });
        }
    }

    return toRefresh;
}
