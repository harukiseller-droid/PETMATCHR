// FILE: src/lib/data.ts
import fs from 'fs/promises';
import path from 'path';
import {
    Breed,
    LifestyleScore,
    CostPage,
    ProblemPage,
    BreedPage,
    ListPage,
    ComparisonPage,
    AnxietyPage,
    LocationPage,
    City,
    BreedV7Page,
    CostV7Page,
    ProblemV7Page,
    ListV7Page,
    ComparisonV7Page,
    AnxietyV7Page,
    LocationV7Page,
    QuickAnswer
} from '@/lib/types';
import { QuizDefinition } from '@/lib/quiz-types';

const DATA_DIR = path.join(process.cwd(), 'src/data_v7');

export async function getBreeds(): Promise<Breed[]> {
    const filePath = path.join(DATA_DIR, 'breeds.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function getAllQuizzes(): Promise<QuizDefinition[]> {
    const quizzesDir = path.join(DATA_DIR, 'quizzes');
    try {
        const files = await fs.readdir(quizzesDir);
        const quizzes: QuizDefinition[] = [];
        for (const file of files) {
            if (!file.endsWith('.json')) continue;
            const filePath = path.join(quizzesDir, file);
            const content = await fs.readFile(filePath, 'utf-8');
            try {
                const quiz = JSON.parse(content);
                quizzes.push(quiz);
            } catch (e) {
                console.warn(`Failed to parse quiz file: ${file}`, e);
            }
        }
        return quizzes;
    } catch (e) {
        console.warn('Failed to read quizzes directory', e);
        return [];
    }
}

export async function getQuizDefinition(slug: string): Promise<QuizDefinition | null> {
    const quizzes = await getAllQuizzes();
    return quizzes.find(q => q.slug === slug) || null;
}

export async function getAllQuickAnswers(): Promise<QuickAnswer[]> {
    const pagesDir = path.join(DATA_DIR, 'pages');
    const pageTypes = ['breed', 'cost', 'problem', 'comparison', 'anxiety', 'location', 'list'];
    const allAnswers: QuickAnswer[] = [];

    for (const type of pageTypes) {
        const typeDir = path.join(pagesDir, type);
        try {
            const files = await fs.readdir(typeDir);
            for (const file of files) {
                if (!file.endsWith('.json')) continue;
                const filePath = path.join(typeDir, file);
                try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    const page = JSON.parse(content);
                    if (page.quick_answers && Array.isArray(page.quick_answers)) {
                        allAnswers.push(...page.quick_answers);
                    }
                } catch (e) {
                    // ignore read errors
                }
            }
        } catch (e) {
            // ignore dir errors
        }
    }
    return allAnswers;
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

export async function getGuidePageBySlug(slug: string): Promise<ListPage | null> {
    try {
        const filePath = path.join(DATA_DIR, 'pages', 'guides', `${slug}.json`);
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

// --- V7 page loaders (prefer these for new UI; fall back to legacy if V7 shape missing) ---

export async function getBreedPageV7BySlug(slug: string): Promise<BreedV7Page | null> {
    const filePath = path.join(DATA_DIR, 'pages', 'breed', `${slug}.json`);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        if (json && json.page_type === 'breed') {
            return json as BreedV7Page;
        }
        return null;
    } catch {
        return null;
    }
}

export async function getCostPageV7BySlug(slug: string): Promise<CostV7Page | null> {
    const filePath = path.join(DATA_DIR, 'pages', 'cost', `${slug}.json`);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        if (json && json.page_type === 'cost') {
            return json as CostV7Page;
        }
        return null;
    } catch {
        return null;
    }
}

export async function getProblemPageV7BySlug(slug: string): Promise<ProblemV7Page | null> {
    const filePath = path.join(DATA_DIR, 'pages', 'problem', `${slug}.json`);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        if (json && json.page_type === 'problem') {
            return json as ProblemV7Page;
        }
        return null;
    } catch {
        return null;
    }
}

export async function getListPageV7BySlug(slug: string): Promise<ListV7Page | null> {
    const filePath = path.join(DATA_DIR, 'pages', 'list', `${slug}.json`);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        if (json && json.page_type === 'list') {
            return json as ListV7Page;
        }
        return null;
    } catch {
        return null;
    }
}

export async function getComparisonPageV7BySlug(slug: string): Promise<ComparisonV7Page | null> {
    const filePath = path.join(DATA_DIR, 'pages', 'comparison', `${slug}.json`);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        if (json && json.page_type === 'comparison') {
            return json as ComparisonV7Page;
        }
        return null;
    } catch {
        return null;
    }
}

export async function getAnxietyPageV7BySlug(slug: string): Promise<AnxietyV7Page | null> {
    const filePath = path.join(DATA_DIR, 'pages', 'anxiety', `${slug}.json`);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        if (json && json.page_type === 'anxiety') {
            return json as AnxietyV7Page;
        }
        return null;
    } catch {
        return null;
    }
}

export async function getLocationPageV7BySlug(slug: string): Promise<LocationV7Page | null> {
    const filePath = path.join(DATA_DIR, 'pages', 'location', `${slug}.json`);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        if (json && json.page_type === 'location') {
            return json as LocationV7Page;
        }
        return null;
    } catch {
        return null;
    }
}

export async function getCities(): Promise<City[]> {
    const filePath = path.join(DATA_DIR, 'cities.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}


import { getPagesByBreed } from '@/lib/internal-links';

export async function getCostPagesForBreed(breedSlug: string): Promise<CostPage[]> {
    const { costPages } = await getPagesByBreed(breedSlug);
    const pages = await Promise.all(
        costPages.map(entry => getCostPageBySlug(entry.slug))
    );
    return pages.filter((p): p is CostPage => p !== null);
}

export async function getProblemPagesForBreed(breedSlug: string): Promise<ProblemPage[]> {
    const { problemPages } = await getPagesByBreed(breedSlug);
    const pages = await Promise.all(
        problemPages.map(entry => getProblemPageBySlug(entry.slug))
    );
    return pages.filter((p): p is ProblemPage => p !== null);
}

export async function getAnxietyPagesForBreed(breedSlug: string): Promise<AnxietyPage[]> {
    const { anxietyPages } = await getPagesByBreed(breedSlug);
    const pages = await Promise.all(
        anxietyPages.map(entry => getAnxietyPageBySlug(entry.slug))
    );
    return pages.filter((p): p is AnxietyPage => p !== null);
}

export async function getComparisonPagesForBreed(breedSlug: string): Promise<ComparisonPage[]> {
    const { comparisonPages } = await getPagesByBreed(breedSlug);
    const pages = await Promise.all(
        comparisonPages.map(entry => getComparisonPageBySlug(entry.slug))
    );
    return pages.filter((p): p is ComparisonPage => p !== null);
}

