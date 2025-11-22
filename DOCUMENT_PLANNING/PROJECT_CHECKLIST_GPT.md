# PetMatchr V7 – PROJECT CHECKLIST (High‑Level)

Checklist này tóm tắt lại các bước chính để nâng toàn bộ project lên spec V7 trong `IMPLEMENTATION_PLAN.md` và `DOCUMENT_PLANNING/prompts.ts`.

> Gợi ý dùng: tick dần từ trên xuống; phần 1–4 là “blocking” cho các phase sau.

---

## 1. Prompts & LLM Client (V7)

- [x] Thay nội dung `src/lib/prompts.ts` theo `DOCUMENT_PLANNING/prompts.ts` (SYSTEM_PROMPT_PETMATCHR_V4, SEO_RULES_BLOCK, BASE_PAGE_INSTRUCTIONS).
- [x] Thay nội dung `scripts/prompts.ts` cho scripts cũ (nếu vẫn cần) để trùng spec mới hoặc đánh dấu deprecated.
- [x] Chuẩn hoá hàm `callLLM` trong `src/lib/llmClient.ts` sang dạng:
  - [x] Nhận object: `{ system, user, jsonInput, temperature }`.
  - [x] Luôn append `INPUT_JSON:` + JSON input vào user prompt.
  - [x] Ép `response_format` về JSON object, parse an toàn, throw nếu lỗi.
- [x] Đảm bảo `callCloudLLM`/`callLocalLLM` dùng chung `formatUserPrompt` và hành vi như PHASE 9.1.

---

## 2. Types & Schema V7 trong `src/lib/types.ts`

- [x] Thêm `V7PageType` union (7 page_type hiện tại + các future type như plan).
- [x] Tạo `BaseV7Page` với fields:
  - [x] `page_type`, `slug`.
  - [x] `meta.title`, `meta.description`.
  - [x] `h1`, `intro.short_hook` (+ optional context).
  - [x] `faq`, `quick_answers`.
  - [x] `product_blocks`, `internal_link_suggestions`.
  - [x] `content_version`, `last_generated_at`, `last_refreshed_at?`.
- [x] Định nghĩa `ProductBlock` đúng như PHASE 17 (placement, product_type, angle, dog_breed_slug, dog_theme, cta_text).
- [x] Định nghĩa `InternalLinkSuggestion` dùng `V7PageType` làm `target_type`.
- [x] Tạo các interface cụ thể extend `BaseV7Page`:
  - [x] `BreedV7Page` theo schema BREED_PAGE_PROMPT.
  - [x] `ListV7Page` theo LIST_PAGE_PROMPT.
  - [x] `ComparisonV7Page` theo COMPARISON_PAGE_PROMPT.
  - [x] `CostV7Page` theo COST_PAGE_PROMPT.
  - [x] `ProblemV7Page` theo PROBLEM_PAGE_PROMPT.
  - [x] `AnxietyV7Page` theo ANXIETY_PAGE_PROMPT.
  - [x] `LocationV7Page` theo LOCATION_PAGE_PROMPT.
- [x] Giữ lại types cũ (`BreedPage`, `CostPage`, …) dưới tên `Legacy*` để không vỡ UI hiện tại.
- [ ] Cập nhật `PageType`, `PageMonetization`, `PageIndexEntry` cho tương thích nhưng không phá backward‑compat.

---

## 3. Validators & QA Cơ Bản (Structure)

- [x] Update `src/lib/validators.ts`:
  - [x] `basicValidateOutput(pageType, data)` dùng schema V7 (common + per page_type).
  - [x] Log lý do fail rõ ràng cho từng page_type.
- [x] Update `scripts/validators.ts` cho scripts để dùng chung logic mới.
- [x] Mở rộng `scripts/qa-check.ts`:
  - [x] Quét đủ 7 folder: `breed`, `cost`, `problem`, `anxiety`, `comparison`, `location`, `list`.
  - [x] In báo cáo tổng (pass/fail) + chi tiết slug + lý do.
  - [x] Exit code 1 nếu có lỗi (cho CI).

