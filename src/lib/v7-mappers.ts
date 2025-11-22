// FILE: src/lib/v7-mappers.ts
// Helpers to map legacy page JSON into V7 page shapes so
// the frontend can use V7 components even before full regen.

import {
    AnxietyPage,
    BreedPage,
    ComparisonPage,
    CostPage,
    ListPage,
    LocationPage,
    ProblemPage,
    AnxietyV7Page,
    BreedV7Page,
    ComparisonV7Page,
    CostV7Page,
    ListV7Page,
    LocationV7Page,
    ProblemV7Page,
} from '@/lib/types';

function nowIso(): string {
    return new Date().toISOString();
}

export function legacyBreedPageToV7(page: BreedPage): BreedV7Page {
    return {
        page_type: 'breed',
        slug: page.slug,
        meta: page.meta,
        h1: page.h1,
        intro: {
            short_hook: page.short_intro,
            context: undefined,
            who_this_breed_is_for: page.personality?.title ?? undefined,
            who_should_avoid: undefined,
        },
        sections: [
            {
                id: 'personality',
                title: page.personality.title,
                type: 'text',
                content: page.personality.paragraphs.join('\n\n'),
            },
            {
                id: 'living_needs',
                title: page.living_needs.title,
                type: 'text',
                content: page.living_needs.paragraphs.join('\n\n'),
            },
            {
                id: 'time_and_cost',
                title: page.time_and_cost.title,
                type: 'text',
                content: page.time_and_cost.paragraphs.join('\n\n'),
            },
            {
                id: 'lifestyle_summary',
                title: page.lifestyle_summary.title,
                type: 'text',
                content: page.lifestyle_summary.paragraphs.join('\n\n'),
            },
        ],
        lifestyle_match: {
            summary: page.lifestyle_summary.paragraphs.join('\n\n'),
            scores: {
                apartment: 0,
                busy_worker: 0,
                family_with_kids: 0,
                allergy_friendly: 0,
                beginner_friendly: 0,
                active_outdoor: 0,
            },
            best_for: page.good_fit_if,
            not_for: page.avoid_if,
        },
        cost_snapshot: undefined,
        health_and_risks: undefined,
        training_and_behavior: undefined,
        case_study: undefined,
        faq: page.faq || [],
        quick_answers: (page.quick_answers || []).map((qa) => ({
            question: qa.question,
            answer: qa.answer,
            category: qa.category,
        })),
        product_blocks: [],
        internal_link_suggestions: [],
        content_version: 1,
        last_generated_at: nowIso(),
    };
}

export function legacyCostPageToV7(page: CostPage): CostV7Page {
    return {
        page_type: 'cost',
        slug: page.slug,
        meta: page.meta,
        h1: page.h1,
        intro: {
            short_hook: page.hero.one_line_summary,
            context: undefined,
            why_costs_can_spike: page.emergency_costs.one_line_warning,
        },
        cost_breakdown: {
            summary: `First-year and monthly cost ranges for ${page.hero.breed_name} in ${page.hero.city}.`,
            first_year_range_usd: [page.summary.first_year_min_usd, page.summary.first_year_max_usd],
            monthly_range_usd: [page.summary.ongoing_monthly_min_usd, page.summary.ongoing_monthly_max_usd],
            emergency_fund_recommended_usd: page.summary.emergency_fund_recommended_usd,
            line_items: [
                ...page.first_year_breakdown.map((item) => ({
                    label: item.category,
                    frequency: 'one_time' as const,
                    estimated_range_usd: [item.min_usd, item.max_usd] as [number, number],
                    notes: item.notes,
                })),
                ...page.monthly_breakdown.map((item) => ({
                    label: item.category,
                    frequency: 'monthly' as const,
                    estimated_range_usd: [item.min_usd, item.max_usd] as [number, number],
                    notes: item.notes,
                })),
            ],
        },
        insurance_section: {
            summary: page.insurance_section.value_explainer,
            when_insurance_makes_sense: page.insurance_section.reason,
            when_you_might_skip_it: '',
        },
        saving_tips: {
            summary: 'Practical ways to keep costs predictable without cutting essential care.',
            tips: [
                'Plan ahead for first-year setup costs instead of buying everything at once.',
                'Build a dedicated emergency fund for vet visits.',
                'Compare pet insurance options and read the fine print.',
            ],
        },
        case_study: undefined,
        faq: page.faq || [],
        quick_answers: (page.quick_answers || []).map((qa) => ({
            question: qa.question,
            answer: qa.answer,
            category: qa.category,
        })),
        product_blocks: [],
        internal_link_suggestions: [],
        content_version: 1,
        last_generated_at: nowIso(),
    };
}

