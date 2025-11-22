import { MetadataRoute } from 'next';
import { getPageIndex } from '@/lib/internal-links';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://petmatchr.com';
    const index = await getPageIndex();

    const urls: MetadataRoute.Sitemap = [];
    const now = new Date();

    urls.push({
        url: baseUrl,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1,
    });

    urls.push({
        url: `${baseUrl}/answers`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    });

    const quizSlugs = ['insurance-fit-quiz', 'behavior-check-quiz', 'lifestyle-match'];
    for (const slug of quizSlugs) {
        urls.push({
            url: `${baseUrl}/quiz/${slug}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        });
    }

    urls.push({
        url: `${baseUrl}/compare`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
    });

    for (const entry of index) {
        let path: string | null = null;
        if (entry.page_type === 'breed') path = `/breeds/${entry.slug}`;
        else if (entry.page_type === 'cost') path = `/cost/${entry.slug}`;
        else if (entry.page_type === 'problem') path = `/problems/${entry.slug}`;
        else if (entry.page_type === 'anxiety') path = `/anxiety/${entry.slug}`;
        else if (entry.page_type === 'comparison') path = `/compare/${entry.slug}`;
        else if (entry.page_type === 'location') path = `/locations/${entry.slug}`;
        else if (entry.page_type === 'list') path = `/lists/${entry.slug}`;

        if (!path) continue;

        urls.push({
            url: `${baseUrl}${path}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        });
    }

    return urls;
}
