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

    // V7-like checks by pageType
    if (pageType === 'cost') {
        if (!data.cost_breakdown || !data.cost_breakdown.first_year_range_usd || !data.cost_breakdown.monthly_range_usd) {
            console.error(`Validation failed: Cost page missing cost_breakdown ranges.`);
            return false;
        }
    } else if (pageType === 'problem') {
        if (!data.problem_overview || !data.why_it_happens || !data.what_you_can_try) {
            console.error(`Validation failed: Problem page missing problem_overview/why_it_happens/what_you_can_try.`);
            return false;
        }
    } else if (pageType === 'comparison') {
        if (!data.summary_verdict || !data.side_by_side_table || !Array.isArray(data.side_by_side_table.rows)) {
            console.error(`Validation failed: Comparison page missing summary_verdict or side_by_side_table.rows.`);
            return false;
        }
    } else if (pageType === 'anxiety') {
        if (!data.anxiety_pattern || !data.support_options) {
            console.error(`Validation failed: Anxiety page missing anxiety_pattern or support_options.`);
            return false;
        }
    } else if (pageType === 'location') {
        if (!data.living_with_dogs_here || !data.cost_snapshot) {
            console.error(`Validation failed: Location page missing living_with_dogs_here or cost_snapshot.`);
            return false;
        }
    } else if (pageType === 'list') {
        if (!data.breed_cards || !Array.isArray(data.breed_cards)) {
            console.error(`Validation failed: List page missing breed_cards.`);
            return false;
        }
    }

    return true;
}
