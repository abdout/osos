"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconCopy, IconCheck, IconShip, IconPackage } from "@tabler/icons-react"
import { STATUS_STYLES, getProgress, formatTrackingDate } from "@/lib/tracking"
import type { PublicTrackingData } from "@/lib/tracking"
import type { Dictionary } from "@/components/internationalization/types"

interface TrackingHeaderProps {
  data: PublicTrackingData
  dictionary: Dictionary
  locale: string
}

export function TrackingHeader({ data, dictionary, locale }: TrackingHeaderProps) {
  const [copied, setCopied] = useState(false)

  const currentStageData = data.stages.find(s => s.stageType === data.currentStage)
  const currentStyles = currentStageData
    ? STATUS_STYLES[currentStageData.status]
    : STATUS_STYLES.PENDING

  const copyTrackingLink = async () => {
    const url = `${window.location.origin}/${locale}/track/${data.trackingNumber}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <IconPackage className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{data.trackingNumber}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {dictionary.tracking.projectInfo}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={copyTrackingLink}
            className="w-fit"
          >
            {copied ? (
              <>
                <IconCheck className="me-2 h-4 w-4" />
                {dictionary.tracking.linkCopied}
              </>
            ) : (
              <>
                <IconCopy className="me-2 h-4 w-4" />
                {dictionary.tracking.copyLink}
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Current Status */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {dictionary.tracking.currentStatus}
            </p>
            <Badge className={currentStyles.badge}>
              {dictionary.tracking.stages[data.currentStage as keyof typeof dictionary.tracking.stages]}
            </Badge>
          </div>

          {/* Facility Name */}
          {data.vesselName && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {dictionary.tracking.facilityName}
              </p>
              <div className="flex items-center gap-2">
                <IconShip className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{data.vesselName}</span>
              </div>
            </div>
          )}

          {/* Project Type */}
          {data.shipmentType && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {dictionary.tracking.projectType}
              </p>
              <span className="font-medium">{data.shipmentType}</span>
            </div>
          )}

          {/* Estimated Delivery */}
          {data.estimatedDelivery && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {dictionary.tracking.estimatedDelivery}
              </p>
              <span className="font-medium">
                {formatTrackingDate(data.estimatedDelivery, locale)}
              </span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">{dictionary.tracking.progress}</span>
            <span className="text-muted-foreground">
              {data.progress.completed} / {data.progress.total}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${data.progress.percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
