import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { payrolls, employees, formatIDR } from "@/lib/data";

export const Route = createFileRoute("/app/manager/payroll-summary")({ component: P });
function P() {
  const teamIds = employees.filter(e=>e.department==="Engineering").map(e=>e.employeeId);
  const data = payrolls.filter(p => teamIds.includes(p.employeeId));
  const total = data.reduce((s,p)=>s+p.totalSalary,0);
  const avg = data.length ? Math.round(total/data.length) : 0;
  return (
    <div>
      <PageHeader title="Team Payroll Summary" description="Analitik payroll tim Engineering." />
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card label="Total Team Payroll" value={formatIDR(total)} />
        <Card label="Average per Member" value={formatIDR(avg)} />
        <Card label="Records" value={`${data.length} entries`} />
      </div>
      <DataTable data={data} searchKeys={["employeeName","period"]} columns={[
        { key: "employeeName", header: "Employee" },
        { key: "period", header: "Period" },
        { key: "basicSalary", header: "Basic", render: (r) => <span className="font-mono">{formatIDR(r.basicSalary)}</span> },
        { key: "allowance", header: "Allow.", render: (r) => <span className="font-mono">{formatIDR(r.allowance)}</span> },
        { key: "totalSalary", header: "Total", render: (r) => <span className="font-mono font-semibold">{formatIDR(r.totalSalary)}</span> },
      ]} />
    </div>
  );
}
function Card({label,value}:{label:string;value:string}){return <div className="rounded-xl border bg-card p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p></div>}
