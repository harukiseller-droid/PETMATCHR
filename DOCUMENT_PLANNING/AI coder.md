Ok, giờ gom lại cho gọn để “AI coder” có thể ôm trọn V7 và tự build.

---

## 1. Full checklist cho AI – follow từ đầu đến cuối

Coi như repo đã có mấy file spec:

* `V7_PETMATCHR – BEST FINAL VERSION.md` 
* `V7_tech2_Mapping PAGE_MONETIZATION_CTA_Pseudo-code generate batch pages.md` 
* `V7_tech3_prompt.md` (system prompt coder + skeleton checklist) 
* `scripts/prompts.ts` (SYSTEM + BREED/LIST/COST/PROBLEM prompts) 

Dưới đây là **checklist để AI xử lý full scope V7** (chỉ những phần code/automation, không đụng SEO offpage & deal affiliate).

### PHASE 0 – Đọc spec & khóa context

1. Đọc toàn bộ:

   * `V7_PETMATCHR – BEST FINAL VERSION.md`
   * `V7_tech2_*.md`, `V7_tech3_prompt.md`
   * `scripts/prompts.ts`, `src/lib/types.ts` (nếu đã có)
2. Ghi chú lại (trong comment/code, không spam ra ngoài):

   * 7 page_type: `breed | list | comparison | cost | problem | anxiety | location`
   * 5 stream monetization: insurance, training, CBD/supp, ads, Amazon/Chewy 
   * Generation pipeline 3 bước: Data → Page matrix → Batch AI → JSON pages 

### PHASE 1 – Project & base structure

3. Nếu project chưa tạo: giả định lệnh:

   * `npx create-next-app@latest petmatchr --typescript --app --eslint --src-dir --no-tailwind` 
4. Đảm bảo structure tồn tại:

   * `/src/data`
   * `/src/data/pages/{breed,cost,problem,list,comparison,anxiety,location}`
   * `/src/lib`, `/src/components`
   * `/src/app/breeds`, `/src/app/cost`, `/src/app/problems`, `/src/app/lists`, `/src/app/anxiety`, `/src/app/locations`
   * `/src/app/api/*` cho AEO
5. Tạo / sửa:

   * `src/app/layout.tsx` (shell PetMatchr)
   * `src/app/page.tsx` (home tạm, link ra breeds/lists)

### PHASE 2 – Types & data model (single source of truth)

6. Tạo / update `src/lib/types.ts` (nếu chưa full):

   * `Breed`, `LifestyleScore`
   * `CostPage`, `ProblemPage`, `ListPage`, `BreedPage` (nếu chưa đủ)
   * `PageType`, `PageMonetization`, `QuizCTA`, `OfferCTA`, `CTAConfig` 
7. Đảm bảo types khớp JSON mẫu đã có (Golden, Frenchie, cost page, problem page).
8. Export tất cả type để dùng lại khắp project.

### PHASE 3 – Seed data (Year 1 data layer)

9. Tạo / kiểm tra file JSON seed:

   * `src/data/breeds.json` (≥80 breeds planned, nhưng MVP ít nhất 2–5 record chuẩn).
   * `src/data/lifestyle_scores.json`.
   * `src/data/cities.json` (≈50 city với cost_factor, vet_cost_factor, climate…).
   * `src/data/problems.json` (~50 vấn đề, mapping breed & monetization cluster).
   * `src/data/products.json` (affiliate products, cluster mapping). 
10. Tạo 1–2 JSON page mẫu:

    * `src/data/pages/cost/golden-retriever-cost-austin-texas.json`
    * `src/data/pages/problem/golden-retriever-separation-anxiety.json` 

### PHASE 4 – PAGE_MONETIZATION + CTA mapping

11. Tạo `src/data/page_monetization.json`:

    * Mỗi entry: `slug`, `page_type`, `cluster`, `primary_funnel`, `secondary_funnels`, `primary_offer_type`, `secondary_offer_types`, `show_ads`, `show_email_capture`, `primary_quiz_slug`, `secondary_quiz_slugs`, `primary_campaign_id`. 
