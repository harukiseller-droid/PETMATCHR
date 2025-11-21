import { NextResponse } from 'next/server';
import { getBreeds, getLifestyleScores } from '@/lib/data';
import { LifestyleScore } from '@/lib/types';

export async function GET(request: Request, { params }: { params: { type: string } }) {
    const { type } = params;
    const scores = await getLifestyleScores();
    const breeds = await getBreeds();

    let filteredScores: LifestyleScore[] = [];
    let sortField: keyof typeof scores[0] | null = null;

    switch (type) {
        case 'apartment':
            sortField = 'apartment_score';
            break;
        case 'family':
            sortField = 'family_with_kids_score';
            break;
        case 'busy-worker':
            sortField = 'busy_worker_score';
            break;
        case 'active':
            sortField = 'active_outdoor_score';
            break;
        case 'beginner':
            sortField = 'beginner_friendly_score';
            break;
        case 'allergy':
            sortField = 'allergy_friendly_score';
            break;
        default:
            return NextResponse.json({ error: 'Invalid lifestyle type' }, { status: 400 });
    }

    if (sortField) {
        // Sort by score descending and take top 10
        filteredScores = scores
            .sort((a, b) => (b[sortField!] as number) - (a[sortField!] as number))
            .slice(0, 10);
    }

    const results = filteredScores.map(score => {
        const breed = breeds.find(b => b.id === score.breed_id);
        return {
            breed_name: breed?.name,
            breed_slug: breed?.slug,
            score: score[sortField!]
        };
    });

    return NextResponse.json({
        type,
        top_breeds: results,
        _meta: {
            generated: new Date().toISOString(),
            count: results.length
        }
    });
}
