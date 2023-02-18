import { CartItemTypes } from "./CartItemTypes";
import { ProductTypes } from "./DataTypes";

export interface ShippingAddress{
    fullName: string,
    address: string,
    city: string,
    postalCode: string,
    country: string
}

export interface CartTypes {
    cartItems:CartItemTypes[],
    shippingAddress: ShippingAddress,
    paymentMethod:string,
}

export interface StoreTypes{
    cart: CartTypes
}

 