import { ProductTypes, UserTypes } from "./DataTypes";

export interface OrderDataTypes {
    _id: string,
    user: UserTypes,
    orderItems: ProductTypes[],
    shippingAddress: ShippingAddress,
    paymentMethod: PaymentMethod,
    itemsPrice: number,
    shippingPrice: number
    taxPrice: number
    totalPrice: number,
    isPaid: boolean
    paidAt: string,
    isDelivered: boolean
    deliveredAt:string,
}

export interface OrderTypes {
    loading: boolean,
    error: string,
    order: OrderDataTypes,
    successPay?: boolean,
    loadingPay?: boolean,
    loadingDeliver?: boolean,
    successDeliver?: boolean,
};

export interface ShippingAddress{
    fullName: string,
    address: string,
    city: string,
    postalCode: string,
    country: string
};

export type PaymentMethod = string

export interface CartTypes {
    cartItems:ProductTypes[],
    shippingAddress: ShippingAddress,
    paymentMethod:PaymentMethod,
}

export interface StoreTypes{
    cart: CartTypes,
    order: OrderTypes,
    orderHistory: any
}

 