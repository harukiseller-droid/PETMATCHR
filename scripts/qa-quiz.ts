import fs from 'fs/promises';
import path from 'path';
import { QuizDefinition } from '../src/lib/quiz-types';

const QUIZ_DIR = path.join(process.cwd(), 'src/data/quizzes');

async function qaQuiz() {
    const files = await fs.readdir(QUIZ_DIR);
    const quizFiles = files.filter((f) => f.endsWith('.json'));

    const issues: { slug: string; issues: string[] }[] = [];

    for (const file of quizFiles) {
        const filePath = path.join(QUIZ_DIR, file);
        let quiz: QuizDefinition;
        try {
            const raw = await fs.readFile(filePath, 'utf-8');
            quiz = JSON.parse(raw);
        } catch {
            issues.push({ slug: file.replace(/\.json$/, ''), issues: ['INVALID_JSON'] });
            continue;
        }

        const quizIssues: string[] = [];
        if (!quiz.slug) quizIssues.push('MISSING_SLUG');
        if (!quiz.title) quizIssues.push('MISSING_TITLE');
        if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
            quizIssues.push('NO_QUESTIONS');
        }
        if (!Array.isArray(quiz.result_mapping) || quiz.result_mapping.length === 0) {
            quizIssues.push('NO_RESULT_MAPPING');
        }

        if (quiz.slug === 'lifestyle-match') {
            const phase1Count = quiz.questions.filter((q) => q.id.startsWith('profile_')).length;
            const phase2Count = quiz.questions.filter((q) => q.id.startsWith('deep_')).length;
            if (phase1Count < 5) quizIssues.push('LIFESTYLE_PHASE1_TOO_SHORT');
            if (phase2Count < 5) quizIssues.push('LIFESTYLE_PHASE2_TOO_SHORT');

            for (const bucket of quiz.result_mapping) {
                if (!bucket.email_sequence_id) {
                    quizIssues.push(`RESULT_BUCKET_${bucket.slug}_MISSING_EMAIL_SEQUENCE_ID`);
                }
            }
        }

        if (quizIssues.length) {
            issues.push({ slug: quiz.slug || file.replace(/\.json$/, ''), issues: quizIssues });
        }
    }

    const report = {
        summary: {
            quizzes_checked: quizFiles.length,
            quizzes_failed: issues.length,
        },
        items: issues,
    };

    console.log(JSON.stringify(report, null, 2));
    if (issues.length > 0) process.exitCode = 1;
}

qaQuiz().catch((err) => {
    console.error('qa-quiz failed:', err);
    process.exit(1);
});

