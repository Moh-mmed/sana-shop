import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { ShippingAddress, StoreTypes } from '../types/StoreTypes';
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../redux/cartSlice";
import { getSession } from 'next-auth/react';

const Shipping:NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ShippingAddress>();

  const cart = useSelector((state:StoreTypes) => state.cart);
  const {shippingAddress} = cart
  const dispatch = useDispatch();
  const router = useRouter();

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
      <CheckoutWizard activeStep={0} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-3xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName" className='mb-2'>Full Name</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="fullName"
            placeholder="Mohammed Ben Aoumeur"
            autoFocus
            {...register('fullName', {
              required: 'Please enter your full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500 text-sm mt-1">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className='mb-2'>Address</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="address"
            placeholder="M. Said Mohamed. 2, rue de l'Indépendance. 16027 ALGIERS. ALGERIA"
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Address is more than 2 chars' },
            })}
          />
          {errors.address && (
            <div className="text-red-500 text-sm mt-1">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city" className='mb-2'>City</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="city"
            placeholder="ALgiers"
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500 text-sm mt-1 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className='mb-2'>Postal Code</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="postalCode"
            placeholder="ex: 30152"
            {...register('postalCode', {
              required: 'Please enter postal code',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 text-sm mt-1 ">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country" className='mb-2'>Country</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="country"
            placeholder="Algeria"
            {...register('country', {
              required: 'Please enter your country',
            })}
          />
          {errors.country && (
            <div className="text-red-500 text-sm mt-1 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-6 rounded-md">Next</button>
        </div>
      </form>
    </Layout>
  );
}

export const getServerSideProps = async (context:any) => {
  const admin = await getSession(context);
  console.log(admin)
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
