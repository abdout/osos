/**
 * Seed Utilities
 * Helper functions for the seed system
 */

import { Prisma } from "@prisma/client"
import bcrypt from "bcryptjs"

// ============================================================================
// PASSWORD HASHING
// ============================================================================

let cachedPasswordHash: string | null = null

/**
 * Get cached password hash for "1234"
 */
export async function getPasswordHash(): Promise<string> {
  if (!cachedPasswordHash) {
    cachedPasswordHash = await bcrypt.hash("1234", 10)
  }
  return cachedPasswordHash
}

// ============================================================================
// CONSOLE LOGGING
// ============================================================================

/**
 * Log phase header
 */
export function logPhase(phase: number, title: string): void {
  const icons = ["🏗️", "👥", "📦", "📄", "🚚"]
  const icon = icons[phase - 1] || "📌"
  console.log(`\n${icon} PHASE ${phase}: ${title}`)
  console.log("-".repeat(50))
}

/**
 * Log success with count
 */
export function logSuccess(entity: string, count: number, details?: string): void {
  const countStr = String(count).padStart(4, " ")
  console.log(`   ✅ ${entity}: ${countStr}${details ? ` (${details})` : ""}`)
}

/**
 * Log warning
 */
export function logWarning(message: string): void {
  console.log(`   ⚠️  ${message}`)
}

/**
 * Log header for seed execution
 */
export function logHeader(): void {
  console.log("\n" + "=".repeat(60))
  console.log("  🚢 MAZIN LOGISTICS - SEED SYSTEM")
  console.log("=".repeat(60))
  console.log(`\n📅 Date: ${new Date().toLocaleDateString()}`)
  console.log(`⏰ Time: ${new Date().toLocaleTimeString()}`)
}

/**
 * Measure duration of async operation
 */
export async function measureDuration<T>(
  label: string,
  operation: () => Promise<T>
): Promise<T> {
  const start = Date.now()
  const result = await operation()
  const duration = ((Date.now() - start) / 1000).toFixed(2)
  console.log(`   ⏱️  ${label}: ${duration}s`)
  return result
}

/**
 * Log final summary
 */
export function logSummary(startTime: number, stats: Record<string, number>): void {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)

  console.log("\n" + "=".repeat(60))
  console.log("  ✅ SEED COMPLETED SUCCESSFULLY")
  console.log("=".repeat(60))
  console.log("\n📊 Data Summary:")
  console.log("┌─────────────────────────────────────────────┐")

  for (const [entity, count] of Object.entries(stats)) {
    const paddedEntity = entity.padEnd(25, " ")
    const paddedCount = String(count).padStart(8, " ")
    console.log(`│ ${paddedEntity} │ ${paddedCount} │`)
  }

  console.log("└─────────────────────────────────────────────┘")
  console.log(`\n⏱️  Total Time: ${elapsed}s`)
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Check if error is a unique constraint violation
 */
export function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  )
}

// ============================================================================
// ID GENERATORS
// ============================================================================

/**
 * Generate shipment number
 */
export function generateShipmentNumber(index: number): string {
  return `SHP-2025-${String(index + 1).padStart(3, "0")}`
}

/**
 * Generate tracking number
 */
export function generateTrackingNumber(prefix: string, index: number): string {
  const suffixes = ["ABC", "XYZ", "DEF", "GHI", "JKL"]
  const suffix = suffixes[index % suffixes.length]
  return `TRK-${prefix}${String(index + 100).padStart(3, "0")}`
}

/**
 * Generate invoice number
 */
export function generateInvoiceNumber(index: number): string {
  return `INV-2025-${String(index + 1).padStart(3, "0")}`
}

/**
 * Generate declaration number
 */
export function generateDeclarationNumber(index: number): string {
  return `DEC-2025-${String(index + 1).padStart(3, "0")}`
}
