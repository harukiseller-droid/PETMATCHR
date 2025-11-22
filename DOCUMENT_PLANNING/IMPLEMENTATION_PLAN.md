# IMPLEMENTATION_PLAN.md  
PetMatchr V7 – Full Implementation Plan (AI-Only, No Human Touch)

MỤC TIÊU CHUNG  
- AI tự code 100% project PetMatchr V7, không cần dev người.  
- Toàn bộ kiến trúc, types, pages, API, batch generator, QA, sitemap, quiz, AEO/Quick Answers đều được cover.  
- AI chỉ cần bám checklist PHASE 0 → 20 để hoàn thành.

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
- AI PHẢI làm theo PHASE 0 → 20, không bỏ bước, không hỏi lại.  
- Khi tất cả checkbox được đánh dấu DONE, project PetMatchr V7 đã hoàn thành với 100% automation, không cần human chạm vào code.

## PHASE 13 – Hybrid LLM + On-Demand Comparison (4o-mini + Local Fallback)

**Mục tiêu:**
- Ưu tiên dùng API cloud (gpt-4o-mini) khi còn quota.
- Nếu không có API key / lỗi / timeout → fallback sang model local trên VPS.
- Cho phép generate on-demand các comparison page nhưng vẫn kiểm soát chi phí, tránh duplicate, có UX rõ ràng cho user.

### 13.1 Hybrid LLM Client (Cloud 4o-mini + Local)

- Update `scripts/llmClient.ts` để tách 3 hàm rõ ràng:
  - `callCloudLLM({ system, user, jsonInput, temperature })`
    - Dùng OpenAI SDK v4.
    - Model default: `process.env.PETMATCHR_LLM_MODEL ?? "gpt-4o-mini"`.
    - Timeout ngắn (ví dụ 20s).
    - Nếu:
      - thiếu `OPENAI_API_KEY`, hoặc
      - lỗi auth / rate limit / network, hoặc
      - timeout
      - → throw `CloudLLMError`.
  - `callLocalLLM({ system, user, jsonInput, temperature })`
    - Gọi HTTP POST tới `process.env.PETMATCHR_LOCAL_LLM_URL` (API model local trên VPS).
    - Body: `{ system, user, jsonInput, temperature }` (cùng schema với cloud).
    - Đọc model name từ `process.env.PETMATCHR_LOCAL_LLM_MODEL` (vd: "llama3.1-8b-instruct").
    - Timeout riêng (ví dụ 25–30s).
    - Nếu lỗi kết nối / parse → throw `LocalLLMError`.
  - `callHybridLLM({ system, user, jsonInput, temperature })`
    - Flow:
      1. Try `callCloudLLM`.
      2. Nếu `CloudLLMError` → fallback sang `callLocalLLM`.
      3. Nếu cả cloud + local đều fail → throw `HybridLLMError`.

- Thay toàn bộ chỗ đang dùng `callLLM(...)` trong scripts:
  - `scripts/generate-pages.ts`
  - Bất kỳ script generate mới (sau này `ensureComparisonPage`)
  - → dùng duy nhất `callHybridLLM`.

- Giữ nguyên format prompt:
  - system luôn = `SYSTEM_PROMPT_PETMATCHR_V4`.
  - user luôn = đúng `*_PAGE_PROMPT` theo page_type.
  - jsonInput = `INPUT_JSON` đúng spec (không đổi giữa cloud/local).

### 13.2 Config & Cost Guard

- Thêm các biến env:
  - `PETMATCHR_AUTO_COMPARISON_MODE`:
    - `"hybrid" | "cloud_only" | "local_only" | "off"`.
    - Default: `"hybrid"`.
  - `PETMATCHR_MAX_AUTO_COMPARISON_PER_BREED` (vd: 20).
  - `PETMATCHR_MAX_AUTO_COMPARISON_PER_DAY` (vd: 100).
  - `PETMATCHR_LOCAL_LLM_URL` (vd: `http://llm-vps.internal/generate`).
  - `PETMATCHR_LOCAL_LLM_MODEL` (vd: `"llama3.1-8b-instruct"`).

- Trong logic generate comparison on-demand:
  - Nếu `PETMATCHR_AUTO_COMPARISON_MODE = "off"` → không được phép generate mới, chỉ trả 404 hoặc fallback UI.
  - Nếu số comparison auto đã generate cho 1 breed > `PETMATCHR_MAX_AUTO_COMPARISON_PER_BREED` → từ chối generate.
  - Nếu số comparison auto trong ngày > `PETMATCHR_MAX_AUTO_COMPARISON_PER_DAY` → từ chối generate.

### 13.3 Service ensureComparisonPage (On-Demand Comparison Generator)

- Tạo file: `src/lib/comparison-generator.ts`.
- Định nghĩa type:
  ```typescript
  type EnsureComparisonResult =
    | { ok: true; page: ComparisonPage }
    | { ok: false; reason: "INVALID_PAIR" | "MODE_OFF" | "LIMIT_REACHED" | "LLM_FAILED" | "TIMEOUT" };
  ```
- Implement hàm:
  ```typescript
  async function ensureComparisonPage(params: {
    leftBreedSlug: string;
    rightBreedSlug: string;
    context?: {
      primary_concern?: string;  // apartment, kids, health_costs...
      user_profile?: string;     // busy_worker, family_with_kids...
    };
  }): Promise<EnsureComparisonResult>
  ```

- Logic chi tiết:
  1. **Chuẩn hóa slug canonical**
     - Lấy mảng `[leftBreedSlug, rightBreedSlug]` → `sort()` alphabet → `sorted`.
     - `canonicalSlug = sorted.join("-vs-")`.
     - Full slug page: `/compare/${canonicalSlug}`.
     - Mục tiêu: `golden-retriever-vs-labrador` và `labrador-vs-golden-retriever` luôn trỏ về cùng 1 JSON.
  2. **Check page đã tồn tại chưa**
     - Gọi `getComparisonPageBySlug(canonicalSlug)`.
     - Nếu tìm thấy → return `{ ok: true, page }` (KHÔNG gọi LLM, không tốn chi phí).
  3. **Check mode + limit**
     - Nếu `PETMATCHR_AUTO_COMPARISON_MODE = "off"`:
       - return `{ ok: false, reason: "MODE_OFF" }`.
     - Đếm số comparison đã có liên quan đến mỗi breed:
       - Nếu > `PETMATCHR_MAX_AUTO_COMPARISON_PER_BREED` → `LIMIT_REACHED`.
     - Đếm số comparison auto hôm nay:
       - Nếu > `PETMATCHR_MAX_AUTO_COMPARISON_PER_DAY` → `LIMIT_REACHED`.
  4. **Validate breed pair**
     - Kiểm tra `leftBreedSlug` và `rightBreedSlug` có trong `breeds.json`.
     - Nếu 1 trong 2 không tồn tại → `INVALID_PAIR`.
  5. **Chuẩn bị INPUT_JSON cho COMPARISON_PAGE_PROMPT**
     - Load đầy đủ:
       - `left_breed` from `breeds.json`.
       - `right_breed`.
       - `left_scores`, `right_scores` từ `lifestyle_scores.json`.
     - Optional: `primary_concern`, `user_profile` từ `params.context`.
     - Build input đúng shape mà `COMPARISON_PAGE_PROMPT` yêu cầu (meta, hero, verdict, summary_table, CTA, quick_answers, faq…).
  6. **Gọi LLM qua callHybridLLM**
     - `const output = await callHybridLLM({ system, user, jsonInput })`.
     - `system = SYSTEM_PROMPT_PETMATCHR_V4`.
     - `user = COMPARISON_PAGE_PROMPT`.
     - Timeout tổng không quá ~40s (cloud + local).
  7. **Validate + save**
     - Validate output: `basicValidateOutput("comparison", output)`.
     - Nếu fail → `LLM_FAILED`.
     - Force `output.slug = canonicalSlug`.
     - `savePageJson("comparison", canonicalSlug, output)`:
       - Ghi file vào `src/data/pages/comparison/${canonicalSlug}.json`.
     - Update `page_monetization` cho slug này (cluster = "insurance", page_type = "comparison", mapping quiz/offer như spec).
  8. **Trả kết quả**
     - Nếu thành công → `{ ok: true, page: output }`.
     - Nếu thất bại (timeout, parse, validate) → `{ ok: false, reason: "LLM_FAILED" | "TIMEOUT" }`.

### 13.4 API Route /api/comparison/[slug]

- Tạo/hoàn thiện route: `src/app/api/comparison/[slug]/route.ts`.
- Logic:
  - Parse `params.slug` → tách 2 breed:
    - Ví dụ `golden-retriever-vs-labrador` → `["golden-retriever", "labrador"]`.
    - Nếu không parse được → 400.
  - Gọi `ensureComparisonPage({ leftBreedSlug, rightBreedSlug, contextFromQuery })`:
    - `contextFromQuery` có thể bao gồm `primary_concern`, `user_profile` đọc từ querystring.
  - Nếu `{ ok: true, page }`:
    - Return JSON 200:
      - `{ slug, meta, h1, hero, sections, verdict, summary_table, quick_answers, faq, cta }` (đúng schema `ComparisonPage`).
  - Nếu `{ ok: false }`:
    - Nếu `reason = "INVALID_PAIR" | "MODE_OFF" | "LIMIT_REACHED"` → trả 404 hoặc 409 kèm JSON:
      - `{ "status": "unavailable", "reason": "INVALID_PAIR" }`
    - Nếu `reason = "LLM_FAILED" | "TIMEOUT"` → trả 202:
      - `{ "status": "pending", "reason": "LLM_FAILED" }`
  - Thêm header cache cơ bản:
    - `Cache-Control: s-maxage=60, stale-while-revalidate=600`.

### 13.5 UI /compare – Breed Selector + Custom Concern

- Tạo/hoàn thiện route: `src/app/compare/page.tsx`.
- UI requirements:
  - Hai dropdown chọn breed:
    - Breed 1 và Breed 2.
    - Options lấy từ `getBreeds()` (sorted theo tên hiển thị).
    - Không cho chọn cùng 1 breed ở 2 dropdown.
  - Optional select `primary_concern`:
    - Options gợi ý:
      - `"apartment_living", "family_with_kids", "busy_worker", "health_costs", "low_maintenance", "active_outdoor"`.
    - Gắn vào query khi redirect.
  - Optional text input:
    - "Or type two breed names".
  - Logic: cố map text input về slug trong `breeds.json` (case-insensitive, fuzzy basic).
    - Nếu map fail → show validation message, không redirect.
  - Nút "Compare breeds":
    - On submit:
      - Tạo canonical slug từ 2 breed đã chọn.
      - Redirect: `/compare/{canonicalSlug}?primary_concern=...&user_profile=....`
  - Nếu query `pending=1` tồn tại:
    - Hiển thị notification:
      - Ví dụ: "We're preparing this comparison in the background. Please check back in a bit.".

### 13.6 UI /compare/[slug] – Loading + Fallback UX

