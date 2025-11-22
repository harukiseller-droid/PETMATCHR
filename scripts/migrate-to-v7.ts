import fs from 'fs/promises';
import path from 'path';
import {
    PageType,
    CostPage,
    ProblemPage,
    BreedPage,
    ListPage,
    ComparisonPage,
    AnxietyPage,
    LocationPage,
    CostV7Page,
    ProblemV7Page,
    BreedV7Page,
    ListV7Page,
    ComparisonV7Page,
    AnxietyV7Page,
    LocationV7Page,
    V7ContentSection,
    BaseV7Page
} from '../src/lib/types';

const SRC_DIR = path.join(process.cwd(), 'src/data/pages');
const DEST_DIR = path.join(process.cwd(), 'src/data_v7/pages');

const PAGE_TYPES: PageType[] = ['breed', 'cost', 'problem', 'comparison', 'anxiety', 'location', 'list'];

// Helper to map common fields
function mapBaseFields(legacy: any, type: any): BaseV7Page {
    return {
        page_type: type,
        slug: legacy.slug,
        meta: legacy.meta,
        h1: legacy.h1,
        intro: {
            short_hook: legacy.meta?.description || '',
            context: legacy.hero?.one_line_summary || ''
        },
        faq: legacy.faq || [],
        quick_answers: legacy.quick_answers || [],
        product_blocks: [], // New field, empty for now
        internal_link_suggestions: [], // New field, empty for now
        content_version: 7,
        last_generated_at: new Date().toISOString(),
        sections: [] // Container for unmapped content
    };
}

function transformCostPage(legacy: CostPage): CostV7Page {
    const base = mapBaseFields(legacy, 'cost');

    const lineItems = [
        ...(legacy.first_year_breakdown?.map(item => ({
            label: item.category,
            frequency: 'one_time' as const,
            estimated_range_usd: [item.min_usd, item.max_usd] as [number, number],
            notes: item.notes
        })) || []),
        ...(legacy.monthly_breakdown?.map(item => ({
            label: item.category,
            frequency: 'monthly' as const,
            estimated_range_usd: [item.min_usd, item.max_usd] as [number, number],
            notes: item.notes
        })) || [])
    ];

    return {
        ...base,
        page_type: 'cost',
        intro: {
            ...base.intro,
            why_costs_can_spike: legacy.emergency_costs?.one_line_warning
        },
        cost_breakdown: {
            summary: legacy.hero?.one_line_summary || '',
            first_year_range_usd: [legacy.summary?.first_year_min_usd || 0, legacy.summary?.first_year_max_usd || 0],
            monthly_range_usd: [legacy.summary?.ongoing_monthly_min_usd || 0, legacy.summary?.ongoing_monthly_max_usd || 0],
            emergency_fund_recommended_usd: legacy.summary?.emergency_fund_recommended_usd || 0,
            line_items: lineItems
        },
        insurance_section: {
            summary: legacy.insurance_section?.value_explainer || '',
            when_insurance_makes_sense: legacy.insurance_section?.reason || '',
            when_you_might_skip_it: "If you have significant savings set aside for emergencies." // Default fallback
        },
        saving_tips: {
            summary: "Ways to reduce expenses without compromising care.",
            tips: ["Compare vet prices", "Buy food in bulk", "Consider pet insurance early"] // Generic defaults if missing
        },
        sections: [
            {
                id: 'local_context',
                title: 'Local Context',
                type: 'text',
                content: legacy.local_context?.cost_of_living_note || ''
            }
        ]
    };
}

