import { ProductTypes } from "./DataTypes";

export interface CartTypes {
    cartItems:ProductTypes[],
    shippingAddress:string,
    paymentMethod:string,
}