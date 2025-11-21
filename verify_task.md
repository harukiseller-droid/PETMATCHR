1. Page types & prompts

7 page_type đều đã được định nghĩa rõ:

breed

list (lifestyle list)

comparison

cost

problem

anxiety

location 

V7_tech3_prompt

Và trong scripts/prompts.ts đã có:

SYSTEM_PROMPT_PETMATCHR_V4

BREED_PAGE_PROMPT

LIST_PAGE_PROMPT

COST_PAGE_PROMPT

PROBLEM_PAGE_PROMPT

COMPARISON_PAGE_PROMPT

ANXIETY_PAGE_PROMPT

LOCATION_PAGE_PROMPT 

prompts

Mỗi prompt đều:

Ghi rõ INPUT_JSON shape

Ghi rõ OUTPUT JSON schema (meta, h1, sections, CTA, FAQ,…)

Cách viết opinionated, grounded, không medical advice

=> AI coder chỉ cần map page_type → đúng *_PROMPT trong generate-pages.ts. IMPLEMENTATION_PLAN cũng yêu cầu dùng SYSTEM_PROMPT_PETMATCHR_V4 + correct PAGE prompt. 

IMPLEMENTATION_PLAN

2. JSON spec cho quizzes

Đã có file:

src/lib/quiz-types.ts với:

QuizQuestion, QuizAnswerOption, QuizScoringRule, QuizResult, QuizDefinition 

quiz-types

IMPLEMENTATION_PLAN:

PHASE 8 define:

src/data/quizzes/*.json cho:

insurance-fit

behavior-check

anxiety-level

lifestyle-match

src/app/quiz/[slug]/page.tsx

Quiz engine: load JSON → render → score → map result → CTA + email capture 

IMPLEMENTATION_PLAN

=> AI coder biết:

JSON quiz spec (từ quiz-types.ts)

Folder + route

Flow hiển thị + scoring + CTA

Không cần human nghĩ thêm.

3. Quick Answers, FAQ schema & Answers Hub

File V7_tech4_AEO_quick_answers_schema.md đã chốt:

QuickAnswerCategory

QuickAnswer model

Yêu cầu: mọi page JSON (breed/list/comparison/cost/problem/anxiety/location) thêm:

quick_answers: QuickAnswer[]

faq: { question; answer }[] 

V7_tech4_AEO_quick_answers_sche…

Spec route /answers + logic search/filter + link về page + quiz

Cách build FAQPage JSON-LD từ faq[] / quick_answers[]

IMPLEMENTATION_PLAN PHASE 7–8:

Public JSON API endpoints (breed, cost, problem, lifestyle, costs) cho AEO 

IMPLEMENTATION_PLAN

PHASE 8: /answers/page.tsx dùng public APIs để surface quick answers + deep link + quiz.

AI coder checklist (AI coder.md) còn nhắc:

QA script phải check “không thiếu section critical (CTA, FAQ, quick answers)”. 

AI coder

=> Từ đây AI coder sẽ:

Update shared types cho từng page để include quick_answers.

Map quick_answers + faq sang schema.org trong layout/API.

Build /answers theo spec.

Không có lỗ hổng logic.

4. llmClient & model

File scripts/llmClient.ts:

Dùng OpenAI SDK v4

Đọc process.env.OPENAI_API_KEY

Fix default model gpt-4.1-mini với override bằng PETMATCHR_LLM_MODEL nếu muốn đổi sau. 

llmClient

IMPLEMENTATION_PLAN:

PHASE 9 yêu cầu:

scripts/llmClient.ts

scripts/generate-pages.ts dùng SYSTEM_PROMPT_PETMATCHR_V4 + PAGE prompt. 

IMPLEMENTATION_PLAN

=> Model đã chốt, đường gọi API rõ, AI coder không phải tự đoán.

5. AI coder checklist & implementation plan

Bạn đã có hai lớp “GPS” cho AI:

V7_tech3_prompt.md

System prompt cho AI coder (Next 14 + TS, 7 page_type, PAGE_MONETIZATION, batch gen, JSON API,…). 

V7_tech3_prompt

Checklist chi tiết bước 0 → bước 7 (init project, types, data, monetization, loaders, pages, API, batch generator).

IMPLEMENTATION_PLAN.md

12 PHASE, mỗi phase là todo cụ thể (pages, API, quizzes, answers hub, matrix, batch gen, QA, sitemap, analytics, npm scripts). 

IMPLEMENTATION_PLAN

AI coder.md

Gom checklist thành PHASE 0–12.

Master build prompt để dán thẳng vào AI code runner.

Ràng buộc:

Chỉ output code blocks

Show full file mỗi lần sửa

Giữ npm run lint + npm run build pass

Không tự bịa kiến trúc.

=> AI có đủ:

Vision (V7_PETMATCHR – BEST FINAL VERSION.md) 

V7_PETMATCHR – BEST FINAL VERS…

Roadmap (IMPLEMENTATION_PLAN + AI coder.md)

Tooling core (llmClient, prompts.ts, quiz-types, V7_tech1/2/3/4)

6. Chốt lại về “no human touch”

Pipeline đầy đủ cho 100% automation đã có:

Seed data: breeds.json, cities.json, problems.json, products.json, lifestyle_scores.json… 

V7_PETMATCHR – BEST FINAL VERS…

Page matrix: generate-page-matrix.ts → pageMatrix.json với { slug, page_type, seed_data, ai_prompt_version }. 

IMPLEMENTATION_PLAN

Batch content: generate-pages.ts dùng:

SYSTEM_PROMPT_PETMATCHR_V4

Đúng PAGE prompt

llmClient

validators + savePage + retry

QA: qa-check.ts check JSON, CTA, FAQ, quick_answers, duplicate, monetization logic. 

AI coder

Sitemaps, Answers Hub, quizzes, analytics, npm scripts đều được liệt kê trong plan.

Không có chỗ nào bắt buộc “human editor” mới chạy được. Human chỉ cần:

Dán system prompt coder + MASTER BUILD PROMPT

Cho AI chạy lần lượt PHASE 0 → 12.

7. Kết luận thẳng

Không còn gap logic nào bắt buộc bạn phải nghĩ thêm.

7 page_type + 7 content prompts: OK.

Quiz JSON + types: OK.

AEO / quick_answers / FAQ schema / Answers Hub: OK.

llmClient + model: OK.

Checklist từ spec → code: OK.

Bạn có thể cho AI start coding full project theo đúng checklist, không cần human chạm vào code.