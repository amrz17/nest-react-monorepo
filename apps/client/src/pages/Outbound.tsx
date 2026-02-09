import { fetchOutbound } from '@/api/outbound.api'
import { columnsOutbound } from '@/components/columns-outbound'
import { DataTable } from '@/components/data-table'
import { ConfirmCancelDialog } from '@/components/dialog-cancel'
import { ResponsiveDialogDrawer } from '@/components/drawer-form'
import { OutboundForm } from '@/components/outbound-fom'
import { Button } from '@/components/ui/button'
import { useOutbound } from '@/hooks/use-outbound'
import DashboardLayout from '@/layout/DashboardLayout'
import type { OutboundPayload } from '@/schemas/schema'
import { PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

// TODO : Make better UI/UX for outbound page
const Outbound = () => {
  const [data, setData] = useState<OutboundPayload[]>([])
  const [open, setOpen] = useState(false)
  const [selectedOutbound, setSelectedOutbound] = useState<OutboundPayload | null>(null)
  const [mode, setMode] = useState<"create" | "edit">("create")
  const { cancelOutbound } = useOutbound()

  const [openCancel, setOpenCancel] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleCancel = (id: string) => {
    setDeleteId(id)
    setOpenCancel(true)
  }

  const confirmCancel = async () => {
    if (!deleteId) return

    try {
      await cancelOutbound(deleteId)
      toast.success("Outbound cancelled successfully")
      loadOutbounds()
    } catch (error) {
      toast.error("Failed to cancel outbound")
    } finally {
      setOpenCancel(false)
      setDeleteId(null)
    }
  }

  // Load All Outbound
  const loadOutbounds = async () => {
    const outbounds = await fetchOutbound()
    console.log("Fetched Outbounds:", outbounds)
    setData(outbounds)
  }

  // Initial Load
  useEffect(() => {
    loadOutbounds()
  }, [])

  return (
    <DashboardLayout>
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
                    setSelectedOutbound(null)
                    setOpen(true)
                }}
                >
                <PlusCircle />
                Create New Outbound
                </Button>
            }
            title={
                mode === "create"
                ? "Create New Outbound"
                : "Edit Outbound"
            }
            description={
              mode === "create"
                ? "This form is to create a new outbound."
                : "Update the selected outbound."
            }
            >
            <OutboundForm
                mode={mode}
                initialData={selectedOutbound}
                outboundId={selectedOutbound ? selectedOutbound.id_outbound : undefined}
                onSuccess={() => {
                loadOutbounds()
                setOpen(false)
                }}
            />

            </ResponsiveDialogDrawer>

        </div>
        <div className="w-full flex-col justify-start gap-6"> 
            <DataTable 
              columns={columnsOutbound(handleCancel)} 
              data={data} 
            />
            <ConfirmCancelDialog
              open={openCancel}
              onOpenChange={setOpenCancel}
              onConfirm={confirmCancel}
            />
        </div>
        </section>
    </DashboardLayout>
  )
}

export default Outbound