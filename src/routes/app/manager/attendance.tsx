import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { attendance, employees } from "@/lib/data";

export const Route = createFileRoute("/app/manager/attendance")({ component: P });
function P() {
  const teamIds = employees.filter(e=>e.department==="Engineering").map(e=>e.employeeId);
  const data = attendance.filter(a => teamIds.includes(a.employeeId));
  return (
    <div>
      <PageHeader title="Team Attendance" description="Monitoring kehadiran tim Engineering." />
      <DataTable data={data} searchKeys={["employeeName"]} filterKey="status" filterOptions={[{label:"Present",value:"Present"},{label:"Late",value:"Late"},{label:"Leave",value:"Leave"}]} columns={[
        { key: "employeeName", header: "Employee" },
        { key: "date", header: "Date" },
        { key: "checkIn", header: "Check-in", render: (r) => <span className="font-mono">{r.checkIn}</span> },
        { key: "checkOut", header: "Check-out", render: (r) => <span className="font-mono">{r.checkOut}</span> },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status ?? "Present"} /> },
      ]} />
    </div>
  );
}
