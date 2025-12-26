/**
 * Seed Entry Point
 *
 * This file imports and runs the seed orchestrator.
 * Run with: pnpm db:seed
 *
 * Structure:
 *   prisma/seeds/
 *   ├── index.ts      - Main orchestrator
 *   ├── types.ts      - Shared types
 *   ├── utils.ts      - Helper functions
 *   ├── auth.ts       - User accounts
 *   ├── shipments.ts  - Shipments & tracking
 *   ├── declarations.ts - Customs declarations
 *   └── invoices.ts   - Invoices & items
 */

import "./seeds/index"
