"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { IconPlus, IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createInvoice } from "@/actions/invoice"
import type { Dictionary, Locale } from "@/components/internationalization"
import type { Shipment } from "@prisma/client"

interface FormValues {
  shipmentId?: string
  currency: "SDG" | "USD" | "SAR"
  dueDate?: string
  notes?: string
  items: { description: string; quantity: number; unitPrice: number }[]
}

interface InvoiceFormProps {
  dictionary: Dictionary
  locale: Locale
  shipments?: Shipment[]
}

export function InvoiceForm({
  dictionary,
  locale,
  shipments = [],
}: InvoiceFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<FormValues>({
    defaultValues: {
      currency: "SDG",
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const watchItems = form.watch("items")
  const watchCurrency = form.watch("currency")

  const subtotal = watchItems.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0),
    0
  )
  const tax = subtotal * 0.15
  const total = subtotal + tax

  async function onSubmit(values: FormValues) {
    startTransition(async () => {
      await createInvoice({
        ...values,
        dueDate: values.dueDate || undefined,
      })
      router.push(`/${locale}/invoices`)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.invoices.newInvoice || "New Invoice"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="shipmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.navigation.projects}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={dictionary.common.select || "Select"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shipments.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.shipmentNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.certificates.systemType || "Currency"}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SDG">
                          {dictionary.invoices.currencies?.SDG || "SDG - Sudanese Pound"}
                        </SelectItem>
                        <SelectItem value="USD">
                          {dictionary.invoices.currencies?.USD || "USD - US Dollar"}
                        </SelectItem>
                        <SelectItem value="SAR">
                          {dictionary.invoices.currencies?.SAR || "SAR - Saudi Riyal"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.invoices.dueDate || "Due Date"}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{dictionary.invoices.lineItems || "Line Items"}</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
            >
              <IconPlus className="size-4" />
              {dictionary.invoices.addItem || "Add Item"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid gap-4 md:grid-cols-[1fr_100px_150px_40px] items-end"
                >
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && (
                          <FormLabel>
                            {dictionary.invoices.itemDescription || "Description"}
                          </FormLabel>
                        )}
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && (
                          <FormLabel>{dictionary.common.all || "Qty"}</FormLabel>
                        )}
                        <FormControl>
                          <Input type="number" min={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.unitPrice`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && (
                          <FormLabel>
                            {dictionary.invoices.unitPrice || "Unit Price"}
                          </FormLabel>
                        )}
                        <FormControl>
                          <Input type="number" step="0.01" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className={index === 0 ? "mt-8" : ""}
                  >
                    <IconTrash className="size-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.invoices.notes || "Notes"}</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-end gap-2 text-sm">
              <div className="flex gap-4">
                <span className="text-muted-foreground">
                  {dictionary.invoices.subtotal || "Subtotal"}:
                </span>
                <span className="font-medium tabular-nums">
                  {watchCurrency} {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-muted-foreground">
                  {dictionary.invoices.tax || "Tax"} (15%):
                </span>
                <span className="font-medium tabular-nums">
                  {watchCurrency} {tax.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-4 text-lg font-bold">
                <span>{dictionary.invoices.total || "Total"}:</span>
                <span className="tabular-nums">
                  {watchCurrency} {total.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            {dictionary.common.cancel || "Cancel"}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? dictionary.common.loading || "Loading..."
              : dictionary.common.create || "Create"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
