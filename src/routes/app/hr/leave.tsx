import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { leaveRequests } from "@/lib/data";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { LeaveRequest } from "@/lib/types";

export const Route = createFileRoute("/app/hr/leave")({ component: HRLeavePage });

function HRLeavePage() {
  const [list, setList] = useState<LeaveRequest[]>(leaveRequests);
  const act = (id: string, status: "Approved" | "Rejected") => {
    setList(list.map((l) => l.leaveId === id ? { ...l, status } : l));
    toast.success(`Leave ${status.toLowerCase()}`);
  };
  return (
    <div>
      <PageHeader title="Leave Management" description="Approve atau tolak pengajuan cuti karyawan." />
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[["Pending", list.filter(l=>l.status==="Pending").length, "warning"],["Approved", list.filter(l=>l.status==="Approved").length, "success"],["Rejected", list.filter(l=>l.status==="Rejected").length, "destructive"],["Total", list.length, "primary"]].map(([k,v]) => (
          <div key={k as string} className="rounded-xl border bg-card p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p><p className="mt-2 text-2xl font-semibold">{v}</p></div>
        ))}
      </div>
      <DataTable
        data={list}
        searchKeys={["employeeName", "type"]}
        filterKey="status"
        filterOptions={[{label:"Pending",value:"Pending"},{label:"Approved",value:"Approved"},{label:"Rejected",value:"Rejected"}]}
        onExport={() => toast.success("Exported")}
        columns={[
          { key: "leaveId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "employeeName", header: "Employee", render: (r) => <div><p className="font-medium">{r.employeeName}</p><p className="text-xs text-muted-foreground">{r.employeeId}</p></div> },
          { key: "type", header: "Type" },
          { key: "startDate", header: "From" },
          { key: "endDate", header: "To" },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "Action", render: (r) => r.status === "Pending" ? (
            <div className="flex gap-1">
              <button onClick={() => act(r.leaveId, "Approved")} className="h-7 px-2 inline-flex items-center gap-1 rounded-md bg-success/15 text-success text-xs hover:bg-success/25"><Check className="h-3 w-3" />Approve</button>
              <button onClick={() => act(r.leaveId, "Rejected")} className="h-7 px-2 inline-flex items-center gap-1 rounded-md bg-destructive/15 text-destructive text-xs hover:bg-destructive/25"><X className="h-3 w-3" />Reject</button>
            </div>
          ) : <span className="text-xs text-muted-foreground">—</span> },
        ]}
      />
    </div>
  );
}
