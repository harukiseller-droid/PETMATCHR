import { NextRequest, NextResponse } from 'next/server';
import { ensureComparisonPage } from '@/lib/comparison-generator';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug; // e.g. "golden-retriever-vs-labrador"

    // Parse breeds from slug
    const parts = slug.split('-vs-');
    if (parts.length !== 2) {
        return NextResponse.json({ error: "Invalid slug format. Expected 'breed1-vs-breed2'" }, { status: 400 });
    }

    const [leftBreedSlug, rightBreedSlug] = parts;

    // Parse query params for context
    const searchParams = request.nextUrl.searchParams;
    const primary_concern = searchParams.get('primary_concern') || undefined;
    const user_profile = searchParams.get('user_profile') || undefined;

    const result = await ensureComparisonPage({
        leftBreedSlug,
        rightBreedSlug,
        context: {
            primary_concern,
            user_profile
        }
    });

    if (result.ok) {
        return NextResponse.json(result.page, {
            status: 200,
            headers: {
                'Cache-Control': 's-maxage=60, stale-while-revalidate=600'
            }
        });
    } else {
        if (result.reason === "LLM_FAILED" || result.reason === "TIMEOUT") {
            return NextResponse.json({ status: "pending", reason: result.reason }, { status: 202 });
        } else {
            return NextResponse.json({ status: "unavailable", reason: result.reason }, { status: 404 });
        }
    }
}
