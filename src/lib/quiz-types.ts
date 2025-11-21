export type QuizQuestionOption = {
    id: string;
    label: string;
    value: number;
};

export type QuizQuestion = {
    id: string;
    text: string;
    type: string;
    options: QuizQuestionOption[];
};

export type QuizResultBucket = {
    id: string;
    min_score: number;
    max_score: number;
    title: string;
    description: string;
    cta_label: string;
    cta_url: string;
};

export type QuizDefinition = {
    id: string;
    slug: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
    results: QuizResultBucket[];
};
