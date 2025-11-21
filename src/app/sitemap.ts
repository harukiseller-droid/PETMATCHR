import { MetadataRoute } from 'next';
import { getBreeds } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://petmatchr.com';
    const breeds = await getBreeds();

    const breedUrls = breeds.map((breed) => ({
        url: `${baseUrl}/breeds/${breed.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const costUrls = breeds.map((breed) => ({
        url: `${baseUrl}/cost/${breed.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const problemUrls = breeds.map((breed) => ({
        url: `${baseUrl}/problems/${breed.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const anxietyUrls = breeds.map((breed) => ({
        url: `${baseUrl}/anxiety/${breed.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/quiz/lifestyle-match`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/compare`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...breedUrls,
        ...costUrls,
        ...problemUrls,
        ...anxietyUrls,
    ];
}
