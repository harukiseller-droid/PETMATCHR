# IMPLEMENTATION_PLAN.md  
PetMatchr V7 – Full Implementation Plan (AI-Only, No Human Touch)

MỤC TIÊU CHUNG  
- AI tự code 100% project PetMatchr V7, không cần dev người.  
- Toàn bộ kiến trúc, types, pages, API, batch generator, QA, sitemap, quiz, AEO/Quick Answers đều được cover.  
- AI chỉ cần bám checklist PHASE 0 → 12 để hoàn thành.

---

## PHASE 0 – Scan & Chốt Plan (SPEC DISCOVERY) – DONE BY AI TRƯỚC KHI CODE

Mục tiêu: AI đọc hết spec, chốt scope, không hỏi lại.

- [x] Đọc/scan các file chiến lược & nội dung:
  - [x] `V7_PETMATCHR – BEST FINAL VERSION.md`
  - [x] `V3_GIẢI THÍCH CHI TIẾT_MOAT SCORING MODEL_OPINIONATED CONTENT.txt`
- [x] Đọc/scan các file tech spec:
  - [x] `V7_tech1_JSON BREEDS_LIFESTYLE_SCORES_JSON CONTENT_Pseudo-code.md`
  - [x] `V7_tech2_Mapping PAGE_MONETIZATION_CTA_Pseudo-code generate batch pages.md`
  - [x] `V7_tech3_prompt.md`
  - [x] `V7_tech4_AEO_quick_answers_schema.md`
- [x] Đọc/scan prompts & LLM:
  - [x] `scripts/prompts.ts`  
        (phải confirm có đủ: `SYSTEM_PROMPT_PETMATCHR_V4`, `BREED_PAGE_PROMPT`, `LIST_PAGE_PROMPT`, `COST_PAGE_PROMPT`, `PROBLEM_PAGE_PROMPT`, `COMPARISON_PAGE_PROMPT`, `ANXIETY_PAGE_PROMPT`, `LOCATION_PAGE_PROMPT`)
  - [x] `scripts/llmClient.ts` (OpenAI client, default `gpt-4.1-mini` + env override `PETMATCHR_LLM_MODEL`)
- [x] Đọc/scan types & quiz:
  - [x] `src/lib/quiz-types.ts`
  - [x] `src/lib/types.ts` (nếu chưa tồn tại, sẽ tạo ở PHASE 2)
- [x] Cập nhật file này (IMPLEMENTATION_PLAN.md) nếu cần, sau khi scan xong → đánh dấu PHASE 0 là DONE.

---

## PHASE 1 – Base Project & Structure (Next.js 14 + TS)

Mục tiêu: Repo Next.js 14 App Router + TypeScript stable, có skeleton cần thiết.

- [x] Tạo/kiểm tra cấu trúc project:
  - [x] `package.json` với scripts tối thiểu:
    - [x] `"dev"`, `"build"`, `"start"`, `"lint"`
  - [x] `tsconfig.json` (strict mode)
  - [x] `next.config.mjs` (App Router, experimental config nếu cần)
  - [x] `.eslintrc` / `.prettierrc` (simple, không overkill)
- [x] Tạo skeleton App Router:
  - [x] `src/app/layout.tsx`
  - [x] `src/app/page.tsx` (homepage đơn giản, giới thiệu PetMatchr)
- [x] Tạo thư mục core:
  - [x] `src/lib/`
  - [x] `src/data/`
  - [x] `src/components/`
  - [x] `scripts/`
  - [x] `docs/`
- [x] Chạy `npm run lint` + `npm run build` để confirm base sạch.

---

## PHASE 2 – Types & Core Data Model

Mục tiêu: Định nghĩa tất cả types cho toàn hệ thống, type-safe cho 7 page_type + quizzes + AEO.

### 2.1 Core Entities

- [x] Tạo/hoàn thiện `src/lib/types.ts` với các type sau:

Entities chính:
- [x] `Breed`
  - id, slug, name, size, coat, shedding_level, energy_level, barking_level, trainability, kid_friendly, health_issues, cost_level, v.v. theo `V7_tech1`.
- [x] `LifestyleScore`
  - apartment_score, busy_worker_score, family_with_kids_score, allergy_friendly_score, beginner_friendly_score, active_outdoor_score, v.v.
