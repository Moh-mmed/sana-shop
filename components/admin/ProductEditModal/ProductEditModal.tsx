import s from './ProductEditModal.module.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { ProductTypes } from '../../../types/ProductTypes'
import { SubmitHandler,useForm } from 'react-hook-form'
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../../components/admin/Layout/Layout';
import LoadingSpinner from '../../../utils/components/LoadingSpinner';
import { getError } from '../../../utils/error';
import LoadingButton from '../../../utils/components/LoadingButton';

type PropsTypes = {
    data: ProductTypes | null,
    closeModalHandler: ()=>void,
    // updateProductHandler: (productId: any,product:ProductTypes)=>void,
    // addNewProductHandler: (product:ProductTypes)=>void,
}

interface FormInputs{
  name: string,
  price: number,
//   image: string,
  category: string,
  brand: string,
  countInStock: number,
    description: string,
    gender: string,
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
            // setValue('image', data?.image);
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

    const uploadHandler = async (e:any, imageField:any) => {
    // const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    // try {
    //   dispatch({ type: 'UPLOAD_REQUEST' });
    //   const {
    //     data: { signature, timestamp },
    //   } = await axios('/api/admin/cloudinary-sign');

    //   const file = e.target.files[0];
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   formData.append('signature', signature);
    //   formData.append('timestamp', timestamp);
    //   // formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    //   const { data } = await axios.post(url, formData);
    //   dispatch({ type: 'UPLOAD_SUCCESS' });
    //   setValue(imageField, data.secure_url);
    //   toast.success('File uploaded successfully');
    // } catch (err) {
    //   dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    //   toast.error(getError(err));
    // }
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
            const { data } = await axios.post(`/api/admin/products`, formBody);
            // dispatch({ type: 'CREATE_SUCCESS' });
            toast.success(data.message);
            closeModalHandler()
        } catch (err) {
            // dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err));
        }
    };

    const updateProduct = async (formBody:any) => {
        try {
            dispatch({ type: 'UPDATE_REQUEST' });
            const prod = await axios.put(`/api/admin/products/${data?._id}`, formBody);
            dispatch({ type: 'UPDATE_SUCCESS' });
            toast.success(prod.data.message);
            closeModalHandler()
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
            toast.error(getError(err));
        }
    };



    // const [product, setProduct] = useState({name:'',email:'', password:'', isAdmin:false})

    // useEffect(() => {
    //     if (data) {
    //       setProduct(prevState=>({...prevState, name:data.name}))
    //   }
    
    // }, [data])
    
    // const submitHandler = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     if (product.name.length, product.email.length) {
    //         if (data) {
    //             updateProductHandler(data._id, product)
    //         } else {
    //             product.password.length && addNewProductHandler(product)
    //         }
    //     }
    // }

    // const fieldChangeHandler = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    //     let value = e.target.value
    //     let name = e.target.name
    //     if (name === 'isAdmin') {
    //         setProduct((prevState)=>({...prevState, isAdmin: value ==='admin' ? true:false}))
    //         return 
    //     }
    //     setProduct((prevState)=>({...prevState, [name]: value}))
    // }

    return (<div className={s.editModal_container}>
        <div className={s.editModal}>
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center" onClick={closeModalHandler}>
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
                        id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="John"
                        autoFocus
                        {...register('name', {
                            required: 'Please enter name',
                            minLength: { value: 2, message: 'name cannot be less than 2 chars' },
                        })}
                        required />
                        {errors.name && (
                        <div className="text-red-500">{errors.name.message}</div>
                        )}
                    </div>
                                
                    {/* Category */}
                    {/* //! Select later  */}
                    <div className='mt-5'>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <input type="text"
                        /*name="category" value={data?.category}*/ 
                        id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: Shoes"
                        autoFocus
                        {...register('category', {
                            required: 'Please enter category',
                        })}
                        required />
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
                        })}
                        required />
                        {errors.brand && (
                        <div className="text-red-500">{errors.brand.message}</div>
                        )}
                    </div>

                    {/* Gender */}
                    <div className='mt-5'>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                        <input type="text"
                        /*name="gender" value={data?.gender}*/ 
                        id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: Nike"
                        autoFocus
                        {...register('gender', {
                            required: 'Please enter gender',
                        })}
                        required />
                        {errors.gender && (
                        <div className="text-red-500">{errors.gender.message}</div>
                        )}
                    </div>

                    {/* Price */}
                    <div className='mt-5'>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input type="number"
                        /*name="price" value={data?.price}*/ 
                        id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: Nike"
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
                        id="countInStock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: Nike"
                        autoFocus
                        {...register('countInStock', {
                            required: 'Please enter countInStock',
                        })}
                        required />
                        {errors.countInStock && (
                        <div className="text-red-500">{errors.countInStock.message}</div>
                        )}
                    </div>
                        
                    {/* Description */}
                    <div className='mt-5'>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea rows={5}
                        /*name="description" value={data?.description}*/ 
                        id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: Nike"
                        autoFocus
                        {...register('description', {
                            required: 'Please enter description',
                        })}
                        required />
                        {errors.description && (
                        <div className="text-red-500">{errors.description.message}</div>
                        )}
                    </div>
                            
                    {/* Image */}
                    {/* <div className='mt-5'>
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                        <input type="text"
                        /*name="image" value={data?.image} 
                        id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="ex: Nike"
                        autoFocus
                        {...register('image', {
                            required: 'Please enter image',
                        })}
                        required />
                        {errors.image && (
                        <div className="text-red-500">{errors.image.message}</div>
                        )}
                    </div> */}
                    <div className="mb-4">
                        {!loadingUpdate ?
                            <button 
                            /*disabled={loadingUpdate}*/ 
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