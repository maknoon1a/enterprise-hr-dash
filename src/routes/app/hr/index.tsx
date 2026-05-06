import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { Users, ClipboardList, Clock, Wallet } from "lucide-react";
import { employees, leaveRequests, attendance, payrolls, formatIDR } from "@/lib/data";

export const Route = createFileRoute("/app/hr/")({ component: HRDashboard });

function HRDashboard() {
  const pendingLeave = leaveRequests.filter((l) => l.status === "Pending");
  const totalPayroll = payrolls.filter((p) => p.period === "April 2026").reduce((s, p) => s + p.totalSalary, 0);

  return (
    <div>
      <PageHeader title="HR Dashboard" description="Ringkasan operasional HR — karyawan, cuti, attendance, dan payroll." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total Employees" value={employees.length} icon={<Users className="h-5 w-5" />} trend={`${employees.filter(e=>e.status==="Active").length} active`} accent="primary" />
        <StatCard label="Pending Leave" value={pendingLeave.length} icon={<ClipboardList className="h-5 w-5" />} trend="Requires action" accent="warning" />
        <StatCard label="Today Attendance" value={`${attendance.filter(a=>a.status==="Present").length}/10`} icon={<Clock className="h-5 w-5" />} trend="2 late · 1 leave" accent="info" />
        <StatCard label="Payroll · April" value={formatIDR(totalPayroll)} icon={<Wallet className="h-5 w-5" />} trend={`${payrolls.length} records`} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Recent Hires">
          <ul className="divide-y">
            {employees.slice(0, 5).map((e) => (
              <li key={e.employeeId} className="flex items-center gap-3 px-5 py-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-xs font-semibold">{e.name.split(" ").map(n=>n[0]).join("")}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.position} · {e.department}</p>
                </div>
                <StatusBadge status={e.status} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Pending Leave Approvals">
          <ul className="divide-y">
            {pendingLeave.length === 0 && <li className="p-5 text-sm text-muted-foreground">All caught up.</li>}
            {pendingLeave.map((l) => (
              <li key={l.leaveId} className="px-5 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{l.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{l.type} · {l.startDate} → {l.endDate}</p>
                  </div>
                  <StatusBadge status={l.status} />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="px-5 py-4 border-b"><h3 className="font-semibold">{title}</h3></div>
      {children}
    </div>
  );
}
