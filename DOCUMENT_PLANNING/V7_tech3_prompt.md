Tao sẽ làm 3 phần:

SYSTEM PROMPT CHO AI CODER (dùng cho cả project)

CHECKLIST TỪNG BƯỚC + PROMPT CON (AI tự tạo code, file, folder)

LƯU Ý QUAN TRỌNG ĐỂ TRÁNH AI HÃM

Mày chỉ việc copy–paste mấy block này vào con AI-code (ChatGPT, Claude, v.v.), chạy từng bước.

────────────────

SYSTEM PROMPT CHO AI CODER (MASTER)
────────────────

Dùng cái này làm system / role cho AI coder trước khi chạy bất kỳ task nào.

SYSTEM_PROMPT_PETMATCHR_CODER_V1

"""
You are a senior TypeScript + Next.js 14 engineer, building the PetMatchr project 100% in code.

Context:

Project: PetMatchr – a programmatic website that helps US users choose dog breeds and solve dog-related problems (cost, behavior, anxiety, etc.).

Monetization: pet insurance, dog training course, CBD/supplements, subscriptions, generic affiliate, ads.

Architecture:

Next.js 14 App Router

TypeScript

File-based JSON data for year 1 (no complex DB required at start)

Static generation (SSG) / ISR for all pages

Public JSON API endpoints for AEO (Answer Engine Optimization)

Core concepts:

Breed data (20+ traits)

Lifestyle scores (apartment, busy_worker, family_with_kids, allergy_friendly, beginner_friendly, active_outdoor)

Page types: breed, lifestyle list, comparison, cost, problem, anxiety, location

PAGE_MONETIZATION mapping → CTA (quiz + primary offer + secondary offers)

Batch content generation: CLI script that calls an LLM, validates JSON, saves to /data/pages/{page_type}/{slug}.json

Frontend reads from JSON, not from the LLM.

Global rules:

Always keep the project buildable with npm run lint and npm run build.

Always show full file contents when you create or modify a file, not just snippets.

Do not invent random folder structures. Use the structure defined in the user instructions.

Keep types strict and re-used: define shared types in a central file and import them.

All data models must match the JSON examples and type definitions from the user spec.

When unsure between two options, choose the simpler one that still works and document the tradeoff in comments.

Output format:

When asked to implement or change code, output ONLY code blocks with the file path as a comment at the top, like:
// FILE: app/page.tsx

<code here>

Do NOT add explanations outside code blocks unless the user explicitly asks for commentary.
"""

────────────────
2) CHECKLIST + PROMPT CON CHO TỪNG BƯỚC
────────────────

Ý tưởng:
– Bước 0: tạo project + cấu trúc thư mục.
– Bước 1: định nghĩa types shared.
– Bước 2: tạo data JSON mẫu.
– Bước 3: tạo PAGE_MONETIZATION + CTA mapping.
– Bước 4: làm loaders + helpers.
– Bước 5: làm Next.js routes + component cho breed/cost/problem.
– Bước 6: làm public API endpoint (AEO).
– Bước 7: làm batch generator CLI (call LLM, validate JSON, save file).

Em copy từng prompt con, chạy lần lượt. AI sẽ tạo code tương ứng.

────────────────
PROMPT 0 – KHỞI TẠO PROJECT + CẤU TRÚC FOLDER
────────────────

Dùng sau khi set SYSTEM_PROMPT ở trên.

"""
Task: Initialize the PetMatchr codebase as a Next.js 14 App Router project with TypeScript, and create the base folder structure.

Requirements:

Assume we run:

npx create-next-app@latest petmatchr --typescript --app --eslint --src-dir --no-tailwind

We are now inside the petmatchr root folder.

Create the following folders if they do not exist:

/src/data

/src/data/pages/breed

/src/data/pages/cost

/src/data/pages/problem

/src/data/pages/list

/src/data/pages/comparison

/src/data/pages/anxiety

/src/data/pages/location

/src/lib

/src/components

/src/app/breeds

/src/app/cost

/src/app/problems

/src/app/api

Add a basic src/app/layout.tsx and src/app/page.tsx that render a simple shell:

Site header with "PetMatchr"

Simple main layout with children.

Use the file path convention in your output:
// FILE: src/app/layout.tsx

<code>

// FILE: src/app/page.tsx
<code>
// FILE: src/data/README.md
<code>

Now, generate all necessary files to satisfy this step.
"""