---

## 4. Page Matrix + Keyword Bundle (PHASE 9.2 + 15.3 + 17.1/17.2)

- [x] Thiết kế lại type `PageMatrixItem` trong `scripts/pageMatrix.ts`:
  - [x] Fields tối thiểu: `slug`, `page_type`, `input_data`, `ai_prompt_version`, `keywords`, `primary_intent`.
- [x] Tạo `src/lib/seo-keywords.ts`:
  - [x] `PageKeywordBundle` như spec (primary, secondary, faq, quick_answer, internal_anchor).
  - [x] `getKeywordsForPage(page_type, entity_1, entity_2)` đọc từ master list. *(hiện tại master list rỗng, sẽ được populate sau)* 
  - [x] `getFallbackKeywordsForPage(...)` với template thuần code cho:
    - [x] Breed page (gọi `getBreedFallbackKeywords`).
    - [x] Cost page.
    - [x] Comparison page.
    - [x] Problem / anxiety / location / list (template cơ bản).
- [x] Refactor `scripts/pageMatrix.ts`:
  - [x] Build `pageMatrix.json` với đủ 7 page_type, `input_data` đúng shape.
  - [x] Gắn `keywords` cho từng item bằng:
    - [x] `getKeywordsForPage(...) ?? getFallbackKeywordsForPage(...)`.
- [x] Update `scripts/generate-pages.ts`:
  - [x] Đọc `input_data` + `keywords` từ `pageMatrix.json`.
  - [x] Truyền vào `callLLM({ system, user, jsonInput })`. *(dùng `callHybridLLM` với params object)*

---

## 5. Frontend Pages – Chuyển sang Schema V7

- [x] Cập nhật loader trong `src/lib/data.ts`:
  - [x] Thêm các hàm `get*PageV7BySlug` trả về `*V7Page` (chuẩn bị sẵn cho UI mới; loader legacy vẫn giữ để fallback).
- [ ] Refactor các view components:
  - [ ] `BreedPageView` nhận `BreedV7Page` (intro, sections, case_study, product_blocks, internal_link_suggestions).
  - [ ] `CostPageView` nhận `CostV7Page`.
  - [ ] `ProblemPageView` nhận `ProblemV7Page`.
  - [ ] `AnxietyPageView` nhận `AnxietyV7Page`.
  - [ ] `ComparisonPageView` nhận `ComparisonV7Page`.
  - [ ] `ListPageView` nhận `ListV7Page`.
  - [ ] `LocationPageView` nhận `LocationV7Page`.
- [ ] Trong các route `[slug]/page.tsx`:
  - [ ] Điều chỉnh kiểu props + mapping sang view mới.
  - [ ] Giữ tạm logic cũ cho legacy JSON (nếu cần fallback) trong thời gian migrate.

---

## 6. Answers Hub & Quick Answers (PHASE 8.2 + 15.2)

- [x] Tạo helper gom quick answers:
  - [x] File mới `src/lib/quick-answers.ts` đọc toàn bộ `src/data/pages/**`.
  - [x] Xuất list `{ slug, page_type, quick_answers[] }` (ở đây là `QuickAnswerEntry` kèm `primary_quiz_slug`).
- [x] Refactor `src/app/answers/page.tsx`:
  - [x] Thêm search box theo `question`.
  - [x] Filter theo `category: "Living" | "Costs" | "Health" | "Training"`.
  - [x] Hiển thị link về page gốc + nút “Take quiz” nếu có `primary_quiz_slug` từ `PageMonetization`.
- [x] Thêm JSON-LD `FAQPage` cho `/answers` (dùng subset quick_answers).

---

## 7. Internal Links & Monetization (PHASE 4 + 14)

