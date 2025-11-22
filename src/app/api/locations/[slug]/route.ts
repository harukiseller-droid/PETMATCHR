import { NextResponse } from 'next/server';
import { loadLocationV7 } from '@/lib/api-v7';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const page = await loadLocationV7(params.slug);

    if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const payload = {
        slug: page.slug,
        page_type: 'location' as const,
        meta: page.meta,
        h1: page.h1,
        intro: page.intro,
        living_with_dogs_here: page.living_with_dogs_here,
        cost_snapshot: page.cost_snapshot,
        best_fit_breeds_section: page.best_fit_breeds_section,
        breeds_to_be_cautious_with_section: page.breeds_to_be_cautious_with_section,
        faq: page.faq || [],
        quick_answers: page.quick_answers || [],
        _meta: {
            generated_at: new Date().toISOString(),
            source: "PetMatchr",
        }
    };

    return NextResponse.json(payload, {
        status: 200,
        headers: {
            'Cache-Control': 's-maxage=300, stale-while-revalidate=900',
            'Access-Control-Allow-Origin': '*',
        }
    });
}
