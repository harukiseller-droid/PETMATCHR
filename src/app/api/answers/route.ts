import { NextResponse } from 'next/server';
import { getAllQuickAnswers } from '@/lib/quick-answers';

export async function GET() {
    try {
        const answers = await getAllQuickAnswers();
        return NextResponse.json(answers);
    } catch (error) {
        console.error('Error fetching quick answers:', error);
        return NextResponse.json({ error: 'Failed to fetch answers' }, { status: 500 });
    }
}
