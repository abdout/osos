import { notFound } from "next/navigation"

import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization"
import { getInvoice } from "@/actions/invoice"
import { InvoiceDetail } from "@/components/platform/invoice/invoice-detail"

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const invoice = await getInvoice(id)

  if (!invoice) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <InvoiceDetail invoice={invoice} dictionary={dict} locale={locale} />
      </div>
    </div>
  )
}
