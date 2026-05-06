export type Role = "employee" | "hr_staff" | "finance_staff" | "manager" | "admin";

export interface Employee {
  employeeId: string;
  name: string;
  address: string;
  email: string;
  salary: number;
  status: string;
  department?: string;
  position?: string;
  joinDate?: string;
  avatar?: string;
}

export interface LeaveRequest {
  leaveId: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  reason?: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface Attendance {
  attendanceId: string;
  employeeId: string;
  employeeName?: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status?: "Present" | "Late" | "Absent" | "Leave";
}

export interface Payroll {
  payrollId: string;
  employeeId: string;
  employeeName: string;
  period: string;
  basicSalary: number;
  allowance: number;
  deduction: number;
  totalSalary: number;
  status: "Draft" | "Pending Approval" | "Approved" | "Paid" | "Rejected";
}

export interface PerformanceEvaluation {
  evaluationId: string;
  employeeId: string;
  employeeName: string;
  period: string;
  score: number;
  bonus: number;
  notes?: string;
}

export interface UserAccount {
  userId: string;
  username: string;
  password: string;
  role: Role;
  employeeId?: string;
  active: boolean;
  lastLogin?: string;
}
