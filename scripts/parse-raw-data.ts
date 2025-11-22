import fs from 'fs';
import path from 'path';

// --- Interfaces ---

interface Breed {
    id: string;
    slug: string;
    name: string;
    short_name?: string;
    size?: string; // 'small', 'medium', 'large', 'giant'
    energy_level?: number; // 1-5
    shedding_level?: number; // 1-5
    barking_level?: number; // 1-5
    trainability?: number; // 1-5
    kid_friendly?: number; // 1-5
    dog_friendly?: number; // 1-5
    stranger_friendly?: number; // 1-5
    apartment_suitable?: number; // 1-5
    first_time_owner_friendly?: number; // 1-5
    alone_time_tolerance?: number; // 1-5
    exercise_need?: number; // 1-5
    grooming_need?: number; // 1-5
    cost_level?: number; // 1-5
    common_health_issues?: string[];
    lifespan_min_years?: number;
    lifespan_max_years?: number;
    origin_country?: string;
    temperament_keywords?: string[];
    monthly_cost_min_usd?: number;
    monthly_cost_max_usd?: number;
    year1_cost_min_usd?: number;
    year1_cost_max_usd?: number;
    primary_image_url?: string;
    notes_internal?: string;
    popularity_rank?: number;
    weight_min_lbs?: number;
    weight_max_lbs?: number;
    anxiety_prone?: boolean;
    anxiety_types?: string[];
}

interface Problem {
    id: string;
    slug: string;
    name: string;
    description?: string;
}

interface KeywordCategory {
    category: string;
    keywords: string[];
}

interface QuestionCategory {
    category: string;
    questions: string[];
}

interface AnxietyType {
    id: string;
    name: string;
    triggers?: string[];
    affected_breeds?: string[];
}

interface LocationCost {
    state: string;
    lifetime_cost?: number;
    annual_cost?: number;
    expensive_items?: string[];
}

interface CityCost {
    city: string;
    state: string;
    first_year_min: number;
    first_year_max: number;
}

interface Location {
    state: string;
    abbreviation: string;
    capital: string;
    largest_city: string;
    region?: string;
}

interface ComparisonScenario {
    id: string;
    title: string;
    breeds: string[];
    summary?: string;
}

interface LifestyleSegment {
    id: string;
    name: string;
    demographics?: any;
    characteristics?: string[];
    best_breeds?: string[];
    content_angles?: string[];
}

// --- Paths ---

const INPUT_DIR = path.join(process.cwd(), 'INPUT_DATA_RAW');
const OUTPUT_DIR = path.join(process.cwd(), 'input_data');
const BREEDS_FILE = path.join(OUTPUT_DIR, 'breeds.json');
const PROBLEMS_FILE = path.join(OUTPUT_DIR, 'problems.json');
const KEYWORDS_FILE = path.join(OUTPUT_DIR, 'keywords.json');
const QUESTIONS_FILE = path.join(OUTPUT_DIR, 'questions.json');
const ANXIETIES_FILE = path.join(OUTPUT_DIR, 'anxieties.json');
const COSTS_FILE = path.join(OUTPUT_DIR, 'costs.json');
const LOCATIONS_FILE = path.join(OUTPUT_DIR, 'locations.json');
const COMPARISONS_FILE = path.join(OUTPUT_DIR, 'comparisons.json');
const LIFESTYLES_FILE = path.join(OUTPUT_DIR, 'lifestyles.json');

// --- Helpers ---

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function parseRange(rangeStr: string): [number, number] {
    // e.g., "10-12 years", "$800-$2,500", "20-30 lbs"
    if (!rangeStr) return [0, 0];
    const clean = rangeStr.replace(/[$,lbsyears\s]/g, '');
    const parts = clean.split('-');
    if (parts.length === 2) {
        return [parseInt(parts[0]) || 0, parseInt(parts[1]) || 0];
    }
    if (parts.length === 1) {
        const val = parseInt(parts[0]) || 0;
        return [val, val];
    }
    return [0, 0];
}

