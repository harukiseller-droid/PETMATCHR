// AEO QUICK ANSWERS & FAQ SCHEMA

// 1) QuickAnswers model – dùng chung cho mọi page

export type QuickAnswerCategory = "Living" | "Costs" | "Health" | "Training";

export type QuickAnswer = {
  id: string;                 // "qa1", "qa2"...
  page_slug: string;          // slug của page gốc
  question: string;           // câu hỏi ngắn, đúng search intent
  answer: string;             // 1–3 câu, có số liệu cụ thể nếu có (score, cost range)
  category: QuickAnswerCategory;
  primary_intent: "informational" | "commercial" | "navigational";
};

// 2) Mọi JSON content type (breed/list/comparison/cost/problem/anxiety/location)
//    đều thêm 2 field optional:

// ví dụ cho bất kỳ page JSON:
type BasePageWithAEO = {
  // ... các field hiện có (meta, h1, sections, faq...)
  quick_answers: QuickAnswer[];
  faq: {
    question: string;
    answer: string;
  }[];
};

// 3) Answers Hub

// Route: /answers
// Logic (pseudo):
//
// - Load tất cả page JSON (hoặc 1 index tổng hợp QuickAnswer[]) từ DB / filesystem.
// - Render search box + filter by category ("Living", "Costs", "Health", "Training").
// - Kết quả:
//   - show question + short answer,
//   - link trở lại page gốc,
//   - nếu có quizPrimary trong CTAConfig → show link quiz.


// 4) FAQ schema (schema.org) cho từng page

// Trong mỗi route API JSON (vd /api/breed/[slug].json) hoặc layout page,
// expose thêm 1 block JSON-LD:

/*
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is French Bulldog good for apartments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "French Bulldogs usually do well in small apartments because they are low-energy and don’t need long walks, but they can be prone to breathing issues in heat."
      }
    }
    // map từ faq[] hoặc quick_answers[]
  ]
}
</script>
*/

// AI coder chỉ cần:
// - Map quick_answers[] hoặc faq[] → mainEntity[] như trên.
// - Đảm bảo text ngắn, rõ, có số liệu khi có (score, cost range…).

// 5) API cho AEO

// Tối thiểu các endpoint sau đã có trong V7 spec:
// /api/breed/{slug}.json
// /api/lifestyle/{type}.json
// /api/costs/{breed}/{city}.json
// /api/problems/{breed}.json
//
// Yêu cầu bổ sung:
// - Mỗi response JSON phải include:
//   - meta, h1, sections, faq, quick_answers.
// - Thêm Cache-Control + CORS như đã ghi trong AI coder.md để AI crawler dùng được.
