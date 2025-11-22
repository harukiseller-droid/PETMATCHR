import fs from 'fs';
import path from 'path';

const INPUT_DIR = path.join(process.cwd(), 'input_data');
const OUTPUT_FILE = path.join(process.cwd(), 'content_matrix.json');

// Interfaces for Input Data
export interface Breed {
    id: string;
    slug: string;
    name: string;
}

export interface Problem {
    id: string;
    slug: string;
    name: string;
}

export interface Comparison {
    id: string;
    title: string;
}

export interface Lifestyle {
    id: string;
    name: string;
}

export interface Anxiety {
    id: string;
    name: string;
}

export interface CostState {
    state: string;
    lifetime_cost?: number;
    annual_cost?: number;
}

export interface CostCity {
    city: string;
    state: string;
    first_year_min?: number;
    first_year_max?: number;
}

export interface Location {
    state: string;
    largest_city: string;
    abbreviation?: string;
}

export interface KeywordCategory {
    category: string;
    keywords: string[];
}

// Output Interface
export interface ContentPage {
    slug: string;
    type: 'breed' | 'problem' | 'comparison' | 'lifestyle' | 'anxiety' | 'cost' | 'location' | 'list';
    title: string;
    data_source: string;
    meta?: any;
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function loadInputData<T>(filename: string): T[] {
    try {
        const filePath = path.join(INPUT_DIR, filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`Warning: Input file ${filename} not found.`);
            return [];
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (e: any) {
        console.error(`Error loading ${filename}:`, e.message);
        return [];
    }
}

async function generateMatrix() {
    console.log('Generating content matrix from input_data...');
    const pages: ContentPage[] = [];

    // 1. Breeds
    const breeds = loadInputData<Breed>('breeds.json');
    breeds.forEach(breed => {
        pages.push({
            slug: breed.slug || breed.id,
            type: 'breed',
            title: breed.name,
            data_source: 'breeds.json'
        });
    });
    console.log(`Processed ${breeds.length} breeds.`);

    // 2. Problems
    const problems = loadInputData<Problem>('problems.json');
    problems.forEach(problem => {
        pages.push({
            slug: problem.slug || problem.id,
            type: 'problem',
            title: problem.name,
            data_source: 'problems.json'
        });
    });
    console.log(`Processed ${problems.length} problems.`);

    // 3. Comparisons
    const comparisons = loadInputData<Comparison>('comparisons.json');
    comparisons.forEach(comp => {
        pages.push({
            slug: comp.id,
            type: 'comparison',
            title: comp.title,
            data_source: 'comparisons.json'
        });
    });
    console.log(`Processed ${comparisons.length} comparisons.`);

    // 4. Lifestyles
    const lifestyles = loadInputData<Lifestyle>('lifestyles.json');
    lifestyles.forEach(style => {
        pages.push({
            slug: style.id,
            type: 'lifestyle',
            title: style.name,
            data_source: 'lifestyles.json'
        });
    });
    console.log(`Processed ${lifestyles.length} lifestyles.`);

    // 5. Anxieties
    const anxieties = loadInputData<Anxiety>('anxieties.json');
    anxieties.forEach(anxiety => {
        pages.push({
            slug: anxiety.id,
            type: 'anxiety',
            title: anxiety.name,
            data_source: 'anxieties.json'
        });
    });
    console.log(`Processed ${anxieties.length} anxieties.`);

    // 7. Locations (States) - Process first to get valid states list
    const validStates = new Set<string>();
    const locations = loadInputData<Location>('locations.json');
    locations.forEach(loc => {
        validStates.add(loc.state);
        pages.push({
            slug: slugify(loc.state),
            type: 'location',
            title: `Dogs in ${loc.state}`,
            data_source: 'locations.json'
        });
    });
    console.log(`Processed ${locations.length} locations.`);

    // 6. Costs (States)
    try {
        const costsData = JSON.parse(fs.readFileSync(path.join(INPUT_DIR, 'costs.json'), 'utf-8'));
        if (costsData.states && Array.isArray(costsData.states)) {
            let validCostStates = 0;
            costsData.states.forEach((state: any) => {
                // Validate against known locations or common sense (exclude breeds)
                if (validStates.has(state.state)) {
                    pages.push({
                        slug: slugify(state.state),
                        type: 'cost',
                        title: `Cost of Dog Ownership in ${state.state}`,
                        data_source: 'costs.json'
                    });
                    validCostStates++;
                }
            });
            console.log(`Processed ${validCostStates} valid cost states (filtered from ${costsData.states.length}).`);
        }
    } catch (e: any) { console.error('Error processing costs:', e.message); }

    // 8. Lists (from Keywords)
    const keywordsData = loadInputData<KeywordCategory>('keywords.json');
    let listCount = 0;
    keywordsData.forEach(cat => {
        cat.keywords.forEach(keyword => {
            // Only generate pages for "best..." style keywords which imply a list
            if (keyword.toLowerCase().startsWith('best') || keyword.toLowerCase().includes('breed for')) {
                pages.push({
                    slug: slugify(keyword),
                    type: 'list',
                    title: keyword, // Capitalize first letter?
                    data_source: 'keywords.json',
                    meta: { category: cat.category }
                });
                listCount++;
            }
        });
    });
    console.log(`Processed ${listCount} list pages from keywords.`);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pages, null, 2));
    console.log(`\nSuccessfully generated content matrix with ${pages.length} pages.`);
    console.log(`Output saved to: ${OUTPUT_FILE}`);
}

if (require.main === module) {
    generateMatrix();
}

export { generateMatrix };
