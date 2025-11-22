// FILE: src/lib/types.ts

// --- Core Data Models ---

export type Breed = {
    id: string;
    slug: string;
    name: string;
    short_name: string;
    size: "toy" | "small" | "medium" | "large" | "giant";
    energy_level: number; // 1-5
    shedding_level: number; // 1-5
    barking_level: number; // 1-5
    trainability: number; // 1-5
    kid_friendly: number; // 1-5
    dog_friendly: number; // 1-5
    stranger_friendly: number; // 1-5
    apartment_suitable: number; // 1-5
    first_time_owner_friendly: number; // 1-5
    alone_time_tolerance: number; // 1-5
    exercise_need: number; // 1-5
    grooming_need: number; // 1-5
    cost_level: number; // 1-5
    common_health_issues: string[];
    lifespan_min_years: number;
    lifespan_max_years: number;
    origin_country: string;
    temperament_keywords: string[];
    monthly_cost_min_usd: number;
    monthly_cost_max_usd: number;
    year1_cost_min_usd: number;
    year1_cost_max_usd: number;
    primary_image_url?: string;
    notes_internal?: string;
};

export type LifestyleScore = {
    breed_id: string;
    apartment_score: number; // 0-10
    busy_worker_score: number; // 0-10
    family_with_kids_score: number; // 0-10
    allergy_friendly_score: number; // 0-10
    beginner_friendly_score: number; // 0-10
    active_outdoor_score: number; // 0-10
};

export type City = {
    name: string;
    state: string;
    cost_of_living_factor: number;
    vet_cost_factor: number;
    climate: string;
    notes: string;
};

export type Problem = {
    id: string;
    slug: string;
    name: string;
    description: string;
};

export type CostModel = {
    breed_id: string;
    base_price_min: number;
    base_price_max: number;
    food_monthly_min: number;
    food_monthly_max: number;
};

export type QuickAnswerCategory = "Living" | "Costs" | "Health" | "Training";

export type QuickAnswer = {
    id: string;
    page_slug: string;
    question: string;
    answer: string;
    category: QuickAnswerCategory;
    primary_intent: "informational" | "commercial" | "navigational";
};

export type FAQItem = {
    question: string;
    answer: string;
};

// --- Legacy Page Content Models (pre-V7) ---

export type BasePage = {
    slug: string;
    meta: {
        title: string;
        description: string;
    };
    h1: string;
    quick_answers: QuickAnswer[];
    faq: FAQItem[];
};

// Keep old names for backwards compatibility, but treat them as legacy in new code.
export type BreedPage = BasePage & {
    short_intro: string;
    good_fit_if: string[];
    avoid_if: string[];
    personality: {
        title: string;
        paragraphs: string[];
    };
    living_needs: {
        title: string;
        paragraphs: string[];
    };
    time_and_cost: {
        title: string;
        paragraphs: string[];
    };
    lifestyle_summary: {
        title: string;
        paragraphs: string[];
    };
    cta: {
        quiz_anchor_label?: string;
        quiz_anchor?: string;
    };
};

export type CostPage = BasePage & {
    hero: {
        city: string;
        breed_name: string;
        one_line_summary: string;
    };
    summary: {
        first_year_min_usd: number;
        first_year_max_usd: number;
        ongoing_monthly_min_usd: number;
        ongoing_monthly_max_usd: number;
        emergency_fund_recommended_usd: number;
        insurance_recommended: boolean;
    };
    first_year_breakdown: {
        category: string;
        min_usd: number;
        max_usd: number;
        notes: string;
    }[];
    monthly_breakdown: {
        category: string;
        min_usd: number;
        max_usd: number;
        notes: string;
    }[];
    emergency_costs: {
        typical_emergency_range_usd: {
            low: number;
            high: number;
        };
        common_emergencies: string[];
        one_line_warning: string;
    };
    insurance_section: {
        recommended: boolean;
        reason: string;
        typical_premium_range_usd: {
            low: number;
            high: number;
        };
        value_explainer: string;
        primary_offer_slot: {
            provider_placeholder: string;
            cta_headline: string;
            cta_copy: string;
        };
    };
    local_context: {
        city: string;
        state: string;
        cost_of_living_note: string;
        dog_friendly_note: string;
    };
    cta: {
        cost_calculator_anchor: string;
        insurance_quiz_anchor: string;
    };
};

export type ProblemPage = BasePage & {
    hero: {
        breed_name: string;
        one_line_summary: string;
    };
    problem: string; // Matches JSON
    intro: {
        paragraphs: string[];
    };
    symptoms: string[];
    root_causes: string[];
    section_home_alone_expectations: {
        heading: string;
        paragraphs: string[];
    };
    section_step_by_step_plan: {
        heading: string;
        steps: {
            title: string;
            detail: string;
        }[];
    };
    section_when_to_get_help: {
        heading: string;
        paragraphs: string[];
    };
    course_recommendation: {
        headline: string;
        body: string;
        benefit_bullets: string[];
        cta_button_label: string;
        affiliate_slot: {
            partner_placeholder: string;
            deep_link_placeholder: string;
        };
    };
    cta: {
        quiz_anchor: string;
        course_anchor: string;
    };
};

export type ListPage = BasePage & {
    intro: {
        title: string;
        description: string;
    };
    ranking_table: {
        rank: number;
        breed_name: string;
        score: number;
        one_line_reason: string;
    }[];
    breed_snippets: {
        breed_slug: string;
        breed_name: string;
        description: string;
        image_url?: string;
    }[];
    cta: {
        quiz_anchor: string;
        secondary_anchor?: string;
    };
};

export type ComparisonPage = BasePage & {
    breed_1: string;
    breed_2: string;
    intro: string;
    comparison_points: {
        point: string; // e.g. "Energy Level"
        breed_1_val: string | number;
        breed_2_val: string | number;
        winner?: string; // slug of winner or "tie"
        note: string;
    }[];
    verdict: {
        title: string;
        content: string;
        winner_slug?: string;
    };
    cta: {
        quiz_anchor: string;
    };
};

export type AnxietyPage = BasePage & {
    breed: string;
    hero: {
        title: string;
        subtitle: string;
    };
    symptoms_list: string[];
    causes_list: string[];
    solutions_list: {
        title: string;
        description: string;
        recommended_product_type?: "cbd" | "training" | "vest";
    }[];
    cta: {
        quiz_anchor: string;
        product_anchor: string;
    };
};

export type LocationPage = BasePage & {
    city: string;
    state: string;
    intro: string;
    top_breeds_for_city: {
        slug: string;
        name: string;
        reason: string;
    }[];
    local_tips: {
        title: string;
        content: string;
    }[];
    cta: {
        quiz_anchor: string;
    };
};
export type LegacyBreedPage = BreedPage;
export type LegacyCostPage = CostPage;
export type LegacyProblemPage = ProblemPage;
export type LegacyListPage = ListPage;
export type LegacyComparisonPage = ComparisonPage;
export type LegacyAnxietyPage = AnxietyPage;
export type LegacyLocationPage = LocationPage;

export type PageType =
    | "breed"
    | "list"
    | "comparison"
    | "cost"
    | "problem"
    | "anxiety"
    | "location";

// --- V7 Page Types & Base Schema ---

export type V7PageType =
    | "breed"
    | "list"
    | "comparison"
    | "cost"
    | "problem"
    | "anxiety"
    | "location"
    // reserved for future expansion
    | "tool"
    | "guide"
    | "story"
    | "faq_cluster"
    | "product_collection"
    | "newsletter_landing"
    | "case_study"
    | "brand_page";

export interface ProductBlock {
    id: string;
    placement: "mid_content" | "end_content" | "sidebar_hint";
    headline: string;
    description: string;
    product_type: "print_on_demand" | "digital" | "course" | "affiliate" | "generic";
    angle: "gift" | "self_treat" | "practical_tool" | "memorial" | "funny";
    dog_breed_slug?: string | null;
    dog_theme?: "love" | "memory" | "funny" | "training" | "anxiety_support" | null;
    cta_text: string;
}

export interface InternalLinkSuggestion {
    reason: string;
    anchor_text: string;
    target_type: V7PageType;
    target_slug_hint?: string;
}

export interface V7ContentSection {
    id: string;
    title: string;
    type: "text" | "list" | "pros_cons" | "table";
    content: string;
    items?: string[];
    pros?: string[];
    cons?: string[];
}

export interface BaseV7Page {
    page_type: V7PageType;
    slug: string;
    meta: {
        title: string;
        description: string;
    };
    h1: string;
    intro: {
        short_hook: string;
        context?: string;
    };
    // Optional generic content sections – concrete page types can refine/extend
    sections?: V7ContentSection[];
    faq: { question: string; answer: string }[];
    quick_answers: {
        question: string;
        answer: string;
        category: QuickAnswerCategory;
    }[];
    product_blocks: ProductBlock[];
    internal_link_suggestions: InternalLinkSuggestion[];
    content_version: number;
    last_generated_at: string;
    last_refreshed_at?: string;
}

// Concrete V7 page interfaces (high-level – detailed fields enforced by prompts & validators)

export interface BreedV7Page extends BaseV7Page {
    page_type: "breed";
    intro: BaseV7Page["intro"] & {
        who_this_breed_is_for?: string;
        who_should_avoid?: string;
    };
    lifestyle_match?: {
        summary: string;
        scores: {
            apartment: number;
            busy_worker: number;
            family_with_kids: number;
            allergy_friendly: number;
            beginner_friendly: number;
            active_outdoor: number;
        };
        best_for: string[];
        not_for: string[];
    };
    cost_snapshot?: {
        summary: string;
        first_year_range_usd: [number, number] | null;
        monthly_range_usd: [number, number] | null;
        emergency_fund_recommended_usd: number | null;
        insurance_value_level: "low" | "medium" | "high" | null;
    };
    health_and_risks?: {
        summary: string;
        common_issues: string[];
        lifecycle_considerations: string;
    };
    training_and_behavior?: {
        summary: string;
        typical_challenges: string[];
        who_needs_professional_help: string;
    };
    case_study?: {
        title: string;
        story: string;
        key_takeaway: string;
    };
}

export interface ListV7Page extends BaseV7Page {
    page_type: "list";
    intro: BaseV7Page["intro"] & {
        who_this_list_is_for?: string;
        how_we_chose_these_breeds?: string;
    };
    sections?: V7ContentSection[];
    breed_cards?: {
        breed_slug: string;
        breed_name: string;
        one_line_summary: string;
        why_it_works_for_this_lifestyle: string;
        key_scores: {
            apartment: number | null;
            busy_worker: number | null;
            family_with_kids: number | null;
            allergy_friendly: number | null;
            beginner_friendly: number | null;
            active_outdoor: number | null;
        };
        major_caveats: string[];
    }[];
    case_study?: {
        title: string;
        story: string;
        key_takeaway: string;
    };
}

export interface ComparisonV7Page extends BaseV7Page {
    page_type: "comparison";
    intro: BaseV7Page["intro"] & {
        who_is_asking_this?: string;
    };
    summary_verdict?: {
        one_sentence_verdict: string;
        when_to_pick_a: string;
        when_to_pick_b: string;
    };
    side_by_side_table?: {
        rows: {
            label: string;
            breed_a_value: string;
            breed_b_value: string;
            who_wins: "a" | "b" | "tie";
        }[];
    };
    deep_dive_sections?: {
        id: string;
        title: string;
        content: string;
    }[];
    case_study?: {
        title: string;
        story: string;
        key_takeaway: string;
    };
}

export interface CostV7Page extends BaseV7Page {
    page_type: "cost";
    intro: BaseV7Page["intro"] & {
        why_costs_can_spike?: string;
    };
    cost_breakdown?: {
        summary: string;
        first_year_range_usd: [number, number];
        monthly_range_usd: [number, number];
        emergency_fund_recommended_usd: number;
        line_items: {
            label: string;
            frequency: "one_time" | "monthly" | "yearly";
            estimated_range_usd: [number, number];
            notes: string;
        }[];
    };
    insurance_section?: {
        summary: string;
        when_insurance_makes_sense: string;
        when_you_might_skip_it: string;
    };
    saving_tips?: {
        summary: string;
        tips: string[];
    };
    case_study?: {
        title: string;
        story: string;
        key_takeaway: string;
    };
}