- Tạo/hoàn thiện route: `src/app/compare/[slug]/page.tsx`.
- Logic:
  - Server component:
    - Gọi `fetch("/api/comparison/[slug]")` (hoặc dùng loader nội bộ).
  - Nếu 200 + JSON page:
    - Render đầy đủ:
      - meta, h1
      - hero (short summary & verdict)
      - summary table (key metrics: family_with_kids, apartment_score, energy, cost, health risks…)
      - sections chi tiết theo `ComparisonPage`.
      - CTA block dựa trên `resolvePageCTAs` với `page_type = "comparison"` (cluster = "insurance", email capture).
  - Nếu 202 + `{ status: "pending" }`:
    - Redirect về `/compare?pending=1` hoặc:
    - Render message inline:
      - "We couldn't generate this comparison right now. We've saved your request – please check back later."
    - Show links:
      - `/breeds/{leftBreedSlug}`
      - `/breeds/{rightBreedSlug}`
  - Nếu 404 / `status: "unavailable"`:
    - Hiển thị:
      - "We only support comparisons between breeds in our database."
    - Show link quay lại `/compare`.

### 13.7 Queue & Background Worker (Optional nhưng nên define)

- Tạo 1 cơ chế lưu request comparison bị pending:
  - File JSON đơn giản: `src/data/comparison_requests_pending.json`
  - hoặc table trong DB nếu có.
  - Mỗi entry: `{ left_breed_slug, right_breed_slug, context, requested_at }`.
- Trong `ensureComparisonPage`:
  - Nếu `reason = "LLM_FAILED" | "TIMEOUT"`:
    - Ghi entry vào queue pending để batch xử lý sau.
- Tạo script: `scripts/process-pending-comparisons.ts`:
  - Load list pending.
  - Gọi `ensureComparisonPage` cho từng item (dùng `callHybridLLM`).
  - Nếu success → remove khỏi pending.
  - Chạy script này theo cron (trên VPS) hoặc manual.

### 13.8 Telemetry & Cost Tracking

- Thêm simple logging (có thể chỉ là console + file log):
  - Số lần `callCloudLLM` vs `callLocalLLM`.
  - Số comparison auto generated per day.
  - Số lần `reason = "LIMIT_REACHED" / "MODE_OFF"`.
- Optional: tạo `scripts/usage-report.ts`:
  - Đọc log / DB và in ra:
    - Tổng pages generated.
    - Tỷ lệ cloud vs local.
    - Top 10 comparison slug được generate nhiều / truy cập nhiều.

---

## PHASE 14 – Internal Linking & Related Navigation (Breed Hubs)

**Mục tiêu:**
- Mỗi breed hoạt động như một “hub”: user có thể nhảy qua lại giữa breed / cost / problem / anxiety / comparison / location cho cùng 1 giống.
- Page mới generate (batch hoặc on-demand) tự động xuất hiện trong block “related”, không phải chỉnh tay.
- Internal link dựa trên index data, không hard-code trong JSON content.

### 14.1 Page Index Data Model

- Tạo file: `src/lib/internal-links.ts`.
- Tạo file data index: `src/data/page_index.json` (hoặc table DB nếu đã dùng Supabase; ở đây mặc định file JSON).
- Định nghĩa type `PageIndexEntry` trong `src/lib/types.ts`:
  ```typescript
  export type PageIndexEntry = {
    slug: string;           // "golden-retriever-cost-austin-texas"
    page_type: PageType;    // "breed" | "cost" | "problem" | "anxiety" | "comparison" | "location" | "list"
    breed_slugs: string[];  // ["golden-retriever"] hoặc ["golden-retriever","labrador"] cho comparison
    city_slug?: string | null;      // "austin-texas" cho cost/location
    problem_slug?: string | null;   // "separation-anxiety" cho problem/anxiety
    primary_intent: "informational" | "commercial_high" | "mixed";
    primary_cluster?: "insurance" | "training" | "cbd" | "generic" | null;
    title: string;          // h1 hoặc meta title rút gọn
    short_label: string;    // label ngắn để hiển thị trong list (vd: "Cost in Austin, TX")
  };
  ```
- Các script generate page (batch + on-demand) bắt buộc sau khi lưu JSON page phải:
  - Thêm/ cập nhật 1 `PageIndexEntry` tương ứng vào `page_index.json`.

### 14.2 Index Builder Script

- Tạo script: `scripts/build-page-index.ts`.
- Nhiệm vụ:
  - Scan toàn bộ `src/data/pages/**/**/*.json`.
  - Đọc từng page JSON, detect:
    - `page_type` (từ folder hoặc field).
    - `breed_slugs` (vd: từ `page.breed_slug`, `page.breeds[]`, hoặc slug parse).
    - `city_slug` (từ slug cho cost/location).
    - `problem_slug` (từ slug cho problem/anxiety).
    - `primary_cluster` (từ `PageMonetization` nếu có).
    - `title` = `page.h1` hoặc `page.meta.title`.
    - `short_label` = rule theo page_type (vd: cost = "Cost in {City}", problem = "Separation anxiety", comparison = "vs Labrador"…).
  - Ghi ra `src/data/page_index.json` dạng:
    ```json
    {
      "entries": [ /* PageIndexEntry[] */ ],
      "generated_at": "ISO_DATETIME"
    }
    ```
- Thêm vào flow:
  - Sau khi chạy `scripts/generate-pages.ts` → chạy `scripts/build-page-index.ts`.
  - Tùy chọn: thêm vào "build" pipeline hoặc thành 1 npm script riêng:
    - `"build:index": "ts-node scripts/build-page-index.ts"`.

### 14.3 Internal-Link Helper Functions

- Trong `src/lib/internal-links.ts`:
  - Tạo hàm load index:
    ```typescript
    export async function getPageIndex(): Promise<PageIndexEntry[]> {
      // đọc từ src/data/page_index.json
    }
    ```
  - Hàm cho “breed hub”:
    ```typescript
    export async function getPagesByBreed(
      breedSlug: string
    ): Promise<{
      breedPage?: PageIndexEntry;
      costPages: PageIndexEntry[];
      problemPages: PageIndexEntry[];
      anxietyPages: PageIndexEntry[];
      comparisonPages: PageIndexEntry[];
      locationPages: PageIndexEntry[];
      listPages: PageIndexEntry[];
    }>
    ```
    - Filter `PageIndexEntry` theo `breed_slugs.includes(breedSlug)`.
    - Group theo `page_type`.
    - Sort theo ưu tiên:
      - Cost: city quan trọng trước (NYC, LA, city user hay chọn).
      - Comparison: những pair phổ biến (config được).
  - Hàm cho “related trong context page hiện tại”:
    ```typescript
    export async function getRelatedForPage(params: {
      page_type: PageType;
      main_breed_slug: string;
      city_slug?: string | null;
      problem_slug?: string | null;
      limit_per_type?: number;
    }): Promise<{
      primary_links: PageIndexEntry[];   // 3–6 link quan trọng nhất
      secondary_links: PageIndexEntry[]; // phần còn lại (optional)
    }>
    ```
    - Rule gợi ý:
      - Từ breed page:
        - `primary_links`:
          - 1–2 cost page cho breed này.
          - 2–3 problem/anxiety page phổ biến.
          - 1–2 comparison page nổi bật.
      - Từ cost page:
        - `primary_links`:
          - breed page.
          - 1–2 cost page khác của cùng breed ở city khác.
          - 1–2 problem/anxiety page phổ biến cho breed.
      - Từ problem / anxiety:
        - breed page.
        - 1–2 cost page.
        - 1–2 comparison page nếu có.
      - Từ comparison:
        - 2 breed page (cả 2 giống).
        - 1–2 cost hoặc problem page for each breed.

### 14.4 UI Integration – “More About This Breed”

- Thêm block related cho mọi page_type (trừ trang home / misc):

#### 14.4.1 Breed Page /breeds/[slug]
- Trong component `BreedPageView`:
  - Gọi `getPagesByBreed(breedSlug)` / `getRelatedForPage`.
  - Render section:
    - Heading: "More about {Breed Name}"
    - 3 cột (hoặc danh sách):
      - Cost: “Cost to own a {Breed} in {City}”
      - Behavior & anxiety: Các problem/anxiety page quan trọng.
      - Comparisons: 2–3 comparison phổ biến.
  - Đảm bảo số link nội bộ tối thiểu: ≥ 5.

#### 14.4.2 Cost Page /cost/[slug]
- Trong `CostPageView`:
  - Section "More about {Breed Name}":
    - Link về: breed page.
    - 1–2 cost page city khác cho breed này.
    - 1–2 problem/anxiety page.
    - Optional: 1 comparison page.
  - Số link nội bộ tối thiểu: ≥ 4.

#### 14.4.3 Problem / Anxiety Page
- Trong `ProblemPageView` / `AnxietyPageView`:
  - Section "More help for {Breed Name}":
    - Breed page.
    - 1–2 cost page.
    - 1–2 related problems/anxiety khác cùng breed.
    - Optional: 1 comparison page.
  - Số link nội bộ tối thiểu: ≥ 4.

#### 14.4.4 Comparison Page /compare/[slug]
- Trong `ComparisonPageView`:
  - Section "Explore each breed in more detail":
    - Link tới 2 breed page.
    - Với mỗi breed:
      - 1 cost page nếu có.
      - 1 problem/anxiety page nếu có.
  - Số link nội bộ tối thiểu: ≥ 4.

#### 14.4.5 Location / List Pages
- Location `/locations/[city]/[breed]`:
  - Link về breed page.
  - Link tới 1–2 cost page của breed này.
  - Link tới 1 list page liên quan (vd “Best dogs for {City}”).
- List `/lists/[slug]`:
  - Mỗi breed trong list có:
    - Link tới breed page.
    - Optional: 1 link “view costs” (chọn city default như NYC hoặc city user đã chọn).

### 14.5 QA Rules – Internal Links

- Cập nhật `scripts/qa-check.ts`:
  - Thêm check internal links cho từng page JSON + component:
  - Với mỗi `page_type`:
    | page_type | min_internal_links |
    |---|---|
    | breed | 5 |
    | cost | 4 |
    | problem | 4 |
    | anxiety | 4 |
    | comparison | 4 |
    | location | 3 |
    | list | 3 |
  - Nếu `internalLinksCount < min_internal_links`:
    - Mark page `status = "needs_review"` trong QA report.
  - Đảm bảo:
    - Không có self-link (page link tới chính nó).
    - Link slug đều tồn tại trong `page_index.json`.
    - Không trỏ tới page đã bị noindex / bỏ publish nếu sau này có flag.

### 14.6 Behavior Khi Generate Page Mới

- Batch generate (`generate-pages.ts`):
  - Sau khi sinh JSON cho page mới (cost/problem/anxiety/location/comparison):
  - Gọi `updatePageIndexEntryForSlug(slug, page_type, meta)` trong `internal-links.ts`.
  - Đảm bảo entry mới xuất hiện trong `page_index.json`.
- On-demand comparison (`ensureComparisonPage`):
  - Sau khi save JSON:
  - Thêm/ cập nhật `PageIndexEntry` cho comparison mới.
  - Kết quả: mọi block “More about {Breed}” tự thấy được page mới mà không cần chạm vào content JSON cũ.

---

## PHASE 15 – Content Quality, SEO, Intent & Quiz Depth

