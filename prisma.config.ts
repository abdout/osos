import path from "node:path"
import dotenv from "dotenv"
import { defineConfig } from "prisma/config"

dotenv.config()

/**
 * Prisma Configuration (v7+)
 *
 * Multi-File Schema Setup:
 * - Points to the `prisma` directory (not a single file) to enable multi-schema support
 * - All *.prisma files in prisma/models/ are automatically included
 * - Main schema.prisma defines datasource and generator blocks
 *
 * Configuration Structure:
 * - schema.prisma: Datasource and generator configuration
 * - prisma/models/*.prisma: Model files with business logic
 */
export default defineConfig({
  // Multi-file schema support - points to the prisma directory
  schema: path.join(__dirname, "prisma"),

  migrate: {
    adapter: async () => {
      const { PrismaPg } = await import("@prisma/adapter-pg")
      const { Pool } = await import("pg")

      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      })

      return new PrismaPg(pool)
    },
  },

  datasource: {
    url: process.env.DATABASE_URL!,
  },
})
