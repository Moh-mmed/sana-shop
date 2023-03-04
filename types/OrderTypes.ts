import { PaymentMethod } from "./PaymentMethod"
import { ProductTypes } from "./ProductTypes"
import { ShippingAddress } from "./ShippingAddress"
import { UserTypes } from "./UserTypes"

export interface OrderTypes {
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