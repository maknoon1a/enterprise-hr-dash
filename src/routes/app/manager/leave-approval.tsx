import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { leaveRequests, employees } from "@/lib/data";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { LeaveRequest } from "@/lib/types";

export const Route = createFileRoute("/app/manager/leave-approval")({ component: P });
function P() {
  const teamIds = employees.filter(e=>e.department==="Engineering").map(e=>e.employeeId);
  const [list, setList] = useState<LeaveRequest[]>(leaveRequests.filter(l => teamIds.includes(l.employeeId)));
  const act = (id:string, status:"Approved"|"Rejected") => { setList(list.map(l => l.leaveId===id?{...l,status}:l)); toast.success(`Leave ${status.toLowerCase()}`); };
  return (
    <div>
      <PageHeader title="Leave Approval" description="Approve atau tolak pengajuan cuti tim Anda." />
      <DataTable data={list} searchKeys={["employeeName","type"]} columns={[
        { key: "leaveId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
        { key: "employeeName", header: "Employee" },
        { key: "type", header: "Type" },
        { key: "startDate", header: "From" },
        { key: "endDate", header: "To" },
        { key: "reason", header: "Reason", render: (r) => <span className="text-muted-foreground text-xs">{r.reason ?? "-"}</span> },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
        { key: "actions", header: "Action", render: (r) => r.status === "Pending" ? (
          <div className="flex gap-1">
            <button onClick={() => act(r.leaveId, "Approved")} className="h-7 px-2 inline-flex items-center gap-1 rounded-md bg-success/15 text-success text-xs hover:bg-success/25"><Check className="h-3 w-3" />Approve</button>
            <button onClick={() => act(r.leaveId, "Rejected")} className="h-7 px-2 inline-flex items-center gap-1 rounded-md bg-destructive/15 text-destructive text-xs hover:bg-destructive/25"><X className="h-3 w-3" />Reject</button>
          </div>
        ) : <span className="text-xs text-muted-foreground">—</span> },
      ]} />
    </div>
  );
}
