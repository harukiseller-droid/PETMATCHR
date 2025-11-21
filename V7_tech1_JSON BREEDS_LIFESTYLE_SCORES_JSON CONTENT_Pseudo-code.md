=====================

Mẫu JSON BREEDS + LIFESTYLE_SCORES
(cho Golden Retriever và French Bulldog)
=====================

Đây là kiểu dữ liệu lưu trong DB / file JSON cho 2 breed.

breeds.json (rút gọn ví dụ 2 record)

[
  {
    "id": "golden-retriever",
    "slug": "golden-retriever",
    "name": "Golden Retriever",
    "short_name": "Golden Retriever",
    "size": "large",
    "energy_level": 4,
    "shedding_level": 5,
    "barking_level": 3,
    "trainability": 5,
    "kid_friendly": 5,
    "dog_friendly": 4,
    "stranger_friendly": 4,
    "apartment_suitable": 2,
    "first_time_owner_friendly": 3,
    "alone_time_tolerance": 2,
    "exercise_need": 5,
    "grooming_need": 3,
    "cost_level": 4,
    "common_health_issues": [
      "Hip dysplasia",
      "Elbow dysplasia",
      "Allergies",
      "Cancer risk"
    ],
    "lifespan_min_years": 10,
    "lifespan_max_years": 12,
    "origin_country": "Scotland",
    "temperament_keywords": [
      "friendly",
      "loyal",
      "gentle",
      "eager to please"
    ],
    "monthly_cost_min_usd": 120,
    "monthly_cost_max_usd": 250,
    "year1_cost_min_usd": 1500,
    "year1_cost_max_usd": 3500,
    "primary_image_url": "https://cdn.petmatchr.com/breeds/golden-retriever/main.jpg",
    "notes_internal": "Very popular US family dog; strong fetch/hunting drive; needs daily exercise."
  },
  {
    "id": "french-bulldog",
    "slug": "french-bulldog",
    "name": "French Bulldog",
    "short_name": "Frenchie",
    "size": "small",
    "energy_level": 2,
    "shedding_level": 2,
    "barking_level": 2,
    "trainability": 3,
    "kid_friendly": 4,
    "dog_friendly": 3,
    "stranger_friendly": 3,
    "apartment_suitable": 5,
    "first_time_owner_friendly": 4,
    "alone_time_tolerance": 3,
    "exercise_need": 2,
    "grooming_need": 2,
    "cost_level": 5,
    "common_health_issues": [
      "Brachycephalic airway syndrome",
      "Allergies",
      "Spinal issues",
      "Heat intolerance"
    ],
    "lifespan_min_years": 10,
    "lifespan_max_years": 12,
    "origin_country": "France",
    "temperament_keywords": [
      "affectionate",
      "clownish",
      "stubborn",
      "people-oriented"
    ],
    "monthly_cost_min_usd": 150,
    "monthly_cost_max_usd": 300,
    "year1_cost_min_usd": 2000,
    "year1_cost_max_usd": 4000,
    "primary_image_url": "https://cdn.petmatchr.com/breeds/french-bulldog/main.jpg",
    "notes_internal": "Very apartment-friendly but high vet cost; must be careful with heat and breathing."
  }
]


lifestyle_scores.json

[
  {
    "breed_id": "golden-retriever",
    "apartment_score": 3,
    "busy_worker_score": 3,
    "family_with_kids_score": 9,
    "allergy_friendly_score": 2,
    "beginner_friendly_score": 5,
    "active_outdoor_score": 9
  },
  {
    "breed_id": "french-bulldog",
    "apartment_score": 9,
    "busy_worker_score": 6,
    "family_with_kids_score": 7,
    "allergy_friendly_score": 3,
    "beginner_friendly_score": 8,
    "active_outdoor_score": 4
  }
]

=====================
2) Mẫu JSON CONTENT CHO 1 COST PAGE
(Ví dụ: Golden Retriever cost in Austin, Texas)

Đây là JSON sau khi AI generate xong, dùng để render page.
Slug: golden-retriever-cost-austin-texas