- [x] `City`
  - city, state, avg_vet_cost, cost_multiplier, climate, dog_friendly_score.
- [x] `Problem`
  - slug, name, category, severity options, common_triggers, typical_age_start, typical_contexts.
- [x] `CostModel`
  - first_year_range_usd, monthly_range_usd, emergency_fund_recommended_usd, insurance_value_level.

### 2.2 Page Types (7 page_type)

- [x] Union `PageType`:
  - `"breed" | "list" | "comparison" | "cost" | "problem" | "anxiety" | "location"`

- [x] Page JSON types (khớp với outputs mô tả trong `scripts/prompts.ts`):

  - [x] `BreedPage`  
        (meta, h1, hero, sections.personality/energy_and_exercise/training_and_brain/family_and_social/apartment_and_space/time_and_cost/lifestyle_summary, callouts.good_fit_if/avoid_if, quick_answers, faq)
  - [x] `ListPage` (lifestyle list)
  - [x] `ComparisonPage`
  - [x] `CostPage`
  - [x] `ProblemPage`
  - [x] `AnxietyPage`
  - [x] `LocationPage`

  Mỗi page type PHẢI có:
  - [x] `meta`
  - [x] `h1`
  - [x] `sections` theo đúng prompt
  - [x] `faq: { question: string; answer: string }[]`
  - [x] `quick_answers: QuickAnswer[]`

### 2.3 Monetization & CTA

- [x] Định nghĩa theo `V7_tech2`:

  - [x] `OfferType`  
        (ví dụ: `"insurance_offer" | "training_course" | "cbd_offer" | "generic_affiliate" | "none"`)
  - [x] `OfferConfig` / `OfferCTA`
  - [x] `QuizCTA`
  - [x] `CTAConfig`
  - [x] `PageMonetization`
    - `{ page_type: PageType; slug_pattern: string; primary_quiz_slug?: string; primary_offer_type?: OfferType; ... }`

### 2.4 Quick Answers & AEO

- [x] Theo `V7_tech4_AEO_quick_answers_schema.md`:

  - [x] `QuickAnswerCategory` = `"Living" | "Costs" | "Health" | "Training"`
  - [x] `QuickAnswer`:
    - id, page_slug, question, answer, category, primary_intent.

- [x] Đảm bảo tất cả Page JSON types extend `BasePageWithAEO`:
  - [x] `quick_answers: QuickAnswer[]`
  - [x] `faq: { question: string; answer: string }[]`

### 2.5 Quiz Types

- [x] Import / align với `src/lib/quiz-types.ts`:

  - [x] Confirm các type:
    - `QuizCluster`
    - `QuizConversionGoal`
    - `QuizQuestionType`
    - `QuizQuestionOption`
    - `QuizScaleConfig`
    - `QuizQuestion`
    - `QuizResultBucket`
    - `QuizDefinition`
  - [x] Đảm bảo CTA / monetization logic có thể dùng `QuizDefinition` (cluster + conversion_goal + result_mapping).

---

## PHASE 3 – Seed Data (JSON)

Mục tiêu: Có đủ data mẫu để test 7 page_type, quizzes, CTA.

- [x] Tạo folder data:
  - [x] `src/data/breeds/`
  - [x] `src/data/lifestyle_scores/`
  - [x] `src/data/cities/`
  - [x] `src/data/problems/`
  - [x] `src/data/cost_models/`
  - [x] `src/data/page_monetization/`
  - [x] `src/data/pages/` (mỗi page_type 1 subfolder, ví dụ: `pages/breed`, `pages/cost`, …)
  - [x] `src/data/quizzes/`

### 3.1 Breeds & LifestyleScores

- [x] Seed tối thiểu 2–3 giống:
  - Golden Retriever, French Bulldog, 1 medium/working breed.
- [x] Mỗi breed có:
  - [x] Record `Breed`.
  - [x] Record `LifestyleScore`.

### 3.2 Cities & Cost Models

- [x] Seed tối thiểu 2–3 city:
  - Ví dụ: Austin, TX; New York, NY; Phoenix, AZ.
