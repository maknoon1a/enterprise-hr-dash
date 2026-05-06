import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { Users, ShieldCheck, Activity, Database } from "lucide-react";
import { userAccounts } from "@/lib/data";

export const Route = createFileRoute("/app/admin/")({ component: P });
function P() {
  return (
    <div>
      <PageHeader title="Admin Dashboard" description="Administrasi sistem dan akun pengguna." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total Users" value={userAccounts.length} icon={<Users className="h-5 w-5" />} accent="primary" />
        <StatCard label="Active Users" value={userAccounts.filter(u=>u.active).length} icon={<ShieldCheck className="h-5 w-5" />} accent="success" />
        <StatCard label="Sessions Today" value="38" icon={<Activity className="h-5 w-5" />} accent="info" />
        <StatCard label="System Health" value="99.9%" icon={<Database className="h-5 w-5" />} trend="All services up" accent="success" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="px-5 py-4 border-b"><h3 className="font-semibold">Recent Logins</h3></div>
          <ul className="divide-y">{userAccounts.slice(0,6).map(u=>(
            <li key={u.userId} className="flex items-center justify-between px-5 py-3">
              <div><p className="text-sm font-medium">{u.username}</p><p className="text-xs text-muted-foreground">{u.role}</p></div>
              <span className="text-xs text-muted-foreground">{u.lastLogin}</span>
            </li>
          ))}</ul>
        </div>
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="px-5 py-4 border-b"><h3 className="font-semibold">System Status</h3></div>
          <ul className="divide-y">{[["Authentication","Operational"],["Database","Operational"],["Payroll Engine","Operational"],["Email Service","Degraded"],["Backup","Operational"]].map(([k,v])=>(
            <li key={k} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm">{k}</span>
              <span className={`text-xs font-medium ${v==="Operational"?"text-success":"text-warning-foreground"}`}>● {v}</span>
            </li>
          ))}</ul>
        </div>
      </div>
    </div>
  );
}