- [x] Chuẩn hoá `PageIndexEntry` trong `src/lib/types.ts`:
  - [x] Đảm bảo có: `breed_slugs`, `city_slug?`, `problem_slug?`, `primary_intent`, `primary_cluster?`, `title`, `short_label`.
- [x] Update `scripts/build-page-index.ts`:
  - [x] Parse pages, extract đúng `breed_slugs`, `city_slug`, `problem_slug` (dựa trên slug + JSON fields).
  - [x] Tối ưu `short_label` theo page_type (cost, comparison, location, list, problem/anxiety).
  - [x] Map `primary_cluster` + `primary_intent` từ `page_monetization.json` khi có.
- [x] Rà lại `src/lib/internal-links.ts`:
  - [x] `getPagesByBreed` trả đúng các nhóm page.
  - [x] `getRelatedForPage` implement logic mở rộng theo plan (breed hub → cost/problem/anxiety/comparison/location/list), tôn trọng `limit_per_type`.
  - [x] `updatePageIndexEntryForSlug` set thêm `primary_cluster` + `primary_intent` dựa trên `PageMonetization`.
- [x] Nâng `src/lib/cta.ts` (resolvePageCTAs):
  - [x] Input: `PageMonetization` + page data.
  - [x] Output: `CTAConfig` đúng cluster + quiz/offer ưu tiên (đã dùng cluster + offer slots từ content).

---

## 8. JSON API, JSON‑LD & Sitemap (PHASE 7 + 11 + 15.2)

- [x] API routes:
  - [x] Đồng bộ `/api/breed`, `/api/cost`, `/api/problem`, `/api/anxiety`, `/api/lists`, `/api/locations` với schema gần V7 (slug, page_type, meta, h1, block chính, `faq`, `quick_answers`, + `monetization` summary).
  - [x] Đảm bảo trả: `meta`, `h1`, block chính, `faq`, `quick_answers`, + monetization summary (nếu có trong `page_monetization.json`).
  - [x] Thêm headers: `Cache-Control` (s-maxage + stale-while-revalidate), `Access-Control-Allow-Origin: *` để phục vụ AEO/crawlers đơn giản.
- [x] JSON-LD:
  - [x] Đã có Article/HowTo JSON-LD cho các page `[slug]/page.tsx` chính (breed, cost, problem, anxiety, comparison) và thêm `FAQPage` JSON-LD cho `/answers` từ subset `quick_answers`.
- [x] Sitemap:
  - [x] Refactor `src/app/sitemap.ts` dùng `page_index.json` (qua `getPageIndex`) để generate:
    - [x] Homepage, `/answers`, 7 page_type (breeds, cost, problems, anxiety, comparison, locations, lists), `/quiz/[slug]` core, `/compare`.
  - [x] Giữ App Router sitemap là nguồn chính; script `scripts/sitemap-generator.ts` chỉ còn dùng nội bộ nếu cần XML static.

---

## 9. Comparison On‑Demand, Queue & Telemetry (PHASE 13)

- [x] Rà lại `src/lib/comparison-generator.ts` + `src/app/api/comparison/[slug]/route.ts` + `src/app/compare/[slug]/page.tsx`:
  - [x] Confirm behavior 200 / 202 / 404 đúng spec (OK / pending / unavailable).
  - [x] Pending state UX friendly + có link fallback `/compare`.
- [x] Queue pending comparison:
  - [x] Thêm `src/data/comparison_requests_pending.json`.
  - [x] Thêm script `scripts/process-pending-comparisons.ts` xử lý queue pending bằng `ensureComparisonPage`.
- [x] Telemetry:
  - [x] Log các event vào `src/data/comparison_telemetry.log` trong `ensureComparisonPage` (cache hit, LLM call, generated, failed, MODE_OFF).
  - [x] Ghi lại lý do fail (INVALID_PAIR, MODE_OFF, LLM_FAILED/invalid schema); số lần Cloud vs Local fail được phân biệt bằng loại error `CloudLLMError` / `LocalLLMError`.

