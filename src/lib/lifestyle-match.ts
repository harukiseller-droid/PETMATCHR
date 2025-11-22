// FILE: src/lib/lifestyle-match.ts

import { Breed, LifestyleScore } from '@/lib/types';

export type LifestyleMatchInput = {
    answers: Record<string, string | string[]>;
    breeds: Breed[];
    lifestyleScores: LifestyleScore[];
};

export type LifestyleMatchResult = {
    profile_label: string;
    profile_slug: string;
    description: string;
    top_matches: {
        breed_slug: string;
        match_score: number;
        explanation_bullets: string[];
        key_traits: {
            energy_label: string;
            apartment_score: number;
            kid_friendly_score: number;
            shedding_level: "low" | "medium" | "high";
            monthly_cost_range: [number, number] | null;
        };
    }[];
};

function getLifestyleScoreForBreed(
    breed: Breed,
    lifestyleScores: LifestyleScore[]
): LifestyleScore | null {
    return lifestyleScores.find(s => s.breed_id === breed.id) ?? null;
}

function energyLabel(level: number): string {
    if (level >= 5) return 'Very high energy';
    if (level >= 4) return 'High energy';
    if (level >= 3) return 'Moderate energy';
    if (level >= 2) return 'Low energy';
    return 'Very low energy';
}

function sheddingLabel(level: number): "low" | "medium" | "high" {
    if (level <= 2) return 'low';
    if (level <= 3) return 'medium';
    return 'high';
}

function inferProfileFromAnswers(answers: Record<string, string | string[]>): {
    profile_slug: string;
    profile_label: string;
    description: string;
} {
    const home = answers['profile_home_type'] as string | undefined;
    const work = answers['profile_work_pattern'] as string | undefined;
    const family = answers['profile_family_structure'] as string | undefined;
    const activity = answers['profile_activity_level'] as string | undefined;
    const budget = answers['profile_budget_monthly'] as string | undefined;
    const experience = answers['profile_experience'] as string | undefined;

    // Heuristic mapping roughly aligned with result_mapping buckets
    if (
        (home === 'apartment_small' || home === 'apartment_medium') &&
        (work === 'office_full_day' || work === 'irregular_travel') &&
        experience === 'first_time_owner'
    ) {
        return {
            profile_slug: 'apartment_worker_first_time_budget',
            profile_label: 'Apartment worker, first-time owner, budget-conscious',
            description:
                'Smaller space, long hours and a first dog mean you need apartment-friendly, beginner-friendly breeds that are forgiving and not too expensive to care for.',
        };
    }

    if (
        (family === 'kids_under_5' || family === 'kids_6_12') &&
        (activity === 'moderate_activity' || activity === 'high_activity')
    ) {
        return {
            profile_slug: 'active_family_with_kids',
            profile_label: 'Active family with kids',
            description:
                'You have or plan to have kids and like to stay active. You can handle more energy and playfulness as long as the dog is safe and kid-friendly.',
        };
    }

    if (
        activity === 'high_activity' &&
        (experience === 'some_experience' || experience === 'very_experienced')
    ) {
        return {
            profile_slug: 'experienced_owner_high_activity',
            profile_label: 'Experienced owner, high-activity lifestyle',
            description:
                'You want a serious adventure partner and are comfortable handling training and higher exercise needs.',
        };
    }

    if (
        activity === 'low_activity' ||
        family === 'with_seniors'
    ) {
        return {
            profile_slug: 'low_energy_senior_or_calm_household',
            profile_label: 'Low-energy, calm household',
            description:
                'You prefer a calmer companion that fits with a quieter home or seniors, with easier daily care and fewer chaotic zoomies.',
        };
    }

    // Fallback
    return {
        profile_slug: 'general_lifestyle_match',
        profile_label: 'Balanced lifestyle, open to options',
        description:
            'You have a fairly flexible lifestyle and could work with several types of dogs as long as the match is thoughtful.',
    };
}

