import { NextResponse } from 'next/server';
import { loadProblemV7 } from '@/lib/api-v7';
import { getPageMonetization } from '@/lib/monetization';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const page = await loadProblemV7(params.slug);
    if (!page) {
        return NextResponse.json({ error: 'Problem page not found' }, { status: 404 });
    }

    const monetization = await getPageMonetization(page.slug);

    const payload = {
        slug: page.slug,
        page_type: 'problem' as const,
        meta: page.meta,
        h1: page.h1,
        intro: page.intro,
        problem_overview: page.problem_overview,
        why_it_happens: page.why_it_happens,
        what_you_can_try: page.what_you_can_try,
        realistic_expectations: page.realistic_expectations,
        faq: page.faq || [],
        quick_answers: page.quick_answers || [],
        monetization: monetization ? {
            cluster: monetization.cluster,
            primary_funnel: monetization.primary_funnel,
            primary_offer_type: monetization.primary_offer_type,
            primary_quiz_slug: monetization.primary_quiz_slug,
        } : null,
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
