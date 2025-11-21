import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://www.petmatchr.com'; // Replace with actual domain

async function generateSitemap() {
    const pagesDir = path.join(process.cwd(), 'src/data/pages');
    const pageTypes = ['cost', 'problem', 'breed', 'list'];

    let urls: string[] = [
        BASE_URL,
        `${BASE_URL}/answers`,
    ];

    // Add static quizzes
    urls.push(`${BASE_URL}/quiz/insurance-fit-quiz`);
    urls.push(`${BASE_URL}/quiz/behavior-check-quiz`);
    urls.push(`${BASE_URL}/quiz/lifestyle-match-quiz`);

    for (const type of pageTypes) {
        const typeDir = path.join(pagesDir, type);
        try {
            const files = await fs.readdir(typeDir);
            for (const file of files) {
                if (!file.endsWith('.json')) continue;

                const slug = file.replace('.json', '');
                let url = '';

                if (type === 'breed') {
                    url = `${BASE_URL}/breeds/${slug}`;
                } else if (type === 'cost') {
                    url = `${BASE_URL}/cost/${slug}`;
                } else if (type === 'problem') {
                    url = `${BASE_URL}/problems/${slug}`;
                } else if (type === 'list') {
                    url = `${BASE_URL}/lists/${slug}`;
                }

                if (url) urls.push(url);
            }
        } catch (e) {
            // Ignore empty dirs
        }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log(`Generated sitemap with ${urls.length} URLs.`);
}

generateSitemap().catch(console.error);