────────────────
PROMPT 1 – ĐỊNH NGHĨA TYPES (BREEDS, LIFESTYLE_SCORES, COST_PAGE, PROBLEM_PAGE, PAGE_MONETIZATION, CTA)
────────────────

"""
Task: Define all core TypeScript types for PetMatchr and a central type module.

Create a file: src/lib/types.ts and define:

Breed

Fields:

id, slug, name, short_name

size ("toy" | "small" | "medium" | "large" | "giant")

energy_level, shedding_level, barking_level, trainability, kid_friendly, dog_friendly, stranger_friendly, apartment_suitable, first_time_owner_friendly, alone_time_tolerance, exercise_need, grooming_need, cost_level (all int 1–5)

common_health_issues: string[]

lifespan_min_years, lifespan_max_years

origin_country

temperament_keywords: string[]

monthly_cost_min_usd, monthly_cost_max_usd, year1_cost_min_usd, year1_cost_max_usd

primary_image_url?: string

notes_internal?: string

LifestyleScore

breed_id: string

apartment_score, busy_worker_score, family_with_kids_score, allergy_friendly_score, beginner_friendly_score, active_outdoor_score (0–10)

CostPage

slug, meta {title, description}, h1

hero { city, breed_name, one_line_summary }

summary { first_year_min_usd, first_year_max_usd, ongoing_monthly_min_usd, ongoing_monthly_max_usd, emergency_fund_recommended_usd, insurance_recommended }

first_year_breakdown: array of {category, min_usd, max_usd, notes}

monthly_breakdown: same structure

emergency_costs { typical_emergency_range_usd {low, high}, common_emergencies: string[], one_line_warning }

insurance_section { recommended, reason, typical_premium_range_usd {low, high}, value_explainer, primary_offer_slot { provider_placeholder, cta_headline, cta_copy } }

local_context { city, state, cost_of_living_note, dog_friendly_note }

faq: array {question, answer}

cta: { cost_calculator_anchor, insurance_quiz_anchor }

ProblemPage

slug, meta {title, description}, h1

hero { breed_name, one_line_summary }

intro { paragraphs: string[] }

symptoms: string[]

root_causes: string[]

section_home_alone_expectations { heading, paragraphs: string[] }

section_step_by_step_plan { heading, steps: {title, detail}[] }

section_when_to_get_help { heading, paragraphs: string[] }

course_recommendation { headline, body, benefit_bullets: string[], cta_button_label, affiliate_slot { partner_placeholder, deep_link_placeholder } }

faq: array {question, answer}

cta: { quiz_anchor, course_anchor }

PageType union:
export type PageType =
| "breed"
| "list"
| "comparison"
| "cost"
| "problem"
| "anxiety"
| "location";

PageMonetization

slug: string

page_type: PageType

cluster: "insurance" | "training" | "cbd" | "generic"

primary_funnel: "insurance_quiz" | "behavior_quiz" | "anxiety_quiz" | "lifestyle_quiz" | "none"

secondary_funnels: same union[]

primary_offer_type: "insurance_offer" | "training_course" | "cbd_offer" | "generic_affiliate" | "none"

secondary_offer_types: same union[]

show_ads: boolean

show_email_capture: boolean

primary_quiz_slug: string | null

secondary_quiz_slugs: string[]

primary_campaign_id: string | null

CTA types:

QuizCTA, OfferCTA, CTAConfig (quizPrimary, quizSecondary, offerPrimary, offerSecondary, showAds, showEmailCapture)

Export all of these types from src/lib/types.ts

Output exactly one code block with:
// FILE: src/lib/types.ts
<code>
"""

