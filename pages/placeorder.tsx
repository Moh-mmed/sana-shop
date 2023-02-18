import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { useDispatch, useSelector } from "react-redux";
import {  reset } from "../redux/cartSlice";
import { StoreTypes } from '../types/StoreTypes';
import { getSession } from 'next-auth/react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const PlaceOrder:NextPage = ()=> {
  const cart = useSelector((state:StoreTypes) => state.cart);
  const {cartItems, paymentMethod, shippingAddress} = cart
  const dispatch = useDispatch();
  const router = useRouter();

  const round2 = (num:number) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
      return
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      
      console.log(data)
      setLoading(false);
      dispatch(reset());

      // setTimeout(()=>router.push(`${process.env.ROOT_URL}/order/${data._id}`), 2000)
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={2} />
      <h1 className="mb-4 text-3xl">Place Order</h1>
      {cartItems.length === 0 ? (
       <div className="flex flex-col items-center">
          <p className="text-lg mb-8">You have no items in your cart to order.</p>
          <Link href="/"className="bg-yellow-500 text-white text-lg py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-200">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5 mb-6 border-b">
              <h2 className="mb-2 text-xl">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              <Link href="/shipping" className='inline-block text-white bg-green-500 hover:bg-green-700 py-1 px-6 mt-6 rounded-md'>Edit</Link>
            </div>
            <div className="card p-5 mb-6 border-b">
              <h2 className="mb-2 text-xl">Payment Method</h2>
              <div>{paymentMethod}</div>
              <Link href="/payment" className='inline-block text-white bg-green-500 hover:bg-green-700 py-1 px-6 mt-6 rounded-md'>Edit</Link>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-xl">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`} className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/cart" className='inline-block text-white bg-green-500 hover:bg-green-700 py-1 px-6 mt-6 rounded-md'>Edit</Link>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-xl">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="w-full bg-yellow-500 text-white text-lg py-3 px-6 mt-5 rounded-full hover:bg-yellow-600 transition duration-200"
                >
                  {loading ? 'Loading...' : 'Place Order'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps = async (context:any) => {
  const admin = await getSession(context);
  if (!admin) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  return {
    props: {
      admin
    },
  };
}
 
export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false })
