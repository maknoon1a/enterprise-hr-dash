import { createFileRoute } from "@tanstack/react-router";
import { useRole } from "@/lib/role-context";
import { ROLE_USERS, employees, formatIDR } from "@/lib/data";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Mail, MapPin, Phone, Calendar, Briefcase, Building2, Edit3 } from "lucide-react";

export const Route = createFileRoute("/app/profile")({ component: ProfilePage });

function ProfilePage() {
  const { role } = useRole();
  const user = ROLE_USERS[role];
  const emp = employees.find((e) => e.email === user.email) ?? employees[0];

  return (
    <div>
      <PageHeader title="Profile Saya" description="Kelola informasi pribadi dan detail akun Anda." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-primary/50 text-primary-foreground flex items-center justify-center text-3xl font-semibold">{user.avatar}</div>
              <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.position}</p>
              <StatusBadge status="Active" className="mt-3" />
            </div>
            <div className="mt-6 space-y-3 border-t pt-5 text-sm">
              <div className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-muted-foreground" /><span>{user.email}</span></div>
              <div className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-muted-foreground" /><span>+62 812-3456-7890</span></div>
              <div className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-muted-foreground" /><span>{emp.address}</span></div>
              <div className="flex items-center gap-2.5"><Building2 className="h-4 w-4 text-muted-foreground" /><span>{emp.department}</span></div>
              <div className="flex items-center gap-2.5"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Bergabung {emp.joinDate}</span></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold">Informasi Personal</h3>
              <button className="inline-flex items-center gap-1.5 text-xs h-8 px-3 rounded-md border bg-background hover:bg-accent"><Edit3 className="h-3.5 w-3.5" />Edit</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Employee ID", emp.employeeId],
                ["Nama Lengkap", user.name],
                ["Email", user.email],
                ["Status", emp.status],
                ["Departemen", emp.department ?? "-"],
                ["Posisi", emp.position ?? "-"],
                ["Tanggal Bergabung", emp.joinDate ?? "-"],
                ["Salary", formatIDR(emp.salary)],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
                  <p className="mt-1 text-sm font-medium">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-5">Account & Security</h3>
            <div className="space-y-4">
              {[
                { label: "Username", value: user.email.split("@")[0] },
                { label: "Role", value: user.role },
                { label: "Last Login", value: "Today, 08:55 AM" },
                { label: "Password", value: "••••••••••" },
              ].map((it) => (
                <div key={it.label} className="flex items-center justify-between border-b last:border-b-0 pb-3 last:pb-0">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{it.label}</p>
                    <p className="mt-1 text-sm font-medium">{it.value}</p>
                  </div>
                  <button className="text-xs text-primary hover:underline">Change</button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Aktivitas Terbaru</h3>
            <ul className="space-y-3 text-sm">
              {[
                ["Check-in 08:55", "Hari ini"],
                ["Pengajuan Cuti #LV001", "1 hari lalu"],
                ["Payslip April 2026 dirilis", "3 hari lalu"],
                ["Update profile address", "1 minggu lalu"],
              ].map(([t, d]) => (
                <li key={t} className="flex items-center justify-between border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-2.5"><Briefcase className="h-4 w-4 text-muted-foreground" /><span>{t}</span></div>
                  <span className="text-xs text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
