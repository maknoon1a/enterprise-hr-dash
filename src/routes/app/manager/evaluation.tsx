import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { evaluations as seed, employees, formatIDR } from "@/lib/data";
import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { PerformanceEvaluation } from "@/lib/types";

export const Route = createFileRoute("/app/manager/evaluation")({ component: P });

function P() {
  const team = employees.filter(e=>e.department==="Engineering");
  const [list, setList] = useState<PerformanceEvaluation[]>(seed);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PerformanceEvaluation>({ evaluationId: "", employeeId: "", employeeName: "", period: "Q2 2026", score: 80, bonus: 0, notes: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employeeId) { toast.error("Pilih karyawan"); return; }
    const emp = team.find(t=>t.employeeId===form.employeeId)!;
    const id = "EV" + String(100+list.length).padStart(3,"0");
    setList([{ ...form, evaluationId: id, employeeName: emp.name }, ...list]);
    setOpen(false); toast.success("Evaluasi disimpan");
  };

  return (
    <div>
      <PageHeader title="Performance Evaluation" description="Evaluasi kinerja tim per periode."
        actions={<button onClick={()=>setOpen(true)} className="inline-flex items-center gap-1.5 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" />New Evaluation</button>}
      />
      <DataTable data={list} searchKeys={["employeeName","period"]} columns={[
        { key: "evaluationId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
        { key: "employeeName", header: "Employee" },
        { key: "period", header: "Period" },
        { key: "score", header: "Score", render: (r) => (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{width:`${r.score}%`}} /></div>
            <span className="font-semibold">{r.score}</span>
          </div>
        )},
        { key: "bonus", header: "Bonus", render: (r) => <span className="font-mono text-success">{formatIDR(r.bonus)}</span> },
        { key: "notes", header: "Notes", render: (r) => <span className="text-xs text-muted-foreground">{r.notes ?? "-"}</span> },
      ]} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Performance Evaluation</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Employee">
              <select value={form.employeeId} onChange={(e)=>setForm({...form,employeeId:e.target.value})} className="inp" required>
                <option value="">Pilih...</option>
                {team.map(t=><option key={t.employeeId} value={t.employeeId}>{t.name}</option>)}
              </select>
            </Field>
            <Field label="Period"><input value={form.period} onChange={(e)=>setForm({...form,period:e.target.value})} className="inp" /></Field>
            <Field label={`Score (${form.score}/100)`}>
              <input type="range" min={0} max={100} value={form.score} onChange={(e)=>setForm({...form,score:Number(e.target.value)})} className="w-full" />
              <div className="flex items-center gap-1 mt-1">{[1,2,3,4,5].map(i=><Star key={i} className={`h-4 w-4 ${form.score >= i*20 ? "fill-warning text-warning" : "text-muted-foreground"}`} />)}</div>
            </Field>
            <Field label="Bonus (IDR)"><input type="number" value={form.bonus} onChange={(e)=>setForm({...form,bonus:Number(e.target.value)})} className="inp" /></Field>
            <Field label="Notes"><textarea value={form.notes ?? ""} onChange={(e)=>setForm({...form,notes:e.target.value})} rows={3} className="inp h-auto py-2" /></Field>
            <DialogFooter>
              <button type="button" onClick={()=>setOpen(false)} className="h-9 rounded-md border bg-background px-4 text-sm hover:bg-accent">Batal</button>
              <button type="submit" className="h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90">Save</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <style>{`.inp{height:2.5rem;width:100%;border-radius:0.375rem;border:1px solid var(--border);background:var(--background);padding:0 0.75rem;font-size:0.875rem}`}</style>
    </div>
  );
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <div><label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label><div className="mt-1.5">{children}</div></div>}
