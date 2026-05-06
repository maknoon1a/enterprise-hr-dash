import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "./types";

interface RoleCtx {
  role: Role;
  setRole: (r: Role) => void;
}

const Ctx = createContext<RoleCtx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("employee");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("hr_role") as Role | null) : null;
    if (saved) setRoleState(saved);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") localStorage.setItem("hr_role", r);
  };

  return <Ctx.Provider value={{ role, setRole }}>{children}</Ctx.Provider>;
}

export function useRole() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}

export const ROLE_LABELS: Record<Role, string> = {
  employee: "Employee",
  hr_staff: "HR Staff",
  finance_staff: "Finance Staff",
  manager: "Manager",
  admin: "Admin",
};

export const ROLES: Role[] = ["employee", "hr_staff", "finance_staff", "manager", "admin"];
