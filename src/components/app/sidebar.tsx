import { Link, useRouterState } from "@tanstack/react-router";
import { useRole, ROLE_LABELS, ROLES } from "@/lib/role-context";
import type { Role } from "@/lib/types";
import {
  LayoutDashboard, Clock, CalendarDays, FileText, Wallet, Users, ClipboardList,
  Calculator, BarChart3, ShieldCheck, CreditCard, Receipt, UserCog, UsersRound,
  CheckSquare, TrendingUp, Building2, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem { to: string; label: string; icon: any }

const NAV: Record<Role, { section: string; items: NavItem[] }[]> = {
  employee: [
    { section: "Workspace", items: [
      { to: "/app/employee", label: "Dashboard", icon: LayoutDashboard },
      { to: "/app/employee/attendance", label: "Attendance", icon: Clock },
      { to: "/app/employee/leave", label: "Leave Request", icon: CalendarDays },
    ]},
    { section: "Payroll", items: [
      { to: "/app/employee/payslip", label: "My Payslip", icon: FileText },
      { to: "/app/employee/payroll-history", label: "Payroll History", icon: Wallet },
    ]},
  ],
  hr_staff: [
    { section: "Overview", items: [{ to: "/app/hr", label: "Dashboard", icon: LayoutDashboard }]},
    { section: "People", items: [
      { to: "/app/hr/employees", label: "Employee Management", icon: Users },
      { to: "/app/hr/leave", label: "Leave Management", icon: ClipboardList },
      { to: "/app/hr/attendance", label: "Attendance Records", icon: Clock },
    ]},
    { section: "Payroll", items: [
      { to: "/app/hr/payroll", label: "Generate Payroll", icon: Calculator },
      { to: "/app/hr/reports", label: "Reports", icon: BarChart3 },
    ]},
  ],
  finance_staff: [
    { section: "Overview", items: [{ to: "/app/finance", label: "Dashboard", icon: LayoutDashboard }]},
    { section: "Payroll", items: [
      { to: "/app/finance/approval", label: "Payroll Approval", icon: ShieldCheck },
      { to: "/app/finance/payment", label: "Salary Payment", icon: CreditCard },
      { to: "/app/finance/reports", label: "Payroll Reports", icon: Receipt },
    ]},
  ],
  manager: [
    { section: "Overview", items: [{ to: "/app/manager", label: "Dashboard", icon: LayoutDashboard }]},
    { section: "Team", items: [
      { to: "/app/manager/team", label: "Team Members", icon: UsersRound },
      { to: "/app/manager/leave-approval", label: "Leave Approval", icon: CheckSquare },
      { to: "/app/manager/attendance", label: "Team Attendance", icon: Clock },
    ]},
    { section: "Performance", items: [
      { to: "/app/manager/payroll-summary", label: "Team Payroll", icon: TrendingUp },
      { to: "/app/manager/evaluation", label: "Performance Evaluation", icon: BarChart3 },
    ]},
  ],
  admin: [
    { section: "Administration", items: [
      { to: "/app/admin", label: "Dashboard", icon: LayoutDashboard },
      { to: "/app/admin/users", label: "User Management", icon: UserCog },
    ]},
  ],
};

export function AppSidebar() {
  const { role, setRole } = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sections = NAV[role];
  const [switcherOpen, setSwitcherOpen] = useState(false);

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">NusaCorp HR</p>
          <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60 mt-1">Enterprise Suite</p>
        </div>
      </div>

      <div className="px-3 py-3 border-b border-sidebar-border">
        <button
          onClick={() => setSwitcherOpen((v) => !v)}
          className="w-full flex items-center justify-between rounded-lg bg-sidebar-accent px-3 py-2.5 text-left hover:bg-sidebar-accent/80 transition-colors"
        >
          <div>
            <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">Active Role</p>
            <p className="text-sm font-medium mt-0.5">{ROLE_LABELS[role]}</p>
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", switcherOpen && "rotate-180")} />
        </button>
        {switcherOpen && (
          <div className="mt-2 grid gap-1">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setSwitcherOpen(false); }}
                className={cn(
                  "text-left px-3 py-2 text-xs rounded-md transition-colors",
                  r === role ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground/80"
                )}
              >
                {ROLE_LABELS[r]}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {sections.map((sec) => (
          <div key={sec.section}>
            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">{sec.section}</p>
            <div className="space-y-1">
              {sec.items.map((it) => {
                const active = pathname === it.to || (it.to !== `/app/${role}` && pathname.startsWith(it.to));
                const Icon = it.icon;
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{it.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4 text-[11px] text-sidebar-foreground/50">
        v2.4.1 · © NusaCorp 2026
      </div>
    </aside>
  );
}
