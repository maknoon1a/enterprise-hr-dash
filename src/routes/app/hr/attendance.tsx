import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { attendance } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/hr/attendance")({ component: AttRecPage });

function AttRecPage() {
  return (
    <div>
      <PageHeader title="Attendance Records" description="Monitoring kehadiran seluruh karyawan." />
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[["Total Today", attendance.length, ""],["Present", attendance.filter(a=>a.status==="Present").length, "success"],["Late", attendance.filter(a=>a.status==="Late").length, "info"],["On Leave", attendance.filter(a=>a.status==="Leave").length, "warning"]].map(([k,v]) => (
          <div key={k as string} className="rounded-xl border bg-card p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p><p className="mt-2 text-2xl font-semibold">{v}</p></div>
        ))}
      </div>
      <DataTable
        data={attendance}
        searchKeys={["employeeName", "date"]}
        filterKey="status"
        filterOptions={[{label:"Present",value:"Present"},{label:"Late",value:"Late"},{label:"Leave",value:"Leave"}]}
        onExport={() => toast.success("Attendance exported")}
        columns={[
          { key: "attendanceId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "employeeName", header: "Employee" },
          { key: "date", header: "Date" },
          { key: "checkIn", header: "Check-in", render: (r) => <span className="font-mono">{r.checkIn}</span> },
          { key: "checkOut", header: "Check-out", render: (r) => <span className="font-mono">{r.checkOut}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status ?? "Present"} /> },
        ]}
      />
    </div>
  );
}
