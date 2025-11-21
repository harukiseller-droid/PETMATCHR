import { NextResponse } from 'next/server';
import { getBreedBySlug, getLifestyleScoreForBreed } from '@/lib/data';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const breed = await getBreedBySlug(params.slug);
    if (!breed) {
        return NextResponse.json({ error: 'Breed not found' }, { status: 404 });
    }
    const scores = await getLifestyleScoreForBreed(breed.id);

    return NextResponse.json({
        breed,
        scores,
        _meta: {
            generated: new Date().toISOString(),
            version: "v7"
        }
    });
}