**Mục tiêu:**
- Đảm bảo mọi page không chỉ đủ field mà còn chuẩn SEO / AEO, bám sát search intent người nuôi chó thật, phủ đủ keyword dài đuôi, và quiz đủ sâu để match từng tình trạng cụ thể.

### 15.1 On-page SEO – Meta, H1, Structure

- Tạo script `scripts/qa-seo.ts` (hoặc mở rộng `qa-check.ts`) để kiểm tra on-page SEO cho từng page JSON.
- Với mỗi page:
  - `meta.title`:
    - Độ dài 45–65 ký tự (không quá ngắn, không bị cắt).
    - Bắt buộc chứa:
      - Tên breed (nếu page liên quan breed).
      - Intent chính (“cost”, “problems”, “anxiety”, “comparison”, “best dogs for…”, v.v.).
    - Hạn chế lặp lại từ vô nghĩa (“guide, guide, guide…”).
  - `meta.description`:
    - Độ dài 120–170 ký tự.
    - Nêu rõ:
      - 1–2 lợi điểm chính.
      - 1–2 nỗi đau / rủi ro (cost, time, training).
    - Ngôn ngữ tự nhiên, không nhồi keyword thô.
  - `h1`:
    - Chứa tên breed và loại page (“Breed Guide”, “Cost Breakdown”, “Behavior Problems”, “Comparison”, “Best Dogs for {City}”).
    - Khác nhẹ so với `meta.title` (không copy y hệt).
  - Heading / sections:
    - Có cấu trúc rõ ràng: các key sections theo `page_type` (đã được define trong prompts).
    - Không có section rỗng hoặc chỉ 1 câu cho những section chính (personality, cost breakdown, training steps…).
  - Keyword tự nhiên:
    - Kiểm tra breed name xuất hiện ≥ 3 lần trong các đoạn chính (không tính quick_answers, FAQ).
    - Với cost/problem/anxiety pages: kiểm tra có xuất hiện các cụm như:
      - "cost", "price", "how much", "monthly", "per year" cho cost.
      - "training", "fix", "how to stop", "steps" cho problem/training.
      - "anxiety", "stress", "calm", "fear" cho anxiety.
    - Báo warning nếu content quá chung chung (ít từ khoá cụ thể cho context đó).

### 15.2 AEO & “AI Suggest” Readiness (Quick Answers, JSON API)

- Mở rộng QA để kiểm tra AEO readiness cho từng page, đảm bảo đúng “thức ăn cho AI”:
  - `quick_answers`:
    - Ít nhất 2–3 câu (nếu `page_type` high-intent như cost, problem, anxiety, comparison, location → ưu tiên 3–5).
    - Mỗi `quick_answer`:
      - question ngắn, rõ (≤ 120 ký tự).
      - answer 1–3 câu, không lan man.
      - Có số liệu nếu có: score, % risk, cost range, frequency (“2–3 walks per day”, “$X–Y per month”…).
    - Không nhồi nhét brand name; tập trung giải đáp câu hỏi.
  - `faq`:
    - Ít nhất 2 câu, ưu tiên 3–5 câu cho page high-intent.
    - Nội dung FAQ không trùng hoàn toàn với `quick_answers` (check similarity, flag nếu >85%).
  - JSON-LD:
    - Đảm bảo `faq` hoặc `quick_answers` được map sang `FAQPage` JSON-LD như PHASE 11.
    - QA check: mỗi page có ít nhất 1 block JSON-LD hợp lệ (không empty).
  - Public API:
    - Đảm bảo các endpoint `/api/breed`, `/api/costs`, `/api/problems`, `/api/lifestyle` trả về JSON đúng schema, không thiếu field quan trọng.
    - Check header:
      - `Access-Control-Allow-Origin: *`
      - `Cache-Control` (s-maxage + stale-while-revalidate).
    - QA script basic call 1–2 endpoint sample để validate JSON (optional).

### 15.3 Keyword Coverage & Intent Mapping (from Real Owners)

- Thêm file: `src/data/user_intents.json` – mô tả các search intent thực tế theo category:
  ```json
  {
    "apartment_living": {
      "sample_queries": [
        "best dogs for apartments",
        "can a golden retriever live in a small apartment",
        "quiet dog breeds for condos"
      ],
      "related_page_types": ["breed", "list", "comparison", "location"]
    },
    "family_with_kids": {
      "sample_queries": [
        "good family dogs with kids",
        "is [breed] good with children",
        "safest dog for toddlers"
      ],
      "related_page_types": ["breed", "comparison", "list"]
    },
    "budget_costs": {
      "sample_queries": [
        "how much does a [breed] cost per month",
        "can I afford a dog on [budget]",
        "unexpected vet bills for dogs"
      ],
      "related_page_types": ["cost", "breed", "location"]
    },
    "behavior_issues": {
      "sample_queries": [
        "how to stop [breed] barking",
        "separation anxiety in [breed]",
        "my dog is destructive when alone"
      ],
      "related_page_types": ["problem", "anxiety", "quiz"]
    }
  }
  ```
- Bổ sung trong `generate-page-matrix.ts` hoặc `PageMatrixItem` trường:
  ```typescript
  target_keywords: string[];
  primary_intent: "apartment_living" | "family_with_kids" | "budget_costs" | "behavior_issues" | "general_research" | ...
  ```
- Logic build `target_keywords`:
  - Từ slug + seed data:
    - Breed page: `["[breed] breed guide", "what is it like to own a [breed]"]`
    - Cost page: `["how much does a [breed] cost", "[breed] monthly cost", "vet bills for [breed]"]`
    - Problem: `["how to stop [breed] [problem]", "[breed] [problem] fix"]`
    - Anxiety: `["[breed] anxiety", "calming a nervous [breed]"]`
    - Comparison: `["[breed1] vs [breed2]", "which is better [breed1] or [breed2] for [intent]"]`
    - Location: `["best dogs for [city]", "is [breed] good for [city] climate"]`
- Mở rộng QA:
  - Check: trong nội dung page (meta + h1 + hero + sections):
    - Có xuất hiện ít nhất 2 keyword chính từ `target_keywords` (hoặc biến thể gần).
    - Không spam keyword (không > 5–7 lần trong 1.000 từ cho cùng một exact phrase).
  - Check intent alignment:
    - Nếu `primary_intent = "budget_costs"`:
      - Content phải có đoạn nói rõ: tổng chi phí 1st year vs recurring, ví dụ tình huống “nếu bạn có ngân sách ~X/tháng”.
    - Nếu `primary_intent = "apartment_living"`:
      - Phải nhắc tới diện tích, noise, hàng xóm, thang máy / đi vệ sinh ngoài trời, v.v.
    - Nếu `primary_intent = "behavior_issues"`:
      - Phải có mô tả hành vi đời thường (sủa, phá đồ, nhảy lên người, kéo dây…) + steps cụ thể.

### 15.4 Quiz Quality & Depth (Insurance, Behavior, Anxiety, Lifestyle)

- Dựa trên `quiz-types.ts` và PHASE 8 (insurance-fit, behavior-check, anxiety-level, lifestyle-match).
- Thêm script `scripts/qa-quiz.ts` để validate quiz JSON.
- Với mỗi quiz `QuizDefinition`:
  - Số lượng câu hỏi:
    - `insurance-fit`: tối thiểu 7–10 câu.
    - `behavior-check`: tối thiểu 8–12 câu.
    - `anxiety-level`: tối thiểu 7–10 câu.
    - `lifestyle-match`: tối thiểu 8–12 câu.
  - Coverage chiều sâu (behavior / anxiety):
    - `behavior-check` phải cover các chiều:
      - Tần suất (frequency) vấn đề.
      - Context (ở nhà vs ngoài đường vs gặp người lạ).
      - Duration (bao lâu rồi).
      - Owner effort (đã thử gì? training nào?).
      - Mức độ ảnh hưởng (hàng xóm, gia đình, an toàn…).
    - `anxiety-level` phải cover:
      - Triggers (tiếng ồn, ở một mình, khách lạ).
      - Symptom (run rẩy, phá đồ, sủa/huých cửa).
      - Recovery time (mất bao lâu để bình tĩnh lại).
      - Có dấu hiệu physical (run, chảy dãi, tiêu chảy…) → gợi ý vet (nhưng không tư vấn thuốc).
  - Mapping kết quả:
    - `QuizScoringRule` phải cover tất cả answer options, không có choice nào không dẫn tới result.
    - Mỗi quiz cần ít nhất 3 mức result:
      - Nhẹ / “you’re mostly fine” + tips đơn giản.
      - Vừa / “you’d benefit from structured training / planning”.
      - Nặng / “you should strongly consider pro help / insurance / vet check”.
    - Mỗi `QuizResult`:
      - `summary` mô tả tình trạng user bằng ngôn ngữ đời sống, không chung chung.
      - `recommendations`:
        - 3–5 bullet actionable.
        - CTA khớp cluster (insurance / training / CBD / lifestyle).
  - QA match quiz → page:
    - Với từng page high-intent (cost/problem/anxiety/comparison):
      - `PageMonetization` phải chỉ đúng quiz (insurance-fit cho cost, behavior-check cho problem, anxiety-level cho anxiety…).
    - QA check: ít nhất 1 quiz gắn với page thông qua CTA config.

### 15.5 Realism & “No Fluff” Content Check

- Dựa trên `SYSTEM_PROMPT_PETMATCHR_V4` (đã yêu cầu: practical, opinionated, không fluff).
- Trong `qa-seo.ts` (hoặc file riêng `qa-content-style.ts`), thêm vài heuristic:
  - Độ dài tối thiểu:
    - Mỗi section chính (personality, energy, training, family, apartment, time_and_cost…):
      - ít nhất 2 đoạn (paragraphs) với ≥ 40 ký tự / đoạn.
    - Tổng số từ toàn page ≥ 600–800 cho page info, ≥ 900–1200 cho page phức tạp như cost / problem / comparison.
  - Opinionated:
    - Kiểm tra `callouts.good_fit_if` và `callouts.avoid_if` (đối với breed / problem / comparison page):
      - Mỗi mảng có ít nhất 3–5 bullet thực tế, không chung chung kiểu “if you love dogs”.
    - Flag nếu quá nhiều câu generic (“if you want a dog who is loving and loyal”).
  - Concrete details:
    - Search trong content:
      - Có nhắc tới ví dụ đời thực: "after work", "weekends", "small apartment", "backyard", "kids", "neighbors", "crate", "leash", "walks", "toys", "mental stimulation"…
    - Flag page nào ít từ gợi cảnh thực tế → candidate để regenerate / refine.
  - Không medical advice chi tiết:
    - QA scan blacklist: tên thuốc phổ biến, “mg”, “dosage”, “once a day”…
    - → nếu xuất hiện thì flag vi phạm rule health.

### 15.6 Reports & Sampling

- `qa-seo.ts`, `qa-quiz.ts`, `qa-content-style.ts` output ra:
  - `seo-report.json`
  - `quiz-report.json`
  - `content-style-report.json`
- Mỗi report chứa:
  ```json
  {
    "summary": {
      "pages_checked": 2500,
      "pages_passed": 2100,
      "pages_failed": 400
    },
    "items": [
      {
        "slug": "golden-retriever-cost-nyc",
        "page_type": "cost",
        "issues": ["META_DESCRIPTION_TOO_SHORT", "MISSING_COST_KEYWORDS"]
      }
    ]
  }
  ```