export function matchBreedsForPersona(input: LifestyleMatchInput): LifestyleMatchResult {
    const { answers, breeds, lifestyleScores } = input;
    const profile = inferProfileFromAnswers(answers);

    const scored = breeds.map((breed) => {
        const scores = getLifestyleScoreForBreed(breed, lifestyleScores);
        const ls = scores ?? {
            apartment_score: 0,
            busy_worker_score: 0,
            family_with_kids_score: 0,
            allergy_friendly_score: 0,
            beginner_friendly_score: 0,
            active_outdoor_score: 0,
        };

        let score = 0;

        const home = answers['profile_home_type'] as string | undefined;
        if (home === 'apartment_small' || home === 'apartment_medium') {
            score += ls.apartment_score * 2;
        } else if (home === 'house_yard' || home === 'rural_property') {
            score += ls.active_outdoor_score;
        }

        const work = answers['profile_work_pattern'] as string | undefined;
        if (work === 'office_full_day' || work === 'irregular_travel') {
            score += ls.busy_worker_score * 2;
        }

        const family = answers['profile_family_structure'] as string | undefined;
        if (family === 'kids_under_5' || family === 'kids_6_12') {
            score += ls.family_with_kids_score * 2;
        }

        const activity = answers['profile_activity_level'] as string | undefined;
        if (activity === 'high_activity') {
            score += ls.active_outdoor_score * 2;
        } else if (activity === 'low_activity') {
            score += (10 - ls.active_outdoor_score); // reward lower energy
        }

        const sheddingPref = answers['deep_shedding_preference'] as string | undefined;
        if (sheddingPref === 'shedding_low' || sheddingPref === 'shedding_minimal') {
            score += ls.allergy_friendly_score * 1.5;
        }

        const experience = answers['profile_experience'] as string | undefined;
        if (experience === 'first_time_owner') {
            score += ls.beginner_friendly_score * 2;
        } else if (experience === 'very_experienced') {
            // Experienced owners can handle more intense breeds
            score += breed.energy_level;
        }

        const budget = answers['profile_budget_monthly'] as string | undefined;
        if (budget === 'budget_under_200') {
            score += (6 - breed.cost_level) * 2;
        } else if (budget === 'budget_200_400') {
            score += (5 - breed.cost_level);
        } else if (budget === 'budget_400_600' || budget === 'budget_over_600') {
            score += breed.cost_level; // higher budget tolerates higher cost
        }

        return { breed, scores: ls, rawScore: score };
    });

    const maxScore = Math.max(...scored.map(s => s.rawScore), 1);

    const top = scored
        .sort((a, b) => b.rawScore - a.rawScore)
        .slice(0, 3)
        .map(({ breed, scores, rawScore }) => {
            const normalized = Math.round((rawScore / maxScore) * 100);
            const bullets: string[] = [];

            const home = answers['profile_home_type'] as string | undefined;
            if ((home === 'apartment_small' || home === 'apartment_medium') && scores.apartment_score >= 7) {
                bullets.push('Well-suited to apartment or smaller-space living compared to many breeds.');
            }

            const family = answers['profile_family_structure'] as string | undefined;
            if ((family === 'kids_under_5' || family === 'kids_6_12') && scores.family_with_kids_score >= 7) {
                bullets.push('Strong track record with families and kids when properly supervised.');
            }

            const activity = answers['profile_activity_level'] as string | undefined;
            if (activity === 'high_activity' && scores.active_outdoor_score >= 7) {
                bullets.push('Has the energy and stamina to keep up with an active routine.');
            } else if (activity === 'low_activity' && scores.active_outdoor_score <= 4) {
                bullets.push('Comfortable with a lower-key, more relaxed lifestyle.');
            }

            const sheddingPref = answers['deep_shedding_preference'] as string | undefined;
            if ((sheddingPref === 'shedding_low' || sheddingPref === 'shedding_minimal') && scores.allergy_friendly_score >= 6) {
                bullets.push('Typically easier for people who are sensitive to shedding or dander.');
            }

            if (bullets.length === 0) {
                bullets.push('Overall match based on your home, schedule, budget, and experience.');
            }

            const monthlyRange: [number, number] | null =
                typeof breed.monthly_cost_min_usd === 'number' && typeof breed.monthly_cost_max_usd === 'number'
                    ? [breed.monthly_cost_min_usd, breed.monthly_cost_max_usd]
                    : null;

            return {
                breed_slug: breed.slug,
                match_score: normalized,
                explanation_bullets: bullets,
                key_traits: {
                    energy_label: energyLabel(breed.energy_level),
                    apartment_score: scores.apartment_score,
                    kid_friendly_score: scores.family_with_kids_score,
                    shedding_level: sheddingLabel(breed.shedding_level),
                    monthly_cost_range: monthlyRange,
                },
            };
        });

    return {
        profile_label: profile.profile_label,
        profile_slug: profile.profile_slug,
        description: profile.description,
        top_matches: top,
    };
}

