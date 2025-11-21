import { NextResponse } from 'next/server';
import { getProblemPageBySlug } from '@/lib/data';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const page = await getProblemPageBySlug(params.slug);
    if (!page) {
        return NextResponse.json({ error: 'Problem page not found' }, { status: 404 });
    }

    return NextResponse.json({
        slug: page.slug,
        title: page.meta.title,
        symptoms: page.symptoms,
        root_causes: page.root_causes,
        steps: page.section_step_by_step_plan.steps,
        _meta: {
            generated: new Date().toISOString(),
            source: "PetMatchr V7"
        }
    });
}
