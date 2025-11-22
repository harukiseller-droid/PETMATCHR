import fs from 'fs/promises';
import path from 'path';
import ContentMatrixClient from './ContentMatrixClient';

type PageTypeV7 = "breed" | "list" | "comparison" | "cost" | "problem" | "anxiety" | "location";
type PageStatus = "planned" | "generated" | "published";

interface PageKeywordBundle {
    primary_keyword: string | null;
    secondary_keywords: string[];
    faq_keywords: string[];
    quick_answer_keywords: string[];
    internal_anchor_keywords: string[];
}

interface ContentMatrixPage {
    slug: string;
    page_type: PageTypeV7;
    status: PageStatus;
    primary_intent: string;
    keywords: PageKeywordBundle;
}

interface SummaryEntry {
    planned: number;
    generated: number;
    published: number;
}

interface ContentMatrixFile {
    version: number;
    last_built_at: string;
    summary: {
        total_pages: number;
        by_page_type: Record<PageTypeV7, SummaryEntry>;
    };
    pages: ContentMatrixPage[];
}

async function loadMatrix(): Promise<ContentMatrixFile | null> {
    const filePath = path.join(process.cwd(), 'src/data_v7/content_matrix_management.json');
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(raw) as ContentMatrixFile;
    } catch {
        return null;
    }
}

export default async function ContentMatrixPage() {
    const matrix = await loadMatrix();

    if (!matrix) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-2xl font-bold">Content Matrix</h1>
                    <p className="text-sm text-slate-400">
                        No content matrix file found. Run{" "}
                        <code className="font-mono text-xs bg-slate-900 px-2 py-1 rounded">
                            npm run gen:matrix && ts-node scripts/regenerate_all_pages_v7.ts && ts-node scripts/build_content_matrix.ts
                        </code>{" "}
                        to generate V7 pages and build the matrix.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                    <div>
                        <h1 className="text-3xl font-bold">Content Matrix</h1>
                        <p className="text-sm text-slate-400">
                            Version {matrix.version} · Last built at{" "}
                            <span className="font-mono">{matrix.last_built_at}</span>
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                            Total pages tracked: {matrix.summary.total_pages}
                        </p>
                    </div>
                </header>

                <ContentMatrixClient
                    pages={matrix.pages}
                    summary={matrix.summary.by_page_type}
                />
            </div>
        </main>
    );
}