12. Seed ít nhất:

    * 1 cost page → `cluster: "insurance"`, `primary_funnel: "insurance_quiz"`, `primary_offer_type: "insurance_offer"`.
    * 1 problem page → `cluster: "training"`, `primary_funnel: "behavior_quiz"`, `primary_offer_type: "training_course"`.
13. Implement `src/lib/cta.ts`:

    * `resolvePageCTAs(monetization, contentData): CTAConfig`
    * Dùng mapping đã định nghĩa trong spec (getQuizLabel, getOfferLabel, getDefaultPartnerPlaceholder, …). 

### PHASE 5 – Data loaders

14. Tạo `src/lib/data.ts`:

    * `getBreeds()`, `getBreedBySlug()`
    * `getLifestyleScores()`, `getLifestyleScoreForBreed()`
    * `getCostPageBySlug()`, `getProblemPageBySlug()`
    * `getListPageBySlug()`, `getBreedPageBySlug()` nếu dùng content JSON riêng cho breed/list.
15. Đọc JSON bằng `fs/promises` hoặc dynamic `import()`, path chuẩn theo `/src/data/...`.

### PHASE 6 – Frontend pages (App Router)

16. `Breed` pages:

    * Route: `/breeds/[slug]/page.tsx`
    * Load `Breed + LifestyleScore + BreedPage JSON` (hoặc generate từ traits nếu chưa có JSON).
    * Render sections + `good_fit_if / avoid_if / lifestyle_bars / faq / CTA quiz + starter kit`.
17. `Cost` pages:

    * Route: `/cost/[slug]/page.tsx`
    * Load `CostPage` JSON + `PageMonetization` + CTAConfig.
    * Component `CostPageView` dùng `resolvePageCTAs`.
18. `Problem` pages:

    * Route: `/problems/[slug]/page.tsx`
    * Load `ProblemPage` JSON + `PageMonetization`.
    * Render `symptoms`, `root_causes`, `step_by_step_plan`, `course_recommendation`, CTA quiz + course.
19. `List` / lifestyle pages:

    * Route: `/lists/[slug]/page.tsx`
    * Input: list_config + breeds + scores → content JSON từ `LIST_PAGE_PROMPT`.
    * Render ranking table, breed_snippets, FAQ, CTA quiz + secondary CTA (training/insurance/etc).
20. `Anxiety` / `Location` pages:

    * Định route & component skeleton, sẵn để bắn JSON sau (chưa cần nội dung full ngay).

### PHASE 7 – AEO / Public JSON API

21. Tạo API routes:

    * `/api/breed/[slug]/route.ts`

      * Trả JSON: traits, lifestyle_scores, cost summary, health_risks, quick_answers. 
    * `/api/lifestyle/[type]/route.ts`

      * Trả top_breeds, avoid_breeds.
    * `/api/costs/[breed]/[city]/route.ts`

      * Trả breakdown chi phí từ cost pages/city data.
    * `/api/problems/[breed]/route.ts`

      * Trả common issues, mapping sang problem pages.
22. Thêm headers:

    * `Cache-Control` (s-maxage + stale-while-revalidate)
    * `Access-Control-Allow-Origin: *` để AI crawler dùng được. 

### PHASE 8 – Answers Hub + quiz routes

23. `Answers Hub`:

    * Route `/answers`
    * Search box + filter by category (`Living`, `Costs`, `Health`, `Training`).
    * Gọi các API JSON trên để show quick answers + link về pages + quiz.
24. Quiz system:

    * `src/data/quizzes/*.json` (insurance-fit, behavior-check, anxiety-level, lifestyle-match).
    * Route `/quiz/[slug]/page.tsx`
    * Logic: load quiz JSON → render Q/A → calculate result → map sang CTA / email capture.

### PHASE 9 – Batch generation: Matrix + AI pipeline

25. `generate-page-matrix.ts` (Node script):

    * Input: `breeds.json`, `cities.json`, `problems.json`, `lifestyle_scores.json`.
    * Output: `pageMatrix.json` (array `PageMatrixItem { slug, page_type, seed_data, ai_prompt_version }`).
    * Generate:

      * Cost: ~50 breed × 8 city.
      * Problem: ~50 breed × ~12 problems.
      * Anxiety: 50 × 4 type.
      * Location + list + comparison combos. 
