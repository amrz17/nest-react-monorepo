import type { SaleOrderPayload } from "@/schemas/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Ban, MoreHorizontal } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export const columnsSaleOrders = ( 
  onCancel: (id_so: string) => void
): ColumnDef<SaleOrderPayload>[] => [
    {
        accessorKey: "so_number",
        header: "No. Sale Order",
    },
    {
        accessorKey: "so_status",
        header: "Status",
    },
    {
        accessorKey: "date_shipped",
        header: "Date Shipped",
    },
    {
        id: "actions",

        cell: ({ row }) => {
            const saleOrder = row.original;
            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onCancel(saleOrder.id_so!)}>
                        <Ban className="h-4 w-4 text-red-500"/>
                        Cancel Order
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
]