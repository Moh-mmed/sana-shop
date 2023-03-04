import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard/CheckoutWizard';
import Layout from '../components/Layout/Layout';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { StoreTypes } from '../types/StoreTypes';
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../redux/cartSlice";
import { getSession } from 'next-auth/react';
import s from '../styles/shipping/Shipping.module.css'
import { ShippingAddress } from '../types/ShippingAddress';

const Shipping: NextPage = () => {
  const cart = useSelector((state:StoreTypes) => state.cart);
  const {shippingAddress} = cart
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ShippingAddress>();



  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler:SubmitHandler<ShippingAddress> = ({ fullName, address, city, postalCode, country }) => {
    dispatch(addShippingAddress({ fullName, address, city, postalCode, country }));
    router.push('/payment');
    };

  return (
    <Layout title="Shipping Address">
      <section className={s.root}>
        <CheckoutWizard activeStep={0} />
        <form className={s.form} onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className={s.form_heading}>Shipping Address</h1>

          <div className={s.form_input_container}>
            <label htmlFor="fullName" className={s.form_label}>Full Name</label>
            <input className={s.form_input}
              id="fullName"
              placeholder="Mohammed Ben Aoumeur"
              autoFocus
              {...register('fullName', {
                required: 'Please enter your full name',
              })}
            />
            {errors.fullName && (
              <div className={s.form_error}>{errors.fullName.message}</div>
            )}
          </div>

          <div className={s.form_input_container}>
            <label htmlFor="address" className={s.form_label}>Address</label>
            <input
              className={s.form_input}
              id="address"
              placeholder="M. Said Mohamed. 2, rue de l'Indépendance. 16027 ALGIERS. ALGERIA"
              {...register('address', {
                required: 'Please enter address',
                minLength: { value: 3, message: 'Address is more than 2 chars' },
              })}
            />
            {errors.address && (
              <div className={s.form_error}>{errors.address.message}</div>
            )}
          </div>

          <div className={s.form_input_container}>
            <label htmlFor="city" className={s.form_label}>City</label>
            <input
              className={s.form_input}
              id="city"
              placeholder="ALgiers"
              {...register('city', {
                required: 'Please enter city',
              })}
            />
            {errors.city && (
              <div className={s.form_error}>{errors.city.message}</div>
            )}
          </div>

          <div className={s.form_input_container}>
            <label htmlFor="postalCode" className={s.form_label}>Postal Code</label>
            <input
              className={s.form_input}
              id="postalCode"
              placeholder="ex: 30152"
              {...register('postalCode', {
                required: 'Please enter postal code',
              })}
            />
            {errors.postalCode && (
              <div className={s.form_error}>{errors.postalCode.message}</div>
            )}
          </div>

          <div className={s.form_input_container}>
            <label htmlFor="country" className={s.form_label}>Country</label>
            <input
              className={s.form_input}
              id="country"
              placeholder="Algeria"
              {...register('country', {
                required: 'Please enter your country',
              })}
            />
            {errors.country && (
              <div className={s.form_error}>{errors.country.message}</div>
            )}
          </div>

          <div className={s.form_btn_container}>
            <button className={s.form_btn}>Next</button>
          </div>
        </form>
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

export default Shipping
