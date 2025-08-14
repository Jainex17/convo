import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth.api.getSession({
    headers: await headers()
  }).catch((error) => {
    console.error(error);
    return null;
  });
  
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </>
  );
}
