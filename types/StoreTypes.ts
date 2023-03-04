import { StoreCartTypes } from "./StoreCartTypes";
import { StoreOrdersHistory } from "./StoreOrdersHistory";
import { StoreOrderTypes } from "./StoreOrderTypes";


export interface StoreTypes{
    cart: StoreCartTypes,
    order: StoreOrderTypes,
    ordersHistory: StoreOrdersHistory
}