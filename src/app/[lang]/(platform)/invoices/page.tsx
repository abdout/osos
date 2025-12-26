import Link from "next/link"
import { IconPlus } from "@tabler/icons-react"

import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization"
import { Button } from "@/components/ui/button"
import { getInvoices } from "@/actions/invoice"
import { InvoiceTable } from "@/components/platform/invoice/invoice-table"

export default async function InvoicesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const invoices = await getInvoices()

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <h1 className="text-2xl font-bold">{dict.invoices.title}</h1>
        <Button asChild>
          <Link href={`/${locale}/invoices/new`}>
            <IconPlus className="size-4" />
            {dict.invoices.newInvoice || "New Invoice"}
          </Link>
        </Button>
      </div>
      <div className="px-4 lg:px-6">
        <InvoiceTable data={invoices} dictionary={dict} locale={locale} />
      </div>
    </div>
  )
}
