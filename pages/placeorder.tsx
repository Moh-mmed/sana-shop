import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard/CheckoutWizard';
import Layout from '../components/Layout/Layout';
import { getError } from '../utils/error';
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../redux/cartSlice";
import { StoreTypes } from '../types/StoreTypes';
import { getSession } from 'next-auth/react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import s from '../styles/placeorder/Placeorder.module.css'

const PlaceOrder:NextPage = ()=> {
  const cart = useSelector((state:StoreTypes) => state.cart);
  const {cartItems, paymentMethod, shippingAddress} = cart
  const dispatch = useDispatch();
  const router = useRouter();

  const round2 = (num:number) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + (c.quantity?c.quantity:0) * c.price, 0)
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
      let { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      data = data.data
      setLoading(false);
      dispatch(clearCartItems());
      toast.success(data.message)
      setTimeout(()=>router.push(`/order/${data._id}`), 1000)
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <section className={s.root}>
        <CheckoutWizard activeStep={2} />
        <h1 className={s.heading}>Place Order</h1>
        {cartItems.length === 0 ? (
          <div className={s.emptyCart}>
              <p className={s.emptyCart_body}>You have no items in your cart to order.</p>
              <Link href="/"className={s.emptyCart_link}>Go shopping</Link>
            </div>
          ) : (
          <div className={s.main}>
            {/* Main Content Section */}
            <div className={s.main_content}>
              <div className={s.main_content_section}>
                <h2 className={s.section_heading}>Shipping Address</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </div>
                <Link href="/shipping" className={s.editBtn}>Edit</Link>
              </div>
                
              <div className={s.main_content_section}>
                <h2 className={s.section_heading}>Payment Method</h2>
                <div>{paymentMethod}</div>
                <Link href="/payment" className={s.editBtn}>Edit</Link>
              </div>
                
              <div className={s.table_container}>
                <h2 className={s.section_heading}>Order Items</h2>
                <table className={s.table}>
                  <thead className={s.table_head}>
                    <tr>
                      <th className={s.table_head_cell}>Item</th>
                      <th className={s.table_head_cell}>Quantity</th>
                      <th className={s.table_head_cell}>Price</th>
                      <th className={s.table_head_cell}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className={s.table_body_row}>
                        <td className={s.table_body_cell}>
                          <Link href={`/shop/${item.slug}`} className={s.table_body_link}>
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
                        <td className={s.table_body_cell}>{(item.quantity?item.quantity:0)}</td>
                        <td className={s.table_body_cell}>${item.price}</td>
                        <td className={s.table_body_cell}>
                          ${(item.quantity?item.quantity:0) * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link href="/cart" className={s.editBtn}>Edit</Link>
              </div>
            </div>

              {/* Checkout Section */}
            <div className={s.main_checkout}>
              <h2 className={s.section_heading}>Order Summary</h2>
              <ul>
                <li>
                  <div className={s.checkoutListItem}>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className={s.checkoutListItem}>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className={s.checkoutListItem}>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className={s.checkoutListItem}>
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button disabled={loading} onClick={placeOrderHandler} className={s.checkoutBtn}
                  >
                    {loading ? 'Loading...' : 'Place Order'}
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
