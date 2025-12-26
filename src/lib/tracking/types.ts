import type { TrackingStage, TrackingStageType, TrackingStageStatus, Shipment } from "@prisma/client"

export type { TrackingStage, TrackingStageType, TrackingStageStatus }

export interface StageConfig {
  order: number
  estimatedHours: number
  color: "gray" | "red" | "green" | "yellow"
}

export interface TrackingStageWithMeta extends TrackingStage {
  config: StageConfig
}

export interface ShipmentWithTracking extends Shipment {
  trackingStages: TrackingStage[]
}

export interface PublicTrackingData {
  trackingNumber: string
  vesselName: string | null
  containerNumber: string | null
  consigneeFirstName: string
  shipmentType: string
  currentStage: TrackingStageType
  stages: PublicStageData[]
  estimatedDelivery: Date | null
  progress: {
    completed: number
    total: number
    percentage: number
  }
}

export interface PublicStageData {
  stageType: TrackingStageType
  status: TrackingStageStatus
  startedAt: Date | null
  completedAt: Date | null
  estimatedAt: Date | null
}

export interface StageUpdateData {
  status?: TrackingStageStatus
  notes?: string
  estimatedAt?: Date
}
