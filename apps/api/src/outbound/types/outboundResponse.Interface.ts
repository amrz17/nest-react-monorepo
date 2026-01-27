import { IOutbound } from "./outbound.type";

export interface IOutboundResponse {
    success?: boolean;
    message?: string;
    outbounds?: IOutbound | IOutbound[];
}