import fs from 'fs/promises';
import path from 'path';
import { ensureComparisonPage } from '../src/lib/comparison-generator';

const DATA_DIR = path.join(process.cwd(), 'src/data_v7');
const PENDING_FILE = path.join(DATA_DIR, 'comparison_requests_pending.json');

async function loadPending(): Promise<any[]> {
    try {
        const raw = await fs.readFile(PENDING_FILE, 'utf-8');
        return JSON.parse(raw) || [];
    } catch {
        return [];
    }
}

async function savePending(items: any[]) {
    await fs.writeFile(PENDING_FILE, JSON.stringify(items, null, 2));
}

async function processPending() {
    const pending = await loadPending();
    if (!pending.length) {
        console.log('No pending comparison requests.');
        return;
    }

    console.log(`Processing ${pending.length} pending comparison requests...`);
    const remaining: any[] = [];

    for (const req of pending) {
        const { leftBreedSlug, rightBreedSlug, context } = req;
        const slug = [leftBreedSlug, rightBreedSlug].sort().join('-vs-');

        try {
            const result = await ensureComparisonPage({ leftBreedSlug, rightBreedSlug, context });
            if (result.ok) {
                console.log(`Generated comparison for ${slug}`);
            } else {
                console.warn(`Still could not generate ${slug}: ${result.reason}`);
                remaining.push(req);
            }
        } catch (e) {
            console.error(`Error processing ${slug}:`, e);
            remaining.push(req);
        }
    }

    await savePending(remaining);
    console.log(`Processing complete. Remaining pending: ${remaining.length}`);
}

processPending().catch((err) => {
    console.error('Error in process-pending-comparisons:', err);
    process.exit(1);
});

