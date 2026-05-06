import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { userAccounts as seed } from "@/lib/data";
import { ROLE_LABELS, ROLES } from "@/lib/role-context";
import { Plus, Pencil, Trash2, Power } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { UserAccount, Role } from "@/lib/types";

export const Route = createFileRoute("/app/admin/users")({ component: P });

const blank: UserAccount = { userId: "", username: "", password: "", role: "employee", active: true };

function P() {
  const [list, setList] = useState<UserAccount[]>(seed);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<UserAccount | null>(null);
  const [form, setForm] = useState<UserAccount>(blank);

  const start = (u?: UserAccount) => { setEditing(u ?? null); setForm(u ?? { ...blank, userId: "U" + String(list.length+1).padStart(3,"0") }); setOpen(true); };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username) { toast.error("Username wajib"); return; }
    if (editing) setList(list.map(x=>x.userId===editing.userId?form:x));
    else setList([form, ...list]);
    setOpen(false); toast.success(editing?"User diperbarui":"User ditambahkan");
  };
  const toggle = (u: UserAccount) => { setList(list.map(x=>x.userId===u.userId?{...x,active:!x.active}:x)); toast.success(`User ${u.active?"deactivated":"activated"}`); };
  const remove = (u: UserAccount) => { if (confirm(`Hapus user ${u.username}?`)) { setList(list.filter(x=>x.userId!==u.userId)); toast.success("User dihapus"); } };

  return (
    <div>
      <PageHeader title="User Management" description="Kelola akun pengguna, role, dan status aktivasi."
        actions={<button onClick={()=>start()} className="inline-flex items-center gap-1.5 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" />Tambah User</button>}
      />
      <DataTable data={list} searchKeys={["username","role"]} filterKey="role" filterOptions={ROLES.map(r=>({label:ROLE_LABELS[r],value:r}))} onExport={() => toast.success("Exported")} columns={[
        { key: "userId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
        { key: "username", header: "Username", render: (r) => <span className="font-medium">{r.username}</span> },
        { key: "role", header: "Role", render: (r) => <span className="text-xs px-2 py-0.5 rounded-md bg-accent">{ROLE_LABELS[r.role as Role]}</span> },
        { key: "employeeId", header: "Linked Employee", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.employeeId ?? "-"}</span> },
        { key: "active", header: "Status", render: (r) => <StatusBadge status={r.active?"Active":"Inactive"} /> },
        { key: "lastLogin", header: "Last Login", render: (r) => <span className="text-xs text-muted-foreground">{r.lastLogin ?? "-"}</span> },
        { key: "actions", header: "", render: (r) => (
          <div className="flex items-center gap-1">
            <button onClick={()=>start(r)} className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-accent"><Pencil className="h-3.5 w-3.5" /></button>
            <button onClick={()=>toggle(r)} className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-accent" title={r.active?"Deactivate":"Activate"}><Power className={`h-3.5 w-3.5 ${r.active?"text-success":"text-muted-foreground"}`} /></button>
            <button onClick={()=>remove(r)} className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        )},
      ]} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?"Edit User":"Tambah User"}</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <Field label="User ID"><input value={form.userId} onChange={(e)=>setForm({...form,userId:e.target.value})} className="inp" /></Field>
            <Field label="Username"><input value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} className="inp" required /></Field>
            <Field label="Password"><input type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} className="inp" placeholder="••••••••" /></Field>
            <Field label="Role">
              <select value={form.role} onChange={(e)=>setForm({...form,role:e.target.value as Role})} className="inp">
                {ROLES.map(r=><option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
              </select>
            </Field>
            <Field label="Linked Employee ID"><input value={form.employeeId ?? ""} onChange={(e)=>setForm({...form,employeeId:e.target.value})} className="inp" placeholder="EMP001" /></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e)=>setForm({...form,active:e.target.checked})} />Account active</label>
            <DialogFooter>
              <button type="button" onClick={()=>setOpen(false)} className="h-9 rounded-md border bg-background px-4 text-sm hover:bg-accent">Batal</button>
              <button type="submit" className="h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90">Simpan</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <style>{`.inp{height:2.5rem;width:100%;border-radius:0.375rem;border:1px solid var(--border);background:var(--background);padding:0 0.75rem;font-size:0.875rem}`}</style>
    </div>
  );
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <div><label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label><div className="mt-1.5">{children}</div></div>}