────────────────
PROMPT 2 – TẠO DATA JSON MẪU (BREEDS, LIFESTYLE_SCORES, COST_PAGE, PROBLEM_PAGE)
────────────────

Dùng lại ví dụ Golden + Frenchie + 2 page vừa làm trước đó.

"""
Task: Create initial seed data JSON files for PetMatchr.

Create:

FILE: src/data/breeds.json

Array of at least 2 Breed records: Golden Retriever and French Bulldog, matching the Breed type.

FILE: src/data/lifestyle_scores.json

Array of LifestyleScore for these 2 breeds.

FILE: src/data/pages/cost/golden-retriever-cost-austin-texas.json

Use the cost page JSON structure for Golden Retriever in Austin, Texas exactly as specified in the user brief.

FILE: src/data/pages/problem/golden-retriever-separation-anxiety.json

Use the problem page JSON structure for Golden Retriever separation anxiety exactly as specified in the user brief.

All JSON must be valid and match the TypeScript types from src/lib/types.ts.

Output multiple code blocks, one per file, using the pattern:
// FILE: src/data/breeds.json
<json>
"""

────────────────
PROMPT 3 – IMPLEMENT DATA LOADERS + CTA MAPPING
────────────────

Cho AI code helpers đọc JSON, và hàm resolvePageCTAs.

"""
Task: Implement data loader utilities and CTA mapping based on PAGE_MONETIZATION.

Create file: src/lib/data.ts

Functions:

getBreeds(): Promise<Breed[]>

getBreedBySlug(slug: string): Promise<Breed | null>

getLifestyleScores(): Promise<LifestyleScore[]>

getLifestyleScoreForBreed(breedId: string): Promise<LifestyleScore | null>

getCostPageBySlug(slug: string): Promise<CostPage | null>

Reads JSON from src/data/pages/cost/{slug}.json

getProblemPageBySlug(slug: string): Promise<ProblemPage | null>

Reads JSON from src/data/pages/problem/{slug}.json

You can use dynamic import with import() or Node fs from next/dist/server/node-polyfill-* compatible approach.

Keep it simple: since this is SSG, reading from filesystem is acceptable.

Create file: src/data/page_monetization.json

Array of PageMonetization with at least 2 entries:

golden-retriever-cost-austin-texas → page_type "cost", cluster "insurance", primary_funnel "insurance_quiz", primary_offer_type "insurance_offer"

golden-retriever-separation-anxiety → page_type "problem", cluster "training", primary_funnel "behavior_quiz", primary_offer_type "training_course"

Create file: src/lib/monetization.ts

Load page_monetization.json.

Function getPageMonetization(slug: string): Promise<PageMonetization | null>.

Create file: src/lib/cta.ts

Implement resolvePageCTAs(monetization: PageMonetization, contentData: any): CTAConfig

Implement helper functions:

mapOfferType

getQuizLabel

getQuizDescription

getOfferLabel

getOfferDescription

getDefaultPartnerPlaceholder

getDefaultDeepLinkPlaceholder

Follow the mapping logic described in the spec:

primary_funnel → quizPrimary

secondary_funnels → quizSecondary

primary_offer_type → offerPrimary

secondary_offer_types → offerSecondary

use contentData.insurance_section.primary_offer_slot and contentData.course_recommendation.affiliate_slot when available.

Output:

FILE: src/lib/data.ts

FILE: src/data/page_monetization.json

FILE: src/lib/monetization.ts

FILE: src/lib/cta.ts
"""

────────────────
PROMPT 4 – IMPLEMENT BREED, COST, PROBLEM ROUTES + VIEW COMPONENTS
────────────────

Cho AI tạo page route và component, dùng CTAConfig.

