/**
 * Invoices Seed
 * Creates sample invoices with line items
 */

import type { PrismaClient } from "@prisma/client"
import type { InvoiceRef, ShipmentRef, UserRef } from "./types"
import { logSuccess } from "./utils"

// ============================================================================
// SEED FUNCTION
// ============================================================================

/**
 * Seed invoices with items
 */
export async function seedInvoices(
  prisma: PrismaClient,
  shipments: ShipmentRef[],
  users: UserRef[]
): Promise<InvoiceRef[]> {
  const invoices: InvoiceRef[] = []
  const adminUser = users.find(u => u.role === "ADMIN")

  if (!adminUser) {
    throw new Error("Admin user required for seeding invoices")
  }

  const shipment1 = shipments.find(s => s.shipmentNumber === "SHP-2025-001")

  if (shipment1) {
    const invoice = await prisma.invoice.upsert({
      where: { invoiceNumber: "INV-2025-001" },
      update: {},
      create: {
        invoiceNumber: "INV-2025-001",
        status: "SENT",
        currency: "SDG",
        subtotal: 50000.0,
        tax: 7500.0,
        total: 57500.0,
        dueDate: new Date("2025-02-01"),
        shipmentId: shipment1.id,
        userId: adminUser.id,
        items: {
          create: [
            {
              description: "Customs clearance service",
              quantity: 1,
              unitPrice: 25000.0,
              total: 25000.0,
            },
            {
              description: "Documentation processing",
              quantity: 1,
              unitPrice: 15000.0,
              total: 15000.0,
            },
            {
              description: "Port handling fees",
              quantity: 1,
              unitPrice: 10000.0,
              total: 10000.0,
            },
          ],
        },
      },
    })

    invoices.push({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
    })
  }

  logSuccess("Invoices", invoices.length, "with line items")
  return invoices
}
