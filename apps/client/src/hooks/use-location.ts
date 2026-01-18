import { createLocationApi, deleteLocationApi, updateLocationApi } from "@/api/location.api";
import type { LocationPayload } from "@/schemas/schema";
import { useState } from "react";

export function useLocation() {
    const [isLoading, setIsLoading] = useState(false)

    const createLocation = async (payload: LocationPayload) => {
        setIsLoading(true)

        try {
            const res = await createLocationApi({
                bin_code: payload.bin_code,
                description: payload.description
            })
            return res
        } finally {
            setIsLoading(false)
        }
    }

    const updateLocation = async (id: string, payload: LocationPayload) => {
        setIsLoading(true)

        try {
            const res = await updateLocationApi(id, {
                bin_code: payload.bin_code,
                description: payload.description
            })
            return res
        } finally {
            setIsLoading(false)
        }
    }

    const deleteLocation = async (id: string) => {
        setIsLoading(true)

        return await deleteLocationApi(id)
    }

    return {
        createLocation,
        updateLocation,
        deleteLocation,
        isLoading
    }

}