import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useRole } from "@/lib/role-context";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { role } = useRole();
  const path = `/app/${role === "hr_staff" ? "hr" : role === "finance_staff" ? "finance" : role}`;
  return <Navigate to={path as any} replace />;
}
