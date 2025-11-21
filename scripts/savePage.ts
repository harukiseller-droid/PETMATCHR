import fs from 'fs/promises';
import path from 'path';

export async function savePage(pageType: string, slug: string, data: any) {
    const dataDir = path.join(process.cwd(), 'src/data/pages');
    const targetDir = path.join(dataDir, pageType);

    // Ensure directory exists
    try {
        await fs.access(targetDir);
    } catch {
        await fs.mkdir(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, `${slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`Saved ${pageType} page: ${slug}`);
}
