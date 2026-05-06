import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, icon, trend, accent = "primary" }: { label: string; value: ReactNode; icon?: ReactNode; trend?: string; accent?: "primary" | "success" | "warning" | "info" }) {
  const accents: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    info: "bg-info/10 text-info",
  };
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
          {trend && <p className="mt-1 text-xs text-muted-foreground">{trend}</p>}
        </div>
        {icon && <div className={cn("rounded-lg p-2.5", accents[accent])}>{icon}</div>}
      </div>
    </div>
  );
}
