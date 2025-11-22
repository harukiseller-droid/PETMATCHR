// FILE: src/lib/seo-keywords.ts
// Central place for keyword bundles (master list + fallback templates).

import { PageType } from '@/lib/types';

export type PageKeywordBundle = {
    primary_keyword: string | null;
    secondary_keywords: string[];
    faq_keywords: string[];
    quick_answer_keywords: string[];
    internal_anchor_keywords: string[];
};

// Placeholder for a future master list.
// You can replace this with JSON-loaded data if needed.
const MASTER_KEYWORDS: Record<string, PageKeywordBundle> = {};

function makeKey(pageType: PageType, entity1?: string | null, entity2?: string | null): string {
    return `${pageType}::${(entity1 || '').toLowerCase()}::${(entity2 || '').toLowerCase()}`;
}

export function getKeywordsForPage(
    pageType: PageType,
    entity1?: string | null,
    entity2?: string | null
): PageKeywordBundle | null {
    const key = makeKey(pageType, entity1, entity2);
    return MASTER_KEYWORDS[key] ?? null;
}

// Fallback templates – pure string logic, no LLM.

export function getBreedFallbackKeywords(breedName: string): PageKeywordBundle {
    const base = breedName;
    return {
        primary_keyword: `${base} dog breed`,
        secondary_keywords: [
            `${base} dog breed guide`,
            `${base} temperament and personality`,
            `is ${base} good with kids`,
            `${base} apartment dog`,
            `${base} grooming and shedding`,
            `${base} pros and cons`,
        ],
        faq_keywords: [
            `is ${base} good with families`,
            `are ${base} good apartment dogs`,
            `how much exercise does a ${base} need`,
        ],
        quick_answer_keywords: [
            `${base} size and energy level`,
            `${base} health issues`,
        ],
        internal_anchor_keywords: [
            `${base} cost`,
            `${base} health problems`,
            `${base} training tips`,
        ],
    };
}

export function getFallbackKeywordsForPage(
    pageType: PageType,
    entities: { breed_name?: string; city_name?: string; problem_title?: string; other_entity_name?: string }
): PageKeywordBundle {
    const breed = entities.breed_name;
    const city = entities.city_name;
    const problem = entities.problem_title;
    const other = entities.other_entity_name;

    if (pageType === 'breed' && breed) {
        return getBreedFallbackKeywords(breed);
    }

    if (pageType === 'cost' && breed && city) {
        return {
            primary_keyword: `${breed} cost in ${city}`,
            secondary_keywords: [
                `how much does a ${breed} cost`,
                `${breed} monthly cost`,
                `${breed} first year cost`,
                `${breed} vet bills in ${city}`,
            ],
            faq_keywords: [
                `is ${breed} an expensive dog`,
                `how much is pet insurance for a ${breed}`,
            ],
            quick_answer_keywords: [
                `${breed} first year cost`,
                `${breed} monthly cost`,
            ],
            internal_anchor_keywords: [
                `${breed} insurance guide`,
                `${breed} cost breakdown`,
            ],
        };
    }

    if (pageType === 'comparison' && breed && (other || problem)) {
        const a = breed;
        const b = other || problem || '';
        return {
            primary_keyword: `${a} vs ${b}`,
            secondary_keywords: [
                `${a} vs ${b} for families`,
                `difference between ${a} and ${b}`,
                `${a} vs ${b} for apartments`,
            ],
            faq_keywords: [
                `which is better ${a} or ${b}`,
                `is ${a} more expensive than ${b}`,
            ],
            quick_answer_keywords: [
                `${a} vs ${b} energy level`,
                `${a} vs ${b} shedding`,
            ],
            internal_anchor_keywords: [
                `${a} breed guide`,
                `${b} breed guide`,
            ],
        };
    }

    if ((pageType === 'problem' || pageType === 'anxiety') && breed && problem) {
        const baseProblem = problem.toLowerCase();
        return {
            primary_keyword: `${breed} ${baseProblem}`,
            secondary_keywords: [
                `how to stop ${breed} ${baseProblem}`,
                `${breed} ${baseProblem} training`,
            ],
            faq_keywords: [
                `why does my ${breed} have ${baseProblem}`,
            ],
            quick_answer_keywords: [
                `${breed} ${baseProblem} quick tips`,
            ],
            internal_anchor_keywords: [
                `${breed} separation anxiety guide`,
                `${breed} behavior problems`,
            ],
        };
    }

    if (pageType === 'location' && city) {
        return {
            primary_keyword: `dog ownership in ${city}`,
            secondary_keywords: [
                `best dogs for ${city}`,
                `living with a dog in ${city}`,
            ],
            faq_keywords: [
                `is ${city} a dog friendly city`,
            ],
            quick_answer_keywords: [
                `${city} dog cost of living`,
            ],
            internal_anchor_keywords: [
                `${city} dog breeds`,
            ],
        };
    }

    if (pageType === 'list' && other) {
        const label = other.replace(/-/g, ' ');
        return {
            primary_keyword: `best dogs for ${label}`,
            secondary_keywords: [],
            faq_keywords: [],
            quick_answer_keywords: [],
            internal_anchor_keywords: [],
        };
    }

    // Generic fallback
    return {
        primary_keyword: null,
        secondary_keywords: [],
        faq_keywords: [],
        quick_answer_keywords: [],
        internal_anchor_keywords: [],
    };
}

