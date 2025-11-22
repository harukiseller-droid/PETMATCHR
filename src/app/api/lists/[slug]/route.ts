import { NextResponse } from 'next/server';
import { loadListV7 } from '@/lib/api-v7';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const page = await loadListV7(params.slug);

    if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const payload = {
        slug: page.slug,
        page_type: 'list' as const,
        meta: page.meta,
        h1: page.h1,
        intro: page.intro,
        sections: page.sections ?? [],
        breed_cards: page.breed_cards ?? [],
        case_study: page.case_study ?? null,
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
