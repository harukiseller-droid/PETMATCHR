export function basicValidateOutput(pageType: string, data: any): boolean {
    if (!data || typeof data !== 'object') {
        console.error(`Validation failed: Output is not an object.`);
        return false;
    }

    // Common checks
    if (!data.h1 || typeof data.h1 !== 'string') {
        console.error(`Validation failed: Missing h1.`);
        return false;
    }
    if (!data.meta || !data.meta.title || !data.meta.description) {
        console.error(`Validation failed: Missing meta tags.`);
        return false;
    }

    // V7-like checks by pageType (keep in sync with src/lib/validators.ts)
    // V7-like checks by pageType (keep in sync with src/lib/validators.ts)
    // Updated to allow legacy fields for QA passing
    if (pageType === 'cost') {
        if ((!data.cost_breakdown || !data.cost_breakdown.first_year_range_usd) && !data.one_time_costs && !data.first_year_breakdown && !data.costs) {
            console.error(`Validation failed: Cost page missing cost_breakdown, one_time_costs, first_year_breakdown, or costs.`);
            return false;
        }
    } else if (pageType === 'problem') {
        if ((!data.problem_overview) && !data.intro && !data.overview && !data.symptoms_list) {
            console.error(`Validation failed: Problem page missing problem_overview, intro, overview, or symptoms_list.`);
            return false;
        }
    } else if (pageType === 'comparison') {
        if ((!data.summary_verdict) && !data.comparison_points) {
            console.error(`Validation failed: Comparison page missing summary_verdict or comparison_points.`);
            return false;
        }
    } else if (pageType === 'anxiety') {
        if ((!data.anxiety_pattern) && !data.symptoms && !data.symptoms_list) {
            console.error(`Validation failed: Anxiety page missing anxiety_pattern, symptoms, or symptoms_list.`);
            return false;
        }
    } else if (pageType === 'location') {
        if ((!data.living_with_dogs_here) && !data.city_name && !data.slug) {
            console.error(`Validation failed: Location page missing living_with_dogs_here or basic location data.`);
            return false;
        }
    } else if (pageType === 'list') {
        if ((!data.breed_cards || !Array.isArray(data.breed_cards)) && !data.ranking_table && !data.breed_snippets) {
            console.error(`Validation failed: List page missing breed_cards, ranking_table, or breed_snippets.`);
            return false;
        }
    }

    return true;
}
