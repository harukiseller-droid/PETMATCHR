"use client";

import { useMemo, useState } from "react";

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

interface Props {
    pages: ContentMatrixPage[];
    summary: Record<PageTypeV7, SummaryEntry>;
}

const pageTypeOptions: { value: PageTypeV7 | "all"; label: string }[] = [
    { value: "all", label: "All page types" },
    { value: "breed", label: "Breed" },
    { value: "cost", label: "Cost" },
    { value: "problem", label: "Problem" },
    { value: "anxiety", label: "Anxiety" },
    { value: "comparison", label: "Comparison" },
    { value: "location", label: "Location" },
    { value: "list", label: "List" },
];

const statusOptions: { value: PageStatus | "all"; label: string }[] = [
    { value: "all", label: "All statuses" },
    { value: "planned", label: "Planned" },
    { value: "generated", label: "Generated" },
    { value: "published", label: "Published" },
];

export default function ContentMatrixClient({ pages, summary }: Props) {
    const [pageType, setPageType] = useState<PageTypeV7 | "all">("all");
    const [status, setStatus] = useState<PageStatus | "all">("all");
    const [generating, setGenerating] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    // Selection state
    const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());

    const filtered = useMemo(
        () =>
            pages.filter((p) => {
                if (pageType !== "all" && p.page_type !== pageType) return false;
                if (status !== "all" && p.status !== status) return false;
                return true;
            }),
        [pages, pageType, status]
    );

    // Reset pagination when filters change
    useMemo(() => {
        setCurrentPage(1);
        setSelectedSlugs(new Set());
    }, [pageType, status]);

    // Pagination logic
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedPages = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Selection logic
    const handleSelectAllPage = () => {
        const newSelected = new Set(selectedSlugs);
        const allPageSlugs = paginatedPages.map(p => `${p.page_type}/${p.slug}`);
        const allSelected = allPageSlugs.every(slug => selectedSlugs.has(slug));

        if (allSelected) {
            allPageSlugs.forEach(slug => newSelected.delete(slug));
        } else {
            allPageSlugs.forEach(slug => newSelected.add(slug));
        }
        setSelectedSlugs(newSelected);
    };

    const handleSelectAllTotal = () => {
        if (selectedSlugs.size === filtered.length) {
            setSelectedSlugs(new Set());
        } else {
            const allSlugs = filtered.map(p => `${p.page_type}/${p.slug}`);
            setSelectedSlugs(new Set(allSlugs));
        }
    };

    const handleSelectRow = (id: string) => {
        const newSelected = new Set(selectedSlugs);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedSlugs(newSelected);
    };

    async function handleGenerate(page: ContentMatrixPage) {
        if (generating) return;
        const id = `${page.page_type}/${page.slug}`;
        setGenerating(id);

        try {
            const res = await fetch('/api/admin/generate-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug: page.slug,
                    page_type: page.page_type,
                    input_data: (page as any).input_data,
                    keywords: page.keywords
                })
            });

            if (res.ok) {
                window.location.reload();
            } else {
                const err = await res.json();
                alert(`Failed: ${err.error}`);
            }
        } catch (e) {
            alert('Error generating page');
        } finally {
            setGenerating(null);
        }
    }

    async function handleGenerateSelected() {
        if (selectedSlugs.size === 0 || generating) return;

        if (!confirm(`Are you sure you want to generate ${selectedSlugs.size} pages? This might take a while.`)) {
            return;
        }

        // Process sequentially for now to avoid overwhelming the server
        // In a real app, we'd send a batch request
        for (const id of Array.from(selectedSlugs)) {
            const [type, slug] = id.split('/');
            const page = pages.find(p => p.page_type === type && p.slug === slug);
            if (page && page.status === 'planned') {
                await handleGenerate(page);
            }
        }
        window.location.reload();
    }

    return (
        <div className="space-y-8">
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-slate-50">
                <h2 className="text-lg font-semibold mb-4">Content summary</h2>
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {pageTypeOptions
                        .filter((opt) => opt.value !== "all")
                        .map((opt) => {
                            const key = opt.value as PageTypeV7;
                            const s = summary[key];
                            const total = s.planned + s.generated + s.published;
                            return (
                                <div key={key} className="bg-slate-900 rounded-xl border border-slate-700 px-3 py-3">
                                    <dt className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                                        {opt.label}
                                    </dt>
                                    <dd className="text-base font-semibold">
                                        {total}{" "}
                                        <span className="text-xs text-slate-400">
                                            ({s.generated} generated, {s.planned} planned)
                                        </span>
                                    </dd>
                                </div>
                            );
                        })}
                </dl>
            </section>

            <section className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold text-slate-50">Pages</h2>
                        {selectedSlugs.size > 0 && (
                            <button
                                onClick={handleGenerateSelected}
                                disabled={!!generating}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                            >
                                Generate Selected ({selectedSlugs.size})
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select
                            value={pageType}
                            onChange={(e) => setPageType(e.target.value as any)}
                            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {pageTypeOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                    <table className="min-w-full text-sm text-slate-200">
                        <thead className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
                            <tr>
                                <th className="px-3 py-2 text-left w-10">
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                                        checked={paginatedPages.length > 0 && paginatedPages.every(p => selectedSlugs.has(`${p.page_type}/${p.slug}`))}
                                        onChange={handleSelectAllPage}
                                    />
                                </th>
                                <th className="px-3 py-2 text-left">Slug</th>
                                <th className="px-3 py-2 text-left">Type</th>
                                <th className="px-3 py-2 text-left">Breed</th>
                                <th className="px-3 py-2 text-left">Lifestyle</th>
                                <th className="px-3 py-2 text-left">Status</th>
                                <th className="px-3 py-2 text-left">Intent</th>
                                <th className="px-3 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPages.map((page) => {
                                const id = `${page.page_type}/${page.slug}`;
                                const isGenerating = generating === id;
                                const inputData = (page as any).input_data || {};
                                const breedName = inputData.breed?.name || "—";
                                const lifestyleName = inputData.lifestyle_name || inputData.lifestyle?.name || "—";

                                return (
                                    <tr key={id} className="border-t border-slate-800 hover:bg-slate-900/30">
                                        <td className="px-3 py-2">
                                            <input
                                                type="checkbox"
                                                className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                                                checked={selectedSlugs.has(id)}
                                                onChange={() => handleSelectRow(id)}
                                            />
                                        </td>
                                        <td className="px-3 py-2 font-mono text-[11px] text-slate-300 max-w-[200px] truncate" title={page.slug}>
                                            {page.slug}
                                        </td>
                                        <td className="px-3 py-2 text-xs capitalize text-slate-400">
                                            {page.page_type}
                                        </td>
                                        <td className="px-3 py-2 text-xs text-slate-300">
                                            {breedName}
                                        </td>
                                        <td className="px-3 py-2 text-xs text-slate-300 capitalize">
                                            {lifestyleName}
                                        </td>
                                        <td className="px-3 py-2 text-xs">
                                            <span
                                                className={
                                                    "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold " +
                                                    (page.status === "generated"
                                                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                                                        : page.status === "planned"
                                                            ? "bg-slate-700/40 text-slate-200 border border-slate-600"
                                                            : "bg-blue-500/10 text-blue-300 border border-blue-500/30")
                                                }
                                            >
                                                {page.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-xs text-slate-400">{page.primary_intent}</td>
                                        <td className="px-3 py-2 text-right text-xs">
                                            <span className="inline-flex gap-1">
                                                {page.status === 'planned' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleGenerate(page)}
                                                        disabled={!!generating}
                                                        className={`rounded-full border px-2 py-1 text-[10px] transition-colors ${isGenerating
                                                            ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10 cursor-wait"
                                                            : "border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500"
                                                            } ${generating && !isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    >
                                                        {isGenerating ? "Generating..." : "Generate"}
                                                    </button>
                                                )}
                                                {page.status === 'generated' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleGenerate(page)}
                                                        disabled={!!generating}
                                                        className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400 hover:text-slate-200 hover:border-slate-500"
                                                    >
                                                        Regen
                                                    </button>
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="px-4 py-6 text-center text-xs text-slate-500">
                            No pages match the current filters.
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 bg-slate-900/40 rounded-b-xl">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="relative ml-3 inline-flex items-center rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-slate-400">
                                    Showing <span className="font-medium text-slate-200">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                                    <span className="font-medium text-slate-200">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> of{" "}
                                    <span className="font-medium text-slate-200">{filtered.length}</span> results
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSelectAllTotal}
                                    className="text-xs text-emerald-500 hover:text-emerald-400 mr-4"
                                >
                                    {selectedSlugs.size === filtered.length ? "Deselect All Total" : "Select All Total"}
                                </button>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-700 hover:bg-slate-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-200 ring-1 ring-inset ring-slate-700 focus:outline-offset-0">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-700 hover:bg-slate-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

