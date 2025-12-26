/**
 * Auth Seed
 * Creates User accounts for testing
 *
 * Accounts created:
 * - mazin@abdout.org (ADMIN)
 * - sami@abdout.org (MANAGER)
 * - admin@mazin.sd (ADMIN)
 *
 * All accounts use password: 1234
 */

import type { PrismaClient } from "@prisma/client"
import type { UserRef } from "./types"
import { getPasswordHash, isUniqueConstraintError, logSuccess, logWarning } from "./utils"

// ============================================================================
// TEST USERS DATA
// ============================================================================

const TEST_USERS = [
  {
    email: "mazin@abdout.org",
    name: "Mazin",
    role: "ADMIN" as const,
    password: "1234",
  },
  {
    email: "sami@abdout.org",
    name: "Sami",
    role: "MANAGER" as const,
    password: "1234",
  },
  {
    email: "admin@mazin.sd",
    name: "Admin User",
    role: "ADMIN" as const,
    password: "admin123",
  },
]

// ============================================================================
// SEED FUNCTION
// ============================================================================

/**
 * Seed all user accounts
 */
export async function seedUsers(prisma: PrismaClient): Promise<UserRef[]> {
  const users: UserRef[] = []
  const defaultPasswordHash = await getPasswordHash()

  for (const userData of TEST_USERS) {
    try {
      // Use custom password hash for admin@mazin.sd
      const passwordHash = userData.password === "1234"
        ? defaultPasswordHash
        : await import("bcryptjs").then(bcrypt => bcrypt.hash(userData.password, 10))

      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          password: passwordHash,
          role: userData.role,
          emailVerified: new Date(),
        },
        create: {
          email: userData.email,
          name: userData.name,
          password: passwordHash,
          role: userData.role,
          emailVerified: new Date(),
        },
      })

      users.push({
        id: user.id,
        email: user.email!,
        name: user.name || "",
        role: user.role,
      })
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        const existing = await prisma.user.findFirst({
          where: { email: userData.email },
        })
        if (existing) {
          users.push({
            id: existing.id,
            email: existing.email!,
            name: existing.name || "",
            role: existing.role,
          })
        }
        logWarning(`User ${userData.email} already exists, skipped`)
      } else {
        throw error
      }
    }
  }

  logSuccess("Users", users.length, "mazin, sami, admin")
  return users
}
