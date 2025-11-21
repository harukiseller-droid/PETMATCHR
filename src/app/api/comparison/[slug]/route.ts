import { NextResponse } from 'next/server';
import { getComparisonPageBySlug } from '@/lib/data';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const page = await getComparisonPageBySlug(params.slug);

    if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
}
