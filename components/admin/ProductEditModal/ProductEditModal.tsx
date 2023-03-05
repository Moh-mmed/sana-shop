import s from './ProductEditModal.module.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { ProductTypes } from '../../../types/ProductTypes'
import { SubmitHandler,useForm } from 'react-hook-form'
import axios from 'axios';
import React, { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../../../utils/error';
import LoadingButton from '../../../utils/components/LoadingButton';

type PropsTypes = {
    data: ProductTypes | null,
    closeModalHandler: (modal: string, reload?: boolean)=>void,
}

interface FormInputs{
  name: string,
  price: number,
  category: string,
  gender: string,
  brand: string,
  countInStock: number,
  isFeatured: boolean|undefined,
  description: string,
  image: string,
    // banner: string,
}


function reducer(state:any, action:any) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}


const ProductEditModal: React.FC<PropsTypes> = ({ data, closeModalHandler}) => {
    
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: false,
      error: '',
    });
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>();
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'auto';
        };
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
        if(data){
            setValue('name', data?.name);
            setValue('category', data?.category);
            setValue('brand', data?.brand);
            setValue('gender', data?.gender);
            setValue('price', data?.price);
            setValue('countInStock', data?.countInStock);
            setValue('description', data?.description);
            setValue('isFeatured', data?.isFeatured);
            setValue('image', data?.image);
        }
    //   try {
    //     dispatch({ type: 'FETCH_REQUEST' });
    //     dispatch({ type: 'FETCH_SUCCESS' });
        
    //   } catch (err) {
    //     dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    //   }
    };

    fetchData();
    }, [setValue]);

    const uploadHandler = async (file:File): Promise<any> => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

        try {
            dispatch({ type: 'UPLOAD_REQUEST' });
            // const {
            //     data: { data: { signature, timestamp } },
            // } = await axios('/api/admin/cloudinary-sign');
            const formData = new FormData();
            formData.append('file', file);
            formData.append("upload_preset", "sanashop");
            // formData.append('signature', signature);
            // formData.append('timestamp', timestamp);
            // formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
            const { data } = await axios.post(url, formData);
            dispatch({ type: 'UPLOAD_SUCCESS' });
            setValue('image', data.secure_url);
            toast.success('File uploaded successfully');
        } catch (err) {
            dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
            toast.error(getError(err));
        }
    };
    
    const submitHandler:SubmitHandler<FormInputs>  = async (formBody) => {
        if (!data?._id) {
            return addNewProduct(formBody)
        }
        updateProduct(formBody)
    };

    const addNewProduct = async (formBody:any) => {
        try {
            console.log(formBody)
            // dispatch({ type: 'CREATE_REQUEST' });
            const res = await axios.post(`/api/admin/products`, formBody);
            // dispatch({ type: 'CREATE_SUCCESS' });
            toast.success(res.data.message);
            closeModalHandler('edit', true)
        } catch (err) {
            // dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err));
        }
    };

    const updateProduct = async (formBody:any) => {
        try {
            dispatch({ type: 'UPDATE_REQUEST' });
            const res = await axios.put(`/api/admin/products/${data?._id}`, formBody);
            dispatch({ type: 'UPDATE_SUCCESS' });
            toast.success(res.data.message);
            closeModalHandler('edit', true)
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
            toast.error(getError(err));
        }
    };

    return (<div className={s.editModal_container}>
        <div className={s.editModal}>
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center" onClick={()=>closeModalHandler('edit')}>
                <IoIosCloseCircleOutline/>
                <span className="sr-only">Close modal</span>
            </button>
                
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 capitalize">{data?"update product":"add new product"}</h3>
                <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
                    {/* Name */}
                    <div className='mt-5'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="text"
                        /*name="name" value={data?.name}*/ 
                        id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="pants"
                        autoFocus
                        {...register('name', {
                            required: 'Please enter name',
                            minLength: { value: 2, message: 'name cannot be less than 2 chars' },
                        })}/>
                        {errors.name && (
                        <div className="text-red-500">{errors.name.message}</div>
                        )}
                    </div>
                                
                    {/* Category */}
                    <div className='mt-5'>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <input type="text"
                        /*name="category" value={data?.category}*/ 
                        id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: Shoes"
                        autoFocus
                        {...register('category', {
                            required: 'Please enter category',
                        })}/>
                        {errors.category && (
                        <div className="text-red-500">{errors.category.message}</div>
                        )}
                    </div>

                    {/* Brand */}
                    <div className='mt-5'>
                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                        <input type="text"
                        /*name="brand" value={data?.brand}*/ 
                        id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: Nike"
                        autoFocus
                        {...register('brand', {
                            required: 'Please enter brand',
                        })}/>
                        {errors.brand && (
                        <div className="text-red-500">{errors.brand.message}</div>
                        )}
                    </div>

                    {/* Gender */}
                    <div className='mt-5'>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Select a Gender</label>
                        <select id="roles" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...register('gender', {
                            required: 'Please enter gender',
                        })}>
                            <option selected value="male" >Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && (
                        <div className="text-red-500">{errors.gender.message}</div>
                        )}
                    </div>

                    {/* Is Featured */}
                    <div className="flex items-center mt-5">
                        <label htmlFor="isFeatured" className="text-sm font-medium text-gray-900 dark:text-gray-300">Is Featured</label>
                        <input id="isFeatured" type="checkbox" className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        {...register('isFeatured')}
                        />
                        {errors.isFeatured && (
                        <div className="text-red-500">{errors.isFeatured.message}</div>
                        )}
                    </div>

                    {/* Price */}
                    <div className='mt-5'>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input type="number"
                        /*name="price" value={data?.price}*/ 
                        id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: $20"
                        autoFocus
                        {...register('price', {
                            required: 'Please enter price',
                        })}
                        required />
                        {errors.price && (
                        <div className="text-red-500">{errors.price.message}</div>
                        )}
                    </div>
                                
                    {/* Count In Stock */}
                    <div className='mt-5'>
                        <label htmlFor="countInStock" className="block mb-2 text-sm font-medium text-gray-900">Count In Stock</label>
                        <input type="number"
                        /*name="countInStock" value={data?.countInStock}*/ 
                        id="countInStock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: 50"
                        autoFocus
                        {...register('countInStock', {
                            required: 'Please enter countInStock',
                        })}/>
                        {errors.countInStock && (
                        <div className="text-red-500">{errors.countInStock.message}</div>
                        )}
                    </div>
                        
                    {/* Description */}
                    <div className='mt-5'>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea rows={5}
                        id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: describe your product"
                        autoFocus
                        {...register('description', {
                            required: 'Please enter description',
                        })}/>
                        {errors.description && (
                        <div className="text-red-500">{errors.description.message}</div>
                        )}
                    </div>
                            
                    {/* Image */}
                    <div className='mt-5'>
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                        <input
                            type="file"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full"
                            id="image"
                            onChange={(e: any) => uploadHandler(e.target?.files[0])}
                            required={!data&&true}
                        />
                        {errors.image && (
                        <div className="text-red-500">{errors.image.message}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        {!loadingUpdate ?
                            <button 
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="submit">
                                {data?"Update":"Add"}
                            </button> :
                            <LoadingButton />
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProductEditModal