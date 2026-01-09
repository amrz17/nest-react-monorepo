"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCreateOrder } from "@/hooks/use-create-order"
import { toast } from "sonner"

type ProfileFormProps = React.ComponentProps<"form"> & {
  onSuccess?: () => void
}

export function ProfileForm({ className, onSuccess }: ProfileFormProps) {
  const { createOrder, isLoading } = useCreateOrder()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const form = e.currentTarget          // HTMLFormElement

    const payload = {
      po_code: formData.get("po_code") as string,
      id_user: formData.get("id_user") as string,
      po_type: formData.get("po_type") as string,
      date_po: formData.get("date_po") as string,
      po_status: formData.get("po_status") as string,
      note: formData.get("note") as string,
    }

    try {
      await createOrder(payload)
      onSuccess?.()
      toast.success("Purchase order created", {
        description: "The new purchase order has been saved successfully",
      })
      form?.reset()
    } catch (error) {
      toast.error("Failed to save purchase order", {
        description: "Please try again or check your connection",
        })
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-6", className)}
    >
      <div className="grid gap-3">
        <Label htmlFor="po_code">Purchase Order ID</Label>
        <Input name="po_code" id="po_code" />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="id_user">Company Name</Label>
        <Input name="id_user" id="id_user" />
      </div>


      <div className="grid gap-3">
        <Label htmlFor="po_type">Purchase Order Type</Label>
        <Input name="po_type" id="po_type" />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="date_po">Date Purchase Order</Label>
        <Input type="date" name="date_po" id="date_po" />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="po_status">Purchase Order Status</Label>
        <Input name="po_status" id="po_status" />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="note">Note</Label>
        <Input name="note" id="note" />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save changes"}
      </Button>
    </form>
  )
}
