/**
 * Shipments Seed
 * Creates sample shipments with tracking stages
 *
 * Shipments created:
 * - SHP-2025-001: Electronic goods (in progress at CUSTOMS_PAYMENT)
 * - SHP-2025-002: Automotive parts (almost delivered at LOADING)
 */

import type { PrismaClient } from "@prisma/client"
import type { ShipmentRef, UserRef } from "./types"
import { logSuccess } from "./utils"

// ============================================================================
// TRACKING STAGES
// ============================================================================

const STAGES_SHIPMENT_1 = [
  { stageType: "PRE_ARRIVAL_DOCS", status: "COMPLETED", completedAt: new Date("2025-01-10") },
  { stageType: "VESSEL_ARRIVAL", status: "COMPLETED", completedAt: new Date("2025-01-15") },
  { stageType: "CUSTOMS_DECLARATION", status: "COMPLETED", completedAt: new Date("2025-01-16") },
  { stageType: "CUSTOMS_PAYMENT", status: "IN_PROGRESS", startedAt: new Date("2025-01-17") },
  { stageType: "INSPECTION", status: "PENDING", estimatedAt: new Date("2025-01-19") },
  { stageType: "PORT_FEES", status: "PENDING", estimatedAt: new Date("2025-01-20") },
  { stageType: "QUALITY_STANDARDS", status: "PENDING", estimatedAt: new Date("2025-01-21") },
  { stageType: "RELEASE", status: "PENDING", estimatedAt: new Date("2025-01-22") },
  { stageType: "LOADING", status: "PENDING", estimatedAt: new Date("2025-01-22") },
  { stageType: "IN_TRANSIT", status: "PENDING", estimatedAt: new Date("2025-01-23") },
  { stageType: "DELIVERED", status: "PENDING", estimatedAt: new Date("2025-01-24") },
] as const

const STAGES_SHIPMENT_2 = [
  { stageType: "PRE_ARRIVAL_DOCS", status: "COMPLETED", completedAt: new Date("2025-01-03") },
  { stageType: "VESSEL_ARRIVAL", status: "COMPLETED", completedAt: new Date("2025-01-05") },
  { stageType: "CUSTOMS_DECLARATION", status: "COMPLETED", completedAt: new Date("2025-01-06") },
  { stageType: "CUSTOMS_PAYMENT", status: "COMPLETED", completedAt: new Date("2025-01-07") },
  { stageType: "INSPECTION", status: "COMPLETED", completedAt: new Date("2025-01-08") },
  { stageType: "PORT_FEES", status: "COMPLETED", completedAt: new Date("2025-01-09") },
  { stageType: "QUALITY_STANDARDS", status: "COMPLETED", completedAt: new Date("2025-01-10") },
  { stageType: "RELEASE", status: "COMPLETED", completedAt: new Date("2025-01-11") },
  { stageType: "LOADING", status: "IN_PROGRESS", startedAt: new Date("2025-01-12") },
  { stageType: "IN_TRANSIT", status: "PENDING", estimatedAt: new Date("2025-01-13") },
  { stageType: "DELIVERED", status: "PENDING", estimatedAt: new Date("2025-01-14") },
] as const

// ============================================================================
// SEED FUNCTION
// ============================================================================

/**
 * Seed shipments with tracking stages
 */
export async function seedShipments(
  prisma: PrismaClient,
  users: UserRef[]
): Promise<ShipmentRef[]> {
  const shipments: ShipmentRef[] = []
  const adminUser = users.find(u => u.role === "ADMIN")

  if (!adminUser) {
    throw new Error("Admin user required for seeding shipments")
  }

  // Shipment 1: Electronic goods (27% complete)
  const shipment1 = await prisma.shipment.upsert({
    where: { shipmentNumber: "SHP-2025-001" },
    update: { trackingNumber: "TRK-ABC123" },
    create: {
      shipmentNumber: "SHP-2025-001",
      trackingNumber: "TRK-ABC123",
      type: "IMPORT",
      status: "IN_TRANSIT",
      description: "Electronic goods from China",
      weight: 1500.5,
      quantity: 100,
      containerNumber: "MSKU1234567",
      vesselName: "MSC OSCAR",
      consignor: "Shanghai Electronics Co.",
      consignee: "Port Sudan Trading LLC",
      arrivalDate: new Date("2025-01-15"),
      userId: adminUser.id,
    },
  })

  shipments.push({
    id: shipment1.id,
    shipmentNumber: shipment1.shipmentNumber,
    trackingNumber: shipment1.trackingNumber || undefined,
  })

  // Create tracking stages for shipment 1
  for (const stage of STAGES_SHIPMENT_1) {
    await prisma.trackingStage.upsert({
      where: {
        shipmentId_stageType: {
          shipmentId: shipment1.id,
          stageType: stage.stageType,
        },
      },
      update: {},
      create: {
        shipmentId: shipment1.id,
        stageType: stage.stageType,
        status: stage.status,
        startedAt: "startedAt" in stage ? stage.startedAt : null,
        completedAt: "completedAt" in stage ? stage.completedAt : null,
        estimatedAt: "estimatedAt" in stage ? stage.estimatedAt : null,
      },
    })
  }

  // Shipment 2: Automotive parts (73% complete)
  const shipment2 = await prisma.shipment.upsert({
    where: { shipmentNumber: "SHP-2025-002" },
    update: {},
    create: {
      shipmentNumber: "SHP-2025-002",
      trackingNumber: "TRK-XYZ789",
      type: "IMPORT",
      status: "CLEARED",
      description: "Automotive parts from Japan",
      weight: 3200.0,
      quantity: 50,
      containerNumber: "OOLU7654321",
      vesselName: "EVER GIVEN",
      consignor: "Toyota Parts Japan",
      consignee: "Khartoum Motors Ltd",
      arrivalDate: new Date("2025-01-05"),
      userId: adminUser.id,
    },
  })

  shipments.push({
    id: shipment2.id,
    shipmentNumber: shipment2.shipmentNumber,
    trackingNumber: shipment2.trackingNumber || undefined,
  })

  // Create tracking stages for shipment 2
  for (const stage of STAGES_SHIPMENT_2) {
    await prisma.trackingStage.upsert({
      where: {
        shipmentId_stageType: {
          shipmentId: shipment2.id,
          stageType: stage.stageType,
        },
      },
      update: {},
      create: {
        shipmentId: shipment2.id,
        stageType: stage.stageType,
        status: stage.status,
        startedAt: "startedAt" in stage ? stage.startedAt : null,
        completedAt: "completedAt" in stage ? stage.completedAt : null,
        estimatedAt: "estimatedAt" in stage ? stage.estimatedAt : null,
      },
    })
  }

  logSuccess("Shipments", shipments.length, "with tracking stages")
  return shipments
}