{
  "slug": "golden-retriever-cost-austin-texas",
  "meta": {
    "title": "Golden Retriever Cost in Austin, Texas (First Year & Monthly Breakdown)",
    "description": "See the real cost of owning a Golden Retriever in Austin, Texas. First-year setup, monthly expenses, vet bills, insurance and emergency costs in one simple breakdown."
  },
  "h1": "Golden Retriever Cost in Austin, Texas",
  "hero": {
    "city": "Austin, Texas",
    "breed_name": "Golden Retriever",
    "one_line_summary": "In Austin, expect to spend around $2,000–$3,800 in the first year and $140–$270 per month after that for a Golden Retriever."
  },
  "summary": {
    "first_year_min_usd": 2000,
    "first_year_max_usd": 3800,
    "ongoing_monthly_min_usd": 140,
    "ongoing_monthly_max_usd": 270,
    "emergency_fund_recommended_usd": 1000,
    "insurance_recommended": true
  },
  "first_year_breakdown": [
    {
      "category": "Adoption or breeder fee",
      "min_usd": 300,
      "max_usd": 2500,
      "notes": "Shelter adoption on the low end, reputable breeder on the high end."
    },
    {
      "category": "Initial vet care & vaccines",
      "min_usd": 250,
      "max_usd": 600,
      "notes": "Includes exam, core vaccines, deworming and basic lab work."
    },
    {
      "category": "Spay/neuter",
      "min_usd": 250,
      "max_usd": 500,
      "notes": "Costs vary depending on clinic and weight; Austin prices are mid–high range."
    },
    {
      "category": "Starter supplies",
      "min_usd": 200,
      "max_usd": 400,
      "notes": "Crate, bed, bowls, leash, toys, brushes and basic grooming tools."
    },
    {
      "category": "Training classes",
      "min_usd": 200,
      "max_usd": 500,
      "notes": "Group obedience classes, highly recommended for a large, high-energy breed."
    }
  ],
  "monthly_breakdown": [
    {
      "category": "Food",
      "min_usd": 70,
      "max_usd": 120,
      "notes": "Large-breed food; higher if you choose premium or fresh food subscriptions."
    },
    {
      "category": "Preventatives (flea, tick, heartworm)",
      "min_usd": 20,
      "max_usd": 40,
      "notes": "Prices in Austin are typical US averages."
    },
    {
      "category": "Routine vet care (averaged)",
      "min_usd": 25,
      "max_usd": 50,
      "notes": "Annual checkups and vaccines amortized by month."
    },
    {
      "category": "Grooming & supplies",
      "min_usd": 15,
      "max_usd": 40,
      "notes": "Home grooming plus occasional professional grooming for heavy shedding."
    },
    {
      "category": "Training / enrichment",
      "min_usd": 10,
      "max_usd": 20,
      "notes": "Toys, puzzle feeders, refresh training classes a few times per year."
    }
  ],
  "emergency_costs": {
    "typical_emergency_range_usd": {
      "low": 800,
      "high": 3000
    },
    "common_emergencies": [
      "Injuries from running or rough play",
      "Stomach issues from eating things they shouldn’t",
      "Joint or hip-related problems"
    ],
    "one_line_warning": "A single emergency vet visit in Austin can easily cost $1,000–$3,000 for a Golden Retriever."
  },
  "insurance_section": {
    "recommended": true,
    "reason": "Golden Retrievers have above-average risk of joint problems and cancer, and emergency vet care in Austin is expensive.",
    "typical_premium_range_usd": {
      "low": 45,
      "high": 90
    },
    "value_explainer": "If you can’t comfortably cover a $2,500 emergency bill from savings, pet insurance can turn a financial disaster into a manageable monthly cost.",
    "primary_offer_slot": {
      "provider_placeholder": "EMBRACE_OR_TOP_PARTNER",
      "cta_headline": "Check Golden Retriever Insurance Rates in Austin",
      "cta_copy": "Answer a few questions about your dog and see customized quotes from top insurers in under 60 seconds."
    }
  },
  "local_context": {
    "city": "Austin",
    "state": "TX",
    "cost_of_living_note": "Austin vet prices are slightly above national average, especially for emergency clinics and specialty care.",
    "dog_friendly_note": "Austin is generally very dog-friendly with many parks and outdoor spaces, but hot summers increase risk of heat-related issues."
  },
  "faq": [
    {
      "question": "Is a Golden Retriever an expensive dog to own in Austin?",
      "answer": "Yes. Golden Retrievers are large, active dogs with higher food needs and a real risk of joint and cancer expenses. Plan on $140–$270 per month in Austin, plus a solid emergency fund or insurance."
    },
    {
      "question": "Do I really need pet insurance for a Golden Retriever?",
      "answer": "You don’t have to buy insurance, but many Golden Retriever owners are glad they did after the first big emergency. If a surprise $2,000–$3,000 vet bill would hurt, insurance is worth serious consideration."
    },
    {
      "question": "How can I lower my monthly Golden Retriever costs?",
      "answer": "Choose a good-quality food in the middle price range, keep vaccines and preventatives up to date to avoid expensive illnesses, and invest in early training so you don’t have to pay for behavior problems later."
    }
  ],
  "cta": {
    "cost_calculator_anchor": "Not sure what this looks like for your income? Use the Golden Retriever Budget Calculator to plug in your numbers.",
    "insurance_quiz_anchor": "Want a straight answer on insurance? Take the 60-second Insurance Fit Quiz to see if it’s worth it for you."
  }
}

