import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { employees as seed, formatIDR } from "@/lib/data";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Employee } from "@/lib/types";

export const Route = createFileRoute("/app/hr/employees")({ component: EmployeesPage });

const blank: Employee = { employeeId: "", name: "", address: "", email: "", salary: 0, status: "Active", department: "Engineering", position: "" };

function EmployeesPage() {
  const [list, setList] = useState<Employee[]>(seed);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState<Employee>(blank);

  const start = (e?: Employee) => { setEditing(e ?? null); setForm(e ?? { ...blank, employeeId: "EMP" + String(list.length + 1).padStart(3, "0") }); setOpen(true); };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Lengkapi nama dan email"); return; }
    if (editing) { setList(list.map((x) => x.employeeId === editing.employeeId ? form : x)); toast.success("Karyawan diperbarui"); }
    else { setList([form, ...list]); toast.success("Karyawan ditambahkan"); }
    setOpen(false);
  };
  const remove = (e: Employee) => { if (confirm(`Hapus ${e.name}?`)) { setList(list.filter((x) => x.employeeId !== e.employeeId)); toast.success("Karyawan dihapus"); } };

  return (
    <div>
      <PageHeader title="Employee Management" description="Kelola data karyawan, departemen, dan status."
        actions={<button onClick={() => start()} className="inline-flex items-center gap-1.5 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" />Tambah Karyawan</button>}
      />

      <DataTable
        data={list}
        searchKeys={["name", "email", "department", "employeeId"]}
        filterKey="status"
        filterOptions={[{label:"Active",value:"Active"},{label:"On Leave",value:"On Leave"},{label:"Inactive",value:"Inactive"}]}
        onExport={() => toast.success("Employee data exported")}
        columns={[
          { key: "employeeId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "name", header: "Name", render: (r) => (
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-[10px] font-semibold">{r.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
              <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.email}</p></div>
            </div>
          )},
          { key: "department", header: "Department" },
          { key: "position", header: "Position" },
          { key: "salary", header: "Salary", render: (r) => <span className="font-mono">{formatIDR(r.salary)}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: (r) => (
            <div className="flex items-center gap-1">
              <button onClick={() => start(r)} className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-accent"><Pencil className="h-3.5 w-3.5" /></button>
              <button onClick={() => remove(r)} className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          )},
        ]}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Karyawan" : "Tambah Karyawan"}</DialogTitle>
            <DialogDescription>Isi data sesuai dengan model Employee.</DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="grid grid-cols-2 gap-4">
            <Field label="Employee ID"><input value={form.employeeId} onChange={(e)=>setForm({...form,employeeId:e.target.value})} className="inp" /></Field>
            <Field label="Status">
              <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} className="inp"><option>Active</option><option>On Leave</option><option>Inactive</option></select>
            </Field>
            <Field label="Nama Lengkap"><input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="inp" required /></Field>
            <Field label="Email"><input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="inp" required /></Field>
            <Field label="Department"><input value={form.department ?? ""} onChange={(e)=>setForm({...form,department:e.target.value})} className="inp" /></Field>
            <Field label="Position"><input value={form.position ?? ""} onChange={(e)=>setForm({...form,position:e.target.value})} className="inp" /></Field>
            <div className="col-span-2"><Field label="Address"><input value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="inp" /></Field></div>
            <Field label="Salary (IDR)"><input type="number" value={form.salary} onChange={(e)=>setForm({...form,salary:Number(e.target.value)})} className="inp" /></Field>
            <Field label="Join Date"><input type="date" value={form.joinDate ?? ""} onChange={(e)=>setForm({...form,joinDate:e.target.value})} className="inp" /></Field>
            <DialogFooter className="col-span-2">
              <button type="button" onClick={() => setOpen(false)} className="h-9 rounded-md border bg-background px-4 text-sm hover:bg-accent">Batal</button>
              <button type="submit" className="h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90">Simpan</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <style>{`.inp{height:2.5rem;width:100%;border-radius:0.375rem;border:1px solid var(--border);background:var(--background);padding:0 0.75rem;font-size:0.875rem}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label><div className="mt-1.5">{children}</div></div>;
}
