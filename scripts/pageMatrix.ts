import fs from 'fs/promises';
import path from 'path';
import { PageKeywordBundle, getKeywordsForPage, getFallbackKeywordsForPage } from '../src/lib/seo-keywords';
import { PageType } from '../src/lib/types';

// Types matching our data
interface Breed {
    id: string;
    slug: string;
    name: string;
}

interface City {
    slug: string;
    name: string;
    state: string;
}

interface Problem {
    slug: string;
    title: string;
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

async function generatePageMatrix() {
    const dataDir = path.join(process.cwd(), 'src/data');

    // Load base data
    const breeds: Breed[] = JSON.parse(await fs.readFile(path.join(dataDir, 'breeds.json'), 'utf-8'));
    const cities: City[] = JSON.parse(await fs.readFile(path.join(dataDir, 'cities.json'), 'utf-8'));
    const problems: Problem[] = JSON.parse(await fs.readFile(path.join(dataDir, 'problems.json'), 'utf-8'));

    const matrix: PageMatrixItem[] = [];

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
                keywords: getKeywordsForPage('problem', breed.name, problem.title) ?? getFallbackKeywordsForPage('problem', { breed_name: breed.name, problem_title: problem.title }),
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
    const lifestyles = ['apartments', 'families', 'active-owners'];
    for (const lifestyle of lifestyles) {
        matrix.push({
            slug: `best-dogs-for-${lifestyle}`,
            page_type: 'list',
            input_data: {
                lifestyle_name: lifestyle
            },
            ai_prompt_version: 'v7',
            keywords: getKeywordsForPage('list', lifestyle) ?? getFallbackKeywordsForPage('list', { other_entity_name: lifestyle }),
            primary_intent: 'general_research',
        });
    }

    // Write matrix
    await fs.writeFile(
        path.join(process.cwd(), 'pageMatrix.json'),
        JSON.stringify(matrix, null, 2)
    );

    console.log(`Generated page matrix with ${matrix.length} items.`);
}

generatePageMatrix().catch(console.error);
