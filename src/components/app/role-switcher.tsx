import { useNavigate } from "@tanstack/react-router";
import { useRole, ROLE_LABELS, ROLES } from "@/lib/role-context";
import { ChevronDown, UserCircle2, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border bg-card px-3 h-9 text-xs hover:bg-accent transition-colors shadow-sm"
      >
        <UserCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">Demo as</span>
        <span className="font-medium">{ROLE_LABELS[role]}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-lg border bg-popover shadow-lg p-1 z-40">
          <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">Switch Role (Demo)</p>
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                setOpen(false);
                navigate({ to: `/app/${r === "hr_staff" ? "hr" : r === "finance_staff" ? "finance" : r}` as any });
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent",
                r === role && "bg-accent font-medium"
              )}
            >
              <span>{ROLE_LABELS[r]}</span>
              {r === role && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
