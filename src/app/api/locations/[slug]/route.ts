import { NextResponse } from 'next/server';
import { getLocationPageBySlug } from '@/lib/data';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const page = await getLocationPageBySlug(params.slug);

    if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
}
