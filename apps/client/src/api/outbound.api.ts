import type { OutboundPayload } from "@/schemas/schema";
import api from "./axios";

export const fetchOutbound = async (): Promise<OutboundPayload[]> => {
    const res = await api.get("/outbound");
    console.log("Outbounds: ", res.data.outbounds);
    return res.data.outbounds;
}

export const createOutboundApi = (
    payload: OutboundPayload
): Promise<OutboundPayload> => api.post("/outbound", payload);

export const cancelOutboundApi = (
    id: string
): Promise<void> => api.post(`/outbound/cancel/${id}`);