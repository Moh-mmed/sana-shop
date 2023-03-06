import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useDispatch, useSelector } from "react-redux";
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';
import { removeProduct, addProduct} from "../redux/cartSlice";
import { StoreTypes } from '../types/StoreTypes';
import { ProductTypes } from '../types/ProductTypes';

const Cart:NextPage = () => {
  const router = useRouter();
  const {cartItems} = useSelector((state:StoreTypes) => state.cart);
  const dispatch = useDispatch();

  const removeItemHandler = (item:ProductTypes) => {
    dispatch(removeProduct(item))
  };
  
  const updateCartHandler = async (item:ProductTypes, quantity:number) => {
    const { data } = await axios.get(`/api/products/${item.slug}`);
    
    if (data.data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch(addProduct({ ...item, quantity }))
    toast.success('Product updated in the cart');
  };


  return (
    <Layout title="Shopping Cart">
      <section className='px-10 py-12'>
        <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mt-8 mb-4">Your cart is empty</h2>
          <p className="text-lg mb-8">You have no items in your cart.</p>
          <Link href="/shop"className="bg-yellow-500 text-white text-lg py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-200">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td>
                      <Link href={`/shop/${item.slug}`} className="flex items-center">
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
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, Number(e.target.value))
                        }
                      >
                        {Array.from({length: cartItems[0].countInStock}, (_, i) => i + 1).map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl font-bold sm:mt-5 md:mt-0">
                  Subtotal ({cartItems.reduce((a, c) => a + (c.quantity ? c.quantity : 0), 0)}) : <span className="text-green-600">${cartItems.reduce((a, c) => a + (c.quantity ? c.quantity : 0) * c.price, 0)}</span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('user/shipping')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition duration-200"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      </section>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(Cart), { ssr: false })