- [x] Với mỗi breed–city combo chủ chốt:
  - [x] `CostModel` tương ứng (first_year_range_usd, monthly_range_usd, emergency_fund_recommended_usd, insurance_value_level).

### 3.3 Problems

- [x] Seed 3–5 problems:
  - separation_anxiety, barking, leash_reactivity, hyperactivity, noise_phobia…

### 3.4 Seed Pages (Optional nhưng khuyến khích cho dev/test)

- [x] `src/data/pages/breed/*.json` – 1–2 BreedPage mẫu.
- [x] `src/data/pages/list/*.json` – 1 ListPage mẫu.
- [x] `src/data/pages/comparison/*.json` – 1 ComparisonPage mẫu.
- [x] `src/data/pages/cost/*.json` – 1–2 CostPage mẫu.
- [x] `src/data/pages/problem/*.json` – 1–2 ProblemPage mẫu.
- [x] `src/data/pages/anxiety/*.json` – 1 AnxietyPage mẫu.
- [x] `src/data/pages/location/*.json` – 1 LocationPage mẫu.

> Nếu không seed thủ công, có thể để trống và rely hoàn toàn vào AI batch generator ở PHASE 9. Nhưng ít nhất nên có 1–2 file để test UI.

---

## PHASE 4 – PAGE_MONETIZATION & CTA Mapping

Mục tiêu: Map mọi page → đúng quiz / offer / CTA theo chiến lược.

- [x] Implement `PageMonetization` logic theo `V7_tech2`:

  - [x] Tạo `src/data/page_monetization/page_monetization.json`  
        – danh sách cấu hình cho từng page_type + slug_pattern.
  - [x] Tạo `src/lib/monetization.ts`:
    - [x] `resolvePageCTAs(pageType: PageType, slug: string): CTAConfig`
    - [x] Helpers:
      - [x] `mapOfferType(...)`
      - [x] `getQuizLabel(slug: string): string`
      - [x] Các helper cần thiết để map từ `PageMonetization` → CTA thực tế.

- [x] Đảm bảo:
  - [x] Một số page_type ưu tiên quiz (v.d. cost, problem, anxiety → insurance/training/anxiety quiz).
  - [x] Một số page_type ưu tiên offer (v.d. CBD, course, affiliate…).

---

## PHASE 5 – Data Loaders

Mục tiêu: API nội bộ để frontend + scripts đọc tất cả data.

- [x] Tạo `src/lib/data.ts` (hoặc chia nhỏ, nhưng giữ API rõ ràng):

Core loaders:
- [x] `getBreeds()`, `getBreedBySlug(slug: string)`
- [x] `getLifestyleScores()`
- [x] `getCities()`, `getCityBySlug(citySlug: string)`
- [x] `getProblems()`, `getProblemBySlug(slug: string)`
- [x] `getCostModel(breedSlug: string, citySlug: string)`
- [x] `getPageMonetization(pageType: PageType, slug: string): PageMonetization | null`

Page loaders (7 loại):
- [x] `getBreedPageBySlug(slug: string): Promise<BreedPage | null>`
- [x] `getListPageBySlug(slug: string): Promise<ListPage | null>`
- [x] `getComparisonPageBySlug(slug: string): Promise<ComparisonPage | null>`
- [x] `getCostPageBySlug(slug: string): Promise<CostPage | null>`
- [x] `getProblemPageBySlug(slug: string): Promise<ProblemPage | null>`
- [x] `getAnxietyPageBySlug(slug: string): Promise<AnxietyPage | null>`
- [x] `getLocationPageBySlug(slug: string): Promise<LocationPage | null>`

Quiz loaders:
- [x] `getQuizDefinition(slug: string): Promise<QuizDefinition | null>`
- [x] `getAllQuizzes(): Promise<QuizDefinition[]>`

Quick answers:
- [x] Helper để đọc/gom `quick_answers` từ tất cả page JSON (hoặc 1 index file).

---

## PHASE 6 – Frontend Pages (7 Page Types)

Mục tiêu: Render được đầy đủ UI cho cả 7 page_type, dùng data loaders + CTA + quick_answers.

### 6.1 Breed Pages

