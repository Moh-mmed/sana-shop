import { CartItemTypes } from "./CartItemTypes";
import { ProductTypes } from "./DataTypes";

export interface CartTypes {
    cartItems:CartItemTypes[],
    shippingAddress:string,
    paymentMethod:string,
}

export interface StoreTypes{
    cart: CartTypes
}