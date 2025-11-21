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

    // Specific checks
    if (pageType === 'cost') {
        if (!data.summary || !data.first_year_breakdown || !data.monthly_breakdown) {
            console.error(`Validation failed: Cost page missing required sections.`);
            return false;
        }
    } else if (pageType === 'problem') {
        if (!data.symptoms || !data.root_causes || !data.section_step_by_step_plan) {
            console.error(`Validation failed: Problem page missing required sections.`);
            return false;
        }
    } else if (pageType === 'comparison') {
        if (!data.breed_1 || !data.breed_2 || !data.comparison_points) {
            console.error(`Validation failed: Comparison page missing required sections.`);
            return false;
        }
    } else if (pageType === 'anxiety') {
        if (!data.symptoms_list || !data.solutions_list) {
            console.error(`Validation failed: Anxiety page missing required sections.`);
            return false;
        }
    } else if (pageType === 'location') {
        if (!data.city || !data.top_breeds_for_city) {
            console.error(`Validation failed: Location page missing required sections.`);
            return false;
        }
    } else if (pageType === 'list') {
        if (!data.ranking_table || !data.breed_snippets) {
            console.error(`Validation failed: List page missing required sections.`);
            return false;
        }
    }

    return true;
}
