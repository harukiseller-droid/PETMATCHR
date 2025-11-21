Mapping PAGE_MONETIZATION → CTA trong component
====================

Ý tưởng:
– PAGE_MONETIZATION quyết định page này kiếm tiền bằng gì.
– Component KHÔNG tự suy nghĩ. Nó chỉ đọc pageMonetization + contentData rồi render CTA theo rule.
– Tất cả rule gom vào 1 hàm helper resolvePageCTAs.

1.1. Schema PAGE_MONETIZATION (gợi ý)

// table: page_monetization

type PageMonetization = {
  slug: string;                  // "golden-retriever-cost-austin-texas"
  page_type:
    | "breed"
    | "list"
    | "comparison"
    | "cost"
    | "problem"
    | "anxiety"
    | "location";

  cluster:                       // money cluster chính
    | "insurance"
    | "training"
    | "cbd"
    | "generic";

  primary_funnel:                // quiz / flow chính
    | "insurance_quiz"
    | "behavior_quiz"
    | "anxiety_quiz"
    | "lifestyle_quiz"
    | "none";

  secondary_funnels:             // optional
    | "insurance_quiz"
    | "behavior_quiz"
    | "anxiety_quiz"
    | "lifestyle_quiz"
    | "none"[];

  primary_offer_type:            // offer gắn sau funnel
    | "insurance_offer"
    | "training_course"
    | "cbd_offer"
    | "generic_affiliate"
    | "none";

  secondary_offer_types: (
    | "insurance_offer"
    | "training_course"
    | "cbd_offer"
    | "generic_affiliate"
    | "none"
  )[];

  // optional flag bật/tắt block
  show_ads: boolean;
  show_email_capture: boolean;

  // mapping sang quiz / campaign cụ thể
  primary_quiz_slug: string | null;      // "insurance-fit-quiz"
  secondary_quiz_slugs: string[];       // ["behavior-check-quiz"]

  primary_campaign_id: string | null;   // ID trong email / tracking
};


1.2. Output CTA object cho component

type QuizCTA = {
  visible: boolean;
  quizSlug: string | null;
  label: string;         // text nút
  description: string;   // copy ngắn
};

type OfferCTA = {
  visible: boolean;
  offerType: "insurance" | "training" | "cbd" | "generic" | "none";
  partnerPlaceholder?: string;   // "EMBRACE_OR_TOP_PARTNER"
  deepLinkPlaceholder?: string;  // URL affiliate
  label: string;                 // text nút
  description: string;           // copy ngắn
};

type CTAConfig = {
  quizPrimary: QuizCTA | null;
  quizSecondary: QuizCTA[];
  offerPrimary: OfferCTA | null;
  offerSecondary: OfferCTA[];
  showAds: boolean;
  showEmailCapture: boolean;
};


1.3. Hàm resolvePageCTAs(pageMonetization, contentData)

Pseudo-code TS:

