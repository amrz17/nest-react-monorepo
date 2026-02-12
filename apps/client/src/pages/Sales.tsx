import { cancelSaleOrderApi, fetchSaleOrders } from "@/api/sale-order.api"
import { columnsSaleOrders } from "@/components/columns-sale-order";
import { DataTable } from "@/components/data-table";
import { ConfirmCancelDialog } from "@/components/dialog-cancel";
import { ResponsiveDialogDrawer } from "@/components/drawer-form";
import { SaleForm } from "@/components/sale-form";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import DahsboardLayout from "@/layout/DashboardLayout"
import type { SaleOrderPayload } from "@/schemas/schema";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


// TODO : Fix responsive issue
export default function SalesPage() {
  const [data, setData] = useState<SaleOrderPayload[]>([]);
  const [openCancel, setOpenCancel] = useState(false)
  const [cancelId, setCancelId] = useState<string | null>(null)
  const [mode, setMode] = useState<"create" | "edit">("create")
  const [open, setOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<SaleOrderPayload | null>(null)

  const fetchDataSales = async () => {
    const orders = await fetchSaleOrders();
    console.log(orders);
    setData(orders);
  }

  //
  const handleCancelOrder = (id: string) => {
    setCancelId(id)
    setOpenCancel(true)
  }

  // 
  const confirmCancel = async () => {
    if (!cancelId) return

    try {
      await cancelSaleOrderApi(cancelId)
      toast.success("Order cancelled")
      fetchDataSales()
    } catch {
      toast.error("Failed to cancel order")
    } finally {
      setOpenCancel(false)
      setCancelId(null)
    }
  }

  useEffect(() => {
    fetchDataSales();
  }, []);

  return (
    <DahsboardLayout>
        <section className="flex flex-1 flex-col">
        <Card className="@container/card mt-4 mx-4 lg:mt-4 flex lg:flex-row p-4">
            <div className="lg:w-3/4">
                <CardHeader>
                  <CardDescription className="text-xl w-full lg:text-3xl font-extrabold">
                    Sale Order
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                      Create your sale order by adding customer information, selecting products, and setting quantities.
                </CardFooter>
            </div>
        <div className="flex lg:w-1/4 items-center lg:justify-end">
              <ResponsiveDialogDrawer
                open={open}
                onOpenChange={setOpen}
                trigger={
                  <Button 
                    className="w-full lg:ml-4"
                    onClick={() => {
                      setMode("create")
                      setSelectedSale(null)
                      setOpen(true)
                    }}
                  >
                    <PlusCircle />
                    Create New Sale Order
                  </Button>
                }
                title={
                  mode === "create"
                    ? "Create New Sale Order"
                    : "Edit Sale Order"
                }
                // description={
                //   mode === "create"
                //     ? "This form is to create a new sale order."
                //     : "Update the selected sale order."
                // }
              >
                  <SaleForm
                    mode={mode}
                    orderId={selectedSale ? selectedSale.id_so : undefined}
                    initialData={selectedSale}
                    onSuccess={() => {
                      fetchDataSales()
                      setOpen(false)
                    }}
                />

              </ResponsiveDialogDrawer>

        </div>
        </Card>
        <div className="w-full flex-col justify-start gap-6"> 
            <DataTable 
              columns={columnsSaleOrders(handleCancelOrder)} 
              data={data} 
            />
            <ConfirmCancelDialog
              open={openCancel}
              onOpenChange={setOpenCancel}
              onConfirm={confirmCancel}
            />
        </div>
      </section>
    </DahsboardLayout>
  )
}