---

## 10. Lifestyle‑Match Flow & Tools (PHASE 16/17 – Quiz & Tools)

- [x] Update `src/data/quizzes/lifestyle-match.json`:
  - [x] Phase 1 vs Phase 2 dựa trên prefix `profile_*` và `deep_*` (UI tách 2 step, JSON giữ nguyên structure).
  - [x] `QuizResultBucket` được mở rộng type để hỗ trợ `persona_keywords` (giá trị sẽ được dùng khi cần).
- [x] Tạo `src/lib/lifestyle-match.ts`:
  - [x] `matchBreedsForPersona({ answers, breeds, lifestyleScores })` → trả về `profile_label`, `profile_slug`, `description`, `top_matches[]` với match_score 0–100 + key traits.
- [x] Refactor route `/quiz/lifestyle-match`:
  - [x] Nếu `slug === "lifestyle-match"` → dùng flow riêng (không dùng `QuizEngine`).
  - [x] UI 2 bước (Quick Profile hỏi các câu `profile_*`, Deep Dive hỏi `deep_*` với option Skip).
  - [x] Result page hiển thị profile label + description + top 3 breed matches (match_score, bullet giải thích, link tới breed page và cost hub).
- [x] Tools:
  - [x] Route `src/app/tools/cost-calculator/page.tsx` (form breed + city + budget → breakdown + CTA).
  - [x] Optional: `src/app/tools/breed-cost-comparison/page.tsx`.

---

## 11. V7 Content Regen + Content Matrix + Admin Dashboard (PHASE 17–20)

- [x] Viết `scripts/regenerate_all_pages_v7.ts`:
  - [x] Đọc `pageMatrix.json` (V7).
  - [x] Gọi LLM với PAGE_PROMPT V7 + keyword bundle.
  - [x] Validate theo `*V7Page` types (dùng `basicValidateOutput`), ghi vào `src/data_v7/pages/<page_type>/<slug>.json`.
  - [x] Set `content_version`, `last_generated_at` cho từng page.
- [x] Hệ content matrix:
  - [x] Implement `scripts/build_content_matrix.ts` để đọc `pageMatrix.json` + `src/data_v7/pages/**`, gán trạng thái `planned`/`generated` và build summary by page_type.
  - [x] File `src/data_v7/content_matrix_management.json` làm source of truth cho admin dashboard.
- [x] Admin Dashboard:
  - [x] Route `src/app/admin/content-matrix/page.tsx` (server) đọc file matrix.
  - [x] UI client `ContentMatrixClient` với bảng filter theo `page_type`, status, intent; hiển thị keyword bundle (primary_keyword) và stub action button cho regen/publish (CLI-based).

---

## 12. SEO / Content QA Nâng Cao (PHASE 15 – sau khi V7 ổn)

- [x] Thêm scripts:
  - [x] `scripts/qa-seo.ts` – kiểm meta, h1, length, từ khóa cơ bản, FAQ/quick_answers presence, output JSON report.
  - [x] `scripts/qa-quiz.ts` – kiểm sâu quiz (slug, title, questions, result_mapping; riêng lifestyle-match check Phase 1/2 + email_sequence_id).
  - [x] `scripts/qa-content-style.ts` – kiểm độ dài (số từ), mức opinion cơ bản cho breed, và flag medical advice chi tiết.
- [x] Thêm npm scripts:
  - [x] `"qa:seo"`, `"qa:quiz"`, `"qa:content"` trỏ vào file tương ứng.
- [x] Update `README.md`:
  - [x] Thêm mục “Content Quality Pipeline” với lệnh:
    - [x] `npm run qa`
    - [x] `npm run qa:seo`
    - [x] `npm run qa:quiz`
    - [x] `npm run qa:content`
