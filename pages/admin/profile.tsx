import React, { useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../../utils/error';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { NextPage } from 'next';
import { UserTypes } from '../../types/UserTypes';
import PasswordEye from '../../utils/components/PasswordEye';
import { useRouter } from 'next/router';

type PropsTypes = {
  admin: {
    user: UserTypes
  }
}

interface FormInputs{
  name:string,
  email: string,
  password: string,
  confirmPassword: string
}


const Profile:NextPage<PropsTypes> = ({admin}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter()
  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    setValue('name', admin.user.name);
    setValue('email', admin.user.email);
  }, [admin.user, setValue]);

  const submitHandler:SubmitHandler<FormInputs> = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      toast.success('Profile updated successfully');
      if (result?.error) {
        toast.error(result.error);
      }
      router.reload()
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <section className='py-12'>
        <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-3xl">Update Profile</h1>

        <div className="mb-4">
          <label htmlFor="name" className='mb-2'>Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="name"
            placeholder="mohammed ben aoumeur"
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
            placeholder="example@domain.com"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            id="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className='mb-2'>Password</label>
          <input
            placeholder="*************"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password', {
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1 ">{errors.password.message}</div>
          )}
          <PasswordEye show={showPassword} onClick={handlePasswordToggle} />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className='mb-2'>Confirm Password</label>
          <input
            placeholder="************"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-slate-100 focus:bg-white"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            {...register('confirmPassword', {
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'confirm password is more than 5 chars',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 text-sm mt-1 ">Password do not match</div>
            )}
          <PasswordEye show={showConfirmPassword} onClick={handleConfirmPasswordToggle} />
        </div>
        
        <div className="mb-4">
          <button className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-4 rounded-md">Update Profile</button>
        </div>
      </form>
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (context:any) => {
  const admin = await getSession(context);
  return {
    props: {
      admin
    },
  };
}

export default Profile