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

interface ProjectDetailPageProps {
  params: Promise<{ lang: string; id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { lang: langParam, id } = await params
  const lang = langParam as Locale
  const dict = await getDictionary(lang)

  // Fetch project with tracking data
  const project = await getShipmentTracking(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${lang}/projects`}>
              {dict.navigation.projects}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.shipmentNumber}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{dict.projects.projectDetails}</h1>
          <p className="text-muted-foreground">{project.shipmentNumber}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/${lang}/projects`}>
              <IconArrowLeft className="me-2 h-4 w-4" />
              {dict.common.back}
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Project Details Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{dict.projects.projectDetails}</CardTitle>
                <Badge>
                  {dict.projects.statuses[project.status as keyof typeof dict.projects.statuses]}
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
                    <p className="text-sm text-muted-foreground">{dict.projects.type}</p>
                    <p className="font-medium">
                      {dict.projects.types[project.type as keyof typeof dict.projects.types]}
                    </p>
                  </div>
                </div>

                {/* Facility Name */}
                {project.vesselName && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <IconShip className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{dict.projects.facilityName}</p>
                      <p className="font-medium">{project.vesselName}</p>
                    </div>
                  </div>
                )}

                {/* Client */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <IconUser className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.projects.client}</p>
                    <p className="font-medium">{project.consignor}</p>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <IconUser className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.projects.contactPerson}</p>
                    <p className="font-medium">{project.consignee}</p>
                  </div>
                </div>

                {/* Area */}
                {project.containerNumber && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <IconPackage className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{dict.projects.area}</p>
                      <p className="font-medium">{project.containerNumber}</p>
                    </div>
                  </div>
                )}

                {/* Completion Date */}
                {project.arrivalDate && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <IconCalendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{dict.projects.completionDate}</p>
                      <p className="font-medium">
                        {new Date(project.arrivalDate).toLocaleDateString(
                          lang === "ar" ? "ar-SD" : "en-US"
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-1">{dict.projects.description}</p>
                  <p>{project.description}</p>
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
              {project.trackingStages.length > 0 ? (
                <TrackingTimeline
                  stages={project.trackingStages}
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
            shipmentId={project.id}
            trackingNumber={project.trackingNumber}
            stages={project.trackingStages}
            dictionary={dict}
            locale={lang}
          />
        </div>
      </div>
    </div>
  )
}
