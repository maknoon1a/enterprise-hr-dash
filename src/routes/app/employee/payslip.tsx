import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { payrolls, formatIDR, employees } from "@/lib/data";
import { StatusBadge } from "@/components/app/status-badge";
import { Download, Printer, Mail, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/employee/payslip")({ component: PayslipPage });

function PayslipPage() {
  const myPayrolls = payrolls.filter((p) => p.employeeId === "EMP001");
  const [sel, setSel] = useState(myPayrolls[0]);
  const emp = employees.find((e) => e.employeeId === "EMP001")!;

  return (
    <div>
      <PageHeader title="My Payslip" description="Lihat dan unduh slip gaji Anda."
        actions={
          <>
            <select value={sel.payrollId} onChange={(e) => setSel(myPayrolls.find((p) => p.payrollId === e.target.value)!)} className="h-9 rounded-md border bg-background px-3 text-sm">
              {myPayrolls.map((p) => <option key={p.payrollId} value={p.payrollId}>{p.period}</option>)}
            </select>
            <button onClick={() => toast.success("Payslip downloaded")} className="inline-flex items-center gap-1.5 h-9 rounded-md border bg-background px-3 text-sm hover:bg-accent"><Download className="h-4 w-4" />Download PDF</button>
            <button onClick={() => toast.success("Sent to email")} className="inline-flex items-center gap-1.5 h-9 rounded-md border bg-background px-3 text-sm hover:bg-accent"><Mail className="h-4 w-4" />Email</button>
            <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Printer className="h-4 w-4" />Print</button>
          </>
        }
      />

      <div className="rounded-xl border bg-card shadow-sm max-w-4xl mx-auto">
        <div className="flex items-start justify-between border-b p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Building2 className="h-6 w-6" /></div>
            <div>
              <p className="text-lg font-semibold">NusaCorp Indonesia</p>
              <p className="text-xs text-muted-foreground">Jl. Sudirman Kav. 23, Jakarta Pusat 10220</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Payslip</p>
            <p className="font-mono text-sm">{sel.payrollId}</p>
            <StatusBadge status={sel.status} className="mt-2" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 border-b p-6 md:p-8">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Employee</p>
            <p className="font-semibold">{emp.name}</p>
            <p className="text-sm text-muted-foreground">{emp.position} · {emp.department}</p>
            <p className="text-xs text-muted-foreground mt-1">ID: {emp.employeeId}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Pay Period</p>
            <p className="font-semibold">{sel.period}</p>
            <p className="text-sm text-muted-foreground mt-1">Issued: 25 {sel.period.split(" ")[0]} {sel.period.split(" ")[1]}</p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-3 border-b">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Earnings</h3>
          <Row label="Basic Salary" value={formatIDR(sel.basicSalary)} />
          <Row label="Allowance (Transport, Meal, Health)" value={formatIDR(sel.allowance)} />
          <Row label="Total Earnings" value={formatIDR(sel.basicSalary + sel.allowance)} bold />

          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-6">Deductions</h3>
          <Row label="Tax (PPh 21)" value={formatIDR(Math.round(sel.deduction * 0.6))} />
          <Row label="BPJS Kesehatan & Ketenagakerjaan" value={formatIDR(Math.round(sel.deduction * 0.4))} />
          <Row label="Total Deductions" value={formatIDR(sel.deduction)} bold />
        </div>

        <div className="flex items-center justify-between bg-primary/5 p-6 md:p-8">
          <p className="text-base font-semibold">Net Salary</p>
          <p className="text-2xl font-bold text-primary">{formatIDR(sel.totalSalary)}</p>
        </div>

        <div className="p-6 md:p-8 text-xs text-muted-foreground border-t">
          This payslip is electronically generated and does not require a signature. For inquiries, contact <span className="text-primary">payroll@nusacorp.id</span>.
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1.5 ${bold ? "border-t pt-3 font-semibold" : "text-sm"}`}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}
