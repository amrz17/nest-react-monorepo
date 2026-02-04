// schemas/order.schema.ts
import { z } from "zod"

export const orderSchema = z.object({
  po_number: z.string().optional().or(z.literal("")),
  id_supplier: z.string().min(1, "Supplier is required"),
  id_user: z.string().min(1, "Company is required"),
  expected_delivery_date: z.string().min(1, "Date is required"),
  po_status: z.string().min(1, "Status is required"),
  note: z.string().optional(),
  items: z.array(
    z.object({
      id_item: z.string().min(1, "Item ID is required"),
      qty_ordered: z.number().min(1, "Quantity must be at least 1"),
      price_per_unit: z.number().min(0, "Price must be at least 0"),
    }),
  )
})

export type OrderPayload = z.infer<typeof orderSchema>

export const itemSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Item name is required"),
  price: z.number().min(1, "Price item is required"),
})

export type ItemPayload = z.infer<typeof itemSchema>

export const inventorySchema = z.object({
  qty_available: z.number().min(1, "Quantity is required"),
  qty_reserved: z.number(),
  id_item: z.string().min(1, "ID Item is requeired"),
  id_location: z.string().min(1, "ID location is required")
})

export type InventoryPayload = z.infer<typeof inventorySchema>

export const locationSchema = z.object({
  bin_code: z.string().min(1, "Bin code is required"),
  description: z.string()
})

export type LocationPayload = z.infer<typeof locationSchema>
