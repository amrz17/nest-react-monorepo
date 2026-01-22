import { IPOItem } from "../../orders/types/poi.type";

export class IPOItemResponse {
    success?: boolean;
    message?: string;
    po_items?: IPOItem | IPOItem[];
}