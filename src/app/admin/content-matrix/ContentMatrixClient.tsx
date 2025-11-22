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

    const filtered = useMemo(
        () =>
            pages.filter((p) => {
                if (pageType !== "all" && p.page_type !== pageType) return false;
                if (status !== "all" && p.status !== status) return false;
                return true;
            }),
        [pages, pageType, status]
    );

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
                    <h2 className="text-lg font-semibold text-slate-50">Pages</h2>
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
                                <th className="px-3 py-2 text-left">Slug</th>
                                <th className="px-3 py-2 text-left">Type</th>
                                <th className="px-3 py-2 text-left">Status</th>
                                <th className="px-3 py-2 text-left">Intent</th>
                                <th className="px-3 py-2 text-left">Primary keyword</th>
                                <th className="px-3 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((page) => (
                                <tr key={`${page.page_type}/${page.slug}`} className="border-t border-slate-800">
                                    <td className="px-3 py-2 font-mono text-[11px] text-slate-300">
                                        {page.slug}
                                    </td>
                                    <td className="px-3 py-2 text-xs capitalize text-slate-400">
                                        {page.page_type}
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
                                    <td className="px-3 py-2 text-xs text-slate-300">
                                        {page.keywords.primary_keyword || "—"}
                                    </td>
                                    <td className="px-3 py-2 text-right text-xs">
                                        <span className="inline-flex gap-1">
                                            <button
                                                type="button"
                                                disabled
                                                className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400 cursor-not-allowed"
                                            >
                                                Regen (CLI)
                                            </button>
                                            <button
                                                type="button"
                                                disabled
                                                className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400 cursor-not-allowed"
                                            >
                                                Publish
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="px-4 py-6 text-center text-xs text-slate-500">
                            No pages match the current filters.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

