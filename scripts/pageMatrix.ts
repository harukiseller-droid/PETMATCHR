import fs from 'fs';
import path from 'path';
import { PageKeywordBundle, getKeywordsForPage, getFallbackKeywordsForPage } from '../src/lib/seo-keywords';
import { PageType } from '../src/lib/types';
import {
    Breed,
    Problem,
    Lifestyle,
    loadInputData,
    slugify
} from './generate-content-matrix';

// Types matching our data
interface City {
    slug: string;
    name: string;
    state: string;
}

type PageTypeV7 = Extract<PageType, 'breed' | 'list' | 'comparison' | 'cost' | 'problem' | 'anxiety' | 'location'>;

interface PageMatrixItem {
    slug: string;
    page_type: PageTypeV7;
    input_data: any;
    ai_prompt_version: string;
    keywords: PageKeywordBundle;
    primary_intent: string;
}

function loadCities(): City[] {
    const citiesMap = new Map<string, City>();

    // 1. Get cities from locations.json (Largest cities)
    const locations = loadInputData<any>('locations.json');
    locations.forEach(loc => {
        if (loc.largest_city) {
            const slug = slugify(loc.largest_city);
            citiesMap.set(slug, {
                slug,
                name: loc.largest_city,
                state: loc.abbreviation || loc.state
            });
        }
    });

    // 2. Get cities from costs.json (Explicit cities list)
    try {
        const costsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'input_data', 'costs.json'), 'utf-8'));
        if (costsData.cities && Array.isArray(costsData.cities)) {
            costsData.cities.forEach((item: any) => {
                // Filter out breeds disguised as cities (check if state contains '$')
                if (item.state && !item.state.includes('$') && !item.city.includes('Terrier') && !item.city.includes('Bulldog')) {
                    const slug = slugify(item.city);
                    // Prefer data from costs.json if it has more specific state codes, or just add if new
                    if (!citiesMap.has(slug)) {
                        citiesMap.set(slug, {
                            slug,
                            name: item.city,
                            state: item.state
                        });
                    }
                }
            });
        }
    } catch (e) {
        console.warn('Error loading cities from costs.json', e);
    }

    return Array.from(citiesMap.values());
}

async function generatePageMatrix() {
    console.log('Generating Page Matrix from input_data...');

    // Load base data using the shared loader
    const breeds = loadInputData<Breed>('breeds.json');
    const problems = loadInputData<Problem>('problems.json');
    const lifestyles = loadInputData<Lifestyle>('lifestyles.json');
    const cities = loadCities();

    console.log(`Loaded ${breeds.length} breeds, ${problems.length} problems, ${lifestyles.length} lifestyles, ${cities.length} cities.`);

    const matrix: PageMatrixItem[] = [];

    // Generate Breed Pages
    for (const breed of breeds) {
        matrix.push({
            slug: breed.slug,
            page_type: 'breed',
            input_data: {
                breed,
            },
            ai_prompt_version: 'v7',
            keywords: getKeywordsForPage('breed', breed.name) ?? getFallbackKeywordsForPage('breed', { breed_name: breed.name }),
            primary_intent: 'general_research',
        });
    }

    // Generate Cost Pages (Breed x City)
    // Limit to first 2 breeds and 2 cities for testing/demo, or all if production
    // For this task, I'll generate for all loaded breeds/cities
    for (const breed of breeds) {
        for (const city of cities) {
            const slug = `${breed.slug}-cost-${city.slug}`;
            matrix.push({
                slug,
                page_type: 'cost',
                input_data: {
                    breed,
                    city: {
                        city_slug: city.slug,
                        city_name: city.name,
                        state_code: city.state,
                    }
                },
                ai_prompt_version: 'v7',
                keywords: getKeywordsForPage('cost', breed.name, city.name) ?? getFallbackKeywordsForPage('cost', { breed_name: breed.name, city_name: city.name }),
                primary_intent: 'budget_costs',
            });
        }
    }

    // Generate Problem Pages (Breed x Problem)
    for (const breed of breeds) {
        for (const problem of problems) {
            const slug = `${breed.slug}-${problem.slug}`;
            matrix.push({
                slug,
                page_type: 'problem',
                input_data: {
                    breed,
                    problem,
                },
                ai_prompt_version: 'v7',
                keywords: getKeywordsForPage('problem', breed.name, problem.name) ?? getFallbackKeywordsForPage('problem', { breed_name: breed.name, problem_title: problem.name }),
                primary_intent: 'behavior_issues',
            });
        }
    }

    // Generate Comparison Pages (Breed x Breed) - Simple example: just compare first 2
    if (breeds.length >= 2) {
        const a = breeds[0];
        const b = breeds[1];
        matrix.push({
            slug: `${a.slug}-vs-${b.slug}`,
            page_type: 'comparison',
            input_data: {
                breed_a: a,
                breed_b: b,
                persona_hint: null,
            },
            ai_prompt_version: 'v7',
            keywords: getKeywordsForPage('comparison', a.name, b.name) ?? getFallbackKeywordsForPage('comparison', { breed_name: a.name, other_entity_name: b.name }),
            primary_intent: 'general_research',
        });
    }

    // Generate Anxiety Pages (Breed)
    for (const breed of breeds) {
        matrix.push({
            slug: `${breed.slug}-anxiety`,
            page_type: 'anxiety',
            input_data: {
                breed,
            },
            ai_prompt_version: 'v7',
            keywords: getKeywordsForPage('anxiety', breed.name, 'anxiety') ?? getFallbackKeywordsForPage('anxiety', { breed_name: breed.name, problem_title: 'anxiety' }),
            primary_intent: 'behavior_issues',
        });
    }

    // Generate Location Pages (City)
    for (const city of cities) {
        matrix.push({
            slug: `best-dogs-for-${city.slug}`,
            page_type: 'location',
            input_data: {
                city: {
                    city_slug: city.slug,
                    city_name: city.name,
                    state_code: city.state,
                }
            },
            ai_prompt_version: 'v7',
            keywords: getKeywordsForPage('location', city.name) ?? getFallbackKeywordsForPage('location', { city_name: city.name }),
            primary_intent: 'apartment_living',
        });
    }

    // Generate List Pages (Lifestyle)
    for (const lifestyle of lifestyles) {
        matrix.push({
            slug: `best-dogs-for-${lifestyle.id}`,
            page_type: 'list',
            input_data: {
                lifestyle_name: lifestyle.name,
                lifestyle: lifestyle
            },
            ai_prompt_version: 'v7',
            keywords: getKeywordsForPage('list', lifestyle.name) ?? getFallbackKeywordsForPage('list', { other_entity_name: lifestyle.name }),
            primary_intent: 'general_research',
        });
    }

    // Write matrix
    await fs.promises.writeFile(
        path.join(process.cwd(), 'pageMatrix.json'),
        JSON.stringify(matrix, null, 2)
    );

    console.log(`Generated page matrix with ${matrix.length} items.`);
}

if (require.main === module) {
    generatePageMatrix().catch(console.error);
}

export { generatePageMatrix };