=====================
3) Mẫu JSON CONTENT CHO 1 PROBLEM PAGE
(Ví dụ: Golden Retriever separation anxiety)

Slug: golden-retriever-separation-anxiety

{
  "slug": "golden-retriever-separation-anxiety",
  "meta": {
    "title": "Golden Retriever Separation Anxiety: Real Fixes for Clingy Goldens",
    "description": "Learn why Golden Retrievers develop separation anxiety and follow a clear, step-by-step plan to help your dog stay calm when you leave the house."
  },
  "h1": "Golden Retriever Separation Anxiety: Causes, Signs and a Realistic Plan",
  "hero": {
    "breed_name": "Golden Retriever",
    "one_line_summary": "Goldens are people-pleasers and shadow dogs, which makes them lovable – and also prone to separation anxiety if you don’t train independence early."
  },
  "intro": {
    "paragraphs": [
      "If your Golden Retriever cries, barks or destroys things whenever you leave, you’re not alone. This breed bonds deeply with their people and can struggle when suddenly left alone.",
      "The good news: most separation anxiety in Golden Retrievers can be improved with structured training, small daily changes and, in some cases, professional help. This guide shows you what’s normal, what’s not and exactly what to do next."
    ]
  },
  "symptoms": [
    "Intense whining, barking or howling shortly after you leave",
    "Chewing doors, windowsills, crates or furniture near exits",
    "Pacing and panting even in a cool room",
    "Accidents in the house only when left alone",
    "Following you from room to room when you are home, unable to relax"
  ],
  "root_causes": [
    "Very people-oriented temperament and constant human contact",
    "Sudden change in routine (new job schedule, moving, breakup, etc.)",
    "Too much attention and zero practice being alone as a puppy",
    "Punishment-based training that increases anxiety instead of confidence"
  ],
  "section_home_alone_expectations": {
    "heading": "How Long Can a Golden Retriever Be Left Alone?",
    "paragraphs": [
      "Most adult Golden Retrievers can eventually learn to stay alone for 4–6 hours at a time, but you can’t jump from 'never alone' to '6 hours alone' overnight.",
      "Puppies under 6 months should only be left alone for short periods and need a gradual build-up with calm arrivals and departures. If your schedule requires 8–10 hours away daily, you’ll need dog walkers, daycare or help from friends and family."
    ]
  },
  "section_step_by_step_plan": {
    "heading": "Step-by-Step Plan to Reduce Golden Retriever Separation Anxiety",
    "steps": [
      {
        "title": "Step 1: Rule Out Medical and Overarousal Issues",
        "detail": "Before assuming it’s purely separation anxiety, rule out pain, urinary issues and extreme under-exercise. A young, under-exercised Golden with zero mental stimulation will melt down even with light alone time."
      },
      {
        "title": "Step 2: Create a Safe 'Alone Zone'",
        "detail": "Set up a gated area or crate with a bed, chew toys and a food puzzle. Feed most meals here so your dog associates this space with safety and good things."
      },
      {
        "title": "Step 3: Train Micro-Separations Every Day",
        "detail": "Start with 10–30 seconds of going out of sight and returning calmly before your dog gets worked up. Slowly increase to 1, 2, 5, 10 minutes over days and weeks – always below the panic threshold."
      },
      {
        "title": "Step 4: De-Big Deal Your Departures and Arrivals",
        "detail": "Avoid long emotional goodbyes and wild reunions. Put on your shoes, pick up keys, walk out and come back like it’s no big deal. Your dog learns from your energy."
      },
      {
        "title": "Step 5: Add Calming Support and Structured Enrichment",
        "detail": "Give a long-lasting chew or stuffed Kong only when you leave. For some Goldens, vetted calming supplements or CBD products can take the edge off while you work on training."
      },
      {
        "title": "Step 6: Get Professional Help If Panic Is Severe",
        "detail": "If your Golden injures themselves, breaks crates or is drenched in drool when you return, you need a trainer or veterinary behaviorist. Severe cases rarely fix themselves."
      }
    ]
  },
  "section_when_to_get_help": {
    "heading": "When to Call a Trainer or Vet",
    "paragraphs": [
      "If your Golden is breaking teeth or nails trying to escape, losing weight, or you’re getting complaints from neighbors, it’s time to get professional help.",
      "Look for a positive-reinforcement trainer with experience in separation anxiety, not just basic obedience. If your vet suggests medication, it should support training, not replace it."
    ]
  },
  "course_recommendation": {
    "headline": "Want a Structured Training Plan You Can Follow This Week?",
    "body": "Instead of guessing your way through YouTube videos, follow a step-by-step, vet-reviewed program designed specifically for anxious, high-attachment dogs like Golden Retrievers.",
    "benefit_bullets": [
      "Short daily exercises you can actually stick to",
      "Specific protocols for barking, whining and destruction",
      "Lesson plans for puppies, adolescents and adult dogs"
    ],
    "cta_button_label": "See the Recommended Golden Retriever Training Course",
    "affiliate_slot": {
      "partner_placeholder": "BRAIN_TRAINING_OR_EQUIVALENT",
      "deep_link_placeholder": "https://partner.example.com/golden-retriever-separation-anxiety"
    }
  },
  "faq": [
    {
      "question": "Will my Golden Retriever grow out of separation anxiety?",
      "answer": "Some mild anxiety improves with age and routine, but true separation anxiety usually needs training. Waiting and hoping often makes the pattern deeper and harder to change."
    },
    {
      "question": "Is getting a second dog the solution?",
      "answer": "A second dog adds more energy, cost and training needs. If your Golden is attached to you, not just lonely, another dog may not fix the core issue – and you now have two untrained dogs."
    },
    {
      "question": "Do calming treats or CBD help with separation anxiety?",
      "answer": "Good calming products can take the edge off and make training easier, but they’re not magic. Think of them as support for a solid training plan, not the entire solution."
    }
  ],
  "cta": {
    "quiz_anchor": "Not sure how serious your Golden’s separation anxiety is? Take the 2-minute Behavior Check Quiz to get a simple score and next steps.",
    "course_anchor": "Ready for a full plan? Tap below to see the recommended separation-anxiety course for Golden Retrievers."
  }
}

