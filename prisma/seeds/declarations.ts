/**
 * Declarations Seed
 * Creates customs declarations for shipments
 */

import type { PrismaClient } from "@prisma/client"
import type { DeclarationRef, ShipmentRef, UserRef } from "./types"
import { logSuccess } from "./utils"

// ============================================================================
// SEED FUNCTION
// ============================================================================

/**
 * Seed customs declarations
 */
export async function seedDeclarations(
  prisma: PrismaClient,
  shipments: ShipmentRef[],
  users: UserRef[]
): Promise<DeclarationRef[]> {
  const declarations: DeclarationRef[] = []
  const adminUser = users.find(u => u.role === "ADMIN")

  if (!adminUser) {
    throw new Error("Admin user required for seeding declarations")
  }

  const shipment1 = shipments.find(s => s.shipmentNumber === "SHP-2025-001")

  if (shipment1) {
    const declaration = await prisma.customsDeclaration.upsert({
      where: { declarationNo: "DEC-2025-001" },
      update: {},
      create: {
        declarationNo: "DEC-2025-001",
        status: "SUBMITTED",
        hsCode: "8471.30",
        dutyAmount: 15000.0,
        taxAmount: 2250.0,
        currency: "SDG",
        notes: "Electronic equipment - portable computers",
        shipmentId: shipment1.id,
        userId: adminUser.id,
      },
    })

    declarations.push({
      id: declaration.id,
      declarationNo: declaration.declarationNo,
    })
  }

  logSuccess("Declarations", declarations.length)
  return declarations
}
