import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { payrolls, formatIDR } from "@/lib/data";
import { Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/employee/payroll-history")({ component: HistoryPage });

function HistoryPage() {
  const my = payrolls.filter((p) => p.employeeId === "EMP001");
  return (
    <div>
      <PageHeader title="Payroll History" description="Riwayat penggajian bulanan Anda." />
      <DataTable
        data={my}
        searchKeys={["period", "status"]}
        onExport={() => toast.success("History exported")}
        columns={[
          { key: "payrollId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "period", header: "Period", render: (r) => <span className="font-medium">{r.period}</span> },
          { key: "basicSalary", header: "Basic", render: (r) => <span className="font-mono">{formatIDR(r.basicSalary)}</span> },
          { key: "allowance", header: "Allowance", render: (r) => <span className="font-mono text-success">{formatIDR(r.allowance)}</span> },
          { key: "deduction", header: "Deduction", render: (r) => <span className="font-mono text-destructive">{formatIDR(r.deduction)}</span> },
          { key: "totalSalary", header: "Net", render: (r) => <span className="font-mono font-semibold">{formatIDR(r.totalSalary)}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: () => <Link to="/app/employee/payslip" className="inline-flex items-center gap-1 text-xs text-primary hover:underline"><Eye className="h-3.5 w-3.5" />View</Link> },
        ]}
      />
    </div>
  );
}