=====================
4) Pseudo-code: từ schema → Next.js component

Ý tưởng:

Data layer: lấy JSON từ DB / file.

Route layer: app router Next.js dynamic routes.

UI layer: component nhận pageData và render.

Giữ ở mức pseudo-code TypeScript, dev chỉ cần map theo.

4.1. Data helpers (server-side)

// lib/data.ts

import breeds from "@/data/breeds.json";
import lifestyleScores from "@/data/lifestyle_scores.json";
import goldenCostAustin from "@/data/pages/cost/golden-retriever-cost-austin-texas.json";
import goldenSeparationAnxiety from "@/data/pages/problem/golden-retriever-separation-anxiety.json";

// Types (rút gọn)
export type Breed = typeof breeds[number];
export type LifestyleScore = typeof lifestyleScores[number];

export type CostPage = {
  slug: string;
  meta: { title: string; description: string };
  h1: string;
  hero: any;
  summary: any;
  first_year_breakdown: any[];
  monthly_breakdown: any[];
  emergency_costs: any;
  insurance_section: any;
  local_context: any;
  faq: any[];
  cta: any;
};

export type ProblemPage = {
  slug: string;
  meta: { title: string; description: string };
  h1: string;
  hero: any;
  intro: any;
  symptoms: string[];
  root_causes: string[];
  section_home_alone_expectations: any;
  section_step_by_step_plan: any;
  section_when_to_get_help: any;
  course_recommendation: any;
  faq: any[];
  cta: any;
};

export async function getBreedBySlug(slug: string): Promise<Breed | null> {
  return breeds.find((b) => b.slug === slug) ?? null;
}

export async function getLifestyleScoreForBreed(
  breedId: string
): Promise<LifestyleScore | null> {
  return lifestyleScores.find((s) => s.breed_id === breedId) ?? null;
}

// Trong production, cost/prob page sẽ fetch theo slug từ DB,
// nhưng ở đây demo hard-code
export async function getCostPageBySlug(slug: string): Promise<CostPage | null> {
  if (slug === "golden-retriever-cost-austin-texas") {
    return goldenCostAustin as CostPage;
  }
  return null;
}

export async function getProblemPageBySlug(
  slug: string
): Promise<ProblemPage | null> {
  if (slug === "golden-retriever-separation-anxiety") {
    return goldenSeparationAnxiety as ProblemPage;
  }
  return null;
}


4.2. Route cho Breed page

