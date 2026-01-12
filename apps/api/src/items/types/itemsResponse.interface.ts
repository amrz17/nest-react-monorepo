import { IItem } from "./item.type";

export class IItemResponse {
    success?: boolean;
    message?: string;
    items?: IItem | IItem[];
}