import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// import data from "./data.json"
import { Card, CardAction, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import DahsboardLayout from "@/layout/DashboardLayout"

const Orders = () => {
  return (
    <DahsboardLayout>
        <section className="flex flex-1 flex-col">
        <div className="flex flex-row justify-end w-full py-6 px-8">
            {/* <h1 className="text-4xl font-semibold">Orders</h1> */}
            <Button>
            <span>New sales order</span>
            </Button>
        </div>
            <Separator
            orientation="horizontal"
            className="mx-2 data-[orientation=vertical]:h-4"
            />
        <Card className="@container/card mx-6 mt-6 flex flex-row p-4">
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
            <Button
                variant="outline"
            >
                <span>Create New Sales Order</span>
            </Button>
            </div>
            {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
            </CardFooter> */}
        </Card>
            {/* <DataTableOrders data={data}/> */}
        </section>
    </DahsboardLayout>
  )
}

export default Orders