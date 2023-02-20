import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NextPage } from 'next';
import { UserTypes } from '../types/DataTypes';

interface FormInputs{
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

const SignUp: NextPage<any> = ({ admin }) => {
  const {data: session} = useSession()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);
  const router = useRouter();
  const { redirect }:any = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>();

  const submitHandler: SubmitHandler<FormInputs>  = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-3xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="name" className='mb-2'>Name</label>
          <input
            type="text"
            placeholder="mohammed ben aoumeur"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Please enter name',
            })}
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className='mb-2'>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            placeholder="example@domain.com"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className='mb-2'>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            placeholder="**********"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
          )}
          <div
            className="absolute top-10 right-2 cursor-pointer"
            onClick={handlePasswordToggle}
            >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
        </div>
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className='mb-2'>Confirm Password</label>
          <input
            placeholder="**********"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please enter confirm password',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'confirm password is more than 5 chars',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 text-sm mt-1">Password do not match</div>
            )}
          <div
            className="absolute top-10 right-2 cursor-pointer"
            onClick={handleConfirmPasswordToggle}
            >
            {showConfirmPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
        </div>

        <div className="mb-4 ">
          <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-4 rounded-md">Register</button>
        </div>
        <div className="mb-4 ">
          Already have an account? &nbsp;
          {/* <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link> */}
          <Link href={`/login`} className="hover:text-blue-600 hover:underline">Login</Link>
        </div>
      </form>
    </Layout>
  );
}

export const getServerSideProps = async (context:any) => {
  const {query} = context
  const admin = await getSession(context);
  if (admin) {
    return {
      redirect: {
        destination: query.redirect || '/',
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


export default SignUp