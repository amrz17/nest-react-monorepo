import { cancelOutboundApi, createOutboundApi } from "@/api/outbound.api";
import type { OutboundPayload } from "@/schemas/schema";
import { useState } from "react";

export function useOutbound() {
    const [isLoading, setIsLoading] = useState(false);
    
    // Create Outbound Shipment
    const createOutbound = async (payload: OutboundPayload) => {
        setIsLoading(true);
        try {
           const res = await createOutboundApi({
               ...payload
           });
           return res; 
        } catch (error: any) {
           const message = error.response?.data?.message || "Failed to create outbound shipment";
           throw new Error(message); 
        } finally {
            setIsLoading(false);
        }
    }

    // Cancel Outbound Shipment
    const cancelOutbound = async (id: string) => {
        setIsLoading(true);

        try {
            await cancelOutboundApi(id);
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to cancel outbound shipment";
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        createOutbound,
        isLoading,
        cancelOutbound
    }
}