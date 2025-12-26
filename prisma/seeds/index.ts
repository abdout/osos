/**
 * Seed System Orchestrator
 *
 * Main entry point for seeding the Mazin logistics database.
 * Executes all seed phases in dependency order.
 *
 * Usage:
 *   pnpm db:seed
 *
 * Expected Output:
 *   - 3 Users (mazin, sami, admin)
 *   - 2 Shipments (with tracking stages)
 *   - 1 Customs Declaration
 *   - 1 Invoice (with line items)
 *
 * Test Credentials:
 *   - mazin@abdout.org / 1234 (Admin)
 *   - sami@abdout.org / 1234 (Manager)
 *   - admin@mazin.sd / admin123 (Admin)
 *
 * Tracking Test URLs:
 *   - /track/TRK-ABC123 (27% complete)
 *   - /track/TRK-XYZ789 (73% complete)
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import dotenv from "dotenv"

import { seedUsers } from "./auth"
import { seedDeclarations } from "./declarations"
import { seedInvoices } from "./invoices"
import { seedShipments } from "./shipments"
import type { SeedContext } from "./types"
import { logHeader, logPhase, logSummary, measureDuration } from "./utils"

dotenv.config()

// ============================================================================
// MAIN SEED FUNCTION
// ============================================================================

async function main() {
  const startTime = Date.now()

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    logHeader()

    // Build context progressively through phases
    const context: Partial<SeedContext> = { prisma }

    // ========================================================================
    // PHASE 1: USER ACCOUNTS
    // ========================================================================
    logPhase(1, "USER ACCOUNTS")

    const users = await measureDuration("Users", () => seedUsers(prisma))
    context.users = users

    // ========================================================================
    // PHASE 2: SHIPMENTS
    // ========================================================================
    logPhase(2, "SHIPMENTS & TRACKING")

    const shipments = await measureDuration("Shipments", () =>
      seedShipments(prisma, users)
    )
    context.shipments = shipments

    // ========================================================================
    // PHASE 3: DECLARATIONS
    // ========================================================================
    logPhase(3, "CUSTOMS DECLARATIONS")

    const declarations = await measureDuration("Declarations", () =>
      seedDeclarations(prisma, shipments, users)
    )
    context.declarations = declarations

    // ========================================================================
    // PHASE 4: INVOICES
    // ========================================================================
    logPhase(4, "INVOICES")

    const invoices = await measureDuration("Invoices", () =>
      seedInvoices(prisma, shipments, users)
    )
    context.invoices = invoices

    // ========================================================================
    // COMPLETION
    // ========================================================================
    logSummary(startTime, {
      Users: users.length,
      Shipments: shipments.length,
      "Tracking Stages": 22, // 11 per shipment
      Declarations: declarations.length,
      Invoices: invoices.length,
    })

    console.log("\n📋 Test Credentials:")
    console.log("   mazin@abdout.org / 1234 (Admin)")
    console.log("   sami@abdout.org / 1234 (Manager)")
    console.log("   admin@mazin.sd / admin123 (Admin)")
    console.log("\n🔍 Tracking URLs:")
    console.log("   /track/TRK-ABC123 (27% complete)")
    console.log("   /track/TRK-XYZ789 (73% complete)")

  } catch (error) {
    console.error("❌ Seed failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

// ============================================================================
// EXECUTION
// ============================================================================

main()
  .then(() => {
    console.log("\n✅ Seed completed successfully!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Seed failed:", error)
    process.exit(1)
  })
