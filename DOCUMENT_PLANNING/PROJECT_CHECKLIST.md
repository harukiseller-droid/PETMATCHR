# PetMatchr V7 Implementation Checklist

Based on `DOCUMENT_PLANNING/IMPLEMENTATION_PLAN.md`.

## PHASE 0 – Scan & Chốt Plan (SPEC DISCOVERY)
- [x] Read/scan strategy & content files (`V7_PETMATCHR...`, `V3_GIẢI THÍCH...`)
- [x] Read/scan tech spec files (`V7_tech1...`, `V7_tech2...`, `V7_tech3...`, `V7_tech4...`)
- [x] Read/scan prompts & LLM (`scripts/prompts.ts`, `scripts/llmClient.ts`)
- [x] Read/scan types & quiz (`src/lib/quiz-types.ts`, `src/lib/types.ts`)

## PHASE 1 – Base Project & Structure
- [x] `package.json` scripts (dev, build, start, lint)
- [x] `tsconfig.json` (strict mode)
- [x] `next.config.mjs`
- [x] `.eslintrc` / `.prettierrc`
- [x] Skeleton App Router (`layout.tsx`, `page.tsx`)
- [x] Core folders (`src/lib`, `src/data`, `src/components`, `scripts`, `docs`)
- [x] Verify `npm run lint` + `npm run build` pass

## PHASE 2 – Types & Core Data Model
- [x] `src/lib/types.ts`: Core Entities (Breed, LifestyleScore, City, Problem, CostModel)
- [x] `src/lib/types.ts`: Page Types (BreedPage, ListPage, ComparisonPage, etc.)
- [x] `src/lib/types.ts`: Monetization & CTA types
- [x] `src/lib/types.ts`: Quick Answers & AEO types
- [x] `src/lib/quiz-types.ts`: Quiz types

## PHASE 3 – Seed Data (JSON)
- [x] `src/data/breeds/` (Golden Retriever, etc.)
- [x] `src/data/lifestyle_scores/`
- [x] `src/data/cities/`
- [x] `src/data/problems/`
- [x] `src/data/cost_models/`
- [x] `src/data/page_monetization/`
- [x] `src/data/pages/` (Sample pages for each type)
- [x] `src/data/quizzes/`

## PHASE 4 – PAGE_MONETIZATION & CTA Mapping
- [x] `src/data/page_monetization/page_monetization.json`
- [x] `src/lib/monetization.ts`: `resolvePageCTAs`, helpers (MISSING)

## PHASE 5 – Data Loaders
- [x] `src/lib/data.ts`: Core loaders (getBreeds, getLifestyleScores, etc.)
- [x] `src/lib/data.ts`: Page loaders (getBreedPageBySlug, etc.)
- [x] `src/lib/data.ts`: Quiz loaders (MISSING)
- [x] `src/lib/data.ts`: Quick answers helper (MISSING)

## PHASE 6 – Frontend Pages (7 Page Types)
- [x] Breed Pages: `src/app/breeds/[slug]/page.tsx` & `src/components/BreedPageView.tsx`
- [x] List Pages: `src/app/lists/[slug]/page.tsx` & `src/components/ListPageView.tsx`
- [x] Comparison Pages: `src/app/compare/[slug]/page.tsx` & `src/components/ComparisonPageView.tsx`
- [x] Cost Pages: `src/app/cost/[slug]/page.tsx` & `src/components/CostPageView.tsx`
- [x] Problem Pages: `src/app/problems/[slug]/page.tsx` & `src/components/ProblemPageView.tsx`
- [x] Anxiety Pages: `src/app/anxiety/[slug]/page.tsx` & `src/components/AnxietyPageView.tsx`
- [x] Location Pages: `src/app/locations/[slug]/page.tsx` & `src/components/LocationPageView.tsx`
- [ ] Quick Answers UI: `src/components/QuickAnswersBox.tsx`
- [x] Static Pages: Privacy, Terms, Contact

## PHASE 7 – Public JSON APIs
- [x] `src/app/api/breeds/[slug]/route.ts`
- [x] `src/app/api/lists/[slug]/route.ts`
- [x] `src/app/api/comparison/[slug]/route.ts`
- [x] `src/app/api/cost/[slug]/route.ts`
- [x] `src/app/api/problems/[slug]/route.ts`
- [x] `src/app/api/anxiety/[slug]/route.ts`
- [x] `src/app/api/locations/[slug]/route.ts`

## PHASE 8 – Quiz Engine & Answers Hub
- [ ] Quizzes: `src/data/quizzes/*.json` (insurance, behavior, anxiety, lifestyle)
- [x] Quiz Page: `src/app/quiz/[slug]/page.tsx`
- [x] Answers Hub: `src/app/answers/page.tsx`

