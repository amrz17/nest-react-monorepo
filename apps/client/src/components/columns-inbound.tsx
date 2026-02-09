"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Ban, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "./ui/badge"
import type { InboundPayload } from "@/schemas/schema"

// Define the columns for the data table.
export const columnsInbound = ( 
  onCancel: (id_inbound: string) => void
): ColumnDef<InboundPayload>[] => [
  {
    accessorKey: "inbound_number",
    header: "Inbound Number",
  },
  {
    accessorKey: "items.id_item",
    header: "Item Name",
    cell: ({ row }) => {
      const items = row.original.items || [];
      const firstItem = items[0]?.id_item;
      const extraItems = items.length - 1;

      return (
        <div className="flex items-center gap-1">
            <Badge variant="secondary" className="text-xs">
            {firstItem || "No Items"}
            </Badge>
          {extraItems > 0 && (
            <Badge variant="secondary" className="text-xs">
              +{extraItems} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "supplierName.name",
    header: "Company Supplier",
  },
  {
    accessorKey: "items.qty_received",
    header: "Quantity Received",
    cell: ({ row }) => {
      const items = row.original.items || [];
      // Mengambil semua qty_received dan menggabungkannya dengan koma
      return <span>{items.map(i => i.qty_received).join(", ")}</span>;
    },
  },
  {
    accessorKey: "received_at",
    header: "Received At",
  },
  {
    accessorKey: "status_inbound",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status_inbound;
      return <Badge variant={status === "RECEIVED" ? "default" : "secondary"}>{status}</Badge>;
    }
  },
  {
    accessorKey: "last_update",
    header: "Updated At",
  },
  {
  id: "actions",
    // Define the actions column
    cell: ({ row }) => {
      const inbound = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onCancel(inbound.id_inbound!)}>
                <Ban className="h-4 w-4 text-red-500"/>
                Cancel Inbound
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]