import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../../components/CheckoutWizard/CheckoutWizard';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../../redux/cartSlice";
import { StoreTypes } from '../../types/StoreTypes';
import { NextPage } from 'next';
import s from '../../styles/payment/Payment.module.css'

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
    router.push('/user/placeorder');
  };
  
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/user/shipping');
      return 
    }
    setSelectedPaymentMethod(paymentMethod);
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <section className={s.root}>
        <CheckoutWizard activeStep={1} />
        <form className={s.form} onSubmit={submitHandler}>
          <h1 className={s.form_heading}>Payment Method</h1>
          {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
            <div key={payment} className={s.form_input_container}>
              <input
                name="paymentMethod"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
                className="hidden"
              />

              <label htmlFor={payment} className={s.form_label}>
                <div className={s.label_circle_container}>
                  <div
                    className={`${s.label_circle} ${selectedPaymentMethod === payment && s.label_circle_selected}`}
                  ></div>
                  <div className={s.label_text}>{payment}</div>
                </div>
              </label>
            </div>

          ))}

          <div className={s.btnsContainer}>
            <button
              onClick={() => router.push('/user/shipping')}
              type="button"
              className={s.backBtn}
            >
              Back
            </button>
            <button className={s.nextBtn}>Next</button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

export default Payment