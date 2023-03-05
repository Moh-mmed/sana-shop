import s from './ProductViewModal.module.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { ProductTypes } from '../../../types/ProductTypes'
import Image from 'next/image'
import { useEffect } from 'react'

type PropsTypes = {
    data: ProductTypes|null,
    closeModalHandler: ()=>void
}

const ProductViewModal: React.FC<PropsTypes> = ({ data, closeModalHandler }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'auto';
        };
    }, []);
    return (
    <div className={s.viewModal_container}>
        <div className={s.viewModal}>
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center" onClick={closeModalHandler}>
                <IoIosCloseCircleOutline/>
                <span className="sr-only">Close modal</span>
            </button>
                    
            <div className="px-6 py-6 lg:px-8 flex flex-wrap max-sm:flex-col">
                <div className='sm:w-[50%] sm:pr-10 max-sm:mb-5 sm:border-r border-r-slate-200'>
                <Image
                    src={data?.image??''}
                    alt="IMG-PRODUCT"
                    width={500}
                    height={100}
                    style={{ objectFit: "cover" }}/>
                </div>
                <div className='sm:w-[50%] sm:pl-10'>
                    <h3 className="mb-4 text-xl font-medium text-gray-900 capitalize">Product detail</h3>
                    
                    {/* Name */}
                    <div className='mt-5'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input disabled type="text"
                        name="name" value={data?.name}
                        id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="John"/>
                    </div>
                                
                    {/* Category */}
                    {/* //! Select later  */}
                    <div className='mt-5'>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <input disabled type="text"
                        name="category" value={data?.category}
                        id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full"/>
                    </div>
                    {/* Brand */}
                    <div className='mt-5'>
                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                        <input disabled type="text"
                        name="brand" value={data?.brand}
                        id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full"/>
                    </div>
                    {/* Price */}
                    <div className='mt-5'>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input disabled type="number"
                        name="price" value={data?.price}
                        id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full"/>
                    </div>
                                
                    {/* Count In Stock */}
                    <div className='mt-5'>
                        <label htmlFor="countInStock" className="block mb-2 text-sm font-medium text-gray-900">Count In Stock</label>
                        <input disabled type="number"
                        name="countInStock" value={data?.countInStock}
                        id="countInStock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full"/>
                    </div>
                        
                    {/* Description */}
                    <div className='mt-5'>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea disabled rows={5}
                        name="description" value={data?.description}
                        id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductViewModal