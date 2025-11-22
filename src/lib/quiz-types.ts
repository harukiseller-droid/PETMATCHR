export type QuizQuestionOption = {
    value: string;
    label: string;
    score: number;
    tags?: string[];
};

export type QuizQuestion = {
    id: string;
    text: string;
    type: string;
    required?: boolean;
    // Optional phase indicator for multi-step quizzes like lifestyle-match
    phase?: 1 | 2;
    options: QuizQuestionOption[];
};

export type QuizResultBucket = {
    slug: string;
    title: string;
    description: string;
    min_score: number;
    max_score: number;
    primary_call_to_action: string;
    recommended_quiz_followup?: string;
    email_sequence_id?: string;
     // Optional keywords that describe the persona this bucket represents
    persona_keywords?: string[];
    cta_label?: string; // Optional fallback
    cta_url?: string;   // Optional fallback
};

export type QuizDefinition = {
    slug: string;
    cluster?: string;
    title: string;
    description: string;
    conversion_goal?: string;
    questions: QuizQuestion[];
    result_mapping: QuizResultBucket[];
    results?: QuizResultBucket[]; // Backward compatibility if needed
};
