"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import type { InvoiceStatus } from "@prisma/client"

const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().int().positive("Quantity must be positive"),
  unitPrice: z.coerce.number().positive("Unit price must be positive"),
})

const createInvoiceSchema = z.object({
  shipmentId: z.string().optional(),
  currency: z.enum(["SDG", "USD", "SAR"]),
  dueDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
})

export async function createInvoice(formData: z.input<typeof createInvoiceSchema>) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const validated = createInvoiceSchema.parse(formData)

  // Calculate totals
  const subtotal = validated.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )
  const tax = subtotal * 0.15 // 15% VAT
  const total = subtotal + tax

  // Generate invoice number
  const count = await db.invoice.count()
  const invoiceNumber = `INV-${String(count + 1).padStart(5, "0")}`

  const invoice = await db.invoice.create({
    data: {
      invoiceNumber,
      userId: session.user.id,
      shipmentId: validated.shipmentId || null,
      currency: validated.currency,
      subtotal,
      tax,
      total,
      dueDate: validated.dueDate,
      notes: validated.notes,
      items: {
        create: validated.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice,
        })),
      },
    },
    include: { items: true },
  })

  revalidatePath("/invoices")
  return invoice
}

export async function getInvoices(filters?: { status?: InvoiceStatus }) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  return db.invoice.findMany({
    where: {
      userId: session.user.id,
      ...(filters?.status && { status: filters.status }),
    },
    include: { items: true, shipment: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getInvoice(id: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  return db.invoice.findFirst({
    where: { id, userId: session.user.id },
    include: { items: true, shipment: true },
  })
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const invoice = await db.invoice.update({
    where: { id },
    data: {
      status,
      ...(status === "PAID" && { paidAt: new Date() }),
    },
  })

  revalidatePath("/invoices")
  revalidatePath(`/invoices/${id}`)
  return invoice
}

export async function deleteInvoice(id: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  await db.invoice.delete({ where: { id } })
  revalidatePath("/invoices")
}
