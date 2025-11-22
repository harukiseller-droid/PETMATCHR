import { NextResponse } from 'next/server';
import { getBreedBySlug, getLifestyleScoreForBreed } from '@/lib/data';
import { loadBreedV7 } from '@/lib/api-v7';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const breed = await getBreedBySlug(params.slug);
    if (!breed) {
        return NextResponse.json({ error: 'Breed not found' }, { status: 404 });
    }

    const scores = await getLifestyleScoreForBreed(breed.id);
    const page = await loadBreedV7(params.slug);

    const payload = {
        slug: breed.slug,
        page_type: 'breed' as const,
        breed,
        lifestyle_scores: scores,
        meta: page?.meta ?? null,
        h1: page?.h1 ?? null,
        intro: page?.intro ?? null,
        lifestyle_match: page?.lifestyle_match ?? null,
        cost_snapshot: page?.cost_snapshot ?? null,
        health_and_risks: page?.health_and_risks ?? null,
        training_and_behavior: page?.training_and_behavior ?? null,
        faq: page?.faq ?? [],
        quick_answers: page?.quick_answers ?? [],
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
