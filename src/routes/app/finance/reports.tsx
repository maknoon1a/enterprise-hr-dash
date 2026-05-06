import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { payrolls, formatIDR } from "@/lib/data";
import { Download, FileSpreadsheet, FileBarChart2, FilePieChart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/finance/reports")({ component: FinReports });

function FinReports() {
  const total = payrolls.reduce((s,p)=>s+p.totalSalary,0);
  return (
    <div>
      <PageHeader title="Payroll Reports" description="Ringkasan dan ekspor laporan keuangan payroll."
        actions={<button onClick={() => toast.success("All reports exported")} className="inline-flex items-center gap-1.5 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Download className="h-4 w-4" />Export All</button>}
      />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Stat label="Total Payroll YTD" value={formatIDR(total * 4)} />
        <Stat label="Avg. per Employee" value={formatIDR(Math.round(total / payrolls.length))} />
        <Stat label="Active Records" value={`${payrolls.length} entries`} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: FileBarChart2, name: "Monthly Summary", desc: "Rekap payroll bulan berjalan" },
          { icon: FileSpreadsheet, name: "Department Breakdown", desc: "Per-departemen total dan rata-rata" },
          { icon: FilePieChart, name: "Tax & BPJS Report", desc: "Pelaporan pajak dan BPJS" },
          { icon: FileBarChart2, name: "Bonus & Allowance", desc: "Tunjangan dan insentif" },
          { icon: FileSpreadsheet, name: "Annual Comparison", desc: "Perbandingan tahunan" },
          { icon: FilePieChart, name: "Cash Flow Analysis", desc: "Aliran kas payroll" },
        ].map((r) => (
          <div key={r.name} className="rounded-xl border bg-card p-5 shadow-sm hover:shadow transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3"><r.icon className="h-5 w-5" /></div>
            <p className="font-medium">{r.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
            <button onClick={() => toast.success(r.name + " exported")} className="mt-4 w-full inline-flex items-center justify-center gap-1.5 h-8 rounded-md border bg-background text-xs hover:bg-accent"><Download className="h-3.5 w-3.5" />Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
function Stat({label,value}:{label:string;value:string}){return <div className="rounded-xl border bg-card p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p></div>}