26. `generate-content-batch.ts`:

    * Load `pageMatrix.json`.
    * Filter pages chưa có JSON (`filterAlreadyGenerated` như spec). 
    * Cho mỗi item:

      * `buildAIRequest(item)` → chọn `SYSTEM_PROMPT_PETMATCHR_V4` + 1 trong 4 content prompt (breed/list/cost/problem) + `jsonInput`. 
      * `callLLM()` → parse JSON, validate (`basicValidateOutput(pageType, output)`).
      * Save file vào `/src/data/pages/{page_type}/{slug}.json`.
    * Có retry + concurrency limit (ví dụ 10 concurrent). 

### PHASE 10 – QA scripts

27. `qa-check.ts`:

    * Load toàn bộ JSON pages.
    * Check:

      * JSON valid theo type (Zod hoặc custom checks).
      * Không thiếu section critical (CTA, FAQ, quick answers).
      * Lý do monetization: cho cost/problem/anxiety phải có `insurance_section` hoặc `course_recommendation` / `cbd_offer`.
      * Duplicate content (string similarity >85%) → flag.
28. `sitemap-generator.ts`:

    * Build sitemaps theo nhóm: `breeds, lists, comparisons, costs, problems, anxiety, locations`. 

### PHASE 11 – Wiring analytics & tracking

29. Thêm:

    * `events` helper để log:

      * Quiz start/finish.
      * Offer click (insurance/training/CBD).
    * Hook vào CTA buttons.
30. Thêm basic analytics config (GA4 / Plausible formats trong comment) để human sau này gắn key.

### PHASE 12 – Dev tooling & DX

31. Thêm script npm:

    * `"gen:matrix"`, `"gen:content"`, `"qa"`, `"sitemap"`.
32. Đảm bảo `npm run lint` & `npm run build` pass.
33. Document ngắn trong `README.md` cách chạy full pipeline:

    * `npm run gen:matrix`
    * `npm run gen:content`
    * `npm run qa`
    * `npm run sitemap`

---

## 2. Master prompt cho AI coder (check toàn bộ folder & chạy theo checklist)

Prompt này để dán thẳng vào con AI-code (ChatGPT, Claude, v.v.).
Ý tưởng: set system prompt coder V7 trước (đã có trong `V7_tech3_prompt.md`), sau đó dùng block dưới làm **user prompt đầu tiên**.

Bạn chỉ cần chỉnh tên thư mục project nếu khác.

---

**MASTER BUILD PROMPT CHO AI CODER**

