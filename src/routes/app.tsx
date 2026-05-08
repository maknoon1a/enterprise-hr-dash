import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app/sidebar";
import { RoleSwitcher } from "@/components/app/role-switcher";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-end px-4 md:px-6 lg:px-8 pt-4">
          <RoleSwitcher />
        </div>
        <main className="flex-1 px-4 md:px-6 lg:px-8 pb-6 pt-4 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