// app/breeds/[slug]/page.tsx

import { getBreedBySlug, getLifestyleScoreForBreed } from "@/lib/data";
import { BreedPageView } from "@/components/BreedPageView";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export default async function BreedPageRoute({ params }: Params) {
  const breed = await getBreedBySlug(params.slug);
  if (!breed) return notFound();

  const scores = await getLifestyleScoreForBreed(breed.id);
  if (!scores) return notFound();

  // Ở đây có thể:
  // - Gọi AI generate breed page JSON nếu chưa có
  // - Hoặc lấy từ DB: getBreedPageContent(breed.slug)

  const pageData = await getBreedPageContentFromDBOrCache(breed, scores);

  return <BreedPageView data={pageData} />;
}

// Pseudo: lấy content từ DB/cache
async function getBreedPageContentFromDBOrCache(breed: any, scores: any) {
  // 1) Check Redis / DB có sẵn content chưa
  // 2) Nếu chưa có, gọi AI với prompt BREED_PAGE_V4 + (breed + scores)
  // 3) Lưu vào DB / cache
  // 4) Trả về JSON như spec breed page

  // Ở đây chỉ demo:
  const stored = await fakeDBFetchBreedPage(breed.slug);
  return stored;
}


4.3. Component BreedPageView (UI)

// components/BreedPageView.tsx

import type { BreedPageData } from "@/types";

type Props = { data: BreedPageData };

export function BreedPageView({ data }: Props) {
  return (
    <main>
      <head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </head>

      <section>
        <h1>{data.h1}</h1>
        <p>{data.short_intro}</p>
      </section>

      <section>
        <h2>Good fit if...</h2>
        <ul>
          {data.good_fit_if.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h2>Avoid this breed if...</h2>
        <ul>
          {data.avoid_if.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Render các section khác: personality, living, time/cost, lifestyle_bars, FAQ, CTA */}
    </main>
  );
}


4.4. Route cho Cost page

// app/cost/[slug]/page.tsx

import { getCostPageBySlug } from "@/lib/data";
import { CostPageView } from "@/components/CostPageView";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export default async function CostPageRoute({ params }: Params) {
  const pageData = await getCostPageBySlug(params.slug);
  if (!pageData) return notFound();

  return <CostPageView data={pageData} />;
}


4.5. Component CostPageView

// components/CostPageView.tsx

import type { CostPage } from "@/lib/data";

type Props = { data: CostPage };

export function CostPageView({ data }: Props) {
  return (
    <main>
      <head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </head>

      <section>
        <h1>{data.h1}</h1>
        <p>{data.hero.one_line_summary}</p>
      </section>

      <section>
        <h2>First-Year Cost Summary</h2>
        <p>
          First year: ${data.summary.first_year_min_usd}–$
          {data.summary.first_year_max_usd}
        </p>
        <p>
          Monthly after that: ${data.summary.ongoing_monthly_min_usd}–$
          {data.summary.ongoing_monthly_max_usd}
        </p>
      </section>

      <section>
        <h2>First-Year Cost Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Min</th>
              <th>Max</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.first_year_breakdown.map((row, idx) => (
              <tr key={idx}>
                <td>{row.category}</td>
                <td>${row.min_usd}</td>
                <td>${row.max_usd}</td>
                <td>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Monthly breakdown, emergency, insurance_section, FAQ, CTA tương tự */}
    </main>
  );
}


4.6. Route cho Problem page

// app/problems/[slug]/page.tsx

import { getProblemPageBySlug } from "@/lib/data";
import { ProblemPageView } from "@/components/ProblemPageView";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export default async function ProblemPageRoute({ params }: Params) {
  const pageData = await getProblemPageBySlug(params.slug);
  if (!pageData) return notFound();

  return <ProblemPageView data={pageData} />;
}


4.7. Component ProblemPageView

// components/ProblemPageView.tsx

import type { ProblemPage } from "@/lib/data";

type Props = { data: ProblemPage };

export function ProblemPageView({ data }: Props) {
  return (
    <main>
      <head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </head>

      <section>
        <h1>{data.h1}</h1>
        {data.intro.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </section>

      <section>
        <h2>Common Symptoms</h2>
        <ul>
          {data.symptoms.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Root Causes</h2>
        <ul>
          {data.root_causes.map((c, idx) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{data.section_step_by_step_plan.heading}</h2>
        <ol>
          {data.section_step_by_step_plan.steps.map((step, idx) => (
            <li key={idx}>
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Phần when_to_get_help, course_recommendation, FAQ, CTA render tương tự */}
    </main>
  );
}