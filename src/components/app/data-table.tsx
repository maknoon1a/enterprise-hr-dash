import { useMemo, useState, type ReactNode } from "react";
import { Search, ChevronLeft, ChevronRight, Download, Filter } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  pageSize?: number;
  toolbar?: ReactNode;
  filterOptions?: { label: string; value: string }[];
  filterKey?: keyof T;
  emptyText?: string;
  onExport?: () => void;
}

export function DataTable<T extends Record<string, any>>({ data, columns, searchKeys, pageSize = 8, toolbar, filterOptions, filterKey, emptyText = "No records found", onExport }: Props<T>) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return data.filter((row) => {
      if (filter !== "all" && filterKey && String(row[filterKey]) !== filter) return false;
      if (!q) return true;
      const keys = searchKeys ?? (Object.keys(row) as (keyof T)[]);
      return keys.some((k) => String(row[k] ?? "").toLowerCase().includes(q.toLowerCase()));
    });
  }, [data, q, filter, filterKey, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const cur = Math.min(page, totalPages);
  const slice = filtered.slice((cur - 1) * pageSize, cur * pageSize);

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search..." className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50" />
          </div>
          {filterOptions && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }} className="h-9 rounded-md border bg-background px-2 text-sm">
                <option value="all">All</option>
                {filterOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onExport && (
            <button onClick={onExport} className="inline-flex items-center gap-1.5 h-9 rounded-md border bg-background px-3 text-sm hover:bg-accent">
              <Download className="h-4 w-4" /> Export
            </button>
          )}
          {toolbar}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              {columns.map((c) => (
                <th key={c.key} className={`text-left font-medium text-muted-foreground px-4 py-3 text-xs uppercase tracking-wider ${c.className ?? ""}`}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">{emptyText}</td></tr>
            ) : slice.map((row, i) => (
              <tr key={i} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                {columns.map((c) => (
                  <td key={c.key} className={`px-4 py-3 ${c.className ?? ""}`}>{c.render ? c.render(row) : String(row[c.key] ?? "")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
        <span>Showing {slice.length === 0 ? 0 : (cur - 1) * pageSize + 1}–{Math.min(cur * pageSize, filtered.length)} of {filtered.length}</span>
        <div className="flex items-center gap-1">
          <button disabled={cur <= 1} onClick={() => setPage(cur - 1)} className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-background disabled:opacity-40 hover:bg-accent"><ChevronLeft className="h-4 w-4" /></button>
          <span className="px-3 text-foreground font-medium">{cur} / {totalPages}</span>
          <button disabled={cur >= totalPages} onClick={() => setPage(cur + 1)} className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-background disabled:opacity-40 hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
