import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { payrolls as seed, formatIDR } from "@/lib/data";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Payroll } from "@/lib/types";

export const Route = createFileRoute("/app/finance/payment")({ component: PaymentPage });

function PaymentPage() {
  const [list, setList] = useState<Payroll[]>(seed);
  const pay = (id: string) => { setList(list.map(p => p.payrollId === id ? { ...p, status: "Paid" as const } : p)); toast.success("Payment processed"); };
  const payAll = () => { setList(list.map(p => p.status === "Approved" ? { ...p, status: "Paid" as const } : p)); toast.success("Batch payment processed"); };
  const ready = list.filter(p => p.status === "Approved");
  return (
    <div>
      <PageHeader title="Salary Payment" description="Proses pembayaran gaji yang telah disetujui."
        actions={<button onClick={payAll} disabled={ready.length===0} className="inline-flex items-center gap-1.5 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"><CreditCard className="h-4 w-4" />Process All ({ready.length})</button>}
      />
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card label="Ready to Pay" value={`${ready.length} · ${formatIDR(ready.reduce((s,p)=>s+p.totalSalary,0))}`} />
        <Card label="Paid (Month)" value={`${list.filter(p=>p.status==="Paid").length} payments`} />
        <Card label="Bank Account" value="BCA · 88-2310-9908" />
      </div>
      <DataTable
        data={list.filter(p => ["Approved","Paid"].includes(p.status))}
        searchKeys={["employeeName"]}
        filterKey="status"
        filterOptions={[{label:"Approved",value:"Approved"},{label:"Paid",value:"Paid"}]}
        columns={[
          { key: "payrollId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "employeeName", header: "Employee" },
          { key: "period", header: "Period" },
          { key: "totalSalary", header: "Net", render: (r) => <span className="font-mono font-semibold">{formatIDR(r.totalSalary)}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "Action", render: (r) => r.status === "Approved" ? (
            <button onClick={() => pay(r.payrollId)} className="h-7 px-2.5 inline-flex items-center gap-1 rounded-md bg-primary text-primary-foreground text-xs hover:bg-primary/90"><CreditCard className="h-3 w-3" />Pay</button>
          ) : <span className="text-xs text-muted-foreground">Completed</span> },
        ]}
      />
    </div>
  );
}
function Card({label,value}:{label:string;value:string}){return <div className="rounded-xl border bg-card p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 text-lg font-semibold">{value}</p></div>}
