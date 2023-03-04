import { OrderTypes } from "./OrderTypes";

export interface StoreOrderTypes {
    loading: boolean,
    error: string,
    order: OrderTypes,
    successPay?: boolean,
    loadingPay?: boolean,
    loadingDeliver?: boolean,
    successDeliver?: boolean,
};
