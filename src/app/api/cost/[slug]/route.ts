import { NextResponse } from 'next/server';
import { getCostPageBySlug } from '@/lib/data';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const page = await getCostPageBySlug(params.slug);
    if (!page) {
        return NextResponse.json({ error: 'Cost page not found' }, { status: 404 });
    }

    // Return a subset or full data depending on strategy. 
    // For AEO, returning the summary and breakdown is key.
    return NextResponse.json({
        slug: page.slug,
        title: page.meta.title,
        summary: page.summary,
        first_year_breakdown: page.first_year_breakdown,
        monthly_breakdown: page.monthly_breakdown,
        emergency_costs: page.emergency_costs,
        local_context: page.local_context,
        _meta: {
            generated: new Date().toISOString(),
            source: "PetMatchr V7"
        }
    });
}
