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
import type { OutboundPayload } from "@/schemas/schema"

// Define the columns for the data table.
export const columnsOutbound = ( 
  onCancel: (id_outbound: string) => void
): ColumnDef<OutboundPayload>[] => [
  {
    accessorKey: "outbound_number",
    header: "Outbound Number",
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
    accessorKey: "customer.name",
    header: "Company Customer",
  },
  {
    accessorKey: "items.qty_shipped",
    header: "Quantity Shipped",
    cell: ({ row }) => {
      const items = row.original.items || [];
      // Mengambil semua qty_shipped dan menggabungkannya dengan koma
      return <span>{items.map(i => i.qty_shipped).join(", ")}</span>;
    },
  },
  {
    accessorKey: "received_at",
    header: "Received At",
  },
  {
    accessorKey: "status_outbound",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status_outbound;
      return <Badge variant={status === "SHIPPED" ? "default" : "secondary"}>{status}</Badge>;
    }
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
  id: "actions",
    // Define the actions column
    cell: ({ row }) => {
      const outbound = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onCancel(outbound.id_outbound!)}>
                <Ban className="h-4 w-4 text-red-500"/>
                Cancel Outbound
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]