- Thêm npm scripts:
  - `"qa:seo": "ts-node scripts/qa-seo.ts"`
  - `"qa:quiz": "ts-node scripts/qa-quiz.ts"`
  - `"qa:content": "ts-node scripts/qa-content-style.ts"`
- Trong `README.md` thêm mục “Content Quality Pipeline”:
  - Chạy định kỳ:
    - `npm run qa` (base structure)
    - `npm run qa:seo`
    - `npm run qa:quiz`
    - `npm run qa:content`

---

## PHASE 16 – Lifestyle Match Flow, Persona Guides & Tools

**Mục tiêu:**
- Biến lifestyle-match quiz thành front-door experience: Quick Profile → Deep Dive → Result profile + top matches.
- Tạo 1 lớp persona guides (reuse ListPage) cho các tình huống phổ biến.
- Implement 1–2 tools (Dog Cost Calculator / Breed Cost Comparison) để tăng trust + AEO + conversion.

### 16.1 Lifestyle-Match Quiz = 2 Phase + Persona Profile

- Update `src/data/quizzes/lifestyle-match.json` để:
  - Có Phase 1: Quick Profile (5–7 câu):
    - Nhà ở: apartment nhỏ/lớn, nhà có sân, rural.
    - Công việc: remote, 8–10h/day, hay công tác, linh hoạt.
    - Gia đình: alone, couple, trẻ <5, trẻ 6–12, người già.
    - Lối sống hoạt động: ít, vừa, rất active.
    - Budget/tháng: <200, 200–400, 400–600, >600.
    - Kinh nghiệm nuôi: first-time, 1–3 năm, >3 năm.
    - Chịu đựng tiếng ồn: thấp, trung bình, cao.
  - Có Phase 2: Deep Dive (8–12 câu):
    - Trẻ em & chó (hiền lành, vui nhộn, không có trẻ).
    - Thú cưng khác (mèo/chó khác).
    - Mức độ shedding mong muốn.
    - Mức grooming chấp nhận được.
    - Mục đích nuôi (buddy, vận động, bảo vệ,…).
    - Mức độ độc lập mong muốn (chó tự lập vs cần attention).
    - Sẵn sàng thuê dog walker/daycare không.
- Trong `QuizDefinition.result_mapping` thêm field:
  ```typescript
  type QuizResultBucket = {
    slug: string;
    title: string;               // "Apartment worker, first-time owner, budget-conscious"
    description: string;         // 2–4 câu tóm profile
    persona_keywords: string[];  // ["apartment", "first_time", "budget_200_400"]
    // các field khác giữ nguyên
  }
  ```
- Tạo helper `matchBreedsForPersona`:
  ```typescript
  // FILE: src/lib/lifestyle-match.ts
  export function matchBreedsForPersona(input: {
    answers: Record<string, string>;
    breeds: Breed[];
    lifestyleScores: LifestyleScore[];
  }): {
    profile_label: string;          // từ QuizResultBucket.title
    top_matches: {
      breed_slug: string;
      match_score: number;          // 0–100
      explanation_bullets: string[]; // 3–5 bullet short
      key_traits: {
        energy: string;
        apartment_friendly: number;
        kid_friendly: number;
        shedding: "low" | "medium" | "high";
        monthly_cost_range: [number, number];
      };
    }[];
  }
  ```
- Logic:
  - Dùng `LifestyleScore` + traits (size, shedding, energy, trainability, kid_friendly, cost_level…) để tính điểm.
  - Map thêm điều kiện từ persona (budget, first-time, apartment,…).
- Route `/quiz/lifestyle-match`:
  - UI multi-step:
    - Step 1: Quick Profile.
    - Step 2: Deep Dive (optional, “Skip for now”).
  - Submit → gọi `matchBreedsForPersona` → hiển thị Results Page:
    - Header “Your Dog Match Profile” + profile label.
    - Top 3–5 breeds:
      - Tên breed + % match.
      - Bullet giải thích giống format trong doc.
    - Comparison table 3 cột (giống sample).
    - CTA:
      - `[Read full guide: {Breed} for {persona}]`
      - `[View cost breakdown for {Breed}]`
      - `[Compare insurance plans]`
  - Gắn tracking event (Plausible / analytics hook) cho:
    - `quiz_completed`,
    - `breed_clicked`,
    - `calculator_clicked`.

### 16.2 Persona Lifestyle Guides (reuse ListPage)

- Define 5–10 persona slug trong `pageMatrix` cho `ListPage`:
  - Ví dụ:
    - `/guides/apartment-first-time-owner`
    - `/guides/busy-professional-small-apartment`
    - `/guides/family-with-young-kids`
    - `/guides/senior-owner-low-energy-dog`
    - `/guides-active-outdoor-couple`
- Mở rộng `ListPage` JSON type (nếu cần):
  ```typescript
  type ListPage = {
    meta;
    h1;
    persona_profile?: {
      title: string;   // "Apartment dweller, first-time owner"
      bullets: string[]; // situation: diện tích, job, budget, kinh nghiệm
    };
    mistakes_section?: { title; bullets: string[] };
    action_plan_30_days?: { weeks: { title; bullets: string[] }[] };
    tools_block?: { tools: { label; slug }[] }; // "Dog cost calculator", "Insurance guide",…
    // existing fields: hero, list of breeds, FAQ, quick_answers…
  }
  ```
- Update `LIST_PAGE_PROMPT` trong `scripts/prompts.ts` (hoặc ít nhất note trong spec) để LLM sinh đủ các section này.
- Trong `generate-page-matrix.ts`:
  - Thêm items `page_type = "list"` cho từng persona, input:
    ```json
    {
      "persona_slug": "apartment-first-time-owner",
      "situation": {
        "square_feet": "500-800",
        "work_pattern": "8-10h/day office",
        "budget_per_month": 250-400,
        "experience": "first_time"
      },
      "target_keywords": [
        "best dogs for apartments first time owner",
        "apartment dog breeds beginner friendly"
      ]
    }
    ```
- UI route `/guides/[slug]`:
  - Nếu slug thuộc “persona list” → render bằng `ListPageView` nhưng show thêm:
    - `persona_profile` block.
    - `mistakes_section`, `action_plan_30_days`, `tools_block`.

### 16.3 Tool Layer – Dog Cost Calculator

- Tạo route `src/app/tools/cost-calculator/page.tsx`.
- Logic:
  - Form inputs:
    - Breed (dropdown từ `breeds.json`).
    - City (dropdown từ `cities.json`).
    - Monthly budget (slider/input).
    - Checkbox: include insurance?, hire dog walker? (frequency).
  - Khi submit:
    - Load `CostModel` + City + avg vet cost.
    - Tính:
      - `monthly_cost = food + vet + grooming + insurance? + walker? + supplies;`
      - `year1_cost = monthly_cost * 12 + one_time_setup;`
    - So sánh với budget:
      - Status: “within budget”, “stretch”, “not realistic”.
  - Hiển thị bảng breakdown giống sample (Monthly vs Annual).
  - CTA:
    - Link sang cost page cho breed + city.
    - Link sang insurance quiz.
    - Link sang relevant list/guide.
- Optional: `src/app/tools/breed-cost-comparison/page.tsx`:
  - Cho chọn 2–3 breed + 1 city → render bảng so sánh cost, emergency risk, insurance benefit.
  - Không cần LLM ở đây, chỉ dùng data JSON → không tốn token.

### 16.4 Kết nối với funnels & AEO

- Đảm bảo:
  - Result page của `lifestyle-match`:
    - Link tới breed pages + persona guides + tools.
    - Gắn CTA quiz/offer theo `PageMonetization`.
  - Persona guides:
    - Link tới:
      - Dog cost calculator.
      - Insurance guide (cost/anxiety pages).
      - Matching breeds (breed pages).
  - Tools:
    - Nhúng FAQ + `quick_answers` riêng (dạng “Costs”) để AEO có thể trích tool.
- QA:
  - Thêm rules trong PHASE 15 (was 16):
    - `lifestyle-match` result page phải show ≥ 3 breed match + comparison table.
    - Persona guides phải có:
      - `persona_profile`.
      - ≥ 3 breed entries.
      - `Mistakes` + `Action Plan` sections.
-------
PHASE 17 – Lifestyle Match Flow, Persona Guides & Tools
Mục tiêu:
Biến lifestyle-match quiz thành front-door experience: Quick Profile → Deep Dive → Result profile + top matches.
Tạo 1 lớp persona guides (reuse ListPage) cho các tình huống phổ biến.
Implement 1–2 tools (Dog Cost Calculator / Breed Cost Comparison) để tăng trust + AEO + conversion.
17.1 Lifestyle-Match Quiz = 2 Phase + Persona Profile
 Update src/data/quizzes/lifestyle-match.json để:
 Có Phase 1: Quick Profile (5–7 câu):
 Nhà ở: apartment nhỏ/lớn, nhà có sân, rural.
Công việc: remote, 8–10h/day, hay công tác, linh hoạt.
Gia đình: alone, couple, trẻ <5, trẻ 6–12, người già.
Lối sống hoạt động: ít, vừa, rất active.
Budget/tháng: <200, 200–400, 400–600, >600.
Kinh nghiệm nuôi: first-time, 1–3 năm, >3 năm.
Chịu đựng tiếng ồn: thấp, trung bình, cao.
 Có Phase 2: Deep Dive (8–12 câu):
 Trẻ em & chó (hiền lành, vui nhộn, không có trẻ).
Thú cưng khác (mèo/chó khác).
Mức độ shedding mong muốn.
Mức grooming chấp nhận được.
Mục đích nuôi (buddy, vận động, bảo vệ,…).
Mức độ độc lập mong muốn (chó tự lập vs cần attention).
Sẵn sàng thuê dog walker/daycare không.
 Trong QuizDefinition.result_mapping thêm field:
 type QuizResultBucket = {
  slug: string;
  title: string;               // "Apartment worker, first-time owner, budget-conscious"
  description: string;         // 2–4 câu tóm profile
  persona_keywords: string[];  // ["apartment", "first_time", "budget_200_400"]
  // các field khác giữ nguyên
  }
 Tạo helper matchBreedsForPersona:
 // FILE: src/lib/lifestyle-match.ts
export function matchBreedsForPersona(input: {
  answers: Record<string, string>;
  breeds: Breed[];
  lifestyleScores: LifestyleScore[];
  }): {
  profile_label: string;          // từ QuizResultBucket.title
  top_matches: {
    breed_slug: string;
    match_score: number;          // 0–100
    explanation_bullets: string[]; // 3–5 bullet short
    key_traits: {
      energy: string;
      apartment_friendly: number;
      kid_friendly: number;
      shedding: "low" | "medium" | "high";
      monthly_cost_range: [number, number];
    };
  }[];
  }
 Logic:
 Dùng LifestyleScore + traits (size, shedding, energy, trainability, kid_friendly, cost_level…) để tính điểm.
Map thêm điều kiện từ persona (budget, first-time, apartment,…).
 Route /quiz/lifestyle-match:
 UI multi-step:
 Step 1: Quick Profile.