> Context:
>
> * Repo hiện tại là project PetMatchr, stack: Next.js 14 App Router + TypeScript.
> * Trong repo đã có các file spec/document sau (tên có thể hơi khác nhưng nội dung tương tự):
>
>   * `V7_PETMATCHR – BEST FINAL VERSION.md`
>   * `V7_tech2_Mapping PAGE_MONETIZATION_CTA_Pseudo-code generate batch pages.md`
>   * `V7_tech3_prompt.md`
>   * `scripts/prompts.ts`
>   * Một số file TypeScript/JSON seed nếu đã tạo trước.
>
> Mục tiêu:
>
> * Dùng 100% AI coding để implement toàn bộ pipeline trong V7:
>
>   * Data layer (breeds, lifestyle_scores, cities, problems, products, page_monetization, quizzes).
>   * PAGE_MONETIZATION → CTA mapping.
>   * Frontend pages (breed, list, cost, problem, anxiety/location skeleton).
>   * Public JSON API endpoints cho AEO.
>   * Answers Hub + quiz pages.
>   * Page matrix generator + LLM batch generator.
>   * QA scripts + sitemap generator + basic analytics hooks.
> * Làm theo đúng checklist dưới đây, từ PHASE 0 → PHASE 12, không nhảy bước, không tự bịa thêm kiến trúc lạ.
>
> Ràng buộc output:
>
> * Mỗi lần trả lời, chỉ output CODE BLOCKS, dạng:
>
>   ```ts
>   // FILE: path/to/file.ts
>   <code>
>   ```
>
>   Không giải thích dài dòng bên ngoài code, trừ khi tôi yêu cầu.
> * Luôn show full nội dung file khi tạo/sửa.
> * Giữ project `npm run lint` và `npm run build` chạy được.
>
> Nhiệm vụ của bạn:
>
> 1. **Scan repo + spec**
>
>    * Đọc toàn bộ các file spec:
>
>      * `V7_PETMATCHR – BEST FINAL VERSION*`
>      * `V7_tech2_*`
>      * `V7_tech3_prompt*`
>      * `scripts/prompts.ts`
>    * Đọc các file code/data hiện có trong:
>
>      * `/src/lib`, `/src/data`, `/src/app`, `/scripts`.
>    * Không sửa gì ở bước này, chỉ hiểu cấu trúc hiện tại.
> 2. **Lập kế hoạch ngắn gọn theo checklist**
>
>    * Dựa trên CHECKLIST PHASE 0 → PHASE 12 (đính kèm bởi user), map lại:
>
>      * Bước nào đã DONE (dựa trên code hiện có).
>      * Bước nào TODO.
>    * Trong lần trả lời đầu tiên:
>
>      * Tạo 1 file `docs/IMPLEMENTATION_PLAN.md` tóm tắt checklist PHASE 0–12 và tick trạng thái `DONE/TODO` cho từng bước.
> 3. **Thực thi tuần tự theo checklist**
>
>    * Sau khi tạo `docs/IMPLEMENTATION_PLAN.md`, bắt đầu từ PHASE 1 và đi lần lượt:
>
>      * PHASE 1: Project & base structure.
>      * PHASE 2: Types & data model.
>      * PHASE 3: Seed data.
>      * PHASE 4: PAGE_MONETIZATION + CTA mapping.
>      * PHASE 5: Data loaders.
>      * PHASE 6: Frontend pages.
>      * PHASE 7: Public JSON API.
>      * PHASE 8: Answers Hub + quizzes.
>      * PHASE 9: Page matrix + AI batch generator.
>      * PHASE 10: QA scripts.
>      * PHASE 11: Analytics / tracking hooks.
>      * PHASE 12: Dev tooling & README.
>    * Ở mỗi phase:
>
>      * Tạo/sửa file đúng path.
>      * Cập nhật `docs/IMPLEMENTATION_PLAN.md` để đánh dấu step đã DONE.
> 4. **Quy tắc khi implement**
>
>    * Không invent folder mới nếu không có trong spec (chỉ dùng `src/data`, `src/lib`, `src/components`, `src/app`, `scripts`).
>    * Tất cả model JSON phải khớp types trong `src/lib/types.ts` và prompts trong `scripts/prompts.ts`.
>    * Hàm batch generator phải dùng `SYSTEM_PROMPT_PETMATCHR_V4` + `BREED_PAGE_PROMPT` + `LIST_PAGE_PROMPT` + `COST_PAGE_PROMPT` + `PROBLEM_PAGE_PROMPT` đúng pattern:
>
>      * system: SYSTEM_PROMPT_PETMATCHR_V4
>      * user: <PAGE_PROMPT>
>      * content: `INPUT_JSON:\n{...}` (stringify từ seed_data).
>    * Có function validate output JSON cho từng page_type trước khi save file.
> 5. **Cách tiến hành từng lượt trả lời**
>
>    * Lượt 1:
>
>      * Scan repo (giả lập, bằng cách suy luận từ file đã có).
>      * Tạo `docs/IMPLEMENTATION_PLAN.md` với checklist PHASE 0–12 và trạng thái.
>    * Lượt tiếp theo:
>
>      * Mỗi lượt, chọn 1–2 phase nhỏ (ví dụ PHASE 2 + PHASE 3) và implement trọn vẹn:
>
>        * Tạo/modify file cần thiết (code blocks).
>        * Update `docs/IMPLEMENTATION_PLAN.md`.
>      * Không được nhảy cóc phase khi phần trước chưa DONE trong plan.
>
> Bắt đầu ngay từ **Bước 1: Scan repo + tạo docs/IMPLEMENTATION_PLAN.md**.
> Khi trả lời, chỉ cần gửi ra các file bạn tạo/sửa (code blocks đầy đủ), bao gồm `docs/IMPLEMENTATION_PLAN.md`.

---