- [x] Route: `src/app/breeds/[slug]/page.tsx`
- [x] Component: `src/components/BreedPageView.tsx`
  - [x] Fetch `BreedPage` + `PageMonetization`.
  - [x] Render:
    - meta + h1
    - hero.one_liner + sub_heading
    - sections.personality / energy_and_exercise / training_and_brain / family_and_social / apartment_and_space / time_and_cost / lifestyle_summary
    - callouts.good_fit_if / avoid_if
    - quick_answers (box “Quick answers”)
    - FAQ
    - CTA block (quiz/offer/email…) từ `resolvePageCTAs`.

### 6.2 List (Lifestyle) Pages

- [x] Route: `src/app/lists/[slug]/page.tsx`
- [x] Component: `src/components/ListPageView.tsx`
  - [x] Render intro, ranking_table, deep_dive_sections, FAQ, CTA, quick_answers.

### 6.3 Comparison Pages

- [x] Route: `src/app/compare/[slug]/page.tsx`
- [x] Component: `src/components/ComparisonPageView.tsx`
  - [x] Render:
    - hero.short_verdict, hero.overall_winner, hero.summary_paragraph
    - summary_table (rows: label, left_value, right_value, winner, note)
    - sections.who_should_pick_left / who_should_pick_right / health_and_cost / training_and_temperament
    - callouts.left_is_better_if / right_is_better_if
    - FAQ
    - quick_answers
    - CTA (thường là quiz + insurance/training offer).

### 6.4 Cost Pages

- [x] Route: `src/app/cost/[slug]/page.tsx`
- [x] Component: `src/components/CostPageView.tsx`
  - [x] Render hero.key_numbers, first_year_breakdown, monthly_breakdown, emergency_and_risk, insurance_value, ways_to_save_safely, FAQ, quick_answers, CTA.

### 6.5 Problem Pages

- [x] Route: `src/app/problems/[slug]/page.tsx`
- [x] Component: `src/components/ProblemPageView.tsx`
  - [x] Render hero, symptoms_and_signs, why_this_happens, home_alone_expectations, step_by_step_plan, when_to_get_help, calming_support_options, FAQ, quick_answers, CTA.

### 6.6 Anxiety Pages

- [x] Route: `src/app/anxiety/[slug]/page.tsx`
- [x] Component: `src/components/AnxietyPageView.tsx`
  - [x] Render:
    - hero.summary / who_this_is_for / hope_message
    - sections.what_it_looks_like / why_this_breed_gets_anxious (root_causes) / training_basics (steps) / calming_support (support_types) / safety_and_vet
    - recommendations.when_cbd_helps / when_cbd_is_not_enough
    - FAQ
    - quick_answers
    - CTA (thường liên quan anxiety quiz + CBD/insurance/training offers).

### 6.7 Location Pages

- [x] Route: `src/app/locations/[slug]/page.tsx`
- [x] Component: `src/components/LocationPageView.tsx`
  - [x] Render:
    - hero.city_tagline + summary
    - sections.what_it_is_like / cost_and_vet_care
    - best_breeds_section.breeds[]
    - breeds_to_think_twice_about.breeds[]
    - local_tips.tips[]
    - FAQ
    - quick_answers
    - CTA.

### 6.8 Quick Answers UI (dùng chung)

- [x] Tạo component `QuickAnswersBox`:
  - [x] Input: `quick_answers: QuickAnswer[]`
  - [x] Hiển thị list Q/A ngắn + link sang /answers hoặc page gốc nếu cần.

---

## PHASE 7 – Public JSON APIs (AEO / Crawler)

Mục tiêu: API JSON sạch cho từng page_type để dùng cho AEO, crawlers, internal tools.

Routes (App Router API):

- [x] `src/app/api/breeds/[slug]/route.ts`
- [x] `src/app/api/lists/[slug]/route.ts`
- [x] `src/app/api/comparison/[slug]/route.ts`
- [x] `src/app/api/cost/[slug]/route.ts`
- [x] `src/app/api/problems/[slug]/route.ts`
- [x] `src/app/api/anxiety/[slug]/route.ts`
- [x] `src/app/api/locations/[slug]/route.ts`

Mỗi endpoint:

- [x] Load page JSON tương ứng bằng data loaders.
- [x] Trả response JSON gồm:
  - [x] `meta`, `h1`, `hero` (nếu có), `sections`, `faq`, `quick_answers`
  - [x] Monetization info cơ bản (quiz_slug, primary_offer_type) nếu hữu ích cho client/crawler.