"""
Task: Implement the first 3 page types: breed, cost, problem.

Breed route:

FILE: src/app/breeds/[slug]/page.tsx

Use getBreedBySlug and getLifestyleScoreForBreed to fetch data.

For now, just render a minimal page:

h1 with breed name

simple list of traits.

Later we will wire it to AI-generated BreedPage JSON, so keep the structure simple and typed.

Cost route + view:

FILE: src/app/cost/[slug]/page.tsx

Fetch CostPage via getCostPageBySlug(slug).

Fetch PageMonetization via getPageMonetization(slug).

Compute ctaConfig via resolvePageCTAs(monetization, costPage).

Pass both to CostPageView.

FILE: src/components/CostPageView.tsx

Props: { data: CostPage; cta: CTAConfig }

Render:

meta title + description

h1, hero one_line_summary

first-year summary and breakdown table

monthly breakdown table

emergency_costs block

insurance_section short summary

FAQ

CTA section:

quizPrimary (if visible)

offerPrimary (if visible)

Problem route + view:

FILE: src/app/problems/[slug]/page.tsx

Fetch ProblemPage via getProblemPageBySlug.

Fetch PageMonetization + resolvePageCTAs.

Pass to ProblemPageView.

FILE: src/components/ProblemPageView.tsx

Props: { data: ProblemPage; cta: CTAConfig }

Render:

meta, h1, intro paragraphs

symptoms, root_causes

section_home_alone_expectations

section_step_by_step_plan (steps as ordered list)

section_when_to_get_help

course_recommendation block

FAQ

CTA for quizPrimary + offerPrimary.

Make sure all imports use the types from src/lib/types.ts.

Output all required files with full content.
"""

────────────────
PROMPT 5 – API ROUTES PUBLIC JSON (AEO)
────────────────

Cho AI tạo API cho AEO: /api/breed, /api/cost, /api/problem.

"""
Task: Expose basic public JSON API endpoints for AEO.

Create API routes using Next.js App Router:

/api/breed/[slug]

FILE: src/app/api/breed/[slug]/route.ts

GET handler:

Load Breed via getBreedBySlug.

Load LifestyleScore via getLifestyleScoreForBreed.

If not found, return 404.

Return JSON: { breed, scores }.

/api/cost/[slug]

FILE: src/app/api/cost/[slug]/route.ts

GET handler:

Load CostPage via getCostPageBySlug.

If not found, 404.

Return JSON with minimal fields:
{ slug, hero, summary, emergency_costs, insurance_section, local_context, faq }

/api/problem/[slug]

FILE: src/app/api/problem/[slug]/route.ts

GET handler:

Load ProblemPage via getProblemPageBySlug.

Return JSON: { slug, hero, symptoms, root_causes, section_step_by_step_plan, course_recommendation, faq }.

Use NextResponse from 'next/server'. All handlers must be async and typed.

Output the three route files.
"""

────────────────
PROMPT 6 – BATCH GENERATOR: PAGE_MATRIX + CALL LLM + SAVE JSON
────────────────

Đây là phần nặng nhất: AI code luôn CLI script.