function resolvePageCTAs(
  monetization: PageMonetization,
  contentData: any // JSON content đã generate
): CTAConfig {
  const result: CTAConfig = {
    quizPrimary: null,
    quizSecondary: [],
    offerPrimary: null,
    offerSecondary: [],
    showAds: monetization.show_ads,
    showEmailCapture: monetization.show_email_capture,
  };

  // 1) Map primary funnel → quizPrimary
  if (monetization.primary_funnel !== "none") {
    const baseLabel = getQuizLabel(monetization.primary_funnel);
    const baseDesc = getQuizDescription(monetization.primary_funnel);

    // Ưu tiên copy từ contentData.cta nếu có
    const label =
      contentData?.cta?.quiz_anchor_label ??
      baseLabel ??
      "Take the quick quiz";
    const description =
      contentData?.cta?.quiz_anchor ??
      baseDesc ??
      "Answer a few questions to get a clear next step.";

    result.quizPrimary = {
      visible: true,
      quizSlug: monetization.primary_quiz_slug,
      label,
      description,
    };
  }

  // 2) Map secondary_funnels → quizSecondary
  if (monetization.secondary_funnels?.length) {
    result.quizSecondary = monetization.secondary_funnels
      .filter((f) => f !== "none")
      .map((funnel, idx) => ({
        visible: true,
        quizSlug: monetization.secondary_quiz_slugs[idx] ?? null,
        label: getQuizLabel(funnel),
        description: getQuizDescription(funnel),
      }));
  }

  // 3) Map primary_offer_type → offerPrimary
  if (monetization.primary_offer_type !== "none") {
    const offerType = mapOfferType(monetization.primary_offer_type);

    const label =
      contentData?.insurance_section?.primary_offer_slot?.cta_headline ||
      contentData?.course_recommendation?.cta_button_label ||
      getOfferLabel(offerType);

    const description =
      contentData?.insurance_section?.primary_offer_slot?.cta_copy ||
      contentData?.course_recommendation?.body ||
      getOfferDescription(offerType);

    const partnerPlaceholder =
      contentData?.insurance_section?.primary_offer_slot?.provider_placeholder ||
      contentData?.course_recommendation?.affiliate_slot?.partner_placeholder ||
      getDefaultPartnerPlaceholder(offerType);

    const deepLinkPlaceholder =
      contentData?.course_recommendation?.affiliate_slot
        ?.deep_link_placeholder ||
      getDefaultDeepLinkPlaceholder(offerType);

    result.offerPrimary = {
      visible: true,
      offerType,
      partnerPlaceholder,
      deepLinkPlaceholder,
      label,
      description,
    };
  }

  // 4) Map secondary_offer_types → offerSecondary
  if (monetization.secondary_offer_types?.length) {
    result.offerSecondary = monetization.secondary_offer_types
      .filter((t) => t !== "none")
      .map((t) => {
        const type = mapOfferType(t);
        return {
          visible: true,
          offerType: type,
          partnerPlaceholder: getDefaultPartnerPlaceholder(type),
          deepLinkPlaceholder: getDefaultDeepLinkPlaceholder(type),
          label: getOfferLabel(type),
          description: getOfferDescription(type),
        };
      });
  }

  return result;
}


Helper mapping (rule rõ ràng):

function mapOfferType(
  raw: PageMonetization["primary_offer_type"]
): OfferCTA["offerType"] {
  switch (raw) {
    case "insurance_offer":
      return "insurance";
    case "training_course":
      return "training";
    case "cbd_offer":
      return "cbd";
    case "generic_affiliate":
      return "generic";
    default:
      return "none";
  }
}

function getQuizLabel(funnel: PageMonetization["primary_funnel"]): string {
  switch (funnel) {
    case "insurance_quiz":
      return "Take the 60-second Insurance Fit Quiz";
    case "behavior_quiz":
      return "Take the 2-minute Behavior Check Quiz";
    case "anxiety_quiz":
      return "Take the Anxiety Level Quiz";
    case "lifestyle_quiz":
      return "Find your best-fit dog in 60 seconds";
    default:
      return "Take the quick quiz";
  }
}

function getQuizDescription(
  funnel: PageMonetization["primary_funnel"]
): string {
  switch (funnel) {
    case "insurance_quiz":
      return "Answer a few questions and see if pet insurance actually makes sense for you.";
    case "behavior_quiz":
      return "Score your dog’s behavior and get a simple training plan to start this week.";
    case "anxiety_quiz":
      return "See how serious your dog’s anxiety is and what level of support you really need.";
    case "lifestyle_quiz":
      return "Match your real life to the 3–5 breeds that fit you best.";
    default:
      return "Get a clear next step based on your situation.";
  }
}

function getOfferLabel(type: OfferCTA["offerType"]): string {
  switch (type) {
    case "insurance":
      return "Check pet insurance rates";
    case "training":
      return "See the recommended training course";
    case "cbd":
      return "View calming support options";
    case "generic":
      return "See recommended products";
    default:
      return "";
  }
}

function getOfferDescription(type: OfferCTA["offerType"]): string {
  switch (type) {
    case "insurance":
      return "Compare plans in minutes and see how much a real emergency would cost with and without coverage.";
    case "training":
      return "Follow a structured, step-by-step plan instead of guessing your way through YouTube videos.";
    case "cbd":
      return "Review vetted calming products that can support your dog while you work on training.";
    case "generic":
      return "See a short list of products that actually match this problem and lifestyle.";
    default:
      return "";
  }
}

function getDefaultPartnerPlaceholder(type: OfferCTA["offerType"]): string {
  switch (type) {
    case "insurance":
      return "EMBRACE_OR_TOP_PARTNER";
    case "training":
      return "BRAIN_TRAINING_OR_EQUIVALENT";
    case "cbd":
      return "CBD_TOP_PARTNER";
    case "generic":
      return "AMAZON_OR_CHEWY";
    default:
      return "";
  }
}