Step 2: Deep Dive (optional, “Skip for now”).
 Submit → gọi matchBreedsForPersona → hiển thị Results Page:
 Header “Your Dog Match Profile” + profile label.
 Top 3–5 breeds:
 Tên breed + % match.
Bullet giải thích giống format trong doc.
 Comparison table 3 cột (giống sample).
 CTA:
 [Read full guide: {Breed} for {persona}]
[View cost breakdown for {Breed}]
[Compare insurance plans]
 Gắn tracking event (Plausible / analytics hook) cho:
 quiz_completed,
breed_clicked,
calculator_clicked.
17.2 Persona Lifestyle Guides (reuse ListPage)
 Define 5–10 persona slug trong pageMatrix cho ListPage:
 Ví dụ:
/guides/apartment-first-time-owner
/guides/busy-professional-small-apartment
/guides/family-with-young-kids
/guides/senior-owner-low-energy-dog
/guides-active-outdoor-couple
 Mở rộng ListPage JSON type (nếu cần):
 type ListPage = {
  meta;
  h1;
  persona_profile?: {
    title: string;   // "Apartment dweller, first-time owner"
    bullets: string[]; // situation: diện tích, job, budget, kinh nghiệm
  };
  mistakes_section?: { title; bullets: string[] };
  action_plan_30_days?: { weeks: { title; bullets: string[] }[] };
  tools_block?: { tools: { label; slug }[] }; // "Dog cost calculator", "Insurance guide",…
  // existing fields: hero, list of breeds, FAQ, quick_answers…
  }
 Update LIST_PAGE_PROMPT trong scripts/prompts.ts (hoặc ít nhất note trong spec) để LLM sinh đủ các section này.
 Trong generate-page-matrix.ts:
 Thêm items page_type = "list" cho từng persona, input:
 {
  "persona_slug": "apartment-first-time-owner",
  "situation": {
    "square_feet": "500-800",
    "work_pattern": "8-10h/day office",
    "budget_per_month": 250-400,
    "experience": "first_time"
  },
  "target_keywords": [
    "best dogs for apartments first time owner",
    "apartment dog breeds beginner friendly"
  ]
  }
 UI route /guides/[slug]:
 Nếu slug thuộc “persona list” → render bằng ListPageView nhưng show thêm:
 persona_profile block.
mistakes_section, action_plan_30_days, tools_block.
17.3 Tool Layer – Dog Cost Calculator
 Tạo route src/app/tools/cost-calculator/page.tsx.
 Logic:
 Form inputs:
 Breed (dropdown từ breeds.json).
City (dropdown từ cities.json).
Monthly budget (slider/input).
Checkbox: include insurance?, hire dog walker? (frequency).
 Khi submit:
 Load CostModel + City + avg vet cost.
Tính:
monthly_cost = food + vet + grooming + insurance? + walker? + supplies;
year1_cost = monthly_cost * 12 + one_time_setup;
So sánh với budget:
Status: “within budget”, “stretch”, “not realistic”.
 Hiển thị bảng breakdown giống sample (Monthly vs Annual).
 CTA:
 Link sang cost page cho breed + city.
Link sang insurance quiz.
Link sang relevant list/guide.
 Optional: src/app/tools/breed-cost-comparison/page.tsx:
 Cho chọn 2–3 breed + 1 city → render bảng so sánh cost, emergency risk, insurance benefit.
 Không cần LLM ở đây, chỉ dùng data JSON → không tốn token.
 17.4 Kết nối với funnels & AEO
 Đảm bảo:
 Result page của lifestyle-match:
 Link tới breed pages + persona guides + tools.
Gắn CTA quiz/offer theo PageMonetization.
 Persona guides:
 Link tới:
Dog cost calculator.
Insurance guide (cost/anxiety pages).
Matching breeds (breed pages).
 Tools:
 Nhúng FAQ + quick_answers riêng (dạng “Costs”) để AEO có thể trích tool.
 QA:
 Thêm rules trong PHASE 16:
 lifestyle-match result page phải show ≥ 3 breed match + comparison table.
Persona guides phải có:
persona_profile.
≥ 3 breed entries.
Mistakes + Action Plan sections.

-------
PHASE 17 – SEO KEYWORD + OUTLINE ENGINE + FULL CONTENT REGEN (V7)
Mục tiêu:
Dùng keyword list đã nghiên cứu làm nguồn chính cho SEO (không để LLM tự bịa keyword).
Map keyword → post type → outline → từng slot trong nội dung.
Re-generate toàn bộ content cho các page hiện có theo outline mới (V7) + cảm xúc + case study + product block (print-on-demand, offer).
Schema & hệ thống phải sẵn sàng scale lên nhiều outline type (vd 16) trong tương lai.
17.1 – Master Keyword Source (Keyword Map)
AI phải:
 Tạo 1 nguồn dữ liệu keyword trung tâm, ví dụ:
 src/data_v7/keywords/master_keywords.json
hoặc src/data_v7/keywords/master_keywords.csv (nếu dễ xử lý hơn).
 Mỗi keyword entry phải có tối thiểu các field:
 {
  "keyword": string,
  "intent_type": "breed_core" | "breed_modifier" | "list_lifestyle" | "comparison" | "cost" | "problem_behavior" | "anxiety" | "location" | "generic_info",
  "page_type_target": "breed" | "list" | "comparison" | "cost" | "problem" | "anxiety" | "location",
  "entity_1": string | null,   // breed_name / city_name / problem_name...
  "entity_2": string | null,   // breed B cho comparison / city cho cost...
  "role": "primary" | "secondary" | "faq" | "quick_answer" | "internal_anchor",
  "priority": "A" | "B" | "C",
  "status": "planned" | "generated" | "live" | "needs_update"
  }
 Viết helper trong src/lib/seo-keywords.ts để:
 Load master keyword list.
 Lọc keyword theo page_type_target, entity_1/2.
 Trả về:
 type PageKeywordBundle = {
  primary_keyword: string | null;
  secondary_keywords: string[];
  faq_keywords: string[];
  quick_answer_keywords: string[];
  internal_anchor_keywords: string[];
  };
17.2 – Keyword → Page Matrix Mapping (with Fallback)

AI phải cập nhật generator:

 Update scripts/generate-page-matrix.ts (hoặc file tương đương) để:

 Khi build mỗi item trong pageMatrix.json, luôn cố gắng lấy keyword từ seo-keywords.ts (master list).

 Với mỗi page_type + slug (vd breed/golden-retriever), object trong pageMatrix phải có:

{
  page_type: "breed" | "list" | "comparison" | "cost" | "problem" | "anxiety" | "location",
  slug: string,
  keywords: PageKeywordBundle,   // xem 17.1
  // các field khác: input_data, cluster, intent...
}


 Hành vi khi tìm keyword:

Bước 1 – Lookup trong master keyword list

 Gọi helper getKeywordsForPage(page_type, entity_1, entity_2) để lấy PageKeywordBundle.

 Nếu tìm được:

 Dùng bundle này (primary / secondary / faq / quick_answer / internal_anchor) cho page đó.

Bước 2 – Fallback (KHÔNG tìm thấy trong master list)

 Log warning vào console/log file kiểu:

"Missing SEO keywords in master list for ${page_type}/${slug}, using fallback template."

 KHÔNG gọi LLM để nghĩ keyword mới.

 Thay vào đó, gọi hàm fallback thuần code:

import { getFallbackKeywordsForPage } from "@/lib/seo-keywords";

const keywords =
  getKeywordsForPage(...)  // từ master
  ?? getFallbackKeywordsForPage(page_type, entity_1, entity_2);


 getFallbackKeywordsForPage phải dùng template cố định dựa trên entity (breed_name / city / problem_name), ví dụ:

Breed page:

primary: "${breed_name} dog breed", "${breed_name} dog breed guide"

secondary: "${breed_name} temperament", "${breed_name} good with kids", "${breed_name} apartment dog", "${breed_name} pros and cons", …

Cost page:

primary: "${breed_name} cost", "${breed_name} cost breakdown"

secondary: "how much does a ${breed_name} cost", "${breed_name} monthly cost", "${breed_name} vet bills", …

Comparison page:

primary: "${breedA} vs ${breedB}"

secondary: "${breedA} vs ${breedB} for families", "difference between ${breedA} and ${breedB}", …

Problem / Anxiety / Location: theo template đã define ở Phase 17 (keyword playbook).

 Tức là: fallback keywords = pattern code, không phải AI “tự bịa”.

Mọi keyword fallback đều được generate bằng string template dựa trên dữ liệu entity hiện có.

 Quy tắc cuối cùng:

 Ưu tiên dùng keyword trong master list để bám sát research thật.

 Nếu thiếu trong master list:

 Log warning (để sau này thêm vào master).

 Dùng fallback template từ getFallbackKeywordsForPage.

 Tuyệt đối không gọi LLM hay bất kỳ API nào để “suggest keyword” ngoài 2 nguồn:

Master keyword list

Fallback template thuần code

17.2.1 – Fallback Keyword Bundle cho Breed Content Outline

Riêng với breed page, AI phải đảm bảo:

 Luôn có ít nhất một bộ fallback keyword cho mỗi breed, kể cả khi master list trống:

function getBreedFallbackKeywords(breedName: string): PageKeywordBundle {
  const base = breedName;
  return {
    primary_keyword: `${base} dog breed`,
    secondary_keywords: [
      `${base} dog breed guide`,
      `${base} temperament and personality`,
      `is ${base} good with kids`,
      `${base} apartment dog`,
      `${base} grooming and shedding`,
      `${base} pros and cons`,
    ],
    faq_keywords: [
      `is ${base} good with families`,
      `are ${base} good apartment dogs`,
      `how much exercise does a ${base} need`,
    ],
    quick_answer_keywords: [
      `${base} size and energy level`,
      `${base} health issues`,
    ],
    internal_anchor_keywords: [
      `${base} cost`,
      `${base} health problems`,
      `${base} training tips`,
    ],
  };
}
 Hàm getFallbackKeywordsForPage phải gọi getBreedFallbackKeywords khi page_type === "breed".
 Như vậy, mọi content outline cho từng breed luôn có sẵn một list SEO keyword tối thiểu để sinh content, ngay cả khi master list chưa được nhập đầy đủ.

 17.3 – V7 Outline Schema (Future-proof lên N outline type)
