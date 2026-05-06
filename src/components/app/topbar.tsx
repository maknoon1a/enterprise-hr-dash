import { Link, useNavigate } from "@tanstack/react-router";
import { useRole, ROLE_LABELS, ROLES } from "@/lib/role-context";
import { ROLE_USERS } from "@/lib/data";
import { Bell, Search, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Topbar() {
  const { role, setRole } = useRole();
  const user = ROLE_USERS[role];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setRoleOpen(false); }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/80 backdrop-blur px-4 md:px-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search employees, payroll, requests..."
          className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
      </div>

      <div className="flex items-center gap-2" ref={ref}>
        <div className="relative">
          <button
            onClick={() => { setRoleOpen((v) => !v); setOpen(false); }}
            className="hidden md:flex items-center gap-2 rounded-lg border bg-background px-3 h-10 text-xs hover:bg-accent transition-colors"
          >
            <span className="text-muted-foreground">Role:</span>
            <span className="font-medium">{ROLE_LABELS[role]}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {roleOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-popover shadow-lg p-1 z-40">
              <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">Switch Role (Demo)</p>
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setRoleOpen(false); navigate({ to: `/app/${r === "hr_staff" ? "hr" : r === "finance_staff" ? "finance" : r}` }); toast.success(`Switched to ${ROLE_LABELS[r]}`); }}
                  className={cn("w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent", r === role && "bg-accent font-medium")}
                >
                  {ROLE_LABELS[r]}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="relative h-10 w-10 rounded-lg border bg-background hover:bg-accent flex items-center justify-center">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <div className="relative">
          <button
            onClick={() => { setOpen((v) => !v); setRoleOpen(false); }}
            className="flex items-center gap-2 rounded-lg border bg-background pl-1.5 pr-2.5 h-10 hover:bg-accent transition-colors"
          >
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center text-xs font-semibold">
              {user.avatar}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium leading-none">{user.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{user.role}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 hidden sm:block" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-60 rounded-lg border bg-popover shadow-lg p-1 z-40">
              <div className="px-3 py-3 border-b">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{user.position}</p>
              </div>
              <div className="p-1">
                <Link to="/app/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent">
                  <User className="h-4 w-4" /> Profile Saya
                </Link>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent">
                  <Settings className="h-4 w-4" /> Settings
                </button>
              </div>
              <div className="border-t p-1">
                <button
                  onClick={() => { setOpen(false); toast.success("Logged out successfully"); navigate({ to: "/" }); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-destructive/10 text-destructive"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