function getDefaultDeepLinkPlaceholder(type: OfferCTA["offerType"]): string {
  // đây là chỗ mày map sang tracking link thật sau
  switch (type) {
    case "insurance":
      return "https://partner.insurance.example/track";
    case "training":
      return "https://partner.training.example/track";
    case "cbd":
      return "https://partner.cbd.example/track";
    case "generic":
      return "https://amazon.com/...ref=petmatchr";
    default:
      return "";
  }
}


1.4. Dùng CTAConfig trong component

Ví dụ trong CostPageView:

import { resolvePageCTAs } from "@/lib/cta";
import type { CostPage } from "@/lib/data";
import type { PageMonetization } from "@/lib/monetization";

type Props = {
  data: CostPage;
  monetization: PageMonetization;
};

export function CostPageView({ data, monetization }: Props) {
  const cta = resolvePageCTAs(monetization, data);

  return (
    <main>
      {/* nội dung chính */}

      {cta.quizPrimary?.visible && (
        <section>
          <h2>{cta.quizPrimary.label}</h2>
          <p>{cta.quizPrimary.description}</p>
          {/* link sang /quiz/[slug] = cta.quizPrimary.quizSlug */}
        </section>
      )}

      {cta.offerPrimary?.visible && (
        <section>
          <h2>{cta.offerPrimary.label}</h2>
          <p>{cta.offerPrimary.description}</p>
          {/* dùng offerPrimary.partnerPlaceholder & deepLinkPlaceholder để map sang link thực */}
        </section>
      )}

      {/* secondary quiz / offer nếu muốn */}
    </main>
  );
}


Mapping cho breed/problem/anxiety page giống hệt, chỉ khác contentData truyền vào.

====================
2. Pseudo-code: generate batch pages từ pageMatrix[] + call AI + save JSON

Mục tiêu:

Input: pageMatrix[] (danh sách page cần tạo, với type + seed data).

Pipeline: chunk → call AI → validate JSON → lưu file → log error.

Có retry và concurrency limit.

2.1. Định nghĩa kiểu pageMatrix

type PageType =
  | "breed"
  | "list"
  | "comparison"
  | "cost"
  | "problem"
  | "anxiety"
  | "location";

type PageMatrixItem = {
  slug: string;
  page_type: PageType;
  seed_data: any;          // ví dụ: {breed, scores, city, costBase, problem, location...}
  // optional
  ai_prompt_version?: string;  // "V4.0"
};


2.2. Hàm getPrompt & input JSON cho từng page_type

function buildAIRequest(item: PageMatrixItem) {
  switch (item.page_type) {
    case "breed":
      return {
        system: SYSTEM_PROMPT_PETMATCHR_V4,
        user: BREED_PAGE_PROMPT,    // chuỗi prompt đã viết trước
        jsonInput: {
          breed: item.seed_data.breed,
          scores: item.seed_data.scores,
        },
      };

    case "cost":
      return {
        system: SYSTEM_PROMPT_PETMATCHR_V4,
        user: COST_PAGE_PROMPT,
        jsonInput: {
          breed: item.seed_data.breed,
          city: item.seed_data.city,
          baseCosts: item.seed_data.baseCosts,
          localAdjustments: item.seed_data.localAdjustments,
        },
      };

    case "problem":
      return {
        system: SYSTEM_PROMPT_PETMATCHR_V4,
        user: PROBLEM_PAGE_PROMPT,
        jsonInput: {
          breed: item.seed_data.breed,
          problem: item.seed_data.problem,
          scores: item.seed_data.scores,
        },
      };

    // ... list, comparison, anxiety, location tương tự

    default:
      throw new Error(`Unsupported page_type: ${item.page_type}`);
  }
}


2.3. Hàm gọi LLM (giữ generic)

async function callLLM({
  system,
  user,
  jsonInput,
}: {
  system: string;
  user: string;
  jsonInput: any;
}): Promise<any> {
  const messages = [
    { role: "system", content: system },
    {
      role: "user",
      content: `${user}\n\nINPUT_JSON:\n${JSON.stringify(jsonInput)}`,
    },
  ];

  // Pseudo, thay bằng SDK thật
  const raw = await someLLMClient.chatCompletion({
    model: "gpt-5.1-thinking", // hoặc Claude...
    messages,
    temperature: 0.3,
  });

  const text = raw.choices[0].message.content;

  // parse JSON, thêm layer sanitize
  try {
    return JSON.parse(text);
  } catch (e) {
    // có thể thử regex cắt phần JSON
    throw new Error("Invalid JSON from LLM");
  }
}


