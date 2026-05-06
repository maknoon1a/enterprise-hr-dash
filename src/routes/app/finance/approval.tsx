import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { payrolls as seed, formatIDR } from "@/lib/data";
import { Check, X, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Payroll } from "@/lib/types";

export const Route = createFileRoute("/app/finance/approval")({ component: ApprovalPage });

function ApprovalPage() {
  const [list, setList] = useState<Payroll[]>(seed);
  const act = (id: string, status: Payroll["status"]) => { setList(list.map(p => p.payrollId === id ? { ...p, status } : p)); toast.success(`Payroll ${status.toLowerCase()}`); };
  return (
    <div>
      <PageHeader title="Payroll Approval" description="Validasi dan approve/reject payroll yang dikirim oleh HR." />
      <DataTable
        data={list}
        searchKeys={["employeeName","period"]}
        filterKey="status"
        filterOptions={[{label:"Pending Approval",value:"Pending Approval"},{label:"Approved",value:"Approved"},{label:"Rejected",value:"Rejected"}]}
        onExport={() => toast.success("Exported")}
        columns={[
          { key: "payrollId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "employeeName", header: "Employee" },
          { key: "period", header: "Period" },
          { key: "basicSalary", header: "Basic", render: (r) => <span className="font-mono">{formatIDR(r.basicSalary)}</span> },
          { key: "allowance", header: "Allow.", render: (r) => <span className="font-mono">{formatIDR(r.allowance)}</span> },
          { key: "deduction", header: "Deduct.", render: (r) => <span className="font-mono">{formatIDR(r.deduction)}</span> },
          { key: "totalSalary", header: "Total", render: (r) => <span className="font-mono font-semibold">{formatIDR(r.totalSalary)}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "Action", render: (r) => (
            <div className="flex gap-1">
              <button title="View" className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-accent"><FileText className="h-3.5 w-3.5" /></button>
              {r.status === "Pending Approval" && <>
                <button onClick={() => act(r.payrollId, "Approved")} className="h-7 px-2 inline-flex items-center gap-1 rounded-md bg-success/15 text-success text-xs hover:bg-success/25"><Check className="h-3 w-3" />Approve</button>
                <button onClick={() => act(r.payrollId, "Rejected")} className="h-7 px-2 inline-flex items-center gap-1 rounded-md bg-destructive/15 text-destructive text-xs hover:bg-destructive/25"><X className="h-3 w-3" />Reject</button>
              </>}
            </div>
          )},
        ]}
      />
    </div>
  );
}
