import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { DataTable } from "@/components/app/data-table";
import { StatusBadge } from "@/components/app/status-badge";
import { StatCard } from "@/components/app/stat-card";
import { attendance } from "@/lib/data";
import { Clock, LogIn, LogOut, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/employee/attendance")({ component: AttendancePage });

function AttendancePage() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [checkInTime] = useState("08:55");
  const myAtt = attendance.filter((a) => a.employeeId === "EMP001");
  const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      <PageHeader title="Attendance" description="Catat kehadiran harian dan lihat riwayat absensi Anda." />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2 rounded-xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{today}</p>
              <p className="mt-1 text-4xl font-semibold font-mono tabular-nums">{now}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> NusaCorp HQ · Jakarta Office
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {!checkedIn ? (
                <button onClick={() => { setCheckedIn(true); toast.success("Check-in berhasil pada " + now); }} className="inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  <LogIn className="h-4 w-4" /> Check In
                </button>
              ) : (
                <button onClick={() => { setCheckedIn(false); toast.success("Check-out berhasil pada " + now); }} className="inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-destructive px-6 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                  <LogOut className="h-4 w-4" /> Check Out
                </button>
              )}
              {checkedIn && <p className="text-xs text-muted-foreground text-center">Checked in at <span className="font-mono">{checkInTime}</span></p>}
            </div>
          </div>
        </div>
        <StatCard label="This Month" value="21 days" icon={<Clock className="h-5 w-5" />} trend="0 absent · 2 late" accent="success" />
      </div>

      <DataTable
        data={myAtt}
        searchKeys={["date", "status"]}
        filterKey="status"
        filterOptions={[{ label: "Present", value: "Present" }, { label: "Late", value: "Late" }, { label: "Leave", value: "Leave" }]}
        onExport={() => toast.success("Attendance exported")}
        columns={[
          { key: "attendanceId", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "date", header: "Date" },
          { key: "checkIn", header: "Check-in", render: (r) => <span className="font-mono">{r.checkIn}</span> },
          { key: "checkOut", header: "Check-out", render: (r) => <span className="font-mono">{r.checkOut}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status ?? "Present"} /> },
        ]}
      />
    </div>
  );
}
