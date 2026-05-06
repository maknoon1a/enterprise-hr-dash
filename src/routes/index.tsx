import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, ArrowRight, Users, Wallet, Clock, ShieldCheck, BarChart3, UserCog } from "lucide-react";
import { useRole, ROLE_LABELS } from "@/lib/role-context";
import type { Role } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Landing });

const roles: { id: Role; title: string; desc: string; icon: any; path: string; color: string }[] = [
  { id: "employee", title: "Employee", desc: "Personal dashboard, attendance, leave, and payslip access.", icon: Users, path: "/app/employee", color: "from-blue-500/20 to-blue-500/5" },
  { id: "hr_staff", title: "HR Staff", desc: "Employee management, leave approvals, and payroll generation.", icon: ShieldCheck, path: "/app/hr", color: "from-emerald-500/20 to-emerald-500/5" },
  { id: "finance_staff", title: "Finance Staff", desc: "Approve payroll, process payments, and finance reporting.", icon: Wallet, path: "/app/finance", color: "from-amber-500/20 to-amber-500/5" },
  { id: "manager", title: "Manager", desc: "Oversee your team, approvals, and performance reviews.", icon: BarChart3, path: "/app/manager", color: "from-violet-500/20 to-violet-500/5" },
  { id: "admin", title: "Admin", desc: "User accounts, roles, and system administration.", icon: UserCog, path: "/app/admin", color: "from-rose-500/20 to-rose-500/5" },
];

function Landing() {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/30">
      <header className="border-b bg-card/40 backdrop-blur">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Building2 className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold">NusaCorp HR</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Enterprise Suite</p>
            </div>
          </div>
          <Link to={`/app/${role === "hr_staff" ? "hr" : role === "finance_staff" ? "finance" : role}` as any} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 h-9 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Open Console <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-success" />Live demo · Role-based preview</span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">HR & Payroll, unified for the modern enterprise.</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">Manage employees, attendance, leave, payroll, and performance evaluation in a single, role-aware workspace. Switch roles below to preview each persona's experience.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => {
            const Icon = r.icon;
            const active = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => { setRole(r.id); navigate({ to: r.path as any }); }}
                className={`group relative overflow-hidden rounded-xl border bg-card p-5 text-left shadow-sm hover:shadow-md transition-all ${active ? "ring-2 ring-primary" : ""}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-60`} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-card border flex items-center justify-center"><Icon className="h-5 w-5 text-primary" /></div>
                    {active && <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Current</span>}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary font-medium">Enter as {ROLE_LABELS[r.id]} <ArrowRight className="h-3.5 w-3.5" /></div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Active Employees", value: "248", icon: Users },
            { label: "Pending Approvals", value: "12", icon: ShieldCheck },
            { label: "Avg. Attendance", value: "96.2%", icon: Clock },
            { label: "Payroll · April", value: "Rp 1.84B", icon: Wallet },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
