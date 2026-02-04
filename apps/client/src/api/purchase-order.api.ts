import api from "./axios"
import type { OrderPayload } from "@/schemas/schema"

// Get All Orders
export const fetchOrders = async (): Promise<OrderPayload[]> => {
  const response = await api.get("/order")
  return response.data.orders
}

// Create Order
export const createOrderApi = (
  payload: OrderPayload
): Promise<OrderPayload> => api.post("/order", payload)

// Update Order
export const updateOrderApi = (id: string, 
  payload: OrderPayload
): Promise<OrderPayload> => api.put(`/order/update/${id}`, payload)

// Delete Order
export const deleteOrderApi = (
  id: string,
): Promise<void> => api.delete(`/order/delete/${id}`)