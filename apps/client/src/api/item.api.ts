import type { ItemPayload } from "@/schemas/schema"
import api from "./axios"

export const fetchItems = async (): Promise<any> => {
    const response = await api.get("/items")

    return response.data.items
}

export const createItemApi = (
    payload: ItemPayload
): Promise<ItemPayload> => api.post("/items", payload) 

export const updateItemApi = (
    id: string,
    payload: ItemPayload
): Promise<ItemPayload> => api.put(`/items/update/${id}`, payload) 

export const deleteItemApi = (
    id: string
): Promise<void> => api.delete(`/items/delete/${id}`)