import type { Employee, LeaveRequest, Attendance, Payroll, PerformanceEvaluation, UserAccount } from "./types";

export const employees: Employee[] = [
  { employeeId: "EMP001", name: "Andika Pratama", address: "Jl. Merdeka 12, Jakarta", email: "andika@nusacorp.id", salary: 12500000, status: "Active", department: "Engineering", position: "Senior Engineer", joinDate: "2021-03-14" },
  { employeeId: "EMP002", name: "Sari Wulandari", address: "Jl. Kenanga 8, Bandung", email: "sari@nusacorp.id", salary: 9800000, status: "Active", department: "HR", position: "HR Specialist", joinDate: "2020-07-02" },
  { employeeId: "EMP003", name: "Rizky Hidayat", address: "Jl. Mawar 22, Surabaya", email: "rizky@nusacorp.id", salary: 14200000, status: "Active", department: "Finance", position: "Finance Lead", joinDate: "2019-11-21" },
  { employeeId: "EMP004", name: "Maya Anggraini", address: "Jl. Anggrek 5, Jakarta", email: "maya@nusacorp.id", salary: 18500000, status: "Active", department: "Engineering", position: "Engineering Manager", joinDate: "2018-02-10" },
  { employeeId: "EMP005", name: "Bagas Setiawan", address: "Jl. Cendana 17, Yogyakarta", email: "bagas@nusacorp.id", salary: 8500000, status: "Active", department: "Engineering", position: "Software Engineer", joinDate: "2022-08-01" },
  { employeeId: "EMP006", name: "Putri Lestari", address: "Jl. Melati 9, Semarang", email: "putri@nusacorp.id", salary: 7600000, status: "Active", department: "Marketing", position: "Marketing Staff", joinDate: "2023-01-15" },
  { employeeId: "EMP007", name: "Dimas Aditya", address: "Jl. Sudirman 100, Jakarta", email: "dimas@nusacorp.id", salary: 11200000, status: "On Leave", department: "Engineering", position: "QA Engineer", joinDate: "2021-06-20" },
  { employeeId: "EMP008", name: "Citra Ramadhani", address: "Jl. Diponegoro 4, Malang", email: "citra@nusacorp.id", salary: 9100000, status: "Active", department: "Engineering", position: "Frontend Engineer", joinDate: "2022-04-11" },
  { employeeId: "EMP009", name: "Fajar Nugroho", address: "Jl. Gatot Subroto 33, Jakarta", email: "fajar@nusacorp.id", salary: 7200000, status: "Inactive", department: "Operations", position: "Ops Staff", joinDate: "2020-09-30" },
  { employeeId: "EMP010", name: "Intan Permata", address: "Jl. Hayam Wuruk 18, Bali", email: "intan@nusacorp.id", salary: 10500000, status: "Active", department: "HR", position: "Recruiter", joinDate: "2021-12-05" },
];

export const leaveRequests: LeaveRequest[] = [
  { leaveId: "LV001", employeeId: "EMP001", employeeName: "Andika Pratama", type: "Annual Leave", startDate: "2026-05-08", endDate: "2026-05-10", reason: "Family event", status: "Pending" },
  { leaveId: "LV002", employeeId: "EMP005", employeeName: "Bagas Setiawan", type: "Sick Leave", startDate: "2026-05-02", endDate: "2026-05-03", reason: "Flu", status: "Approved" },
  { leaveId: "LV003", employeeId: "EMP007", employeeName: "Dimas Aditya", type: "Annual Leave", startDate: "2026-04-28", endDate: "2026-05-05", reason: "Vacation", status: "Approved" },
  { leaveId: "LV004", employeeId: "EMP008", employeeName: "Citra Ramadhani", type: "Personal Leave", startDate: "2026-05-12", endDate: "2026-05-12", reason: "Personal matter", status: "Pending" },
  { leaveId: "LV005", employeeId: "EMP006", employeeName: "Putri Lestari", type: "Annual Leave", startDate: "2026-04-20", endDate: "2026-04-22", reason: "Wedding", status: "Rejected" },
  { leaveId: "LV006", employeeId: "EMP002", employeeName: "Sari Wulandari", type: "Sick Leave", startDate: "2026-05-04", endDate: "2026-05-04", reason: "Medical check-up", status: "Approved" },
];

