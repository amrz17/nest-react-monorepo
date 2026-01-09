"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PurchaseOrder = {
  po_code: string
  id_user: string
  date_po: string
  po_status: "Pending" | "Approved" | "Rejected"
  update_at: string
  created_by: string
}

export const columnsOrders: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "po_code",
    header: "PO Code",
  },
  {
    accessorKey: "id_user",
    header: "Company",
  },
  {
    accessorKey: "date_po",
    header: "Date PO",
  },
  {
    accessorKey: "po_status",
    header: "Status",
  },
  {
    accessorKey: "update_at",
    header: "Updated At",
  },
  {
    accessorKey: "created_by",
    header: "Created By",
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)
 
  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
  id: "actions",
    cell: ({ row }) => {
      const purchaseOrder = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(purchaseOrder.po_code)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]