export function legacyProblemPageToV7(page: ProblemPage): ProblemV7Page {
    return {
        page_type: 'problem',
        slug: page.slug,
        meta: page.meta,
        h1: page.h1,
        intro: {
            short_hook: page.hero.one_line_summary,
            context: undefined,
            who_struggles_with_this: undefined,
        },
        problem_overview: {
            summary: page.intro.paragraphs.join('\n\n'),
            common_triggers: page.symptoms,
            how_common_it_is: '',
        },
        why_it_happens: {
            breed_drivers: page.root_causes.join('\n'),
            environment_drivers: '',
        },
        what_you_can_try: {
            at_home_strategies: page.section_step_by_step_plan.steps.map((s) => s.detail),
            when_to_consider_trainer: '',
            when_to_talk_to_vet: '',
        },
        realistic_expectations: {
            timeline: '',
            what_success_looks_like: '',
        },
        case_study: undefined,
        faq: page.faq || [],
        quick_answers: (page.quick_answers || []).map((qa) => ({
            question: qa.question,
            answer: qa.answer,
            category: qa.category,
        })),
        product_blocks: [],
        internal_link_suggestions: [],
        content_version: 1,
        last_generated_at: nowIso(),
    };
}

export function legacyAnxietyPageToV7(page: AnxietyPage): AnxietyV7Page {
    return {
        page_type: 'anxiety',
        slug: page.slug,
        meta: page.meta,
        h1: page.h1,
        intro: {
            short_hook: page.hero.subtitle,
            context: undefined,
            who_this_is_for: undefined,
        },
        anxiety_pattern: {
            summary: page.hero.title,
            common_signs: page.symptoms_list,
            situations_where_it_shows_up: [],
        },
        support_options: {
            at_home_strategies: page.solutions_list.map((s) => s.description),
            environment_changes: [],
            when_to_consider_professional_training: '',
            when_to_talk_to_vet_or_behaviorist: '',
        },
        tools_and_products: {
            summary: '',
            types_of_tools: [],
        },
        case_study: undefined,
        faq: page.faq || [],
        quick_answers: (page.quick_answers || []).map((qa) => ({
            question: qa.question,
            answer: qa.answer,
            category: qa.category,
        })),
        product_blocks: [],
        internal_link_suggestions: [],
        content_version: 1,
        last_generated_at: nowIso(),
    };
}

export function legacyComparisonPageToV7(page: ComparisonPage): ComparisonV7Page {
    return {
        page_type: 'comparison',
        slug: page.slug,
        meta: page.meta,
        h1: page.h1,
        intro: {
            short_hook: page.intro,
            context: undefined,
            who_is_asking_this: undefined,
        },
        summary_verdict: {
            one_sentence_verdict: page.verdict.title,
            when_to_pick_a: '',
            when_to_pick_b: '',
        },
        side_by_side_table: {
            rows: page.comparison_points.map((p) => ({
                label: p.point,
                breed_a_value: String(p.breed_1_val),
                breed_b_value: String(p.breed_2_val),
                who_wins:
                    p.winner === page.breed_1
                        ? 'a'
                        : p.winner === page.breed_2
                        ? 'b'
                        : 'tie',
            })),
        },
        deep_dive_sections: [],
        case_study: undefined,
        faq: page.faq || [],
        quick_answers: (page.quick_answers || []).map((qa) => ({
            question: qa.question,
            answer: qa.answer,
            category: qa.category,
        })),
        product_blocks: [],
        internal_link_suggestions: [],
        content_version: 1,
        last_generated_at: nowIso(),
    };
}

export function legacyListPageToV7(page: ListPage): ListV7Page {
    return {
        page_type: 'list',
        slug: page.slug,
        meta: page.meta,
        h1: page.h1,
        intro: {
            short_hook: page.intro.title,
            context: undefined,
            who_this_list_is_for: undefined,
            how_we_chose_these_breeds: page.intro.description,
        },
        sections: [],
        breed_cards: page.breed_snippets.map((b) => ({
            breed_slug: b.breed_slug,
            breed_name: b.breed_name,
            one_line_summary: b.description,
            why_it_works_for_this_lifestyle: '',
            key_scores: {
                apartment: null,
                busy_worker: null,
                family_with_kids: null,
                allergy_friendly: null,
                beginner_friendly: null,
                active_outdoor: null,
            },
            major_caveats: [],
        })),
        case_study: undefined,
        faq: page.faq || [],
        quick_answers: (page.quick_answers || []).map((qa) => ({
            question: qa.question,
            answer: qa.answer,
            category: qa.category,
        })),
        product_blocks: [],
        internal_link_suggestions: [],
        content_version: 1,
        last_generated_at: nowIso(),
    };
}

export function legacyLocationPageToV7(page: LocationPage): LocationV7Page {
    return {
        page_type: 'location',
        slug: page.slug,
        meta: page.meta,
        h1: page.h1,
        intro: {
            short_hook: page.intro,
            context: undefined,
            who_this_city_is_great_for: undefined,
        },
        living_with_dogs_here: {
            summary: page.intro,
            climate_considerations: '',
            housing_considerations: '',
            dog_friendly_score_explained: '',
        },
        cost_snapshot: undefined,
        best_fit_breeds_section: {
            summary: '',
            breed_slugs: page.top_breeds_for_city.map((b) => b.slug),
        },
        breeds_to_be_cautious_with_section: {
            summary: '',
            breed_slugs: [],
        },
        case_study: undefined,
        faq: page.faq || [],
        quick_answers: (page.quick_answers || []).map((qa) => ({
            question: qa.question,
            answer: qa.answer,
            category: qa.category,
        })),
        product_blocks: [],
        internal_link_suggestions: [],
        content_version: 1,
        last_generated_at: nowIso(),
    };
}
