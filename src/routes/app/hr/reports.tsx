import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { payrolls, attendance, formatIDR } from "@/lib/data";
import { Download, FileBarChart2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/hr/reports")({ component: ReportsPage });

function ReportsPage() {
  const totalPayroll = payrolls.reduce((s, p) => s + p.totalSalary, 0);
  const presentRate = Math.round((attendance.filter(a => a.status === "Present").length / attendance.length) * 100);
  const reports = [
    { name: "Payroll Summary · April 2026", desc: "Ringkasan total payroll seluruh karyawan", value: formatIDR(totalPayroll) },
    { name: "Attendance Recap · May 2026", desc: "Statistik kehadiran bulanan", value: presentRate + "%" },
    { name: "Leave Recap · Q2 2026", desc: "Rekap pengajuan dan persetujuan cuti", value: "62 requests" },
    { name: "Department Headcount", desc: "Distribusi karyawan per departemen", value: "8 dept" },
    { name: "Compensation Analysis", desc: "Analisis tunjangan dan potongan", value: "Q1 2026" },
  ];
  return (
    <div>
      <PageHeader title="Reports" description="Laporan payroll dan attendance untuk audit dan analisis." />
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <div key={r.name} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><FileBarChart2 className="h-5 w-5" /></div>
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">{r.value}</p>
                </div>
              </div>
              <button onClick={() => toast.success(`${r.name} downloaded`)} className="inline-flex items-center gap-1.5 h-8 rounded-md border bg-background px-3 text-xs hover:bg-accent"><Download className="h-3.5 w-3.5" />Export</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