function transformProblemPage(legacy: ProblemPage): ProblemV7Page {
    const base = mapBaseFields(legacy, 'problem');

    return {
        ...base,
        page_type: 'problem',
        intro: {
            ...base.intro,
            who_struggles_with_this: "Owners of this breed often face this issue due to natural instincts."
        },
        problem_overview: {
            summary: legacy.intro?.paragraphs?.[0] || '',
            common_triggers: legacy.root_causes || [],
            how_common_it_is: "Common for this breed."
        },
        why_it_happens: {
            breed_drivers: legacy.root_causes?.[0] || '',
            environment_drivers: legacy.root_causes?.[1] || ''
        },
        what_you_can_try: {
            at_home_strategies: legacy.section_step_by_step_plan?.steps?.map(s => `${s.title}: ${s.detail}`) || [],
            when_to_consider_trainer: legacy.section_when_to_get_help?.paragraphs?.[0] || '',
            when_to_talk_to_vet: "If behavior changes suddenly or is severe."
        },
        realistic_expectations: {
            timeline: "Varies by dog, typically weeks to months.",
            what_success_looks_like: legacy.section_home_alone_expectations?.paragraphs?.[0] || ''
        }
    };
}

function transformBreedPage(legacy: BreedPage): BreedV7Page {
    const base = mapBaseFields(legacy, 'breed');

    return {
        ...base,
        page_type: 'breed',
        intro: {
            ...base.intro,
            who_this_breed_is_for: legacy.good_fit_if?.[0] || '',
            who_should_avoid: legacy.avoid_if?.[0] || ''
        },
        lifestyle_match: {
            summary: legacy.lifestyle_summary?.paragraphs?.[0] || '',
            scores: {
                apartment: 5, // Placeholder, should ideally come from data
                busy_worker: 5,
                family_with_kids: 5,
                allergy_friendly: 5,
                beginner_friendly: 5,
                active_outdoor: 5
            },
            best_for: legacy.good_fit_if || [],
            not_for: legacy.avoid_if || []
        },
        sections: [
            {
                id: 'personality',
                title: legacy.personality?.title || 'Personality',
                type: 'text',
                content: legacy.personality?.paragraphs?.join('\n\n') || ''
            },
            {
                id: 'living_needs',
                title: legacy.living_needs?.title || 'Living Needs',
                type: 'text',
                content: legacy.living_needs?.paragraphs?.join('\n\n') || ''
            }
        ]
    };
}

function transformComparisonPage(legacy: ComparisonPage): ComparisonV7Page {
    const base = mapBaseFields(legacy, 'comparison');

    return {
        ...base,
        page_type: 'comparison',
        intro: {
            ...base.intro,
            who_is_asking_this: "Potential owners deciding between these two breeds."
        },
        summary_verdict: {
            one_sentence_verdict: legacy.verdict?.content || '',
            when_to_pick_a: `Choose ${legacy.breed_1} if...`, // Placeholder
            when_to_pick_b: `Choose ${legacy.breed_2} if...`  // Placeholder
        },
        side_by_side_table: {
            rows: legacy.comparison_points?.map(p => ({
                label: p.point,
                breed_a_value: String(p.breed_1_val),
                breed_b_value: String(p.breed_2_val),
                who_wins: (p.winner === legacy.breed_1 ? 'a' : p.winner === legacy.breed_2 ? 'b' : 'tie') as 'a' | 'b' | 'tie'
            })) || []
        }
    };
}

function transformAnxietyPage(legacy: AnxietyPage): AnxietyV7Page {
    const base = mapBaseFields(legacy, 'anxiety');

    return {
        ...base,
        page_type: 'anxiety',
        intro: {
            ...base.intro,
            who_this_is_for: "Owners seeing signs of stress in their dog."
        },
        anxiety_pattern: {
            summary: legacy.hero?.subtitle || '',
            common_signs: legacy.symptoms_list || [],
            situations_where_it_shows_up: legacy.causes_list || []
        },
        support_options: {
            at_home_strategies: legacy.solutions_list?.map(s => `${s.title}: ${s.description}`) || [],
            environment_changes: [],
            when_to_consider_professional_training: "If aggression or self-harm occurs.",
            when_to_talk_to_vet_or_behaviorist: "For medication or severe cases."
        },
        tools_and_products: {
            summary: "Helpful tools for managing anxiety.",
            types_of_tools: legacy.solutions_list?.filter(s => s.recommended_product_type).map(s => s.recommended_product_type!) || []
        }
    };
}

