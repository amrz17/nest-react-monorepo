import type { SaleOrderPayload } from "@/schemas/schema";
import api from "./axios";

// 
export const fetchSaleOrders = async (): Promise<SaleOrderPayload[]> => {
    const response = await api.get("/sale");
    return response.data.saleOrders;
}