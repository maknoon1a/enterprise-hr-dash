import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { ShieldCheck, CreditCard, Wallet, TrendingUp } from "lucide-react";
import { payrolls, formatIDR } from "@/lib/data";

export const Route = createFileRoute("/app/finance/")({ component: FinDash });

function FinDash() {
  const pending = payrolls.filter(p => p.status === "Pending Approval");
  const approved = payrolls.filter(p => p.status === "Approved");
  const totalApproved = approved.reduce((s,p)=>s+p.totalSalary,0);
  const totalPaid = payrolls.filter(p=>p.status==="Paid").reduce((s,p)=>s+p.totalSalary,0);

  return (
    <div>
      <PageHeader title="Finance Dashboard" description="Validasi payroll, pembayaran gaji, dan laporan keuangan." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Pending Approval" value={pending.length} icon={<ShieldCheck className="h-5 w-5" />} trend="Action required" accent="warning" />
        <StatCard label="Approved Payroll" value={formatIDR(totalApproved)} icon={<Wallet className="h-5 w-5" />} trend={`${approved.length} records`} accent="info" />
        <StatCard label="Paid This Month" value={formatIDR(totalPaid)} icon={<CreditCard className="h-5 w-5" />} trend={`${payrolls.filter(p=>p.status==="Paid").length} payments`} accent="success" />
        <StatCard label="YTD Total" value="Rp 18.4B" icon={<TrendingUp className="h-5 w-5" />} trend="+8.2% YoY" accent="primary" />
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="px-5 py-4 border-b"><h3 className="font-semibold">Pending Payroll Approvals</h3></div>
        <ul className="divide-y">
          {pending.map(p => (
            <li key={p.payrollId} className="flex items-center justify-between px-5 py-3">
              <div><p className="text-sm font-medium">{p.employeeName}</p><p className="text-xs text-muted-foreground">{p.period} · <span className="font-mono">{formatIDR(p.totalSalary)}</span></p></div>
              <StatusBadge status={p.status} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
