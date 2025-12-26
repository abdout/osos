import { notFound } from "next/navigation"
import Link from "next/link"
import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization/config"
import { getShipmentTracking } from "@/actions/tracking"
import { TrackingTimeline, TrackingAdminControls } from "@/components/platform/tracking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { IconArrowLeft, IconShip, IconPackage, IconUser, IconCalendar } from "@tabler/icons-react"

interface ShipmentDetailPageProps {
  params: Promise<{ lang: string; id: string }>
}

export default async function ShipmentDetailPage({ params }: ShipmentDetailPageProps) {
  const { lang: langParam, id } = await params
  const lang = langParam as Locale
  const dict = await getDictionary(lang)

  // Fetch shipment with tracking data
  const shipment = await getShipmentTracking(id)

  if (!shipment) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${lang}/shipments`}>
              {dict.navigation.shipments}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{shipment.shipmentNumber}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{dict.shipments.shipmentDetails}</h1>
          <p className="text-muted-foreground">{shipment.shipmentNumber}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/${lang}/shipments`}>
              <IconArrowLeft className="me-2 h-4 w-4" />
              {dict.common.back}
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Shipment Details Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{dict.shipments.shipmentDetails}</CardTitle>
                <Badge>
                  {dict.shipments.statuses[shipment.status as keyof typeof dict.shipments.statuses]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Type */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <IconPackage className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.shipments.type}</p>
                    <p className="font-medium">
                      {dict.shipments.types[shipment.type as keyof typeof dict.shipments.types]}
                    </p>
                  </div>
                </div>

                {/* Vessel */}
                {shipment.vesselName && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <IconShip className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{dict.shipments.vesselName}</p>
                      <p className="font-medium">{shipment.vesselName}</p>
                    </div>
                  </div>
                )}

                {/* Consignor */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <IconUser className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.shipments.consignor}</p>
                    <p className="font-medium">{shipment.consignor}</p>
                  </div>
                </div>

                {/* Consignee */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <IconUser className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.shipments.consignee}</p>
                    <p className="font-medium">{shipment.consignee}</p>
                  </div>
                </div>

                {/* Container Number */}
                {shipment.containerNumber && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <IconPackage className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{dict.shipments.containerNumber}</p>
                      <p className="font-medium">{shipment.containerNumber}</p>
                    </div>
                  </div>
                )}

                {/* Arrival Date */}
                {shipment.arrivalDate && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <IconCalendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{dict.shipments.arrivalDate}</p>
                      <p className="font-medium">
                        {new Date(shipment.arrivalDate).toLocaleDateString(
                          lang === "ar" ? "ar-SD" : "en-US"
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {shipment.description && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-1">{dict.shipments.description}</p>
                  <p>{shipment.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>{dict.tracking.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {shipment.trackingStages.length > 0 ? (
                <TrackingTimeline
                  stages={shipment.trackingStages}
                  dictionary={dict}
                  locale={lang}
                />
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <IconPackage className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">{dict.tracking.actions.initializeTracking}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Admin Controls */}
          <TrackingAdminControls
            shipmentId={shipment.id}
            trackingNumber={shipment.trackingNumber}
            stages={shipment.trackingStages}
            dictionary={dict}
            locale={lang}
          />
        </div>
      </div>
    </div>
  )
}
