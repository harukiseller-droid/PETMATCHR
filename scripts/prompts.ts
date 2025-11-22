// Script-level prompts re-export the V7 prompt definitions from src/lib/prompts
// so that scripts can stay in sync with runtime.

export {
  SYSTEM_PROMPT_PETMATCHR_V4 as SYSTEM_PROMPT,
  BREED_PAGE_PROMPT,
  LIST_PAGE_PROMPT,
  COMPARISON_PAGE_PROMPT,
  COST_PAGE_PROMPT,
  PROBLEM_PAGE_PROMPT,
  ANXIETY_PAGE_PROMPT,
  LOCATION_PAGE_PROMPT,
} from '../src/lib/prompts';