function transformLocationPage(legacy: LocationPage): LocationV7Page {
    const base = mapBaseFields(legacy, 'location');

    return {
        ...base,
        page_type: 'location',
        intro: {
            ...base.intro,
            who_this_city_is_great_for: "Dog owners living in or moving to " + legacy.city
        },
        living_with_dogs_here: {
            summary: legacy.intro || '',
            climate_considerations: "Check local weather patterns.",
            housing_considerations: "Check apartment pet policies.",
            dog_friendly_score_explained: "Based on parks, vets, and services."
        },
        cost_snapshot: {
            summary: "Cost of living overview.",
            vet_cost_level: "medium",
            example_monthly_ranges_usd: [100, 300]
        },
        best_fit_breeds_section: {
            summary: "Top breeds for this city.",
            breed_slugs: legacy.top_breeds_for_city?.map(b => b.slug) || []
        },
        sections: legacy.local_tips?.map((tip, idx) => ({
            id: `tip_${idx}`,
            title: tip.title,
            type: 'text' as const,
            content: tip.content
        }))
    };
}

function transformListPage(legacy: ListPage): ListV7Page {
    const base = mapBaseFields(legacy, 'list');

    return {
        ...base,
        page_type: 'list',
        intro: {
            ...base.intro,
            who_this_list_is_for: "People looking for specific breed traits.",
            how_we_chose_these_breeds: "Based on characteristics and owner reviews."
        },
        breed_cards: legacy.ranking_table?.map(item => ({
            breed_slug: slugify(item.breed_name), // Assuming slugify exists or name is close enough
            breed_name: item.breed_name,
            one_line_summary: item.one_line_reason,
            why_it_works_for_this_lifestyle: item.one_line_reason,
            key_scores: {
                apartment: null,
                busy_worker: null,
                family_with_kids: null,
                allergy_friendly: null,
                beginner_friendly: null,
                active_outdoor: null
            },
            major_caveats: []
        }))
    };
}

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
}

async function migrate() {
    console.log('Starting migration to V7...');

    for (const type of PAGE_TYPES) {
        const srcTypeDir = path.join(SRC_DIR, type);
        const destTypeDir = path.join(DEST_DIR, type);

        try {
            await fs.access(srcTypeDir);
        } catch {
            console.log(`Skipping ${type} (source dir not found)`);
            continue;
        }

        await fs.mkdir(destTypeDir, { recursive: true });

        const files = await fs.readdir(srcTypeDir);
        let count = 0;

        for (const file of files) {
            if (!file.endsWith('.json')) continue;

            try {
                const content = await fs.readFile(path.join(srcTypeDir, file), 'utf-8');
                const legacy = JSON.parse(content);
                let v7Data: any;

                switch (type) {
                    case 'cost': v7Data = transformCostPage(legacy); break;
                    case 'problem': v7Data = transformProblemPage(legacy); break;
                    case 'breed': v7Data = transformBreedPage(legacy); break;
                    case 'comparison': v7Data = transformComparisonPage(legacy); break;
                    case 'anxiety': v7Data = transformAnxietyPage(legacy); break;
                    case 'location': v7Data = transformLocationPage(legacy); break;
                    case 'list': v7Data = transformListPage(legacy); break;
                    default: v7Data = mapBaseFields(legacy, type);
                }

                await fs.writeFile(
                    path.join(destTypeDir, file),
                    JSON.stringify(v7Data, null, 2)
                );
                count++;
            } catch (e) {
                console.error(`Error migrating ${type}/${file}:`, e);
            }
        }
        console.log(`Migrated ${count} ${type} pages.`);
    }
    console.log('Migration complete.');
}

if (require.main === module) {
    migrate().catch(console.error);
}
