import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { employees, formatIDR } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/manager/team")({ component: Team });
function Team() {
  const team = employees.filter(e => e.department === "Engineering");
  return (
    <div>
      <PageHeader title="Team Members" description="Anggota tim Engineering Anda." />
      <DataTable data={team} searchKeys={["name","position"]} onExport={() => toast.success("Exported")} columns={[
        { key: "employeeId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
        { key: "name", header: "Name", render: (r) => <div className="flex items-center gap-2.5"><div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-[10px] font-semibold">{r.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div><div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.email}</p></div></div> },
        { key: "position", header: "Position" },
        { key: "salary", header: "Salary", render: (r) => <span className="font-mono">{formatIDR(r.salary)}</span> },
        { key: "joinDate", header: "Joined" },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]} />
    </div>
  );
}
