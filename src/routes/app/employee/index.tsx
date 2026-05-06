import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { Clock, CalendarDays, Wallet, TrendingUp, ArrowRight } from "lucide-react";
import { attendance, leaveRequests, payrolls, formatIDR } from "@/lib/data";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/employee/")({ component: Dashboard });

function Dashboard() {
  const myAtt = attendance.filter((a) => a.employeeId === "EMP001");
  const myLeave = leaveRequests.filter((l) => l.employeeId === "EMP001");
  const myPay = payrolls.filter((p) => p.employeeId === "EMP001");
  const latest = myPay[0];

  return (
    <div>
      <PageHeader title="Selamat datang, Andika 👋" description="Berikut ringkasan aktivitas Anda hari ini." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Attendance Bulan Ini" value="21 / 22" icon={<Clock className="h-5 w-5" />} trend="↑ 95.5% kehadiran" accent="success" />
        <StatCard label="Sisa Cuti Tahunan" value="9 hari" icon={<CalendarDays className="h-5 w-5" />} trend="3 dari 12 hari terpakai" accent="info" />
        <StatCard label="Gaji Terakhir" value={formatIDR(latest.totalSalary)} icon={<Wallet className="h-5 w-5" />} trend={`Periode ${latest.period}`} accent="primary" />
        <StatCard label="Performance Score" value="92" icon={<TrendingUp className="h-5 w-5" />} trend="Q1 2026 · Excellent" accent="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 border-b">
            <h3 className="font-semibold">Recent Attendance</h3>
            <Link to="/app/employee/attendance" className="text-xs text-primary hover:underline inline-flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground"><th className="text-left px-5 py-2.5">Date</th><th className="text-left px-5 py-2.5">Check-in</th><th className="text-left px-5 py-2.5">Check-out</th><th className="text-left px-5 py-2.5">Status</th></tr></thead>
            <tbody>
              {myAtt.slice(0, 5).map((a) => (
                <tr key={a.attendanceId} className="border-b last:border-b-0">
                  <td className="px-5 py-3">{a.date}</td>
                  <td className="px-5 py-3 font-mono">{a.checkIn}</td>
                  <td className="px-5 py-3 font-mono">{a.checkOut}</td>
                  <td className="px-5 py-3"><StatusBadge status={a.status ?? "Present"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 border-b">
            <h3 className="font-semibold">My Leave Requests</h3>
            <Link to="/app/employee/leave" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <ul className="divide-y">
            {myLeave.length === 0 && <li className="p-5 text-sm text-muted-foreground">No leave requests.</li>}
            {myLeave.map((l) => (
              <li key={l.leaveId} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{l.type}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{l.startDate} → {l.endDate}</p>
                  </div>
                  <StatusBadge status={l.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
