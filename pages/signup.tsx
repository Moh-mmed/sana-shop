import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Layout from '../components/Layout/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NextPage } from 'next';
import PasswordEye from '../utils/components/PasswordEye';

interface FormInputs{
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

const SignUp: NextPage = () => {
  const {data: session} = useSession()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);

  const router = useRouter();
  const { callbackUrl }:any = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(callbackUrl || '/');
    }
  }, [router, session, callbackUrl]);

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
            autoFocus
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
            
          ></input>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
          )}
          <PasswordEye show={showPassword} onClick={handlePasswordToggle} />
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
          <PasswordEye show={showConfirmPassword} onClick={handleConfirmPasswordToggle} />
        </div>

        <div className="mb-4 ">
          <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-4 rounded-md">Register</button>
        </div>
        <div className="mb-4 ">
          Already have an account? &nbsp;
          <Link href={`/login?callbackUrl=${callbackUrl || '/'}`} className="hover:text-blue-600 hover:underline">Login</Link>
        </div>
      </form>
    </Layout>
  );
}


export const getServerSideProps = async (context:any) => {
  const admin = await getSession(context);
  const { callbackUrl }:any = context.query
  
  if (admin) {
    return {
      redirect: {
        destination: callbackUrl || '/',
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