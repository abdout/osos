"use client"

import Link from "next/link"
import {
  IconCirclePlusFilled,
  IconShip,
  IconFileDescription,
  IconReceipt,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Dictionary, Locale } from "@/components/internationalization"

interface QuickActionsProps {
  dictionary: Dictionary
  locale: Locale
}

export function QuickActions({ dictionary, locale }: QuickActionsProps) {
  const actions = [
    {
      title: dictionary.dashboard.newShipment,
      href: `/${locale}/shipments/new`,
      icon: IconShip,
      description: dictionary.shipments.title,
    },
    {
      title: dictionary.dashboard.newDeclaration,
      href: `/${locale}/customs/new`,
      icon: IconFileDescription,
      description: dictionary.customs.title,
    },
    {
      title: dictionary.dashboard.newInvoice,
      href: `/${locale}/invoices/new`,
      icon: IconReceipt,
      description: dictionary.invoices.title,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconCirclePlusFilled className="size-5 text-primary" />
          {dictionary.dashboard.quickActions}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          {actions.map((action) => (
            <Button
              key={action.href}
              variant="outline"
              className="h-auto flex-col gap-2 py-4"
              asChild
            >
              <Link href={action.href}>
                <action.icon className="size-6" />
                <span className="font-medium">{action.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