- [x] Set headers:
  - [x] `Content-Type: application/json`
  - [x] `Cache-Control` hợp lý (stale-while-revalidate, static generation…)
  - [x] CORS đơn giản nếu cần.

---

## PHASE 8 – Quiz Engine & Answers Hub

### 8.1 Quizzes

- [x] Confirm `src/lib/quiz-types.ts` đã đúng và importable.
- [x] Tạo tối thiểu 4 JSON quiz trong `src/data/quizzes/`:
  - [x] `insurance-fit.json`
  - [x] `behavior-check.json`
  - [x] `anxiety-level.json`
  - [x] `lifestyle-match.json`
  - Mỗi file phải conform `QuizDefinition`.

- [x] Route: `src/app/quiz/[slug]/page.tsx`
  - [x] Load `QuizDefinition` bằng data loader.
  - [x] Render câu hỏi:
    - single_choice / multi_choice / scale.
  - [x] Thu thập câu trả lời, tính tổng score, map sang `QuizResultBucket` (minScore/maxScore).
  - [x] Hiển thị:
    - title, description
    - result title + description
    - CTA theo `recommended_offer_type` + `recommended_quiz_followup`
    - Optional: email capture nếu `email_sequence_id` không null.

### 8.2 Answers Hub

- [x] Route: `src/app/answers/page.tsx`
  - [x] Sử dụng QuickAnswer model từ `V7_tech4`:
    - [x] Gom tất cả `quick_answers` từ page JSON (hoặc từ index data).
  - [x] Tính năng:
    - [x] Search box (filter by substring trong câu hỏi).
    - [x] Filter by category: `"Living" | "Costs" | "Health" | "Training"`.
    - [x] List kết quả:
      - Question
      - Short answer
      - Link tới page gốc.
      - Nếu page có primary_quiz_slug trong CTAConfig → hiển thị “Take quiz” link.

---

## PHASE 9 – LLM Client & Batch Content Generator

Mục tiêu: 100% content pages được AI generate, không cần human; có retry + validation.

### 9.1 LLM Client

- [x] Hoàn thiện `scripts/llmClient.ts`:
  - [x] OpenAI client v4, `apiKey` từ `process.env.OPENAI_API_KEY`.
  - [x] Default model = `process.env.PETMATCHR_LLM_MODEL ?? "gpt-4.1-mini"`.
  - [x] Hàm `callLLM({ system, user, jsonInput, temperature })`:
    - Compose messages:
      - system → SYSTEM_PROMPT_PETMATCHR_V4
      - user → PAGE_PROMPT tương ứng
      - INPUT_JSON → string sau `INPUT_JSON:\n`
    - Parse JSON output; nếu parse fail → throw error.

### 9.2 Page Matrix

- [x] Tạo `scripts/generate-page-matrix.ts`:
  - [x] Đọc:
    - breeds, lifestyle_scores, cities, problems…
  - [x] Tạo `pageMatrix.json` với mảng items:
    ```ts
    type PageMatrixItem = {
      slug: string;
      page_type: PageType; // "breed" | "list" | "comparison" | "cost" | "problem" | "anxiety" | "location"
      input: any;          // seed JSON đúng shape INPUT_JSON của PAGE_PROMPT
      ai_prompt_version: string; // ví dụ "v7"
    };
    ```
  - [x] Cover đủ 7 page_type (ít nhất vài sample mỗi loại).
  - [x] Script CLI: `npm run gen:matrix` → build lại `pageMatrix.json`.

### 9.3 Batch Content Generation

- [x] Tạo `scripts/generate-pages.ts`:
  - [x] Đọc `pageMatrix.json`.
  - [x] Với mỗi item:
    - [x] Chọn PAGE_PROMPT đúng theo `page_type`.
    - [x] Gọi `callLLM({ system, user, jsonInput })`.
    - [x] Validate output bằng schema/types tương ứng:
      - meta, h1, sections, faq, quick_answers, v.v.
    - [x] Nếu fail:
      - Retry tối thiểu 2 lần (sửa nhẹ user prompt nếu cần, ví dụ thêm “Your last output was invalid JSON”).
      - Nếu vẫn fail → log lỗi, mark item as failed cho QA.
    - [x] Nếu pass:
      - [x] Gọi `savePage(pageType, slug, json)` ghi vào `src/data/pages/<type>/<slug>.json`.

