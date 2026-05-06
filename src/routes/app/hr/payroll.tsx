import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { payrolls as seed, employees, formatIDR } from "@/lib/data";
import { Calculator, Send, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Payroll } from "@/lib/types";

export const Route = createFileRoute("/app/hr/payroll")({ component: GenPage });

function GenPage() {
  const [list, setList] = useState<Payroll[]>(seed);
  const [edit, setEdit] = useState<Payroll | null>(null);
  const [form, setForm] = useState<Payroll | null>(null);

  const calc = () => {
    const period = "May 2026";
    const newRows: Payroll[] = employees.filter(e=>e.status==="Active").map((e, i) => {
      const allowance = Math.round(e.salary * 0.15);
      const deduction = Math.round(e.salary * 0.07);
      return { payrollId: "PR" + String(100 + list.length + i).padStart(3, "0"), employeeId: e.employeeId, employeeName: e.name, period, basicSalary: e.salary, allowance, deduction, totalSalary: e.salary + allowance - deduction, status: "Draft" };
    });
    setList([...newRows, ...list]);
    toast.success(`${newRows.length} payroll drafts dibuat untuk ${period}`);
  };

  const submitForApproval = (p: Payroll) => { setList(list.map(x => x.payrollId === p.payrollId ? { ...x, status: "Pending Approval" as const } : x)); toast.success("Sent to Finance for approval"); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const total = form.basicSalary + form.allowance - form.deduction;
    setList(list.map(x => x.payrollId === form.payrollId ? { ...form, totalSalary: total } : x));
    setEdit(null); toast.success("Payroll diperbarui");
  };

  return (
    <div>
      <PageHeader title="Generate Payroll" description="Hitung dan kelola draft payroll bulanan."
        actions={<button onClick={calc} className="inline-flex items-center gap-1.5 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Calculator className="h-4 w-4" />Generate New Period</button>}
      />

      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        <Stat label="Drafts" v={list.filter(p=>p.status==="Draft").length} />
        <Stat label="Pending Approval" v={list.filter(p=>p.status==="Pending Approval").length} />
        <Stat label="Approved" v={list.filter(p=>p.status==="Approved").length} />
        <Stat label="Paid" v={list.filter(p=>p.status==="Paid").length} />
      </div>

      <DataTable
        data={list}
        searchKeys={["employeeName","period"]}
        filterKey="status"
        filterOptions={[{label:"Draft",value:"Draft"},{label:"Pending Approval",value:"Pending Approval"},{label:"Approved",value:"Approved"},{label:"Paid",value:"Paid"}]}
        onExport={() => toast.success("Exported")}
        columns={[
          { key: "payrollId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "employeeName", header: "Employee" },
          { key: "period", header: "Period" },
          { key: "basicSalary", header: "Basic", render: (r) => <span className="font-mono">{formatIDR(r.basicSalary)}</span> },
          { key: "allowance", header: "Allowance", render: (r) => <span className="font-mono text-success">{formatIDR(r.allowance)}</span> },
          { key: "deduction", header: "Deduction", render: (r) => <span className="font-mono text-destructive">{formatIDR(r.deduction)}</span> },
          { key: "totalSalary", header: "Total", render: (r) => <span className="font-mono font-semibold">{formatIDR(r.totalSalary)}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: (r) => (
            <div className="flex gap-1">
              <button onClick={() => { setEdit(r); setForm(r); }} className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-accent"><Pencil className="h-3.5 w-3.5" /></button>
              {r.status === "Draft" && <button onClick={() => submitForApproval(r)} className="h-7 px-2 inline-flex items-center gap-1 rounded-md bg-primary/10 text-primary text-xs hover:bg-primary/20"><Send className="h-3 w-3" />Submit</button>}
            </div>
          )},
        ]}
      />

      <Dialog open={!!edit} onOpenChange={(o)=>!o&&setEdit(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Payroll · {edit?.employeeName}</DialogTitle></DialogHeader>
          {form && (
            <form onSubmit={save} className="space-y-4">
              <Field label="Period"><input value={form.period} onChange={(e)=>setForm({...form,period:e.target.value})} className="inp" /></Field>
              <Field label="Basic Salary"><input type="number" value={form.basicSalary} onChange={(e)=>setForm({...form,basicSalary:Number(e.target.value)})} className="inp" /></Field>
              <Field label="Allowance"><input type="number" value={form.allowance} onChange={(e)=>setForm({...form,allowance:Number(e.target.value)})} className="inp" /></Field>
              <Field label="Deduction"><input type="number" value={form.deduction} onChange={(e)=>setForm({...form,deduction:Number(e.target.value)})} className="inp" /></Field>
              <div className="rounded-md bg-primary/5 p-3 text-sm flex justify-between"><span>Total Salary</span><span className="font-mono font-semibold">{formatIDR(form.basicSalary+form.allowance-form.deduction)}</span></div>
              <DialogFooter>
                <button type="button" onClick={()=>setEdit(null)} className="h-9 rounded-md border bg-background px-4 text-sm hover:bg-accent">Batal</button>
                <button type="submit" className="h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90">Save</button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <style>{`.inp{height:2.5rem;width:100%;border-radius:0.375rem;border:1px solid var(--border);background:var(--background);padding:0 0.75rem;font-size:0.875rem}`}</style>
    </div>
  );
}
function Stat({label,v}:{label:string;v:number}){return <div className="rounded-xl border bg-card p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold">{v}</p></div>}
function Field({label,children}:{label:string;children:React.ReactNode}){return <div><label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label><div className="mt-1.5">{children}</div></div>}
