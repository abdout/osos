import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/template/sidebar/app-sidebar"
import { AppHeader } from "@/components/template/header/app-header"

export default async function PlatformLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const session = await auth()
  const { lang: langParam } = await params
  const lang = langParam as Locale

  if (!session?.user?.id) {
    redirect(`/${lang}/login`)
  }

  const dict = await getDictionary(lang)

  // Normalize user for components
  const user = {
    id: session.user.id,
    email: session.user.email ?? "",
    name: session.user.name ?? null,
    role: session.user.role ?? "VIEWER",
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" dictionary={dict} locale={lang} user={user} />
      <SidebarInset>
        <AppHeader dictionary={dict} locale={lang} user={user} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
