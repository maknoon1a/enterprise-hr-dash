import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const s = status.toLowerCase();
  let style = "bg-muted text-muted-foreground";
  if (["active", "approved", "paid", "present"].includes(s)) style = "bg-success/15 text-success border border-success/25";
  else if (["pending", "pending approval", "draft", "on leave", "leave"].includes(s)) style = "bg-warning/15 text-warning-foreground border border-warning/30";
  else if (["rejected", "inactive", "absent"].includes(s)) style = "bg-destructive/15 text-destructive border border-destructive/25";
  else if (["late"].includes(s)) style = "bg-info/15 text-info border border-info/25";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium", style, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
