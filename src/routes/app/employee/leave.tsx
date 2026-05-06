import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { leaveRequests } from "@/lib/data";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { LeaveRequest } from "@/lib/types";

export const Route = createFileRoute("/app/employee/leave")({ component: LeavePage });

function LeavePage() {
  const [list, setList] = useState<LeaveRequest[]>(leaveRequests.filter((l) => l.employeeId === "EMP001"));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "Annual Leave", startDate: "", endDate: "", reason: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate) { toast.error("Tanggal harus diisi"); return; }
    const id = "LV" + String(100 + list.length).padStart(3, "0");
    setList([{ leaveId: id, employeeId: "EMP001", employeeName: "Andika Pratama", ...form, status: "Pending" }, ...list]);
    setOpen(false);
    setForm({ type: "Annual Leave", startDate: "", endDate: "", reason: "" });
    toast.success("Pengajuan cuti berhasil dikirim");
  };

  return (
    <div>
      <PageHeader title="Leave Request" description="Ajukan dan pantau status pengajuan cuti Anda."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1.5 h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" />Ajukan Cuti</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pengajuan Cuti Baru</DialogTitle>
                <DialogDescription>Isi detail pengajuan cuti Anda. Manager akan menerima notifikasi.</DialogDescription>
              </DialogHeader>
              <form onSubmit={submit} className="space-y-4">
                <Field label="Jenis Cuti">
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                    <option>Annual Leave</option><option>Sick Leave</option><option>Personal Leave</option><option>Maternity Leave</option>
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tanggal Mulai"><input type="date" required value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm" /></Field>
                  <Field label="Tanggal Selesai"><input type="date" required value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm" /></Field>
                </div>
                <Field label="Alasan"><textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} rows={3} className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Sebutkan alasan cuti..." /></Field>
                <DialogFooter>
                  <button type="button" onClick={() => setOpen(false)} className="h-9 rounded-md border bg-background px-4 text-sm hover:bg-accent">Batal</button>
                  <button type="submit" className="h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90">Submit</button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[["Total Quota", "12 hari"], ["Terpakai", "3 hari"], ["Sisa Cuti", "9 hari"]].map(([k, v]) => (
          <div key={k} className="rounded-xl border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
            <p className="mt-2 text-2xl font-semibold">{v}</p>
          </div>
        ))}
      </div>

      <DataTable
        data={list}
        searchKeys={["type", "status", "startDate"]}
        filterKey="status"
        filterOptions={[{ label: "Pending", value: "Pending" }, { label: "Approved", value: "Approved" }, { label: "Rejected", value: "Rejected" }]}
        columns={[
          { key: "leaveId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "type", header: "Type" },
          { key: "startDate", header: "Start" },
          { key: "endDate", header: "End" },
          { key: "reason", header: "Reason", render: (r) => <span className="text-muted-foreground">{r.reason ?? "-"}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label><div className="mt-1.5">{children}</div></div>;
}
