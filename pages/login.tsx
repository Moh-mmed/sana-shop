import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Layout from '../components/Layout';
// import { getError } from '../utils/error';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


interface FormInputs{
  email: string,
  password: string
}

export default function LoginScreen() {
  // const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  console.log(redirect)
  // useEffect(() => {
  //   if (session?.user) {
  //     // router.push(redirect || '/');
  //     router.push('/');
  //   }
  // }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>();

  const submitHandler: SubmitHandler<FormInputs> = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        console.log('Error')
        // toast.error(result.error);
      }
    } catch (err) {
      console.log('Error')
      // toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-sm"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-10 text-3xl">Login</h1>
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
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
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
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
          <div
            className="absolute top-10 right-2 cursor-pointer"
            onClick={handlePasswordToggle}
            >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
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
          <button className="text-white bg-blue-500 py-1 px-4 rounded-md">Login</button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`} className="hover:text-blue-600 hover:underline">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
