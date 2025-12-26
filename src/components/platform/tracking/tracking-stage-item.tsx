"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { STAGE_ICONS, STAGE_CONFIG, STATUS_STYLES } from "@/lib/tracking"
import type { TrackingStage, TrackingStageType, TrackingStageStatus } from "@prisma/client"
import type { Dictionary } from "@/components/internationalization/types"
import { formatTrackingDate, getRelativeTime } from "@/lib/tracking"

interface TrackingStageItemProps {
  stage: TrackingStage
  isLast: boolean
  dictionary: Dictionary
  locale: string
}

export function TrackingStageItem({
  stage,
  isLast,
  dictionary,
  locale,
}: TrackingStageItemProps) {
  const Icon = STAGE_ICONS[stage.stageType]
  const config = STAGE_CONFIG[stage.stageType]
  const styles = STATUS_STYLES[stage.status]
  const isActive = stage.status === "IN_PROGRESS"
  const isCompleted = stage.status === "COMPLETED"

  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      {/* Vertical connector line */}
      {!isLast && (
        <div
          className={cn(
            "absolute start-6 top-12 h-[calc(100%-3rem)] w-0.5",
            isCompleted ? "bg-green-300 dark:bg-green-700" : "bg-gray-200 dark:bg-gray-700"
          )}
        />
      )}

      {/* Icon circle */}
      <div
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          styles.bg,
          styles.text,
          styles.border,
          isActive && "animate-pulse ring-4 ring-red-200 dark:ring-red-900"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Content card */}
      <Card className={cn("flex-1", isActive && "border-red-300 dark:border-red-700")}>
        <CardContent className="p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">
                {dictionary.tracking.stages[stage.stageType as keyof typeof dictionary.tracking.stages]}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dictionary.tracking.stageDescriptions[stage.stageType as keyof typeof dictionary.tracking.stageDescriptions]}
              </p>
            </div>
            <Badge className={cn("w-fit", styles.badge)}>
              {dictionary.tracking.statuses[stage.status as keyof typeof dictionary.tracking.statuses]}
            </Badge>
          </div>

          {/* Timestamps */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {stage.completedAt && (
              <div>
                <span className="font-medium">{dictionary.tracking.completedAt}:</span>{" "}
                {formatTrackingDate(stage.completedAt, locale)}
              </div>
            )}
            {stage.startedAt && !stage.completedAt && (
              <div>
                <span className="font-medium">{dictionary.tracking.startedAt}:</span>{" "}
                {formatTrackingDate(stage.startedAt, locale)}
              </div>
            )}
            {stage.status === "PENDING" && stage.estimatedAt && (
              <div>
                <span className="font-medium">{dictionary.tracking.eta}:</span>{" "}
                {getRelativeTime(stage.estimatedAt, locale)}
              </div>
            )}
          </div>

          {/* Notes */}
          {stage.notes && (
            <div className="mt-3 rounded-md bg-muted p-2 text-sm">
              <span className="font-medium">{dictionary.tracking.notes}:</span> {stage.notes}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
