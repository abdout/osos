import {
  IconFileDescription,
  IconShip,
  IconClipboardCheck,
  IconCash,
  IconSearch,
  IconReceipt,
  IconCertificate,
  IconDoorExit,
  IconForklift,
  IconTruck,
  IconCircleCheck,
} from "@tabler/icons-react"
import type { TrackingStageType } from "@prisma/client"
import type { StageConfig } from "./types"

export const STAGE_ORDER: TrackingStageType[] = [
  "PRE_ARRIVAL_DOCS",
  "VESSEL_ARRIVAL",
  "CUSTOMS_DECLARATION",
  "CUSTOMS_PAYMENT",
  "INSPECTION",
  "PORT_FEES",
  "QUALITY_STANDARDS",
  "RELEASE",
  "LOADING",
  "IN_TRANSIT",
  "DELIVERED",
]

export const STAGE_CONFIG: Record<TrackingStageType, StageConfig> = {
  PRE_ARRIVAL_DOCS: {
    order: 1,
    estimatedHours: 24,
    color: "red",
  },
  VESSEL_ARRIVAL: {
    order: 2,
    estimatedHours: 0, // Depends on vessel schedule
    color: "red",
  },
  CUSTOMS_DECLARATION: {
    order: 3,
    estimatedHours: 24,
    color: "red",
  },
  CUSTOMS_PAYMENT: {
    order: 4,
    estimatedHours: 12,
    color: "yellow",
  },
  INSPECTION: {
    order: 5,
    estimatedHours: 48,
    color: "yellow",
  },
  PORT_FEES: {
    order: 6,
    estimatedHours: 12,
    color: "yellow",
  },
  QUALITY_STANDARDS: {
    order: 7,
    estimatedHours: 24,
    color: "red",
  },
  RELEASE: {
    order: 8,
    estimatedHours: 12,
    color: "green",
  },
  LOADING: {
    order: 9,
    estimatedHours: 6,
    color: "green",
  },
  IN_TRANSIT: {
    order: 10,
    estimatedHours: 24,
    color: "red",
  },
  DELIVERED: {
    order: 11,
    estimatedHours: 0,
    color: "green",
  },
}

export const STAGE_ICONS: Record<TrackingStageType, typeof IconFileDescription> = {
  PRE_ARRIVAL_DOCS: IconFileDescription,
  VESSEL_ARRIVAL: IconShip,
  CUSTOMS_DECLARATION: IconClipboardCheck,
  CUSTOMS_PAYMENT: IconCash,
  INSPECTION: IconSearch,
  PORT_FEES: IconReceipt,
  QUALITY_STANDARDS: IconCertificate,
  RELEASE: IconDoorExit,
  LOADING: IconForklift,
  IN_TRANSIT: IconTruck,
  DELIVERED: IconCircleCheck,
}

export const STATUS_STYLES = {
  PENDING: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-500 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-700",
    badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  IN_PROGRESS: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
  COMPLETED: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  SKIPPED: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  },
} as const