function mapLevel(levelStr: string): number {
    if (!levelStr) return 3;
    const lower = levelStr.toLowerCase();
    if (lower.includes('very high') || lower.includes('extreme')) return 5;
    if (lower.includes('high')) return 4;
    if (lower.includes('medium') || lower.includes('moderate')) return 3;
    if (lower.includes('low')) return 2;
    if (lower.includes('minimal') || lower.includes('very low')) return 1;
    return 3; // Default
}

function mapSize(sizeStr: string): string {
    if (!sizeStr) return 'medium';
    const lower = sizeStr.toLowerCase();
    if (lower.includes('toy') || lower.includes('small')) return 'small';
    if (lower.includes('medium')) return 'medium';
    if (lower.includes('large')) return 'large';
    if (lower.includes('giant')) return 'giant';
    return 'medium';
}

function parseCost(costStr: string): number {
    if (!costStr) return 0;
    return parseInt(costStr.replace(/[$,]/g, '')) || 0;
}

// --- Main Logic ---

async function main() {
    console.log('Starting raw data parsing...');

    // 1. Load existing data
    let breeds: Breed[] = [];
    let problems: Problem[] = [];

    if (fs.existsSync(BREEDS_FILE)) {
        breeds = JSON.parse(fs.readFileSync(BREEDS_FILE, 'utf-8'));
    }
    if (fs.existsSync(PROBLEMS_FILE)) {
        problems = JSON.parse(fs.readFileSync(PROBLEMS_FILE, 'utf-8'));
    }

    const breedMap = new Map<string, Breed>();
    breeds.forEach(b => breedMap.set(b.id, b));

    const problemMap = new Map<string, Problem>();
    problems.forEach(p => problemMap.set(p.id, p));

    // --- PARSING ---

    // 2. Parse dog-breeds-popularity.md
    console.log('Parsing popularity...');
    const popularityContent = fs.readFileSync(path.join(INPUT_DIR, 'dog-breeds-popularity.md'), 'utf-8');
    const popularityLines = popularityContent.split('\n');

    for (const line of popularityLines) {
        if (line.startsWith('|') && !line.includes('---')) {
            const parts = line.split('|').map(s => s.trim()).filter(s => s);
            if (parts.length >= 6 && /^\d+$/.test(parts[0])) {
                const rank = parseInt(parts[0]);
                const name = parts[1];
                const sizeStr = parts[4];
                const lifespanStr = parts[5];

                const id = slugify(name);
                let breed = breedMap.get(id);
                if (!breed) {
                    breed = {
                        id,
                        slug: id,
                        name: name,
                        common_health_issues: [],
                        temperament_keywords: []
                    };
                    breedMap.set(id, breed);
                }

                breed.popularity_rank = rank;
                breed.size = mapSize(sizeStr);
                const [minLife, maxLife] = parseRange(lifespanStr);
                breed.lifespan_min_years = minLife;
                breed.lifespan_max_years = maxLife;
            }
        }
    }

    // 3. Parse dog-breed-health-problems.md
    console.log('Parsing health problems...');
    const healthContent = fs.readFileSync(path.join(INPUT_DIR, 'dog-breed-health-problems.md'), 'utf-8');
    const healthLines = healthContent.split('\n');

    let currentBreedId: string | null = null;

    for (const line of healthLines) {
        if (line.startsWith('###') && line.includes('.')) {
            const match = line.match(/\*\*(.*?)\*\*/);
            if (match) {
                const name = match[1];
                currentBreedId = slugify(name);
                if (currentBreedId.includes('bulldog') && !currentBreedId.includes('french')) currentBreedId = 'bulldog';
                if (currentBreedId === 'corgi-pembroke-cardigan') currentBreedId = 'pembroke-welsh-corgi';
            }
        } else if (line.trim().startsWith('-') && currentBreedId) {
            const match = line.match(/\*\*(.*?)\*\*:(.*)/);
            if (match) {
                const problemName = match[1].trim();
                const description = match[2].trim();
                const problemId = slugify(problemName);

                if (!problemMap.has(problemId)) {
                    problemMap.set(problemId, {
                        id: problemId,
                        slug: problemId,
                        name: problemName,
                        description: description
                    });
                }

                const breed = breedMap.get(currentBreedId);
                if (breed) {
                    if (!breed.common_health_issues) breed.common_health_issues = [];
                    if (!breed.common_health_issues.includes(problemName)) {
                        breed.common_health_issues.push(problemName);
                    }
                }
            }
        }
    }

    // 4. Parse dog-breed-comparisons.md
    console.log('Parsing comparisons...');
    const comparisonContent = fs.readFileSync(path.join(INPUT_DIR, 'dog-breed-comparisons.md'), 'utf-8');
    const comparisonLines = comparisonContent.split('\n');

    const comparisons: ComparisonScenario[] = [];

    for (const line of comparisonLines) {
        if (line.startsWith('|') && line.includes('**')) {
            const parts = line.split('|').map(s => s.trim()).filter(s => s);
            if (parts.length >= 9) {
                const nameMatch = parts[0].match(/\*\*(.*?)\*\*/);
                if (nameMatch) {
                    const name = nameMatch[1];
                    const id = slugify(name);
                    const breed = breedMap.get(id);

                    if (breed) {
                        const weightStr = parts[3];
                        const energyStr = parts[4];
                        const tempStr = parts[5];
                        const groomingStr = parts[7];
                        const costStr = parts[9];

                        const [minW, maxW] = parseRange(weightStr);
                        breed.weight_min_lbs = minW;
                        breed.weight_max_lbs = maxW;

                        breed.energy_level = mapLevel(energyStr);
                        breed.grooming_need = mapLevel(groomingStr);

                        const [minCost, maxCost] = parseRange(costStr);
                        if (maxCost < 1000) breed.cost_level = 1;
                        else if (maxCost < 2000) breed.cost_level = 2;
                        else if (maxCost < 3000) breed.cost_level = 3;
                        else if (maxCost < 4000) breed.cost_level = 4;
                        else breed.cost_level = 5;

                        const keywords = tempStr.split(',').map(s => s.trim());
                        breed.temperament_keywords = Array.from(new Set([...(breed.temperament_keywords || []), ...keywords]));
                    }
                }
            }
        }
    }

    const sectionsToRatings: Record<string, Partial<Breed>> = {
        'Best Family Dogs': { kid_friendly: 5 },
        'Best Apartment Dogs': { apartment_suitable: 5 },
        'Best for First-Time Owners': { first_time_owner_friendly: 5 },
        'Best for Active Owners': { exercise_need: 5 },
        'Best for Seniors': { energy_level: 2 },
        'EXTREME Risk (Major Separation Anxiety)': { alone_time_tolerance: 1 },
        'HIGH Risk': { alone_time_tolerance: 2 },
        'MODERATE Risk': { alone_time_tolerance: 3 },
        'LOW Risk (Handle Alone Time Well)': { alone_time_tolerance: 5 },
    };

    let currentSection = '';
    let inPart7 = false;

    for (const line of comparisonLines) {
        if (line.includes('PART 7: BREED SELECTOR SUMMARY')) {
            inPart7 = true;
            continue;
        }

        if (inPart7) {
            if (line.startsWith('**"')) {
                // **"A dog that's easy to train"**
                const title = line.replace(/\*\*/g, '').replace(/"/g, '').trim();
                const id = slugify(title);
                comparisons.push({
                    id,
                    title,
                    breeds: []
                });
            } else if (line.trim().startsWith('→')) {
                // → Labrador, Golden, Poodle, German Shepherd
                const breedNames = line.replace('→', '').split(',').map(s => s.trim());
                const lastScenario = comparisons[comparisons.length - 1];
                if (lastScenario) {
                    lastScenario.breeds = breedNames.map(name => slugify(name));
                }
            }
        }

        if (line.startsWith('####')) {
            currentSection = line.replace('####', '').trim();
        } else if (line.trim().startsWith('-') || /^\d+\./.test(line.trim())) {
            const match = line.match(/\*\*(.*?)\*\*/);
            if (match) {
                const name = match[1];
                const id = slugify(name);
                const breed = breedMap.get(id);
                if (breed) {
                    for (const [key, ratings] of Object.entries(sectionsToRatings)) {
                        if (currentSection.includes(key.split('(')[0].trim())) {
                            Object.assign(breed, ratings);
                        }
                    }
                }
            }
        }
    }

    // 5. Parse keyword.md
    console.log('Parsing keywords...');
    const keywordContent = fs.readFileSync(path.join(INPUT_DIR, 'keyword.md'), 'utf-8');
    const keywordLines = keywordContent.split('\n');
    const keywordCategories: KeywordCategory[] = [];
    let currentKeywordCategory: KeywordCategory | null = null;

    for (const line of keywordLines) {
        if (line.trim().endsWith(')') || line.includes('Keywords')) {
            if (currentKeywordCategory) keywordCategories.push(currentKeywordCategory);
            currentKeywordCategory = { category: line.trim(), keywords: [] };
        } else if (line.trim() && currentKeywordCategory) {
            currentKeywordCategory.keywords.push(line.trim());
        }
    }
    if (currentKeywordCategory) keywordCategories.push(currentKeywordCategory);

    // 6. Parse dog-breed-questions-list.md
    console.log('Parsing questions...');
    const questionsContent = fs.readFileSync(path.join(INPUT_DIR, 'dog-breed-questions-list.md'), 'utf-8');
    const questionsLines = questionsContent.split('\n');
    const questionCategories: QuestionCategory[] = [];
    let currentQuestionCategory: QuestionCategory | null = null;

    for (const line of questionsLines) {
        if (line.startsWith('### Category')) {
            if (currentQuestionCategory) questionCategories.push(currentQuestionCategory);
            const match = line.match(/"(.*?)"/);
            const catName = match ? match[1] : line.replace('### Category', '').trim();
            currentQuestionCategory = { category: catName, questions: [] };
        } else if (line.trim().match(/^\d+\./) && currentQuestionCategory) {
            // 1. "Question?"
            const match = line.match(/"(.*?)"/);
            if (match) {
                currentQuestionCategory.questions.push(match[1]);
            }
        } else if (line.trim().startsWith('- "') && currentQuestionCategory) {
            const match = line.match(/"(.*?)"/);
            if (match) {
                currentQuestionCategory.questions.push(match[1]);
            }
        }
    }
    if (currentQuestionCategory) questionCategories.push(currentQuestionCategory);

    // 7. Parse dog-anxiety-breeds-cbd.md
    console.log('Parsing anxiety...');
    const anxietyContent = fs.readFileSync(path.join(INPUT_DIR, 'dog-anxiety-breeds-cbd.md'), 'utf-8');
    const anxietyLines = anxietyContent.split('\n');
    const anxieties: AnxietyType[] = [];
    let currentAnxiety: AnxietyType | null = null;

    for (const line of anxietyLines) {
        if (line.startsWith('### ') && !line.includes('Category')) {
            if (currentAnxiety) anxieties.push(currentAnxiety);
            const name = line.replace('### ', '').split('(')[0].trim();
            currentAnxiety = { id: slugify(name), name: name, triggers: [], affected_breeds: [] };
        } else if (line.startsWith('**Primary Triggers**:') && currentAnxiety) {
            currentAnxiety.triggers = line.replace('**Primary Triggers**:', '').split(',').map(s => s.trim());
        } else if (line.trim().startsWith('- **') && currentAnxiety) {
            const match = line.match(/\*\*(.*?)\*\*/);
            if (match) {
                const breedName = match[1];
                currentAnxiety.affected_breeds?.push(breedName);

                // Update breed
                const breedId = slugify(breedName);
                const breed = breedMap.get(breedId);
                if (breed) {
                    breed.anxiety_prone = true;
                    if (!breed.anxiety_types) breed.anxiety_types = [];
                    if (!breed.anxiety_types.includes(currentAnxiety.name)) {
                        breed.anxiety_types.push(currentAnxiety.name);
                    }
                }
            }
        }
    }
    if (currentAnxiety) anxieties.push(currentAnxiety);

    // 8. Parse dog-breed-costs-by-location.md
    console.log('Parsing costs...');
    const costsContent = fs.readFileSync(path.join(INPUT_DIR, 'dog-breed-costs-by-location.md'), 'utf-8');
    const costsLines = costsContent.split('\n');
    const locationCosts: LocationCost[] = [];
    const cityCosts: CityCost[] = [];

    for (const line of costsLines) {
        if (line.startsWith('|') && !line.includes('---')) {
            const parts = line.split('|').map(s => s.trim()).filter(s => s);
            // State costs
            if (parts.length >= 5 && /^\d+$/.test(parts[0])) {
                // Rank | State | Lifetime Cost | Annual Cost | ...
                const state = parts[1];
                const lifetime = parseCost(parts[2]);
                const annual = parseCost(parts[3].split('/')[0]); // remove /year
                locationCosts.push({ state, lifetime_cost: lifetime, annual_cost: annual });
            }
            // City costs
            if (parts.length >= 5 && parts[0].startsWith('**')) {
                // | **City** | State | Low | High | ...
                const city = parts[0].replace(/\*\*/g, '');
                const state = parts[1];
                const low = parseCost(parts[2]);
                const high = parseCost(parts[3]);
                cityCosts.push({ city, state, first_year_min: low, first_year_max: high });
            }
        }
    }

    // 9. Parse us-states-cities.md
    console.log('Parsing locations...');
    const locationsContent = fs.readFileSync(path.join(INPUT_DIR, 'us-states-cities.md'), 'utf-8');
    const locationsLines = locationsContent.split('\n');
    const locations: Location[] = [];

    let currentRegion = '';
    for (const line of locationsLines) {
        if (line.startsWith('### ')) {
            currentRegion = line.replace('### ', '').trim();
        } else if (line.startsWith('|') && !line.includes('---') && !line.includes('Abbreviation')) {
            const parts = line.split('|').map(s => s.trim()).filter(s => s);
            if (parts.length >= 4) {
                locations.push({
                    state: parts[0],
                    abbreviation: parts[1],
                    capital: parts[2],
                    largest_city: parts[3]
                });
            }
        } else if (line.startsWith('- **')) {
            // Region mapping
            const match = line.match(/\*\*(.*?)\*\*/);
            if (match) {
                const stateName = match[1];
                const loc = locations.find(l => l.state === stateName);
                if (loc) loc.region = currentRegion;
            }
        }
    }

    // 10. Parse dog-owner-lifestyles.md
    console.log('Parsing lifestyles...');
    const lifestylesContent = fs.readFileSync(path.join(INPUT_DIR, 'dog-owner-lifestyles.md'), 'utf-8');
    const lifestylesLines = lifestylesContent.split('\n');
    const lifestyles: LifestyleSegment[] = [];
    let currentLifestyle: LifestyleSegment | null = null;

    for (const line of lifestylesLines) {
        if (line.startsWith('### ') && line.includes('.')) {
            if (currentLifestyle) lifestyles.push(currentLifestyle);
            const name = line.replace(/### \d+\. /, '').split('(')[0].trim();
            currentLifestyle = { id: slugify(name), name: name, characteristics: [], best_breeds: [], content_angles: [] };
        } else if (line.trim().startsWith('-') && currentLifestyle) {
            if (line.includes('**')) continue; // Skip headers inside lists if any
            currentLifestyle.characteristics?.push(line.replace('-', '').trim());
        }
        // Note: Parsing "Best Dog Breeds" sections would require more state tracking, simplified for now
    }
    if (currentLifestyle) lifestyles.push(currentLifestyle);


    // 11. Save Data
    console.log(`Saving data...`);

    const sortedBreeds = Array.from(breedMap.values()).sort((a, b) => (a.popularity_rank || 999) - (b.popularity_rank || 999));
    const sortedProblems = Array.from(problemMap.values()).sort((a, b) => a.name.localeCompare(b.name));

    fs.writeFileSync(BREEDS_FILE, JSON.stringify(sortedBreeds, null, 4));
    fs.writeFileSync(PROBLEMS_FILE, JSON.stringify(sortedProblems, null, 4));
    fs.writeFileSync(KEYWORDS_FILE, JSON.stringify(keywordCategories, null, 4));
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(questionCategories, null, 4));
    fs.writeFileSync(ANXIETIES_FILE, JSON.stringify(anxieties, null, 4));
    fs.writeFileSync(COSTS_FILE, JSON.stringify({ states: locationCosts, cities: cityCosts }, null, 4));
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(locations, null, 4));
    fs.writeFileSync(COMPARISONS_FILE, JSON.stringify(comparisons, null, 4));
    fs.writeFileSync(LIFESTYLES_FILE, JSON.stringify(lifestyles, null, 4));

    console.log('Done!');
}

main().catch(console.error);