AI phải:
 Định nghĩa 1 base schema cho page trong src/lib/types.ts:
 export type V7PageType =
  | "breed"
  | "list"
  | "comparison"
  | "cost"
  | "problem"
  | "anxiety"
  | "location"
  // future (để scale lên 16+ loại):
  | "tool"
  | "guide"
  | "story"
  | "faq_cluster"
  | "product_collection"
  | "newsletter_landing"
  | "case_study"
  | "brand_page";
 Tạo BaseV7Page:
 export interface BaseV7Page {
  page_type: V7PageType;
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  // Tối thiểu 1 đoạn intro unified:
  intro: {
    short_hook: string;
    context?: string;
  };
  faq: { question: string; answer: string }[];
  quick_answers: {
    question: string;
    answer: string;
    category: "Living" | "Costs" | "Health" | "Training";
  }[];
  product_blocks: ProductBlock[];           // thêm để gắn print-on-demand & offer
  internal_link_suggestions: InternalLinkSuggestion[];
  content_version: number;
  last_generated_at: string; // ISO date
  last_refreshed_at?: string; // cho Phase 18
  }
 Định nghĩa ProductBlock để chuẩn bị cho POD / affiliate:
 export interface ProductBlock {
  id: string;
  placement: "mid_content" | "end_content" | "sidebar_hint";
  headline: string;
  description: string;
  product_type: "print_on_demand" | "digital" | "course" | "affiliate" | "generic";
  // semantically describe product, không cần URL:
  angle: "gift" | "self_treat" | "practical_tool" | "memorial" | "funny";
  // cho POD dog:
  dog_breed_slug?: string | null;
  dog_theme?: "love" | "memory" | "funny" | "training" | "anxiety_support" | null;
  cta_text: string;
  }
 InternalLinkSuggestion giữ như V7 plan, nhưng future-proof:
 export interface InternalLinkSuggestion {
  reason: string;
  anchor_text: string;
  target_type: V7PageType;
  target_slug_hint?: string;
  }
 Mỗi outline cụ thể (BreedV7Page, CostV7Page…) extend từ BaseV7Page để sau này thêm outline type mới không phá hệ cũ.
 17.4 – Content Outline per Post Type (có Case Study + Product)
AI phải đảm bảo prompt + schema của từng post type V7:
 Breed:
 Block “Real story / case study”:
 1–2 đoạn kể 1 tình huống thật/giả định kiểu: “A busy nurse in Chicago adopted a Golden Retriever…”
Phải chạm cảm xúc: mệt mỏi, vui, bất ngờ, regret, relief.
 Block “Products & gifts for {breed} lovers”:
 Dùng product_blocks để đề xuất:
Print-on-demand (áo, mug, poster, blanket) theo theme: “I love my Golden Retriever”, memorial, funny quote.
 Hướng nội dung:
 Cover đầy đủ primary/secondary keyword.
Rất rõ “ai nên nuôi / ai không nên”.
 List / Lifestyle:
 Block “Mini case study”:
 1–2 persona (busy worker, family với 2 con nhỏ…) → mỗi persona matched với 1–2 breed.
 Block “Gift ideas / products”:
 POD idea cho người thuộc lifestyle đó (in hình breed + câu quote…).
 Comparison:
 “Real decision story”:
 1 đoạn kể một người đang phân vân A vs B → cuối cùng chọn 1 bên → vì sao.
 Product block:
 Suggest merch neutral (“Any {breed A}/{breed B} parent would love…”).
 Cost:
 Case “unexpected cost”:
 Ví dụ chấn thương, emergency vet, insurance giúp/không giúp.
 Product:
 POD nhắc tiết kiệm, kế hoạch chi phí (planner, sweatshirt “I work to pay vet bills”,…).
 Problem / Anxiety:
 Case “before/after”:
 Dog phá nhà vì anxiety, chủ burn out, sau đó đi training / dùng routine, dần ổn.
 Product:
 Calming merch, cozy blanket, áo “Anxious dog club”, đồ cho chủ giảm stress.
 Location:
 Case “moving city with dog”:
 Ai đó chuyển tới city và shock cost / dog-park culture.
 Product:
 Merch theo city + dog (mug, tee: “Dog mom in Austin TX”).
Quan trọng:
 Prompt V7 cho từng page_type phải có section clear:
 “Use at least ONE short emotional case study or real-life style story.”
“Fill product_blocks with 1–3 relevant product ideas (print_on_demand, digital, course, affiliate), DO NOT invent prices or URLs.”
17.5 – Full Regeneration (Replace All Old Content)
AI phải:
 Viết script mới: scripts/regenerate_all_pages_v7.ts:
 Đọc toàn bộ pageMatrix.json (đã gắn keyword bundle).
 Với mỗi item:
 Chọn PAGE_PROMPT_V7 tương ứng.
 Gửi vào LLM:
 page_type, slug
keywords bundle
entity data (breed/city/problem/…)
flag mode: "regenerate_full"
 Parse JSON → validate với type V7.
 Ghi file vào src/data_v7/pages/<page_type>/<slug>.json.
 Gán content_version = 1, last_generated_at = now ISO.
 Không sử dụng bất kỳ text cũ nào trong V1 trừ khi cần context đặc biệt.
 Toàn bộ pages đang ở schema cũ được coi là “legacy”; route FE sẽ dần switch sang V7 khi ổn định.
 17.6 – Chuẩn bị Scale lên 16+ Outline Types
AI phải:
 Thiết kế hệ thống type + loader + prompts sao cho:
 Thêm mới 1 outline type chỉ cần:
 Thêm vào V7PageType union.
Tạo 1 interface mới extend BaseV7Page.
Tạo 1 PAGE_PROMPT mới.
Register trong:
LLM prompt map
generator map (pageMatrix)
FE component map.
 Tạo 1 “registry”:
 interface PageTypeDefinition {
  page_type: V7PageType;
  has_products: boolean;
  has_quick_answers: boolean;
  supports_case_study: boolean;
  }
export const V7_PAGE_TYPE_DEFS: PageTypeDefinition[] = [ ... ];
 Generator & QA sử dụng registry này → không cần switch-case khắp nơi.

--------------

PHASE 18 – PERIODIC CONTENT REFRESH (ALWAYS-NEW PAGES)
Mục tiêu:
Nội dung không bị “cũ mèm”; luôn có lý do để Google và user quay lại.
Tự động chọn page cần update, refresh bằng LLM không phá URL và cấu trúc.
18.1 – Tracking & Metadata
AI phải:
 Trong mỗi V7 page JSON, luôn lưu:
 content_version: number;
last_generated_at: string; // ISO
last_refreshed_at?: string; // lần refresh gần nhất
 Tạo src/data_v7/metrics/page_metrics.json (hoặc DB) với:
 {
  "slug": string;
  "page_type": V7PageType;
  "last_known_clicks": number;
  "last_known_impressions": number;
  "last_known_avg_position": number;
  "last_metrics_update_at": string; // ISO
  }
 Viết helper getPagesNeedingRefresh() trong src/lib/refresh-planner.ts với input:
 Age (ngày kể từ last_generated_at / last_refreshed_at).
Trend (drop về click/impression/position nếu có metrics).
18.2 – Refresh Criteria
AI phải thiết lập rule:
 Page nên được refresh nếu 1 trong các điều sau:
 > 6 tháng không update (last_refreshed_at hoặc last_generated_at > 180 ngày).
 Có traffic nhưng SERP tụt (vd position xấu hơn 30% so với 90 ngày trước).
 Keyword mới trong master list liên quan page này nhưng chưa được dùng (status keyword = planned).
 Pages từng có ranking tốt (priority A/B) được ưu tiên refresh hơn long-tail yếu.
 18.3 – Refresh Modes (Không phải lúc nào cũng rewrite full)
AI phải:
 Thiết kế 2 mode:
 mode: "light_refresh"
Update:
meta.title / meta.description tinh chỉnh nhỏ
intro (tối ưu intent)
thêm 1–2 FAQ mới từ keyword list mới
cập nhật product_blocks nếu angle cũ quá “lạc quẻ”
Không đụng cấu trúc lớn.
mode: "deep_refresh"
Re-generate sections chính (body content) giữ nguyên:
slug
page_type
overall schema shape
Giữ những phần nào vẫn tốt (vd case study nếu còn hợp).
Tăng content_version += 1.
 Quy tắc chọn mode:
 Nếu page < 6 tháng và chỉ bị thiếu vài keyword → light.
 Nếu page > 12 tháng, hoặc content không còn align intent → deep.
 18.4 – Refresh Script & Flow
AI phải:
 Tạo script scripts/refresh_pages_v7.ts:
 Input:
 Optional flag: --mode=light|deep
Optional filter: --page_type=..., --slug=..., --max=100
 Nếu không có filter:
 Gọi getPagesNeedingRefresh() để lấy danh sách ưu tiên.
 Với mỗi page:
 Load current V7 JSON.
 Load keyword bundle từ master keyword.
 Gọi LLM với prompt V7 tương ứng + flag refresh_mode.
 Merge output với JSON cũ theo mode:
 light: update meta/intro/faq/quick_answers/product_blocks.
deep: replace sections chính, giữ các field meta-level (slug, type).
 Cập nhật:
 last_refreshed_at = now
content_version += 1 (deep) hoặc +0.1 (light, nếu muốn granular).
 Đảm bảo script:
 Không đổi slug.
 Không đổi page_type.
 Không xoá fields bắt buộc trong schema.
 18.5 – QA Sau Refresh
AI phải:
 Mở rộng QA scripts (Phase 10) để có mode “post-refresh”:
 Check vẫn pass SEO rule:
 primary_keyword xuất hiện ở meta/h1/intro/FAQ.
 Check case study & product_blocks vẫn tồn tại (không bị LLM xoá sạch).
 Check content_version tăng đúng.
 Check không phát sinh field mới lạ ngoài schema.
 Nếu page fail QA:
 log vào refresh_failures.json với lý do.
 Không ghi đè file cũ (rollback).
 18.6 – Lịch Refresh Định Kỳ
AI không cần set cron trong repo, nhưng phải document:
 Đề xuất schedule:
 Monthly job:
 Refresh ưu tiên pages priority A/B mà > 6 tháng.
 Quarterly job:
 Audit và refresh các cluster quan trọng (insurance, training, anxiety).
 Ghi vào docs/REFRESH_STRATEGY.md:
 Cách chọn page.
 Cách chạy lệnh npm run refresh:v7 (alias cho script).
 Cách đọc log & handle failure.

 ----------
 PHASE 19

 ────────────────
