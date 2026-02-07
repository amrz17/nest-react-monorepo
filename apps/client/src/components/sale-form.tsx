"use client"

import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { saleOrderSchema, type SaleOrderPayload } from "@/schemas/schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useSaleOrders } from "@/hooks/use-sale-order"

type Props = {
  mode: "create" | "edit"
  initialData?: SaleOrderPayload | null
  orderId?: string
  onSuccess?: () => void
}

export function SaleForm({
  mode,
  initialData,
  orderId,
  onSuccess,
}: Props) {

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<SaleOrderPayload>({
    resolver: zodResolver(saleOrderSchema),
    defaultValues: {
      so_number: "",
      id_customer: "",
      id_user: "",
      date_shipped: "",
      so_status: "",
      note: "",
      items: [
        {
          id_item: "",
          qty_ordered: 1,
          qty_shipped: 0,
          price_per_unit: 0,
        }
      ],
    },
  })

  // Destructure necessary methods and state from the form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form

  const { fields, append, remove } = useFieldArray({
    control, // Hubungkan dengan control di atas
    name: "items", // Nama ini harus sama dengan yang ada di Zod schema & defaultValues
  });

  // Use the custom hook for order operations
  const { createSaleOrder, cancelSaleOrder, isLoading } = useSaleOrders()

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        ...initialData,
        date_shipped: initialData.date_shipped?.slice(0, 10),
      })
    }

    if (mode === "create") {
      reset()
    }
  }, [mode, initialData, reset])


  const onSubmit = async (values: SaleOrderPayload) => {
    try {
      if (mode === "create") {
        await createSaleOrder(values)
        toast.success("Sale order created")
      } else {
        if (!orderId) return
        await cancelSaleOrder(orderId)
        toast.success("Sale order cancelled")
      }

      onSuccess?.()
      reset()
    } catch {
      toast.error("Failed to save sale order")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <Label className="mb-2">Customer Name</Label>
        <Input
          {...register("id_customer")}
          disabled={mode === "edit"}
        />
        {errors.id_customer && (
          <p className="text-sm text-red-500">
            {errors.id_customer.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2">Created By</Label>
        <Input {...register("id_user")} />
      </div>

      <div>
        <Label className="mb-2">Date Shipped</Label>
        <Input type="date" {...register("date_shipped")} />
      </div>

      <div>
        <Label className="mb-2">Status</Label>
        <Input {...register("so_status")} />
      </div>

      <div>
        <Label className="mb-2">Note</Label>
        <Input {...register("note")} />
      </div>

      <div>
        <Label>Item Detail</Label>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-3 gap-2 border p-4 rounded-lg mb-1">
          <div>
            <Label>Item Name</Label>
            <Input {...register(`items.${index}.id_item` as const)} />
            {errors.items?.[index]?.id_item && (
              <p className="text-red-500 text-sm">{errors.items[index]?.id_item?.message}</p>
            )}
          </div>

          <div>
            <Label>Quantity</Label>
            <Input 
              type="number"
              {...register(`items.${index}.qty_ordered` as const, { valueAsNumber: true })} 
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input 
              type="number"
              {...register(`items.${index}.price_per_unit` as const, { valueAsNumber: true })} 
            />
          </div>
          
          <div className="col-span-3 flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => remove(index)}
              disabled={fields.length === 1} // Mencegah form kosong tanpa item
            >
                Remove
            </Button>

            {index === fields.length - 1 && (
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => append({ id_item: "", qty_ordered: 1, price_per_unit: 0 })}
              >
                Add
              </Button>
            )}
        </div>
        </div>
      ))}


      <Button type="submit" disabled={isSubmitting}>
        {mode === "create" ? "Submit" : "Submit Changes"}
      </Button>
    </form>
  )
}
