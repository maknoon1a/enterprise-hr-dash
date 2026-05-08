import { createFileRoute } from "@tanstack/react-router";
import { useRole } from "@/lib/role-context";
import { ROLE_USERS, employees, formatIDR } from "@/lib/data";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";

export const Route = createFileRoute("/app/profile")({ component: ProfilePage });

function ProfilePage() {
  const { role } = useRole();
  const user = ROLE_USERS[role];
  const emp = employees.find((e) => e.email === user.email) ?? employees[0];

  const fields: [string, string][] = [
    ["Employee ID", emp.employeeId],
    ["Nama Lengkap", user.name],
    ["Email", user.email],
    ["Telepon", "+62 812-3456-7890"],
    ["Alamat", emp.address],
    ["Departemen", emp.department ?? "-"],
    ["Posisi", emp.position ?? "-"],
    ["Tanggal Bergabung", emp.joinDate ?? "-"],
    ["Status", emp.status],
    ["Salary", formatIDR(emp.salary)],
  ];

  return (
    <div>
      <PageHeader title="Profile Saya" description="Informasi pribadi Anda." />

      <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-primary/50 text-primary-foreground flex items-center justify-center text-4xl font-semibold">
            {user.avatar}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.position}</p>
          <StatusBadge status="Active" className="mt-3" />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 border-t pt-6">
          {fields.map(([k, v]) => (
            <div key={k}>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
              <p className="mt-1 text-sm font-medium">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
