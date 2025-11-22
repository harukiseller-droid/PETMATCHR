import fs from 'fs/promises';
import path from 'path';
import { ComparisonV7Page } from '@/lib/types';
import { getComparisonPageBySlug, getComparisonPageV7BySlug, getBreeds, getLifestyleScores } from '@/lib/data';
import { callHybridLLM, CloudLLMError, LocalLLMError } from '@/lib/llmClient';
import { SYSTEM_PROMPT_PETMATCHR_V4, COMPARISON_PAGE_PROMPT } from '@/lib/prompts';
import { basicValidateOutput } from '@/lib/validators';
import { updatePageIndexEntryForSlug } from '@/lib/internal-links';
import { legacyComparisonPageToV7 } from '@/lib/v7-mappers';

export type EnsureComparisonResult =
    | { ok: true; page: ComparisonV7Page }
    | { ok: false; reason: "INVALID_PAIR" | "MODE_OFF" | "LIMIT_REACHED" | "LLM_FAILED" | "TIMEOUT" };

const DATA_DIR = path.join(process.cwd(), 'src/data');
const PENDING_FILE = path.join(DATA_DIR, 'comparison_requests_pending.json');
const TELEMETRY_FILE = path.join(DATA_DIR, 'comparison_telemetry.log');

async function savePageJson(pageType: string, slug: string, data: any) {
    const targetDir = path.join(DATA_DIR, 'pages', pageType);
    try {
        await fs.access(targetDir);
    } catch {
        await fs.mkdir(targetDir, { recursive: true });
    }
    const filePath = path.join(targetDir, `${slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function appendTelemetry(event: any) {
    const line = JSON.stringify({ ts: new Date().toISOString(), ...event }) + '\n';
    try {
        await fs.appendFile(TELEMETRY_FILE, line, 'utf-8');
    } catch {
        // best effort
    }
}

async function enqueuePending(request: {
    leftBreedSlug: string;
    rightBreedSlug: string;
    context?: {
        primary_concern?: string;
        user_profile?: string;
    };
}) {
    let current: any[] = [];
    try {
        const raw = await fs.readFile(PENDING_FILE, 'utf-8');
        current = JSON.parse(raw) || [];
    } catch {
        current = [];
    }
    current.push({
        ...request,
        requested_at: new Date().toISOString(),
    });
    await fs.writeFile(PENDING_FILE, JSON.stringify(current, null, 2));
}

export async function ensureComparisonPage(params: {
    leftBreedSlug: string;
    rightBreedSlug: string;
    context?: {
        primary_concern?: string;
        user_profile?: string;
    };
}): Promise<EnsureComparisonResult> {
    const { leftBreedSlug, rightBreedSlug, context } = params;

    // 1. Canonicalize slug
    const sortedSlugs = [leftBreedSlug, rightBreedSlug].sort();
    const canonicalSlug = `${sortedSlugs[0]}-vs-${sortedSlugs[1]}`;

    // 2. Check existence (prefer V7, fall back to legacy mapped)
    const existingV7 = await getComparisonPageV7BySlug(canonicalSlug);
    if (existingV7) {
        await appendTelemetry({ type: 'comparison_hit', slug: canonicalSlug, source: 'cache_v7' });
        return { ok: true, page: existingV7 };
    }

    const existingLegacy = await getComparisonPageBySlug(canonicalSlug);
    if (existingLegacy) {
        await appendTelemetry({ type: 'comparison_hit', slug: canonicalSlug, source: 'cache_legacy' });
        const mapped = legacyComparisonPageToV7(existingLegacy);
        return { ok: true, page: mapped };
    }

    // 3. Check mode & limits
    const mode = process.env.PETMATCHR_AUTO_COMPARISON_MODE ?? "hybrid";
    if (mode === "off") {
        await appendTelemetry({ type: 'comparison_blocked', slug: canonicalSlug, reason: 'MODE_OFF' });
        return { ok: false, reason: "MODE_OFF" };
    }

    // TODO: Implement rate limiting (LIMIT_REACHED) using a simple counter file or DB

    // 4. Validate breed pair
    const breeds = await getBreeds();
    const leftBreed = breeds.find(b => b.slug === leftBreedSlug);
    const rightBreed = breeds.find(b => b.slug === rightBreedSlug);

    if (!leftBreed || !rightBreed) {
        await appendTelemetry({ type: 'comparison_failed', slug: canonicalSlug, reason: 'INVALID_PAIR' });
        return { ok: false, reason: "INVALID_PAIR" };
    }

    // 5. Prepare Input JSON
    const lifestyleScores = await getLifestyleScores();
    const leftScores = lifestyleScores.find(s => s.breed_id === leftBreed.id);
    const rightScores = lifestyleScores.find(s => s.breed_id === rightBreed.id);

    const inputJson = {
        page_type: 'comparison',
        slug: canonicalSlug,
        primary_keyword: `${leftBreed.name} vs ${rightBreed.name}`,
        secondary_keywords: [],
        faq_keywords: [],
        quick_answer_keywords: [],
        internal_anchor_keywords: [],
        target_country: 'US',
        target_audience: 'general',
        input_data: {
            breed_a: leftBreed,
            breed_b: rightBreed,
            breed_a_scores: leftScores,
            breed_b_scores: rightScores,
            context: context,
        }
    };

    // 6. Call LLM
    try {
        const result = await callHybridLLM({
            system: SYSTEM_PROMPT_PETMATCHR_V4,
            user: COMPARISON_PAGE_PROMPT,
            jsonInput: inputJson,
            temperature: 0.7
        });

        await appendTelemetry({ type: 'comparison_llm_call', slug: canonicalSlug, ok: true });

        // 7. Validate & Save
        if (!basicValidateOutput('comparison', result)) {
            console.error(`Validation failed for comparison: ${canonicalSlug}`);
            await appendTelemetry({ type: 'comparison_failed', slug: canonicalSlug, reason: 'LLM_INVALID_SCHEMA' });
            return { ok: false, reason: "LLM_FAILED" };
        }

        const output: ComparisonV7Page = {
            ...(result as any),
            page_type: 'comparison',
            slug: canonicalSlug,
        };

        await savePageJson('comparison', canonicalSlug, output);
        await updatePageIndexEntryForSlug(canonicalSlug, 'comparison', output.meta, {
            breed_slugs: [leftBreed.slug, rightBreed.slug],
        });
        await appendTelemetry({ type: 'comparison_generated', slug: canonicalSlug });

        return { ok: true, page: output };

    } catch (error: any) {
        const isCloud = error instanceof CloudLLMError;
        const isLocal = error instanceof LocalLLMError;
        await appendTelemetry({
            type: 'comparison_failed',
            slug: canonicalSlug,
            reason: 'LLM_FAILED',
            cloud_error: isCloud ? error.message : undefined,
            local_error: isLocal ? error.message : undefined,
        });
        await enqueuePending({ leftBreedSlug, rightBreedSlug, context });
        return { ok: false, reason: "LLM_FAILED" };
    }
}
