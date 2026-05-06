import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { Users, CheckSquare, Clock, TrendingUp } from "lucide-react";
import { employees, leaveRequests, evaluations, formatIDR } from "@/lib/data";

export const Route = createFileRoute("/app/manager/")({ component: Dash });
function Dash() {
  const team = employees.filter(e => e.department === "Engineering");
  const pending = leaveRequests.filter(l => team.some(t=>t.employeeId===l.employeeId) && l.status === "Pending");
  return (
    <div>
      <PageHeader title="Manager Dashboard" description="Overview tim Engineering." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Team Size" value={team.length} icon={<Users className="h-5 w-5" />} accent="primary" />
        <StatCard label="Pending Leave" value={pending.length} icon={<CheckSquare className="h-5 w-5" />} accent="warning" />
        <StatCard label="Avg. Attendance" value="94%" icon={<Clock className="h-5 w-5" />} accent="success" />
        <StatCard label="Avg. Performance" value={Math.round(evaluations.reduce((s,e)=>s+e.score,0)/evaluations.length)} icon={<TrendingUp className="h-5 w-5" />} accent="info" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Team Members">
          <ul className="divide-y">{team.map(t => (
            <li key={t.employeeId} className="flex items-center gap-3 px-5 py-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-xs font-semibold">{t.name.split(" ").map(n=>n[0]).join("")}</div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{t.name}</p><p className="text-xs text-muted-foreground truncate">{t.position} · {formatIDR(t.salary)}</p></div>
              <StatusBadge status={t.status} />
            </li>
          ))}</ul>
        </Section>
        <Section title="Recent Performance">
          <ul className="divide-y">{evaluations.map(e => (
            <li key={e.evaluationId} className="px-5 py-3">
              <div className="flex items-center justify-between"><p className="text-sm font-medium">{e.employeeName}</p><span className="text-sm font-semibold text-primary">{e.score}/100</span></div>
              <p className="text-xs text-muted-foreground mt-0.5">{e.period} · Bonus {formatIDR(e.bonus)}</p>
            </li>
          ))}</ul>
        </Section>
      </div>
    </div>
  );
}
function Section({title,children}:{title:string;children:React.ReactNode}){return <div className="rounded-xl border bg-card shadow-sm"><div className="px-5 py-4 border-b"><h3 className="font-semibold">{title}</h3></div>{children}</div>}