Mục tiêu của content_matrix_management.json
────────────────
Vai trò:
Là “bảng điều khiển” toàn bộ content của site.
Mỗi dòng = 1 page (page_type + slug).
Biết rõ: đã generate chưa, đã publish chưa, lỗi chỗ nào, cần refresh hay không.
Không chứa text content, chỉ metadata + status.
Hệ thống có thể auto build lại file này từ folder input_data.
────────────────
2. Cấu trúc folder input_data
────────────────
Admin chỉ cần đụng vào các file trong đây.
Đề xuất:
input_data/
breeds.json
problems.json
comparisons.json
cities.json
generation_config.json
2.1. breeds.json
Danh sách breed và flag control.
Ví dụ:
[
{
"breed_slug": "golden-retriever",
"breed_name": "Golden Retriever",
"enabled": true,
"priority": "A", // A/B/C để ưu tiên generate
"generate": {
"breed_page": true,
"cost_pages": true,
"problem_pages": true,
"anxiety_pages": true,
"comparison_pairs": true
}
},
{
"breed_slug": "cavalier-king-charles-spaniel",
"breed_name": "Cavalier King Charles Spaniel",
"enabled": true,
"priority": "B",
"generate": {
"breed_page": true,
"cost_pages": false,
"problem_pages": true,
"anxiety_pages": true,
"comparison_pairs": true
}
}
]
2.2. problems.json
Các vấn đề behavior / health / anxiety mà ta muốn có page.
[
{
"problem_slug": "separation-anxiety",
"name": "Separation anxiety",
"category": "anxiety",
"page_type": "anxiety",
"applies_to_all_breeds": true,
"applies_to_breeds": [], // nếu chỉ vài breed
"priority": "A"
},
{
"problem_slug": "excessive-barking",
"name": "Excessive barking",
"category": "behavior",
"page_type": "problem",
"applies_to_all_breeds": false,
"applies_to_breeds": ["golden-retriever", "cavalier-king-charles-spaniel"],
"priority": "B"
}
]
2.3. comparisons.json
Cặp breed cần so sánh.
[
{
"comparison_slug": "golden-retriever-vs-labrador",
"breed_a_slug": "golden-retriever",
"breed_b_slug": "labrador-retriever",
"enabled": true,
"priority": "A"
},
{
"comparison_slug": "cavalier-vs-pug",
"breed_a_slug": "cavalier-king-charles-spaniel",
"breed_b_slug": "pug",
"enabled": true,
"priority": "B"
}
]
2.4. cities.json
Các city dùng cho cost / location.
[
{
"city_slug": "austin-tx",
"city_name": "Austin",
"state_code": "TX",
"enabled": true,
"generate_location_pages": true,
"generate_cost_pages_for_breeds": ["golden-retriever", "labrador-retriever"]
},
{
"city_slug": "new-york-ny",
"city_name": "New York",
"state_code": "NY",
"enabled": true,
"generate_location_pages": true,
"generate_cost_pages_for_breeds": []
}
]
2.5. generation_config.json
Quy định tốc độ và quota mỗi ngày.
{
"max_pages_per_day": 50,
"max_pages_per_run": 20,
"page_type_quota": {
"breed": 0.2,
"list": 0.1,
"comparison": 0.15,
"cost": 0.2,
"problem": 0.2,
"anxiety": 0.1,
"location": 0.05
},
"allowed_page_types": [
"breed",
"list",
"comparison",
"cost",
"problem",
"anxiety",
"location"
],
"future_page_types_reserved": [
"tool",
"guide",
"story",
"faq_cluster",
"product_collection",
"newsletter_landing",
"case_study",
"brand_page"
]
}
Giải thích quota:
max_pages_per_day: tổng tối đa.
page_type_quota: phân bổ tỉ lệ theo page_type (dùng cho scheduler).
────────────────
3. content_matrix_management.json – schema chi tiết
────────────────
File này được generate từ input_data. Admin không sửa tay (trừ debug).
Cấu trúc:
{
"version": 1,
"last_built_at": "2025-11-21T12:00:00Z",
"summary": {
"total_pages": 0,
"by_page_type": {
"breed": { "planned": 0, "generated": 0, "published": 0 },
"list": { "planned": 0, "generated": 0, "published": 0 },
"comparison": { "planned": 0, "generated": 0, "published": 0 },
"cost": { "planned": 0, "generated": 0, "published": 0 },
"problem": { "planned": 0, "generated": 0, "published": 0 },
"anxiety": { "planned": 0, "generated": 0, "published": 0 },
"location": { "planned": 0, "generated": 0, "published": 0 }
}
},
"pages": [
{
"page_id": "breed/golden-retriever",
"page_type": "breed",
"slug": "golden-retriever",
"primary_entity": {
"type": "breed",
"slug": "golden-retriever"
},
"secondary_entities": [],
  "status": {
    "state": "planned",        // planned | generating | generated | published | error | needs_refresh
    "last_state_change_at": "2025-11-21T10:00:00Z",
    "error_code": null,
    "error_message": null
  },
  "keywords": {
    "source": "master_list",   // master_list | fallback_template
    "primary_keyword": "golden retriever dog breed guide",
    "secondary_keywords": [
      "golden retriever temperament and personality",
      "is golden retriever good with kids",
      "golden retriever apartment dog"
    ]
  },
  "outline_type": "breed_v7",   // để sau này scale: breed_v8, story_v1, etc
  "content_files": {
    "v7_json_path": "src/data_v7/pages/breed/golden-retriever.json",
    "legacy_json_path": "src/data/pages/breed/golden-retriever.json"
  },
  "generation": {
    "enabled": true,
    "priority": "A",           // từ breeds.json
    "scheduled_at": null,
    "generated_at": null,
    "published_at": null,
    "generation_attempts": 0,
    "last_attempt_at": null,
    "llm_model_used": null
  },
  "refresh": {
    "needs_refresh": false,
    "last_refreshed_at": null,
    "refresh_mode": null       // light | deep
  }
  },
{
  "page_id": "cost/golden-retriever-austin-tx",
  "page_type": "cost",
  "slug": "golden-retriever-cost-austin-tx",
  "primary_entity": {
    "type": "breed",
    "slug": "golden-retriever"
  },
  "secondary_entities": [
    { "type": "city", "slug": "austin-tx" }
  ],
  "status": {
    "state": "generated",
    "last_state_change_at": "2025-11-21T11:30:00Z",
    "error_code": null,
    "error_message": null
  },
  "keywords": {
    "source": "fallback_template",
    "primary_keyword": "golden retriever cost in Austin",
    "secondary_keywords": [
      "how much does a golden retriever cost in Austin",
      "golden retriever monthly cost",
      "golden retriever vet bills"
    ]
  },
  "outline_type": "cost_v7",
  "content_files": {
    "v7_json_path": "src/data_v7/pages/cost/golden-retriever-austin-tx.json",
    "legacy_json_path": null
  },
  "generation": {
    "enabled": true,
    "priority": "A",
    "scheduled_at": "2025-11-21T11:00:00Z",
    "generated_at": "2025-11-21T11:20:00Z",
    "published_at": null,
    "generation_attempts": 1,
    "last_attempt_at": "2025-11-21T11:20:00Z",
    "llm_model_used": "gpt-4.1-mini"
  },
  "refresh": {
    "needs_refresh": false,
    "last_refreshed_at": null,
    "refresh_mode": null
  }
  }
]
}
Admin nhìn file này (hoặc UI build từ nó) là thấy rõ:
Bao nhiêu page planned / generated / published.
Page nào dùng master keywords, page nào đang fallback.
Page nào chưa generate.
Page nào lỗi.
Dễ filter theo page_type hoặc entity.
────────────────
4. Logic auto mapping từ input_data → content_matrix
────────────────
Flow cho AI coder:
Script: scripts/build_content_matrix.ts
Đọc input_data:
breeds.json
problems.json
comparisons.json
cities.json
generation_config.json
Bước 1: Khởi tạo danh sách trang target
a. Breed pages
Mỗi breed enabled và generate.breed_page = true
Tạo 1 page:
page_type: "breed"
slug: breed_slug
primary_entity: breed
b. Cost pages
Với mỗi breed có generate.cost_pages = true
Với mỗi city trong cities.json có:
generate_cost_pages_for_breeds bao gồm breed_slug
→ Tạo page cost:
page_type: "cost"
slug: {breed_slug}-cost-${city_slug}
primary_entity: breed
secondary_entity: city
c. Problem pages
Với mỗi problem:
Nếu applies_to_all_breeds = true: tạo page cho mỗi breed enabled
Nếu applies_to_breeds có danh sách: tạo page cho từng breed đó
page_type = problem.page_type ("problem" hoặc "anxiety")
d. Comparison pages
Với mỗi comparison enabled
Tạo page_type: "comparison", slug = comparison_slug
e. Location pages
Với mỗi city enabled và generate_location_pages = true
Tạo page_type: "location", slug = city_slug
f. List / Lifestyle pages (optional)
Có thể thêm file input_data/lists.json sau này, nhưng hệ thống vẫn ổn vì content_matrix chỉ coi đó là 1 page_type nữa.
Bước 2: Attach keyword bundle
Cho mỗi page đã tạo:
Gọi getKeywordsForPage(page_type, entity_1, entity_2)
Nếu có → keywords.source = "master_list"
Nếu không → log warning, dùng getFallbackKeywordsForPage, keywords.source = "fallback_template"
Bước 3: Merge với content_matrix_management.json hiện có
Đọc file cũ (nếu có).
Với mỗi page_id mới:
Nếu chưa tồn tại → thêm entry (state = planned).
Nếu đã tồn tại:
Giữ status, generation, refresh hiện tại.
Update lại field keywords nếu cần.
Xóa khỏi matrix các page không còn tồn tại trong mapping chỉ khi admin chọn clean up (tùy config).
Bước 4: Tính summary
Count by state và by page_type → điền vào summary.
Bước 5: Ghi file
Ghi đè content_matrix_management.json.
Update last_built_at.
────────────────
5. Scale thêm breed / problem / comparison mà không vỡ cấu trúc
────────────────
Với thiết kế này, scale rất đơn giản:
Thêm breed:
Admin chỉ cần thêm 1 object mới vào input_data/breeds.json.
Chạy lại scripts/build_content_matrix.ts.
Matrix tự tạo tất cả page cần thiết liên quan đến breed đó:
Breed page
Cost pages cho các city liên quan
Problem / anxiety pages nếu problem applies_to_all_breeds = true
Comparison pages nếu có cặp trùng breed.
Thêm problem:
Thêm vào problems.json.
Nếu applies_to_all_breeds = true → auto tạo page cho tất cả breeds.
Nếu chỉ vài breed → chỉ cho các breed đó.
Thêm comparison:
Thêm entry vào comparisons.json.
Tự tạo page_type = comparison.
Thêm city:
Thêm entry vào cities.json với flags tương ứng.
Thêm outline type mới sau này:
Append vào generation_config.allowed_page_types.
Tạo thêm một file input_data riêng nếu cần (vd lists.json, tools.json).
Update script build_content_matrix để đọc input đó và tạo page mới cùng pattern.
Không cần đổi URL cấu trúc hiện có.
Không cần sửa tay matrix.
Admin chỉ làm việc với input_data + nhìn dashboard map từ content_matrix_management.json.

-------
PHASE 20 – Content Matrix & Admin Dashboard

