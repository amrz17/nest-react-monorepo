import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import data from "./data.json"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import DahsboardLayout from "@/layout/DashboardLayout"
import { DataTable } from "@/components/data-table"

// import data from "./data.json"
import { columnsOrders, type PurchaseOrder  } from "@/components/columns"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { ResponsiveDialogDrawer } from "@/components/drawer-form"
import { ProfileForm } from "@/components/dialog-form"

async function getData(): Promise<PurchaseOrder[]> {
  // Fetch data from your API here.
  return [
    {
    po_code: "PO-001",
    id_user: "PT Maju Jaya",
    date_po: "2025-01-01",
    po_status: "Pending",
    update_at: "2025-01-02",
    created_by: "Admin",
  },
  {
    po_code: "PO-002",
    id_user: "CV Sumber Rejeki",
    date_po: "2025-01-02",
    po_status: "Approved",
    update_at: "2025-01-03",
    created_by: "Admin",
  },
  {
    po_code: "PO-003",
    id_user: "PT Sejahtera Abadi",
    date_po: "2025-01-03",
    po_status: "Rejected",
    update_at: "2025-01-04",
    created_by: "Manager",
  },
  {
    po_code: "PO-004",
    id_user: "PT Nusantara Jaya",
    date_po: "2025-01-04",
    po_status: "Pending",
    update_at: "2025-01-05",
    created_by: "Admin",
  },
  {
    po_code: "PO-005",
    id_user: "CV Makmur Sentosa",
    date_po: "2025-01-05",
    po_status: "Approved",
    update_at: "2025-01-06",
    created_by: "Supervisor",
  },
  {
    po_code: "PO-006",
    id_user: "PT Global Teknologi",
    date_po: "2025-01-06",
    po_status: "Pending",
    update_at: "2025-01-07",
    created_by: "Admin",
  },
  {
    po_code: "PO-007",
    id_user: "PT Bintang Timur",
    date_po: "2025-01-07",
    po_status: "Approved",
    update_at: "2025-01-08",
    created_by: "Manager",
  },
  {
    po_code: "PO-008",
    id_user: "CV Sinar Abadi",
    date_po: "2025-01-08",
    po_status: "Rejected",
    update_at: "2025-01-09",
    created_by: "Admin",
  },
  {
    po_code: "PO-009",
    id_user: "PT Indo Sejahtera",
    date_po: "2025-01-09",
    po_status: "Pending",
    update_at: "2025-01-10",
    created_by: "Supervisor",
  },
  {
    po_code: "PO-010",
    id_user: "PT Cahaya Utama",
    date_po: "2025-01-10",
    po_status: "Approved",
    update_at: "2025-01-11",
    created_by: "Admin",
  },
  {
    po_code: "PO-011",
    id_user: "CV Mitra Bersama",
    date_po: "2025-01-11",
    po_status: "Pending",
    update_at: "2025-01-12",
    created_by: "Admin",
  },
  {
    po_code: "PO-012",
    id_user: "PT Sukses Mandiri",
    date_po: "2025-01-12",
    po_status: "Approved",
    update_at: "2025-01-13",
    created_by: "Manager",
  },
  {
    po_code: "PO-013",
    id_user: "PT Prima Karya",
    date_po: "2025-01-13",
    po_status: "Rejected",
    update_at: "2025-01-14",
    created_by: "Admin",
  },
  {
    po_code: "PO-014",
    id_user: "CV Anugerah Jaya",
    date_po: "2025-01-14",
    po_status: "Pending",
    update_at: "2025-01-15",
    created_by: "Supervisor",
  },
  {
    po_code: "PO-015",
    id_user: "PT Mega Utama",
    date_po: "2025-01-15",
    po_status: "Approved",
    update_at: "2025-01-16",
    created_by: "Admin",
  },
  {
    po_code: "PO-016",
    id_user: "PT Sentral Niaga",
    date_po: "2025-01-16",
    po_status: "Pending",
    update_at: "2025-01-17",
    created_by: "Admin",
  },
  {
    po_code: "PO-017",
    id_user: "CV Karya Mandiri",
    date_po: "2025-01-17",
    po_status: "Approved",
    update_at: "2025-01-18",
    created_by: "Manager",
  },
  {
    po_code: "PO-018",
    id_user: "PT Artha Sejahtera",
    date_po: "2025-01-18",
    po_status: "Rejected",
    update_at: "2025-01-19",
    created_by: "Admin",
  },
  {
    po_code: "PO-019",
    id_user: "PT Lintas Media",
    date_po: "2025-01-19",
    po_status: "Pending",
    update_at: "2025-01-20",
    created_by: "Supervisor",
  },
  {
    po_code: "PO-020",
    id_user: "CV Berkah Jaya",
    date_po: "2025-01-20",
    po_status: "Approved",
    update_at: "2025-01-21",
    created_by: "Admin",
  },
  ]
}

const Orders = () => {

  const [data, setData] = useState<PurchaseOrder[]>([])

  useEffect(() => {
    getData().then(setData)
  }, [])

  return (
    <DahsboardLayout>
        <section className="flex flex-1 flex-col">
        <div className="flex flex-row w-full py-6 px-8">
            <div>
                {/* <h1 className="text-5xl font-semibold">Orders</h1> */}
            </div>
            <div className="flex flex-1 items-center justify-end">
                <Input 
                    type="text" 
                    placeholder="Search" 
                    className="max-w-sm mr-4"
                />
                {/* <Button>
                    New sales order
                </Button> */}
            </div>
        </div>
            {/* <Separator
            orientation="horizontal"
            className="mx-2 data-[orientation=vertical]:h-4"
            /> */}
        <Card className="@container/card mx-4 mt-4 flex flex-row p-4">
            <div className="w-3/4">
                <CardHeader>
                    <CardDescription className="text-black text-2xl font-extrabold">Create Your First Order</CardDescription>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                    Create your first order by adding customer information, selecting products, and setting quantities. Easily manage and track every order from here
                    </div>
                </CardFooter>
                {/* <div className="text-muted-foreground">
                    Start managing your orders with ease. On this page, you can create your very first order by entering customer details, selecting products, and setting the order quantity. Once the order is created, you can track its status, make updates, or manage it anytime
                </div> */}
                {/* <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"> */}
                {/* </CardTitle> */}
            </div>
            <div className="flex w-1/4 items-center justify-end">
            {/* <Button
                // variant="outline"
                onClick={()=>{}}
            >
                Create New Sales Order
            </Button> */}
            <ResponsiveDialogDrawer
                trigger={<Button
                    className="ml-4"
                >
                  Create New Sales Order
                </Button>
                }
                title="Create New Sales Order"
                description="This form is to create a new sales order."
            >
              <ProfileForm /> 
            </ResponsiveDialogDrawer>
            
            </div>
            {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
            </CardFooter> */}
        </Card>
        {/* <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"> */}
            {/* <DataTable data={data}/> */}
        <div className="w-full flex-col justify-start gap-6"> 

            <DataTable columns={columnsOrders} data={data} />
        </div>
        </section>
    </DahsboardLayout>
  )
}


export default Orders