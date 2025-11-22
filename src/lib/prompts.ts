// Re-export the authoritative V7 prompt definitions from DOCUMENT_PLANNING/prompts.ts
// so runtime and scripts stay exactly in sync with the planning spec.

export {
  SYSTEM_PROMPT_PETMATCHR_V4,
  SEO_RULES_BLOCK,
  BASE_PAGE_INSTRUCTIONS,
  BREED_PAGE_PROMPT,
  LIST_PAGE_PROMPT,
  COMPARISON_PAGE_PROMPT,
  COST_PAGE_PROMPT,
  PROBLEM_PAGE_PROMPT,
  ANXIETY_PAGE_PROMPT,
  LOCATION_PAGE_PROMPT,
} from '../../DOCUMENT_PLANNING/prompts';