PROMPT MỚI (COPY-PASTE CHO AI CODER)
ADMIN DASHBOARD – CONTENT MATRIX MANAGEMENT
ROLE
Bạn là senior full-stack engineer (Next.js 14 + TypeScript) đang làm cho project PetMatchr.
Mục tiêu: build 1 trang Admin Dashboard để quản lý toàn bộ content, keyword, và tiến độ generate dựa trên các file JSON đã define sẵn.
CONTEXT PROJECT
– Frontend: Next.js 14 (App Router) + TypeScript
– Data: JSON files trong repo, không dùng DB ở bước này
– Đã có:
– src/data_v7/content_matrix_management.json
– folder input_data với 5 file:
– input_data/breeds.json
– input_data/problems.json
– input_data/comparisons.json
– input_data/cities.json
– input_data/generation_config.json
content_matrix_management.json
– Quản lý toàn bộ page: mỗi phần tử pages[] là 1 page_type + slug + status.
– Có dạng tổng quát:
{
"version": 1,
"last_built_at": "...",
"summary": {
"total_pages": number,
"by_page_type": {
"breed": { "planned": number, "generated": number, "published": number },
"list": { "planned": number, "generated": number, "published": number },
"comparison": { "planned": number, "generated": number, "published": number },
"cost": { "planned": number, "generated": number, "published": number },
"problem": { "planned": number, "generated": number, "published": number },
"anxiety": { "planned": number, "generated": number, "published": number },
"location": { "planned": number, "generated": number, "published": number }
}
},
"pages": [
{
"page_id": "breed/golden-retriever",
"page_type": "breed",
"slug": "golden-retriever",
"primary_entity": {
"type": "breed",
"slug": "golden-retriever"
},
"secondary_entities": [],
"status": {
"state": "planned",      // planned | generating | generated | published | error | needs_refresh
"last_state_change_at": "2025-11-21T10:00:00Z",
"error_code": null,
"error_message": null
},
"keywords": {
"source": "master_list", // master_list | fallback_template
"primary_keyword": "golden retriever dog breed guide",
"secondary_keywords": ["..."]
},
"outline_type": "breed_v7",
"content_files": {
"v7_json_path": "src/data_v7/pages/breed/golden-retriever.json",
"legacy_json_path": "src/data/pages/breed/golden-retriever.json"
},
"generation": {
"enabled": true,
"priority": "A",
"scheduled_at": null,
"generated_at": null,
"published_at": null,
"generation_attempts": 0,
"last_attempt_at": null,
"llm_model_used": null
},
"refresh": {
"needs_refresh": false,
"last_refreshed_at": null,
"refresh_mode": null // light | deep
}
}
]
}
input_data
– breeds.json: danh sách breed + flags generate
– problems.json: danh sách problem / anxiety topics
– comparisons.json: cặp breed để so sánh
– cities.json: city cho cost/location pages
– generation_config.json: max_pages_per_day, quota per page_type, allowed_page_types, future_page_types_reserved
OBJECTIVE
Code một Admin Dashboard page duy nhất (ví dụ route /admin hoặc /admin/dashboard) với các chức năng:
– Đọc content_matrix_management.json + input_data/*.json
– Hiển thị overview toàn bộ content: đã có gì, còn thiếu gì, page nào lỗi, page nào cần refresh
– Cho phép admin filter, search, sort, inspect từng page
– Cho admin xem cấu hình input_data hiện tại (read-only là đủ ở bước đầu)
– Thiết kế cấu trúc code sẵn sàng scale thêm page_type mới (vd từ 7 lên 16) mà không cần refactor nát code
YÊU CẦU TECH
– Next.js 14 App Router
– TypeScript full
– Server Components cho phần load data chính, Client Components cho bảng có filter, search, pagination
– Styling dùng Tailwind hoặc minimal CSS theo stack hiện tại của project (nếu repo đã có setup thì reuse)
– Không introduce framework UI nặng nếu repo chưa có (chỉ dùng nếu đã có trong project)
TASK 1 – TYPES CHO MATRIX VÀ INPUT_DATA
1. Tạo file mới src/lib/content-matrix-types.ts định nghĩa:
– PageState = "planned" | "generating" | "generated" | "published" | "error" | "needs_refresh"
– KeywordSource = "master_list" | "fallback_template"
– ContentMatrixEntry
* page_id: string
* page_type: string (hoặc union các page_type hiện có)
* slug: string
* primary_entity: { type: string; slug: string }
* secondary_entities: { type: string; slug: string }[]
* status: { state: PageState; last_state_change_at: string; error_code: string | null; error_message: string | null }
* keywords: { source: KeywordSource; primary_keyword: string | null; secondary_keywords: string[] }
* outline_type: string
* content_files: { v7_json_path: string | null; legacy_json_path: string | null }
* generation: {
  enabled: boolean;
  priority: "A" | "B" | "C";
  scheduled_at: string | null;
  generated_at: string | null;
  published_at: string | null;
  generation_attempts: number;
  last_attempt_at: string | null;
  llm_model_used: string | null;
  }
  * refresh: {
  needs_refresh: boolean;
  last_refreshed_at: string | null;
  refresh_mode: "light" | "deep" | null;
  }
  – ContentMatrixFile
* version: number
* last_built_at: string | null
* summary: {
  total_pages: number;
  by_page_type: Record<string, { planned: number; generated: number; published: number }>;
  }
  * pages: ContentMatrixEntry[]
2. Định nghĩa types đơn giản cho input_data trong cùng file hoặc file riêng src/lib/input-data-types.ts:
   – BreedConfig, ProblemConfig, ComparisonConfig, CityConfig, GenerationConfig
   – Giữ đúng cấu trúc đã mô tả ở phần trước.
   TASK 2 – DATA LOADER LỚP THẤP
Tạo file src/lib/content-matrix.ts với các hàm:
– loadContentMatrix(): Promise<ContentMatrixFile>
– loadBreedsInput(): Promise<BreedConfig[]>
– loadProblemsInput(): Promise<ProblemConfig[]>
– loadComparisonsInput(): Promise<ComparisonConfig[]>
– loadCitiesInput(): Promise<CityConfig[]>
– loadGenerationConfig(): Promise<GenerationConfig>
Yêu cầu:
– Dùng fs/promises để đọc JSON từ disk (chạy server-side).
– Handle lỗi đọc file: nếu lỗi thì throw error có message rõ ràng.
– Không viết gì ghi file ở bước này (Dashboard v1 chỉ read-only).
TASK 3 – ROUTE ADMIN DASHBOARD
Tạo route:
– src/app/admin/page.tsx
hoặc
– src/app/admin/dashboard/page.tsx
Đây là Server Component, sẽ:
– Gọi loadContentMatrix() và các hàm loadInputData.
– Truyền data xuống Client Components (DashboardUI).
Layout cơ bản:
– Phần trên: Summary
* Tổng số page
* Bảng nhỏ hoặc grid: số planned / generated / published theo từng page_type
* Hiển thị last_built_at
– Phần giữa: Filters + Search + Bảng chi tiết pages
* Filter theo:
  * page_type (dropdown hoặc pill)
  * state (planned / generated / published / error / needs_refresh)
  * priority (A/B/C)
  * keyword source (master_list / fallback_template)
  * Search theo:
  * slug
  * primary_keyword
  * entity slug
  – Phần dưới hoặc sidebar: Input Data Overview
* Box nhỏ hiển thị:
  * Số breed enabled
  * Số problems
  * Số comparisons
  * Số cities
  * Hiển thị generation_config: max_pages_per_day, allowed_page_types, future_page_types_reserved
TASK 4 – CLIENT COMPONENT BẢNG PAGES
Tạo component:
– src/components/admin/PagesTable.tsx (Client Component)
Yêu cầu UI:
– Props:
* entries: ContentMatrixEntry[]
* initialFilters: object optional
– Chức năng:
* Hiển thị bảng có các cột:
  * Page Type
  * Slug
  * Primary entity
  * State (planned / generated / published / error / needs_refresh)
  * Priority
  * Keyword source (badge: master_list / fallback)
  * Outline type
  * Generated_at (hoặc last_state_change_at)
  * Filter + search:
  * Dropdown chọn page_type
  * Dropdown chọn state
  * Dropdown chọn keyword source
  * Search box free text (lọc slug, primary_keyword)
  * Pagination:
  * Basic client-side pagination (vd 25 rows per page)
  * Row click:
  * Khi click vào 1 row, mở panel hoặc modal DetailPanel hiển thị chi tiết entry.
  TASK 5 – PAGE DETAIL PANEL
Tạo component:
– src/components/admin/PageDetailPanel.tsx
Chức năng:
– Show chi tiết 1 ContentMatrixEntry:
* Thông tin status full (state, error_message nếu có)
* Keywords:
  * primary_keyword
  * secondary_keywords[] (list)
  * source = master_list / fallback_template (highlight nếu fallback)
  * Entities:
  * primary_entity (type + slug)
  * secondary_entities (list)
  * Content files:
  * v7_json_path
  * legacy_json_path
  * Nếu path tồn tại: show như text (để dev biết mở file ở đâu)
  * Generation:
  * priority
  * enabled = true/false
  * generated_at, published_at, generation_attempts
  * Refresh:
  * needs_refresh?
  * last_refreshed_at
  * refresh_mode
  – Không cần implement actions backend (generate lại, refresh lại) ở bước này, nhưng:
* Dự trù chỗ để sau này gắn nút:
  * “Mark as need refresh”
  * “Open in editor”
  * “Trigger regenerate”
  TASK 6 – INPUT DATA PANEL
Tạo component:
– src/components/admin/InputDataOverview.tsx
Chức năng:
– Hiển thị 4 box nhỏ:
* Breeds:
  * Tổng số breed
  * Số breed enabled
  * Top 3 breed priority A (list slug)
  * Problems:
  * Tổng số problem
  * Bao nhiêu problem page_type = "problem"
  * Bao nhiêu page_type = "anxiety"
  * Comparisons:
  * Tổng số comparisons enabled
  * Cities:
  * Tổng cities enabled
  * Bao nhiêu generate_location_pages = true
  – Hiển thị generation_config:
* max_pages_per_day
* max_pages_per_run
* allowed_page_types (list)
* future_page_types_reserved (list)
– Mục tiêu: Admin nhìn 1 lần là hiểu “scope của project hiện tại”.
TASK 7 – SẴN SÀNG SCALE THÊM PAGE_TYPE
Khi code, phải:
– Dùng type union V7PageType hoặc ít nhất là string nhưng luôn dựa vào allowed_page_types trong generation_config để render filter.
– Không hard-code page_type ở nhiều chỗ.
– Tạo mapping đơn giản:
const PAGE_TYPE_LABELS: Record<string, string> = { breed: "Breed", cost: "Cost", ... }
– Bất kỳ chỗ nào hiển thị số page theo type, đọc từ matrix.summary.by_page_type, không manual count.
TASK 8 – STATUS VÀ CẢNH BÁO QUAN TRỌNG
Trong Dashboard:
– Với những page có:
* status.state = "error":
  * Hiển thị badge đỏ và icon nhỏ
  * Tooltip: error_message
  * keywords.source = "fallback_template":
  * Hiển thị badge cảnh báo (ví dụ màu vàng)
  * Tooltip: “Missing keyword in master list, using fallback template”
  * refresh.needs_refresh = true:
  * Badge “Needs refresh” (màu khác)
  – Tổng hợp 3 số ở phần trên cùng:
* Pages using master keywords
* Pages using fallback keywords
* Pages in error state
TASK 9 – CODE QUALITY
– TypeScript strict.
– Không bỏ qua lỗi bằng any trừ khi cần thiết, khi đó phải chú thích rõ.
– Không dùng bất kỳ API nguy hiểm (no write FS, no delete) trong Dashboard v1.
– Component chia nhỏ, dễ maintain, không nhồi hết vào 1 file.
DELIVERABLES
Khi trả lời, hãy:
1. Liệt kê file nào sẽ được tạo hoặc chỉnh sửa (đường dẫn tương đối).
2. Cho full code cho từng file quan trọng:
   – src/lib/content-matrix-types.ts
   – src/lib/content-matrix.ts
   – src/app/admin/page.tsx (hoặc /admin/dashboard/page.tsx)
   – src/components/admin/PagesTable.tsx
   – src/components/admin/PageDetailPanel.tsx
   – src/components/admin/InputDataOverview.tsx
   3. Đảm bảo code có thể copy-paste vào repo và chạy được sau khi install dependency chuẩn của Next.js 14.
4. Không tự ý đổi cấu trúc content_matrix_management.json hay input_data/*.json; chỉ đọc đúng theo schema đã mô tả.
