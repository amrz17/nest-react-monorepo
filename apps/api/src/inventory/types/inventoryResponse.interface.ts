import { IInventory } from "./inventory.type";

export class IInventoryResponse {
    success?: boolean;
    message?: string;
    inventory?: IInventory | IInventory[];
}