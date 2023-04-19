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
import { IoIosCloseCircleOutline } from 'react-icons/io';

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
      <section className='px-10 py-12 max-sm:px-6'>
        <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mt-8 mb-4 max-sm:text-2xl">Your cart is empty</h2>
          <p className="text-lg mb-8 max-sm:text-sm">You have no items in your cart.</p>
          <Link href="/shop"className="bg-yellow-500 text-white text-lg py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-200 max-sm:py-2 max-sm:px-4 max-sm:text-sm">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left max-sm:text-sm">Item</th>
                  <th className="p-5 text-right max-sm:text-sm">Quantity</th>
                  <th className="p-5 text-right max-sm:text-sm">Price</th>
                  <th className="p-5 max-sm:text-sm">Action</th>
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
                        <span className='ml-3 text-sm max-sm:text-xs'>{item.name}</span>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        className='text-sm max-sm:text-xs'
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, Number(e.target.value))
                        }
                      >
                        {Array.from({length: cartItems[0].countInStock}, (_, i) => i + 1).map((x) => (
                          <option key={x} value={x} >
                            {x}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right text-sm max-sm:text-xs">${`${(item.price * (1 - item.discount / 100)).toFixed(2)}`}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                          <IoIosCloseCircleOutline/>
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
                <div className="pb-3 text-xl font-bold sm:mt-5 md:mt-0 max-sm:text-lg">
                  Subtotal ({cartItems.reduce((a, c) => a + (c.quantity ? c.quantity : 0), 0)}) : <span className="text-green-600">${cartItems.reduce((a, c) => a + (c.quantity ? c.quantity : 0) * c.price * (1-c.discount/100), 0).toFixed(2)}</span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('user/shipping')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition duration-200 max-sm:py-2 max-sm:px-4 max-sm:text-sm"
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
