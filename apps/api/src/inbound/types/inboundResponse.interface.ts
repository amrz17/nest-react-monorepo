import { IInbound } from "./inbound.type";

export interface IInboundResponse {
    success?: boolean;
    message?: string;
    inbounds?: IInbound | IInbound[];
}