"""
Task: Implement a Node CLI tool to batch-generate content JSON from a pageMatrix using an LLM.

Assumptions:

We run this script with: ts-node scripts/generate-pages.ts or node dist/scripts/generate-pages.js after build.

The LLM is OpenAI-compatible. Use the official openai npm package v4 style with fetch API.

The API key is read from process.env.OPENAI_API_KEY.

The LLM will be prompted with the SYSTEM_PROMPT_PETMATCHR_V4 and per-page user prompts (breed, cost, problem, etc.).

For this step, implement cost and problem generation as example.

Steps:

Create folder: /scripts

Create file: scripts/pageMatrix.ts

Define PageType and PageMatrixItem:

page_type: "cost" | "problem" (for now)

slug: string

seed_data: any

Export a sample pageMatrix: PageMatrixItem[] with a few items:

golden-retriever-cost-austin-texas

golden-retriever-separation-anxiety

For seed_data, include:

breed (from breeds.json)

scores (from lifestyle_scores.json)

city info or problem info.

Use synchronous imports from src/data where needed.

Create file: scripts/prompts.ts

Export:

SYSTEM_PROMPT_PETMATCHR_V4: string

COST_PAGE_PROMPT: string

PROBLEM_PAGE_PROMPT: string

For now, you can use shortened versions that clearly instruct the model to output ONLY JSON matching CostPage or ProblemPage types.

Create file: scripts/llmClient.ts

Implement a simple wrapper:

function callLLM(system: string, user: string, jsonInput: any): Promise<any>

Use fetch to call https://api.openai.com/v1/chat/completions
 with model gpt-4.1 (or similar), messages: system + user, and JSON.stringify(jsonInput) appended at the end of the user content.

Parse JSON from the response content.

Create file: scripts/validators.ts

Implement basicValidateOutput(pageType: "cost" | "problem", output: any): boolean as in the spec:

cost: must have slug, meta.title, first_year_breakdown array, monthly_breakdown array.

problem: must have slug, meta.title, symptoms array, section_step_by_step_plan.steps.

Create file: scripts/savePage.ts

Implement function savePageJson(pageType: "cost" | "problem", slug: string, data: any):

Write to src/data/pages/{pageType}/{slug}.json

Ensure folders exist.

Create file: scripts/generate-pages.ts

Import pageMatrix, callLLM, validators, savePageJson, prompts.

Implement:

buildAIRequest(item: PageMatrixItem) → {system, user, jsonInput}
(map cost → COST_PAGE_PROMPT, problem → PROBLEM_PAGE_PROMPT, etc.)

generateSinglePage(item): with retry up to 3 times:

callLLM

validate

override output.slug = item.slug

savePageJson

generateBatch(pageMatrix, concurrency = 5): run queue with limited concurrency.

In main():

Filter out items that already have JSON files.

Run generateBatch.

Log summary.

All scripts must be TypeScript (.ts) and compile with tsc. Use ES modules compatible syntax.

Output the following files:

FILE: scripts/pageMatrix.ts

FILE: scripts/prompts.ts

FILE: scripts/llmClient.ts

FILE: scripts/validators.ts

FILE: scripts/savePage.ts

FILE: scripts/generate-pages.ts
"""

────────────────
PROMPT 7 – LINT, BUILD, SANITY CHECK
────────────────

Khi mọi thứ xong, chạy prompt này:

"""
Task: Review the entire codebase structure and ensure TypeScript and Next.js build will pass.

List all files you have created in this conversation for the PetMatchr project, grouped by:

app routes

components

lib

data

scripts

For each file, quickly scan for:

Missing imports

Wrong type imports

Obvious runtime errors (undefined variable, typo in function name, etc.)

If you spot any issue, output corrected versions of the relevant files.

Do NOT change the project structure. Only fix what is necessary for npm run lint and npm run build to succeed.

Output only the updated files (if any) with full content.
"""

────────────────
3) LƯU Ý QUAN TRỌNG KHI DÙNG 100% AI CODING
────────────────

Không để AI “quên” spec
– Luôn giữ SYSTEM_PROMPT_PETMATCHR_CODER_V1 ở khung system.
– Khi đổi task, nhắc lại: “use the same project and types as before, do not change architecture”.

Không cho AI đổi folder structure
– Luôn viết rõ FILE: path ở mỗi prompt.
– Nếu nó tự bịa path khác, bắt nó sửa lại.

Batch lớn thì chia nhỏ
– Đầu tiên để AI tạo toàn bộ khung code + 2 page mẫu (Golden).
– Sau đó mới dùng script generate-pages.ts chạy 100–200 page để test.
– Khi ok, scale lên 1K–2K page.

Secrets / API key
– Đây không phải coding, nên mày vẫn phải tự set:

OPENAI_API_KEY trong .env.local.

Check lại scripts/llmClient.ts dùng process.env.OPENAI_API_KEY.

Nếu AI bị “đãng trí”
– Khi thấy nó generate code không khớp types / spec, copy file types.ts + ví dụ JSON vào prompt, bắt nó align lại.

Với bộ prompt + spec này, mày có thể ném cho AI-code và cho nó tự scaffold full project, thêm page type mới, sửa CTA, v.v., mà không cần dev người dịch lại ý.