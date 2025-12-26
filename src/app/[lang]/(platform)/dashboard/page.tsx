import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { SectionCards } from "@/components/platform/dashboard/section-cards"
import { QuickActions } from "@/components/platform/dashboard/quick-actions"

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const dict = await getDictionary(lang)
  const session = await auth()

  // Fetch stats from database
  const [
    totalShipments,
    inTransit,
    pendingCustoms,
    unpaidInvoicesResult,
  ] = await Promise.all([
    db.shipment.count({
      where: { userId: session?.user?.id },
    }),
    db.shipment.count({
      where: { userId: session?.user?.id, status: "IN_TRANSIT" },
    }),
    db.customsDeclaration.count({
      where: {
        userId: session?.user?.id,
        status: { in: ["DRAFT", "SUBMITTED", "UNDER_REVIEW"] },
      },
    }),
    db.invoice.aggregate({
      where: {
        userId: session?.user?.id,
        status: { notIn: ["PAID", "CANCELLED"] },
      },
      _sum: { total: true },
    }),
  ])

  const unpaidTotal = Number(unpaidInvoicesResult._sum.total || 0)

  const stats = {
    totalProjects: { value: totalShipments, trend: 12 },
    inProgress: { value: inTransit, trend: 5 },
    pendingInspection: { value: pendingCustoms, trend: -3 },
    unpaidInvoices: {
      value: `SDG ${unpaidTotal.toLocaleString()}`,
      trend: 8,
    },
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards dictionary={dict} stats={stats} />
      <div className="px-4 lg:px-6">
        <QuickActions dictionary={dict} locale={lang} />
      </div>
    </div>
  )
}
