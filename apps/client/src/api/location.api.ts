import type { LocationPayload } from "@/schemas/schema"
import api from "./axios"

export const fetchLocation = async (): Promise<any> => {
    const res = await api.get("/locations")

    return res.data.location
}

export const createLocationApi = async (
    payload: LocationPayload
): Promise<any> => api.post("/locations", payload)

export const updateLocationApi = async (
    id: string,
    payload: LocationPayload
): Promise<any> => api.put(`/locations/update/${id}`, payload)

export const deleteLocationApi = async (
    id: string
): Promise<void> => api.delete(`/locations/delete/${id}`)