export interface ProblemV7Page extends BaseV7Page {
    page_type: "problem";
    intro: BaseV7Page["intro"] & {
        who_struggles_with_this?: string;
    };
    problem_overview?: {
        summary: string;
        common_triggers: string[];
        how_common_it_is: string;
    };
    why_it_happens?: {
        breed_drivers: string;
        environment_drivers: string;
    };
    what_you_can_try?: {
        at_home_strategies: string[];
        when_to_consider_trainer: string;
        when_to_talk_to_vet: string;
    };
    realistic_expectations?: {
        timeline: string;
        what_success_looks_like: string;
    };
    case_study?: {
        title: string;
        story: string;
        key_takeaway: string;
    };
}

export interface AnxietyV7Page extends BaseV7Page {
    page_type: "anxiety";
    intro: BaseV7Page["intro"] & {
        who_this_is_for?: string;
    };
    anxiety_pattern?: {
        summary: string;
        common_signs: string[];
        situations_where_it_shows_up: string[];
    };
    support_options?: {
        at_home_strategies: string[];
        environment_changes: string[];
        when_to_consider_professional_training: string;
        when_to_talk_to_vet_or_behaviorist: string;
    };
    tools_and_products?: {
        summary: string;
        types_of_tools: string[];
    };
    case_study?: {
        title: string;
        story: string;
        key_takeaway: string;
    };
}

export interface LocationV7Page extends BaseV7Page {
    page_type: "location";
    intro: BaseV7Page["intro"] & {
        who_this_city_is_great_for?: string;
    };
    living_with_dogs_here?: {
        summary: string;
        climate_considerations: string;
        housing_considerations: string;
        dog_friendly_score_explained: string;
    };
    cost_snapshot?: {
        summary: string;
        vet_cost_level: "low" | "medium" | "high";
        example_monthly_ranges_usd: [number, number];
    };
    best_fit_breeds_section?: {
        summary: string;
        breed_slugs: string[];
    };
    breeds_to_be_cautious_with_section?: {
        summary: string;
        breed_slugs: string[];
    };
    case_study?: {
        title: string;
        story: string;
        key_takeaway: string;
    };
}

// --- Monetization & CTA ---

export type PageMonetization = {
    slug: string;
    page_type: PageType;
    cluster: "insurance" | "training" | "cbd" | "generic";
    primary_funnel:
    | "insurance_quiz"
    | "behavior_quiz"
    | "anxiety_quiz"
    | "lifestyle_quiz"
    | "none";
    secondary_funnels: (
        | "insurance_quiz"
        | "behavior_quiz"
        | "anxiety_quiz"
        | "lifestyle_quiz"
        | "none"
    )[];
    primary_offer_type:
    | "insurance_offer"
    | "training_course"
    | "cbd_offer"
    | "generic_affiliate"
    | "none";
    secondary_offer_types: (
        | "insurance_offer"
        | "training_course"
        | "cbd_offer"
        | "generic_affiliate"
        | "none"
    )[];
    show_ads: boolean;
    show_email_capture: boolean;
    primary_quiz_slug: string | null;
    secondary_quiz_slugs: string[];
    primary_campaign_id: string | null;
};

export type QuizCTA = {
    visible: boolean;
    quizSlug: string | null;
    label: string;
    description: string;
};

export type OfferCTA = {
    visible: boolean;
    offerType: "insurance" | "training" | "cbd" | "generic" | "none";
    partnerPlaceholder?: string;
    deepLinkPlaceholder?: string;
    label: string;
    description: string;
};

export type CTAConfig = {
    quizPrimary: QuizCTA | null;
    quizSecondary: QuizCTA[];
    offerPrimary: OfferCTA | null;
    offerSecondary: OfferCTA[];
    showAds: boolean;
    showEmailCapture: boolean;
};

export type PageIndexEntry = {
    slug: string;           // "golden-retriever-cost-austin-texas"
    page_type: PageType;    // "breed" | "cost" | "problem" | "anxiety" | "comparison" | "location" | "list"
    breed_slugs: string[];  // ["golden-retriever"] or ["golden-retriever","labrador"]
    city_slug?: string | null;      // "austin-texas"
    problem_slug?: string | null;   // "separation-anxiety"
    primary_intent: "informational" | "commercial_high" | "mixed";
    primary_cluster?: "insurance" | "training" | "cbd" | "generic" | null;
    title: string;          // h1 or meta title
    short_label: string;    // label for list display
};