export const attendance: Attendance[] = [
  { attendanceId: "AT001", employeeId: "EMP001", employeeName: "Andika Pratama", date: "2026-05-06", checkIn: "08:55", checkOut: "17:32", status: "Present" },
  { attendanceId: "AT002", employeeId: "EMP001", employeeName: "Andika Pratama", date: "2026-05-05", checkIn: "09:12", checkOut: "18:01", status: "Late" },
  { attendanceId: "AT003", employeeId: "EMP001", employeeName: "Andika Pratama", date: "2026-05-04", checkIn: "08:45", checkOut: "17:30", status: "Present" },
  { attendanceId: "AT004", employeeId: "EMP002", employeeName: "Sari Wulandari", date: "2026-05-06", checkIn: "08:30", checkOut: "17:15", status: "Present" },
  { attendanceId: "AT005", employeeId: "EMP005", employeeName: "Bagas Setiawan", date: "2026-05-06", checkIn: "08:50", checkOut: "17:20", status: "Present" },
  { attendanceId: "AT006", employeeId: "EMP008", employeeName: "Citra Ramadhani", date: "2026-05-06", checkIn: "09:30", checkOut: "18:10", status: "Late" },
  { attendanceId: "AT007", employeeId: "EMP007", employeeName: "Dimas Aditya", date: "2026-05-06", checkIn: "-", checkOut: "-", status: "Leave" },
  { attendanceId: "AT008", employeeId: "EMP006", employeeName: "Putri Lestari", date: "2026-05-06", checkIn: "08:48", checkOut: "17:05", status: "Present" },
  { attendanceId: "AT009", employeeId: "EMP010", employeeName: "Intan Permata", date: "2026-05-06", checkIn: "08:33", checkOut: "17:25", status: "Present" },
  { attendanceId: "AT010", employeeId: "EMP004", employeeName: "Maya Anggraini", date: "2026-05-06", checkIn: "08:15", checkOut: "17:45", status: "Present" },
];

export const payrolls: Payroll[] = [
  { payrollId: "PR001", employeeId: "EMP001", employeeName: "Andika Pratama", period: "April 2026", basicSalary: 12500000, allowance: 2000000, deduction: 850000, totalSalary: 13650000, status: "Paid" },
  { payrollId: "PR002", employeeId: "EMP001", employeeName: "Andika Pratama", period: "March 2026", basicSalary: 12500000, allowance: 1800000, deduction: 850000, totalSalary: 13450000, status: "Paid" },
  { payrollId: "PR003", employeeId: "EMP001", employeeName: "Andika Pratama", period: "February 2026", basicSalary: 12500000, allowance: 1500000, deduction: 820000, totalSalary: 13180000, status: "Paid" },
  { payrollId: "PR004", employeeId: "EMP002", employeeName: "Sari Wulandari", period: "April 2026", basicSalary: 9800000, allowance: 1200000, deduction: 600000, totalSalary: 10400000, status: "Pending Approval" },
  { payrollId: "PR005", employeeId: "EMP003", employeeName: "Rizky Hidayat", period: "April 2026", basicSalary: 14200000, allowance: 2500000, deduction: 1000000, totalSalary: 15700000, status: "Approved" },
  { payrollId: "PR006", employeeId: "EMP004", employeeName: "Maya Anggraini", period: "April 2026", basicSalary: 18500000, allowance: 3000000, deduction: 1500000, totalSalary: 20000000, status: "Pending Approval" },
  { payrollId: "PR007", employeeId: "EMP005", employeeName: "Bagas Setiawan", period: "April 2026", basicSalary: 8500000, allowance: 1000000, deduction: 500000, totalSalary: 9000000, status: "Draft" },
  { payrollId: "PR008", employeeId: "EMP006", employeeName: "Putri Lestari", period: "April 2026", basicSalary: 7600000, allowance: 900000, deduction: 450000, totalSalary: 8050000, status: "Draft" },
  { payrollId: "PR009", employeeId: "EMP008", employeeName: "Citra Ramadhani", period: "April 2026", basicSalary: 9100000, allowance: 1100000, deduction: 580000, totalSalary: 9620000, status: "Approved" },
  { payrollId: "PR010", employeeId: "EMP010", employeeName: "Intan Permata", period: "April 2026", basicSalary: 10500000, allowance: 1300000, deduction: 700000, totalSalary: 11100000, status: "Pending Approval" },
];

