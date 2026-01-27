import { ISales } from "./sales.type";

export interface ISaleResponse {
    success?: boolean;
    message?: string;
    sales?: ISales | ISales[];
}