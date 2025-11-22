import fs from 'fs/promises';
import path from 'path';
import { QuizDefinition } from '@/lib/quiz-types';

const QUIZ_DIR = path.join(process.cwd(), 'src/data_v7/quizzes');

export async function getQuizBySlug(slug: string): Promise<QuizDefinition | null> {
    try {
        const filePath = path.join(QUIZ_DIR, `${slug}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}
