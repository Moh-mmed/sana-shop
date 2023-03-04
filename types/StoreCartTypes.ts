import { PaymentMethod } from "./PaymentMethod";
import { ProductTypes } from "./ProductTypes";
import { ShippingAddress } from "./ShippingAddress";

export interface StoreCartTypes {
    cartItems:ProductTypes[],
    shippingAddress: ShippingAddress,
    paymentMethod:PaymentMethod,
}