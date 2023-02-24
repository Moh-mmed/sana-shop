import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../redux/cartSlice";
import { StoreTypes } from '../types/StoreTypes';
import { getSession } from 'next-auth/react';
import { NextPage } from 'next';

const Payment:NextPage = ()=> {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const cart = useSelector((state:StoreTypes) => state.cart);
  const {shippingAddress, paymentMethod} = cart
  const dispatch = useDispatch();
  const router = useRouter();

  const submitHandler = (e:any) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch(addPaymentMethod(selectedPaymentMethod));
    router.push('/placeorder');
  };
  
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
      return 
    }
    setSelectedPaymentMethod(paymentMethod);
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={1} />
      <form className="my-10 mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-6 text-3xl">Payment Method</h1>
        {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4 flex items-center">
            <input
              name="paymentMethod"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
              className="hidden"
            />

            <label
              htmlFor={payment}
              className="bg-white rounded-md border border-gray-300 px-4 py-2 flex-1 cursor-pointer hover:border-blue-500 transition-colors duration-300"
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border border-gray-300 mr-3 ${selectedPaymentMethod === payment ? 'bg-blue-500 border-blue-500' : ''}`}
                ></div>
                <div className="flex-1 text-sm">{payment}</div>
              </div>
            </label>
          </div>

        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="text-white bg-gray-500 hover:bg-gray-700 py-1 px-6 rounded-md"
          >
            Back
          </button>
          <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-6 rounded-md">Next</button>
        </div>
      </form>
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


export default Payment