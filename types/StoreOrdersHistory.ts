import { OrderTypes } from "./OrderTypes";

export interface StoreOrdersHistory {
    loading: boolean,
    orders: OrderTypes[],
    error: string,
}