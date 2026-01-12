import { ItemsEntity } from "../items.entity";

export type IItem = Omit<ItemsEntity, 'id_item'>