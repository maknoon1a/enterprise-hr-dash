import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useRole, ROLE_LABELS, ROLES } from "@/lib/role-context";
import { ROLE_USERS } from "@/lib/data";
import type { Role } from "@/lib/types";
import {
  LayoutDashboard, Clock, CalendarDays, FileText, Wallet, Users, ClipboardList,
  Calculator, BarChart3, ShieldCheck, CreditCard, Receipt, UserCog, UsersRound,
  CheckSquare, TrendingUp, Building2, User, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

const ROLE_SHORT: Record<Role, string> = {
  employee: "EMP",
  hr_staff: "HR",
  finance_staff: "FIN",
  manager: "MGR",
  admin: "ADM",
};

export function AppSidebar() {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sections = NAV[role];
  const user = ROLE_USERS[role];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate({ to: "/" });
  };

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Tiny role slider at very top */}
      <div className="px-3 pt-3">
        <div className="flex items-center gap-1 rounded-md bg-sidebar-accent/60 p-1">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                navigate({ to: `/app/${r === "hr_staff" ? "hr" : r === "finance_staff" ? "finance" : r}` });
              }}
              title={ROLE_LABELS[r]}
              className={cn(
                "flex-1 px-1.5 py-1 text-[9px] font-semibold uppercase tracking-wider rounded transition-colors",
                r === role
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              {ROLE_SHORT[r]}
            </button>
          ))}
        </div>
      </div>

      {/* Branding */}
      <div className="flex items-center gap-2.5 px-5 h-16 mt-2 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">NusaCorp HR</p>
          <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60 mt-1">Enterprise Suite</p>
        </div>
      </div>

      {/* User profile */}
      <div className="px-3 py-4 border-b border-sidebar-border space-y-3">
        <div className="flex items-center gap-3 px-1">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/60 text-sidebar-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
            {user.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-[11px] text-sidebar-foreground/60 truncate">{user.position}</p>
          </div>
        </div>
        <div className="space-y-1">
          <Link
            to="/app/profile"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              pathname === "/app/profile"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <User className="h-4 w-4" />
            <span>Profile Saya</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Nav */}
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

      <div className="border-t border-sidebar-border px-4 py-3 text-[10px] text-sidebar-foreground/40">
        v2.4.1 · © NusaCorp 2026
      </div>
    </aside>
  );
}
