import { cancelSaleOrderApi, createSaleOrderApi } from "@/api/sale-order.api";
import type { SaleOrderPayload } from "@/schemas/schema";
import { useState } from "react";

export function useSaleOrders() {
    const [isLoading, setIsLoading] = useState(false);

    // Create Sale Order
    const createSaleOrder = async (payload: SaleOrderPayload) => {
        setIsLoading(true);

        try {
            const res = await createSaleOrderApi({
                ...payload
            });
            return res;
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to create sale order";
            console.error(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }

    const cancelSaleOrder = async (id: string) => {
        setIsLoading(true);
        try {
            await cancelSaleOrderApi(id);
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to cancel sale order";
            console.error(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        createSaleOrder,
        isLoading,
        cancelSaleOrder,
    }

}
