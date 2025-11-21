export const SYSTEM_PROMPT = `You are an expert programmatic SEO content writer for PetMatchr.
Your goal is to generate high-quality, data-driven content in JSON format.
Always output valid JSON matching the requested schema.
Do not include markdown formatting or code blocks in your output, just the raw JSON string.`;

export const COST_PAGE_PROMPT = (breed: string, city: string) => `
Generate a detailed Cost Page JSON for a ${breed} in ${city}.
The output must strictly follow the CostPage interface.
Include:
- H1 and Meta tags
- Hero summary
- First year breakdown (min/max)
- Monthly breakdown (min/max)
- Emergency costs
- Insurance section
- Local context for ${city}

Ensure all currency values are realistic for ${city}.
`;

export const PROBLEM_PAGE_PROMPT = (breed: string, problem: string) => `
Generate a detailed Problem Page JSON for a ${breed} dealing with ${problem}.
The output must strictly follow the ProblemPage interface.
Include:
- H1 and Meta tags
- Intro
- Symptoms
- Root Causes
- Step by Step Plan
- When to get help
- Course recommendation

Customize the advice for the specific traits of a ${breed}.
`;

export const COMPARISON_PAGE_PROMPT = (breed1: string, breed2: string) => `
Generate a detailed Comparison Page JSON for ${breed1} vs ${breed2}.
The output must strictly follow the ComparisonPage interface.
Include:
- H1 and Meta tags
- Comparison points (Energy, Apartment Living, Trainability, etc.)
- Verdict
- Winner for each point
`;

export const ANXIETY_PAGE_PROMPT = (breed: string) => `
Generate a detailed Anxiety Page JSON for ${breed}.
The output must strictly follow the AnxietyPage interface.
Include:
- H1 and Meta tags
- Symptoms specific to ${breed}
- Causes
- Solutions (Training, CBD, etc.)
`;

export const LOCATION_PAGE_PROMPT = (city: string) => `
Generate a detailed Location Page JSON for dogs in ${city}.
The output must strictly follow the LocationPage interface.
Include:
- H1 and Meta tags
- Top breeds for ${city}
- Local tips (weather, laws)
`;

export const LIST_PAGE_PROMPT = (lifestyle: string) => `
Generate a detailed List Page JSON for "Best Dogs for ${lifestyle}".
The output must strictly follow the ListPage interface.
Include:
- H1 and Meta tags
- Ranking table (top 5-10 breeds)
- Breed snippets
`;
