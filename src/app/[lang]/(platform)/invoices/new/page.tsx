import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization"
import { InvoiceForm } from "@/components/platform/invoice/invoice-form"
import { db } from "@/lib/db"
import { auth } from "@/auth"

export default async function NewInvoicePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const session = await auth()

  const shipments = await db.shipment.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <InvoiceForm dictionary={dict} locale={locale} shipments={shipments} />
      </div>
    </div>
  )
}