## PHASE 9 – LLM Client & Batch Content Generator
- [x] `scripts/llmClient.ts`: OpenAI client, `callLLM` (or `callHybridLLM`)
- [x] `scripts/generate-page-matrix.ts`: Build `pageMatrix.json`
- [x] `scripts/generate-pages.ts`: Batch generation logic

## PHASE 10 – QA Scripts & Content Reports
- [x] `scripts/qa-check.ts`: Validate page JSONs

## PHASE 11 – Sitemaps & SEO Glue
- [x] `src/app/sitemap.ts`: Generate URLs for all pages
- [x] JSON-LD FAQPage implementation

## PHASE 12 – DX, Scripts & README
- [x] `package.json` scripts
- [x] `README.md` updates

## PHASE 13 – Hybrid LLM + On-Demand Comparison
- [x] `scripts/llmClient.ts`: `callCloudLLM`, `callLocalLLM`, `callHybridLLM`
- [x] Env vars: `PETMATCHR_AUTO_COMPARISON_MODE`, limits, local URL
- [x] `src/lib/comparison-generator.ts`: `ensureComparisonPage` (Partial: missing index update)
- [x] `src/app/api/comparison/[slug]/route.ts`: Use `ensureComparisonPage`
- [x] `src/app/compare/page.tsx`: UI for breed selector
- [x] `src/app/compare/[slug]/page.tsx`: Loading/Fallback UI

## PHASE 14 – Internal Linking & Related Navigation
- [x] `src/lib/internal-links.ts`: `PageIndexEntry` type
- [x] `src/data/page_index.json`
- [x] `scripts/build-page-index.ts`: Index builder script
- [x] Integration: Update `generate-pages.ts` and `comparison-generator.ts` to update index

## PHASE 15 – Content Quality, SEO, Intent & Quiz Depth
- [x] `scripts/qa-seo.ts`: On-page SEO checks (meta, h1, structure, keywords)
- [x] `scripts/qa-quiz.ts`: Quiz depth and quality checks
- [ ] `src/data/user_intents.json`: User intent mapping
- [x] Update `generate-page-matrix.ts` to include `target_keywords` and `primary_intent`
- [ ] Update `scripts/qa-check.ts` for AEO readiness (quick_answers, faq, JSON-LD)

## PHASE 16 – Lifestyle Match Flow, Persona Guides & Tools
- [x] Update `src/data/quizzes/lifestyle-match.json` (Phase 1 & 2)
- [x] `src/lib/lifestyle-match.ts`: `matchBreedsForPersona` helper
- [x] `src/app/quiz/lifestyle-match/page.tsx`: Multi-step UI & Results Page
- [ ] Persona Guides: `src/app/guides/[slug]/page.tsx` (reuse ListPage)
- [x] Tools: `src/app/tools/cost-calculator/page.tsx`

## PHASE 17 – SEO Keyword + Outline Engine + Full Content Regen (V7)
- [ ] `src/data_v7/keywords/master_keywords.json`: Master keyword source
- [x] `src/lib/seo-keywords.ts`: Helper functions (`getKeywordsForPage`, `getFallbackKeywordsForPage`)
- [x] Update `scripts/generate-page-matrix.ts` to use master keywords/fallback
- [x] `src/lib/types.ts`: Define `V7PageType`, `BaseV7Page`, `ProductBlock`
- [x] `scripts/regenerate_all_pages_v7.ts`: Full regeneration script

## PHASE 18 – Periodic Content Refresh
- [ ] `src/data_v7/metrics/page_metrics.json`: Page metrics tracking
- [ ] `src/lib/refresh-planner.ts`: `getPagesNeedingRefresh`
- [ ] `scripts/refresh_pages_v7.ts`: Refresh script (light/deep modes)
- [ ] Update QA scripts for post-refresh checks

## PHASE 19 – Content Matrix Management
- [ ] `src/data_v7/content_matrix_management.json`: Schema definition
- [ ] `input_data/` folder setup (`breeds.json`, `problems.json`, etc.)
- [x] `scripts/build_content_matrix.ts`: Script to build matrix from input data

## PHASE 20 – Content Matrix & Admin Dashboard
- [x] `src/lib/content-matrix-types.ts`: Types for matrix and input data
- [x] `src/lib/content-matrix.ts`: Data loaders for matrix
- [x] `src/app/admin/page.tsx`: Admin Dashboard Server Component
- [x] `src/components/admin/PagesTable.tsx`: Client component for pages table
- [x] `src/components/admin/PageDetailPanel.tsx`: Detail panel component
- [x] `src/components/admin/InputDataOverview.tsx`: Input data overview component
