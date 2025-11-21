import fs from 'fs/promises';
import path from 'path';

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

interface PageMatrixItem {
    slug: string;
    page_type: 'cost' | 'problem' | 'comparison' | 'anxiety' | 'location' | 'list';
    data: any; // Context data for the prompt
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
            matrix.push({
                slug: `${breed.slug}-cost-${city.slug}`,
                page_type: 'cost',
                data: {
                    breed_name: breed.name,
                    city_name: city.name,
                    state_code: city.state
                }
            });
        }
    }

    // Generate Problem Pages (Breed x Problem)
    for (const breed of breeds) {
        for (const problem of problems) {
            matrix.push({
                slug: `${breed.slug}-${problem.slug}`,
                page_type: 'problem',
                data: {
                    breed_name: breed.name,
                    problem_title: problem.title
                }
            });
        }
    }

    // Generate Comparison Pages (Breed x Breed) - Simple example: just compare first 2
    if (breeds.length >= 2) {
        matrix.push({
            slug: `${breeds[0].slug}-vs-${breeds[1].slug}`,
            page_type: 'comparison',
            data: {
                breed1_name: breeds[0].name,
                breed2_name: breeds[1].name
            }
        });
    }

    // Generate Anxiety Pages (Breed)
    for (const breed of breeds) {
        matrix.push({
            slug: `${breed.slug}-anxiety`,
            page_type: 'anxiety',
            data: {
                breed_name: breed.name
            }
        });
    }

    // Generate Location Pages (City)
    for (const city of cities) {
        matrix.push({
            slug: `best-dogs-for-${city.slug}`,
            page_type: 'location',
            data: {
                city_name: city.name
            }
        });
    }

    // Generate List Pages (Lifestyle)
    const lifestyles = ['apartments', 'families', 'active-owners'];
    for (const lifestyle of lifestyles) {
        matrix.push({
            slug: `best-dogs-for-${lifestyle}`,
            page_type: 'list',
            data: {
                lifestyle_name: lifestyle
            }
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