2.4. Validate output JSON (Zod hoặc tự check)

Pseudo check đơn giản:

function basicValidateOutput(pageType: PageType, output: any): boolean {
  if (!output || typeof output !== "object") return false;
  if (typeof output.slug !== "string") return false;
  if (!output.meta || typeof output.meta.title !== "string") return false;

  switch (pageType) {
    case "cost":
      if (!output.first_year_breakdown || !Array.isArray(output.first_year_breakdown)) return false;
      if (!output.monthly_breakdown || !Array.isArray(output.monthly_breakdown)) return false;
      break;
    case "problem":
      if (!Array.isArray(output.symptoms)) return false;
      if (!output.section_step_by_step_plan?.steps) return false;
      break;
    // thêm rule cho breed/list/comparison/anxiety/location
  }

  return true;
}


2.5. Save JSON ra file

import fs from "fs/promises";
import path from "path";

async function savePageJson(pageType: PageType, slug: string, data: any) {
  const dir = path.join(process.cwd(), "data", "pages", pageType);
  const filePath = path.join(dir, `${slug}.json`);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}


2.6. Generate cho 1 item (có retry)

async function generateSinglePage(item: PageMatrixItem): Promise<void> {
  const { system, user, jsonInput } = buildAIRequest(item);

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const output = await callLLM({ system, user, jsonInput });

      if (!basicValidateOutput(item.page_type, output)) {
        throw new Error("Validation failed");
      }

      // đảm bảo slug đúng
      output.slug = item.slug;

      await savePageJson(item.page_type, item.slug, output);
      console.log(
        `[OK] Generated ${item.page_type} page: ${item.slug} (attempt ${attempts})`
      );
      return;
    } catch (err) {
      console.error(
        `[ERROR] ${item.page_type}:${item.slug} attempt ${attempts} –`,
        (err as Error).message
      );
      if (attempts >= maxAttempts) {
        console.error(
          `[FAIL] Giving up on ${item.page_type}:${item.slug} after ${attempts} attempts`
        );
      } else {
        // optional: delay giữa các lần retry
        await new Promise((res) => setTimeout(res, 1000 * attempts));
      }
    }
  }
}


2.7. Batch với concurrency limit

async function generateBatch(pageMatrix: PageMatrixItem[], concurrency = 5) {
  const queue = [...pageMatrix];
  let running = 0;

  return new Promise<void>((resolve) => {
    const runNext = () => {
      if (queue.length === 0 && running === 0) {
        return resolve();
      }

      while (running < concurrency && queue.length > 0) {
        const item = queue.shift()!;
        running++;

        generateSinglePage(item)
          .catch((e) => {
            console.error("[FATAL ERROR] while generating page", e);
          })
          .finally(() => {
            running--;
            runNext();
          });
      }
    };

    runNext();
  });
}


2.8. Main script

async function main() {
  // load pageMatrix từ DB / file
  const pageMatrix: PageMatrixItem[] = await loadPageMatrix();

  // optional: filter những page chưa có file JSON
  const toGenerate = await filterAlreadyGenerated(pageMatrix);

  console.log(`Generating ${toGenerate.length} pages...`);

  await generateBatch(toGenerate, 10);

  console.log("Done.");
}

main().catch((e) => {
  console.error("Batch generation failed:", e);
  process.exit(1);
});


2.9. filterAlreadyGenerated

async function filterAlreadyGenerated(
  items: PageMatrixItem[]
): Promise<PageMatrixItem[]> {
  const fs = await import("fs/promises");
  const path = await import("path");

  const results: PageMatrixItem[] = [];

  for (const item of items) {
    const filePath = path.join(
      process.cwd(),
      "data",
      "pages",
      item.page_type,
      `${item.slug}.json`
    );
    try {
      await fs.access(filePath);
      // đã tồn tại → skip
    } catch {
      results.push(item);
    }
  }

  return results;
}


Vậy là:

PAGE_MONETIZATION → CTA: đã có schema + mapping rõ.

Batch generator: đã có pipeline đầy đủ từ pageMatrix → LLM → validate → save JSON → concurrency.

Dev đọc là code được thẳng, mày chỉ cần chỉnh theo stack thực tế (SDK LLM, path, type chi tiết).