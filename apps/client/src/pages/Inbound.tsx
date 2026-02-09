import DashboarLayout from "@/layout/DashboardLayout"
import { DataTable } from "@/components/data-table"
import { ConfirmCancelDialog } from "@/components/dialog-cancel"
import { ResponsiveDialogDrawer } from "@/components/drawer-form"
import { Button } from "@/components/ui/button"
import type { InboundPayload } from "@/schemas/schema"
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { fetchInbound } from "@/api/inbound.api"
import { columnsInbound } from "@/components/columns-inbound"
import { InboundForm } from "@/components/inbound-form"
import { useInbound } from "@/hooks/use-inbound"

// TODO : Make interface better
const Inbound = () => {

  const [data, setData] = useState<InboundPayload[]>([])
  const [open, setOpen] = useState(false)
  const [selectedInbound, setSelectedInbound] = useState<InboundPayload | null>(null)
  const [mode, setMode] = useState<"create" | "edit">("create")
  const { cancelInbound } = useInbound()

  const [openCancel, setOpenCancel] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleCancel = (id: string) => {
    setDeleteId(id)
    setOpenCancel(true)
  }

  const confirmCancel = async () => {
    if (!deleteId) return

    try {
      await cancelInbound(deleteId)
      toast.success("Inbound cancelled successfully")
      loadInbounds()
    } catch (error) {
      toast.error("Failed to cancel inbound")
    } finally {
      setOpenCancel(false)
      setDeleteId(null)
    }
  }

  // Load All Inbound
  const loadInbounds = async () => {
    const inbounds = await fetchInbound()
    console.log("Fetched Inbounds:", inbounds)
    setData(inbounds)
  }

  // Initial Load
  useEffect(() => {
    loadInbounds()
  }, [])

  return (
    <DashboarLayout>
        <section className="flex flex-1 flex-col mt-4">
        <div className="flex w-1/4 items-center justify-end">
            <ResponsiveDialogDrawer
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Button 
                className="ml-4"
                onClick={() => {
                    setMode("create")
                    setSelectedInbound(null)
                    setOpen(true)
                }}
                >
                <PlusCircle />
                Create New Inbound
                </Button>
            }
            title={
                mode === "create"
                ? "Create New Inbound"
                : "Edit Inbound"
            }
            // description={
            //   mode === "create"
            //     ? "This form is to create a new inbound."
            //     : "Update the selected inbound."
            // }
            >
            <InboundForm
                mode={mode}
                initialData={selectedInbound}
                inboundId={selectedInbound ? selectedInbound.id_inbound : undefined}
                onSuccess={() => {
                loadInbounds()
                setOpen(false)
                }}
            />

            </ResponsiveDialogDrawer>

        </div>
        <div className="w-full flex-col justify-start gap-6"> 
            <DataTable 
              columns={columnsInbound(handleCancel)} 
              data={data} 
            />
            <ConfirmCancelDialog
              open={openCancel}
              onOpenChange={setOpenCancel}
              onConfirm={confirmCancel}
            />
        </div>
        </section>
    </DashboarLayout>
  )
}

export default Inbound