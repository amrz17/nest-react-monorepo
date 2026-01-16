import { InventoryEntity } from "../inventory.entity";

export type IInventory = Omit<InventoryEntity, 'id_inventory'>