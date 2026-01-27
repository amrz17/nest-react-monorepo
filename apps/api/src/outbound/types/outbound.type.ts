import { OutboundEntity } from "../entities/outbound.entity";

export type IOutbound = Omit<OutboundEntity, 'id_outbound'>