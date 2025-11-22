'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { QuickAnswerEntry } from '@/lib/quick-answers';
import type { PageType } from '@/lib/types';

interface Props {
    items: QuickAnswerEntry[];
}

const categoryOptions = [
    { value: 'all', label: 'All categories' },
    { value: 'Living', label: 'Living' },
    { value: 'Costs', label: 'Costs' },
    { value: 'Health', label: 'Health' },
    { value: 'Training', label: 'Training' },
];

function pagePathFor(type: PageType, slug: string): string {
    switch (type) {
        case 'breed':
            return `/breeds/${slug}`;
        case 'cost':
            return `/cost/${slug}`;
        case 'problem':
            return `/problems/${slug}`;
        case 'anxiety':
            return `/anxiety/${slug}`;
        case 'comparison':
            return `/compare/${slug}`;
        case 'location':
            return `/locations/${slug}`;
        case 'list':
            return `/lists/${slug}`;
        default:
            return '/';
    }
}

export default function QuickAnswersClient({ items }: Props) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<'all' | 'Living' | 'Costs' | 'Health' | 'Training'>('all');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return items.filter((item) => {
            if (category !== 'all' && item.category !== category) return false;
            if (!q) return true;
            return (
                item.question.toLowerCase().includes(q) ||
                item.answer.toLowerCase().includes(q)
            );
        });
    }, [items, query, category]);

    return (
        <section className="mt-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quick Answers Library</h2>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <input
                        type="search"
                        placeholder="Search questions..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {categoryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No quick answers match your search yet. Try a different keyword or check back after more pages are generated.
                </p>
            ) : (
                <div className="space-y-4">
                    {filtered.map((item) => {
                        const pageHref = pagePathFor(item.page_type, item.page_slug);
                        const quizHref = item.primary_quiz_slug ? `/quiz/${item.primary_quiz_slug}` : null;

                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                                            {item.category}
                                        </span>
                                        <span className="text-[11px] uppercase tracking-wide text-gray-400">
                                            {item.page_type}
                                        </span>
                                    </div>
                                    <Link href={pageHref} className="block">
                                        <p className="font-semibold text-gray-900 hover:text-indigo-600">
                                            {item.question}
                                        </p>
                                    </Link>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {item.answer}
                                    </p>
                                </div>
                                <div className="flex flex-col items-stretch gap-2 w-full md:w-auto md:min-w-[160px]">
                                    <Link
                                        href={pageHref}
                                        className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                                    >
                                        View full guide
                                    </Link>
                                    {quizHref && (
                                        <Link
                                            href={quizHref}
                                            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                                        >
                                            Take related quiz
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

