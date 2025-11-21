// FILE: src/lib/data.ts
import fs from 'fs/promises';
import path from 'path';
import { Breed, LifestyleScore, CostPage, ProblemPage, BreedPage, ListPage, ComparisonPage, AnxietyPage, LocationPage, City } from '@/lib/types';

const DATA_DIR = path.join(process.cwd(), 'src/data');

export async function getBreeds(): Promise<Breed[]> {
    const filePath = path.join(DATA_DIR, 'breeds.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function getBreedBySlug(slug: string): Promise<Breed | null> {
    const breeds = await getBreeds();
    return breeds.find((b) => b.slug === slug) || null;
}

export async function getLifestyleScores(): Promise<LifestyleScore[]> {
    const filePath = path.join(DATA_DIR, 'lifestyle_scores.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function getLifestyleScoreForBreed(breedId: string): Promise<LifestyleScore | null> {
    const scores = await getLifestyleScores();
    return scores.find((s) => s.breed_id === breedId) || null;
}

export async function getCostPageBySlug(slug: string): Promise<CostPage | null> {
    try {
        const filePath = path.join(DATA_DIR, 'pages', 'cost', `${slug}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export async function getProblemPageBySlug(slug: string): Promise<ProblemPage | null> {
    try {
        const filePath = path.join(DATA_DIR, 'pages', 'problem', `${slug}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export async function getBreedPageBySlug(slug: string): Promise<BreedPage | null> {
    try {
        const filePath = path.join(DATA_DIR, 'pages', 'breed', `${slug}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export async function getListPageBySlug(slug: string): Promise<ListPage | null> {
    try {
        const filePath = path.join(DATA_DIR, 'pages', 'list', `${slug}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export async function getComparisonPageBySlug(slug: string): Promise<ComparisonPage | null> {
    try {
        const filePath = path.join(DATA_DIR, 'pages', 'comparison', `${slug}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export async function getAnxietyPageBySlug(slug: string): Promise<AnxietyPage | null> {
    try {
        const filePath = path.join(DATA_DIR, 'pages', 'anxiety', `${slug}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export async function getLocationPageBySlug(slug: string): Promise<LocationPage | null> {
    try {
        const filePath = path.join(DATA_DIR, 'pages', 'location', `${slug}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export async function getCities(): Promise<City[]> {
    const filePath = path.join(DATA_DIR, 'cities.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function getCityBySlug(slug: string): Promise<City | null> {
    const cities = await getCities();
    return cities.find((c) => c.name.toLowerCase().replace(/ /g, '-') === slug || c.name.toLowerCase() === slug) || null;
}
