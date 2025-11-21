import { NextResponse } from 'next/server';
import { getCostPageBySlug } from '@/lib/data';

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

export async function GET(request: Request, { params }: { params: { breed: string, city: string } }) {
    const { breed, city } = params;
    // Construct expected slug: e.g. golden-retriever-cost-austin-texas
    // Assuming city param is like "austin-texas" or "austin"
    // The convention in seed data is "golden-retriever-cost-austin-texas"

    const slug = `${breed}-cost-${city}`;

    const page = await getCostPageBySlug(slug);

    if (!page) {
        // Try adding state if missing? Or just return 404.
        // For now, strict match.
        return NextResponse.json({ error: 'Cost data not found for this breed/city combination' }, { status: 404 });
    }

    return NextResponse.json({
        breed,
        city,
        summary: page.summary,
        first_year_total: {
            min: page.summary.first_year_min_usd,
            max: page.summary.first_year_max_usd
        },
        monthly_total: {
            min: page.summary.ongoing_monthly_min_usd,
            max: page.summary.ongoing_monthly_max_usd
        },
        _meta: {
            generated: new Date().toISOString(),
            source: "PetMatchr V7"
        }
    });
}