---

## PHASE 10 – QA Scripts & Content Reports

Mục tiêu: Có QA tự động để đảm bảo content đủ field, align spec, không bị rỗng.

- [x] Tạo `scripts/qa-check.ts`:
  - [x] Đọc tất cả page JSON từ `src/data/pages/**`.
  - [x] Với mỗi page:
    - [x] Validate type (BreedPage/ListPage/ComparisonPage/CostPage/ProblemPage/AnxietyPage/LocationPage).
    - [x] Check:
      - meta.title/meta.description không rỗng.
      - h1 không rỗng.
      - Các sections chính không rỗng (phải có ít nhất 1–2 paragraph cho mỗi section bắt buộc).
      - FAQ có ít nhất 2 entry.
      - quick_answers có ít nhất 1 entry (ưu tiên 2–3+).
      - CTAConfig resolve được (nếu có entry trong PageMonetization).
    - [x] Optional:
      - Detect duplicate content (hash nội dung key sections).
  - [x] Output:
    - [x] JSON/txt report (vd. `qa-report.json`) liệt kê:
      - pages pass
      - pages fail + lý do.

- [x] Script npm:
  - [x] `"qa": "ts-node scripts/qa-check.ts"` (hoặc tương đương).

---

## PHASE 11 – Sitemaps & SEO Glue (JSON-LD)

Mục tiêu: Đảm bảo crawler và Google hiểu site structure + FAQPage.

### 11.1 Sitemaps

- [x] Implement `src/app/sitemap.ts`:
  - [x] Generate URL list cho:
    - Homepage
    - All 7 page_type routes (breeds, lists, compare, cost, problems, anxiety, locations)
    - /quiz/[slug]
    - /answers
  - [x] Sử dụng data loaders đọc slugs từ JSON.

### 11.2 JSON-LD FAQPage

- [x] Trong layout/page-level (hoặc API) của mỗi page_type:
  - [x] Map `faq` hoặc `quick_answers` → JSON-LD:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "...",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "..."
          }
        }
      ]
    }
    ```
  - [x] Đảm bảo:
    - Chỉ các câu hỏi/đáp ngắn, rõ, không spam.
    - Use `quick_answers` trước, nếu rỗng thì fallback sang `faq`.

---

## PHASE 12 – DX, Scripts & README

Mục tiêu: Dùng được pipeline chỉ với vài lệnh; AI có doc rõ ràng.

- [x] Cập nhật `package.json` thêm scripts:
  - [x] `"gen:matrix": "ts-node scripts/generate-page-matrix.ts"`
  - [x] `"gen:content": "ts-node scripts/generate-pages.ts"`
  - [x] `"qa": "ts-node scripts/qa-check.ts"`
  - [x] `"sitemap": "next-sitemap"` hoặc script tự code nếu dùng native.
- [x] Đảm bảo:
  - [x] `npm run lint` pass.
  - [x] `npm run build` pass.

- [x] Tạo/Update `README.md`:
  - [x] Mục “Setup”:
    - `OPENAI_API_KEY=...`
    - `PETMATCHR_LLM_MODEL` (optional – default `gpt-4.1-mini`).
  - [x] Mục “Commands”:
    - `npm run gen:matrix` → build pageMatrix.
    - `npm run gen:content` → gọi LLM sinh content cho tất cả page.
    - `npm run qa` → check chất lượng.
    - `npm run dev` → chạy local.
  - [x] Mục “Pipeline 100% AI”:
    - Mô tả ngắn:
      1. `npm run gen:matrix`
      2. `npm run gen:content`
      3. `npm run qa`
      4. `npm run sitemap`
      5. `npm run build`

---

KẾT LUẬN  
- File này là source of truth duy nhất cho AI coder.  
- AI PHẢI làm theo PHASE 0 → 12, không bỏ bước, không hỏi lại.  
- Khi tất cả checkbox được đánh dấu DONE, project PetMatchr V7 đã hoàn thành với 100% automation, không cần human chạm vào code.