export const evaluations: PerformanceEvaluation[] = [
  { evaluationId: "EV001", employeeId: "EMP001", employeeName: "Andika Pratama", period: "Q1 2026", score: 92, bonus: 5000000, notes: "Excellent delivery on Project Atlas" },
  { evaluationId: "EV002", employeeId: "EMP005", employeeName: "Bagas Setiawan", period: "Q1 2026", score: 85, bonus: 2500000, notes: "Solid contributor" },
  { evaluationId: "EV003", employeeId: "EMP008", employeeName: "Citra Ramadhani", period: "Q1 2026", score: 88, bonus: 3000000, notes: "Great UI work" },
  { evaluationId: "EV004", employeeId: "EMP007", employeeName: "Dimas Aditya", period: "Q1 2026", score: 78, bonus: 1500000, notes: "Needs improvement on test coverage" },
];

export const userAccounts: UserAccount[] = [
  { userId: "U001", username: "andika.pratama", password: "********", role: "employee", employeeId: "EMP001", active: true, lastLogin: "2026-05-06 08:55" },
  { userId: "U002", username: "sari.wulandari", password: "********", role: "hr_staff", employeeId: "EMP002", active: true, lastLogin: "2026-05-06 08:30" },
  { userId: "U003", username: "rizky.hidayat", password: "********", role: "finance_staff", employeeId: "EMP003", active: true, lastLogin: "2026-05-05 17:42" },
  { userId: "U004", username: "maya.anggraini", password: "********", role: "manager", employeeId: "EMP004", active: true, lastLogin: "2026-05-06 08:15" },
  { userId: "U005", username: "admin.system", password: "********", role: "admin", active: true, lastLogin: "2026-05-06 07:50" },
  { userId: "U006", username: "intan.permata", password: "********", role: "hr_staff", employeeId: "EMP010", active: true, lastLogin: "2026-05-06 08:33" },
  { userId: "U007", username: "fajar.nugroho", password: "********", role: "employee", employeeId: "EMP009", active: false, lastLogin: "2026-03-12 09:10" },
];

export const ROLE_USERS: Record<string, { name: string; email: string; role: string; position: string; avatar: string }> = {
  employee: { name: "Andika Pratama", email: "andika@nusacorp.id", role: "Employee", position: "Senior Engineer", avatar: "AP" },
  hr_staff: { name: "Sari Wulandari", email: "sari@nusacorp.id", role: "HR Staff", position: "HR Specialist", avatar: "SW" },
  finance_staff: { name: "Rizky Hidayat", email: "rizky@nusacorp.id", role: "Finance Staff", position: "Finance Lead", avatar: "RH" },
  manager: { name: "Maya Anggraini", email: "maya@nusacorp.id", role: "Manager", position: "Engineering Manager", avatar: "MA" },
  admin: { name: "Admin System", email: "admin@nusacorp.id", role: "Administrator", position: "System Administrator", avatar: "AS" },
};

export const formatIDR = (n: number) => "Rp " + n.toLocaleString("id-ID");
