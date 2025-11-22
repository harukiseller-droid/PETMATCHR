import { NextRequest, NextResponse } from 'next/server';
import { generatePage } from '@/lib/generator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug, page_type, input_data, keywords } = body;

        if (!slug || !page_type) {
            return NextResponse.json({ error: 'Missing slug or page_type' }, { status: 400 });
        }

        const result = await generatePage({
            slug,
            page_type,
            input_data,
            keywords
        });

        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
