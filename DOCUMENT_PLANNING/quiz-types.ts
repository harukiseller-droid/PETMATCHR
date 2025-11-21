// FILE: src/lib/quiz-types.ts

export type QuizCluster = "insurance" | "training" | "anxiety" | "lifestyle";

export type QuizConversionGoal = "lead_form" | "email_course" | "product_rec";

export type QuizQuestionType = "single_choice" | "multi_choice" | "scale";

export type QuizQuestionOption = {
  value: string;        // internal code, e.g. "often", "sometimes"
  label: string;        // user-facing text
  score: number;        // numeric score contribution
  tags?: string[];      // optional tags, e.g. ["high_risk", "budget_sensitive"]
};

export type QuizScaleConfig = {
  min: number;          // e.g. 1
  max: number;          // e.g. 5
  minLabel: string;     // e.g. "Never"
  maxLabel: string;     // e.g. "Very often"
};

export type QuizQuestion = {
  id: string;                 // "q1", "q2"...
  question: string;
  type: QuizQuestionType;
  options?: QuizQuestionOption[];   // required for single_choice / multi_choice
  scaleConfig?: QuizScaleConfig;    // required for scale
};

export type QuizResultBucket = {
  slug: string;         // "low_risk", "medium_risk", "high_risk"
  title: string;        // "Low emergency risk"
  description: string;  // 2–4 sentence summary
  minScore: number;
  maxScore: number;
  recommended_offer_type:
    | "insurance_offer"
    | "training_course"
    | "cbd_offer"
    | "generic_affiliate"
    | "none";
  recommended_quiz_followup?: string | null;  // e.g. "lifestyle-match"
  email_sequence_id?: string | null;         // e.g. "insurance_low_risk_seq"
};

export type QuizDefinition = {
  slug: string;                    // "insurance-fit", "behavior-check"
  cluster: QuizCluster;            // "insurance" | "training" | "anxiety" | "lifestyle"
  title: string;
  description: string;
  conversion_goal: QuizConversionGoal;
  questions: QuizQuestion[];
  result_mapping: QuizResultBucket[];
};
