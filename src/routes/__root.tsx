import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { RoleProvider } from "@/lib/role-context";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Go home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NusaCorp HR & Payroll System" },
      { name: "description", content: "Enterprise HR & Payroll System — Employee management, attendance, leave, and payroll." },
      { property: "og:title", content: "NusaCorp HR & Payroll System" },
      { name: "twitter:title", content: "NusaCorp HR & Payroll System" },
      { property: "og:description", content: "Enterprise HR & Payroll System — Employee management, attendance, leave, and payroll." },
      { name: "twitter:description", content: "Enterprise HR & Payroll System — Employee management, attendance, leave, and payroll." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/520f39dd-9e8e-4226-96f8-f879b08a91ad/id-preview-510d0791--d4f68d5e-c635-4e36-8146-d54080be8d63.lovable.app-1778217926544.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/520f39dd-9e8e-4226-96f8-f879b08a91ad/id-preview-510d0791--d4f68d5e-c635-4e36-8146-d54080be8d63.lovable.app-1778217926544.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: () => <RoleProvider><Outlet /><Toaster richColors position="top-right" /></RoleProvider>,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
