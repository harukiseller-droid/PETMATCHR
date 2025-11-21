import fs from 'fs/promises';
import path from 'path';
import { ComparisonPage } from '@/lib/types';
import { getComparisonPageBySlug, getBreeds, getLifestyleScores } from '@/lib/data';
import { callHybridLLM } from '@/lib/llmClient';
import { SYSTEM_PROMPT, COMPARISON_PAGE_PROMPT } from '@/lib/prompts';
import { basicValidateOutput } from '@/lib/validators';

export type EnsureComparisonResult =
    | { ok: true; page: ComparisonPage }
    | { ok: false; reason: "INVALID_PAIR" | "MODE_OFF" | "LIMIT_REACHED" | "LLM_FAILED" | "TIMEOUT" };

const DATA_DIR = path.join(process.cwd(), 'src/data');

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

    // 2. Check existence
    const existingPage = await getComparisonPageBySlug(canonicalSlug);
    if (existingPage) {
        return { ok: true, page: existingPage };
    }

    // 3. Check mode & limits
    const mode = process.env.PETMATCHR_AUTO_COMPARISON_MODE ?? "hybrid";
    if (mode === "off") {
        return { ok: false, reason: "MODE_OFF" };
    }

    // TODO: Implement rate limiting (LIMIT_REACHED) using a simple counter file or DB
    // For now, we assume no strict limit for MVP or rely on external rate limiting.

    // 4. Validate breed pair
    const breeds = await getBreeds();
    const leftBreed = breeds.find(b => b.slug === leftBreedSlug);
    const rightBreed = breeds.find(b => b.slug === rightBreedSlug);

    if (!leftBreed || !rightBreed) {
        return { ok: false, reason: "INVALID_PAIR" };
    }

    // 5. Prepare Input JSON
    const lifestyleScores = await getLifestyleScores();
    const leftScores = lifestyleScores.find(s => s.breed_id === leftBreed.id);
    const rightScores = lifestyleScores.find(s => s.breed_id === rightBreed.id);

    const inputJson = {
        breed1: leftBreed,
        breed2: rightBreed,
        breed1_scores: leftScores,
        breed2_scores: rightScores,
        context: context
    };

    // 6. Call LLM
    try {
        const prompt = COMPARISON_PAGE_PROMPT(leftBreed.name, rightBreed.name);
        const output = await callHybridLLM({
            system: SYSTEM_PROMPT,
            user: prompt,
            jsonInput: inputJson,
            temperature: 0.7
        });

        // 7. Validate & Save
        if (!basicValidateOutput('comparison', output)) {
            console.error(`Validation failed for comparison: ${canonicalSlug}`);
            return { ok: false, reason: "LLM_FAILED" };
        }

        // Force slug consistency
        output.slug = canonicalSlug;
        output.breed_1 = leftBreed.slug; // Ensure these match canonical order if needed, or just keep as generated
        output.breed_2 = rightBreed.slug;

        await savePageJson('comparison', canonicalSlug, output);

        // TODO: Update Page Index (Phase 14)
        // await updatePageIndexEntryForSlug(canonicalSlug, 'comparison', output.meta);

        return { ok: true, page: output as ComparisonPage };

    } catch (error) {
        console.error("Error generating comparison page:", error);
        return { ok: false, reason: "LLM_FAILED" }; // Or TIMEOUT if we distinguish
    }
}
