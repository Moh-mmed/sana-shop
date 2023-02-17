/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductItemTypes } from '../types/ProductItemTypes';

const ProductItem: React.FC<ProductItemTypes> = ({ product, addToCartHandler }) => {

  return (
    <div className='flex flex-col items-start'>
    <Link href={`/product/${product.slug}`}>
      <div className="">
        <div className="group block overflow-hidden relative w-64 h-80">
          <Image src={product.image} alt="IMG-PRODUCT" fill style={{ objectFit: "cover" }}
          className="group-hover:scale-110 transition-all duration-500 w-full h-full"/>

          <div className="group-hover:bottom-5 flex justify-center items-center leading-5 text-gray-800 h-10 min-w-[139px] bg-white rounded-3xl hover:border-gray-800 hover:bg-gray-800 hover:text-white px-4 absolute bottom-[-50px] left-[50%] translate-x-[-50%] transition-all duration-500">
            View Details
          </div>
        </div>

        <div className="flex flex-wrap items-start pt-4">
          <div className="w-[calc(100%_-_30px)] flex-col flex">
            <div className="text-sm text-slate-500 hover:text-blue-900 pb-1 transition-all duration-500">{product.name}</div>

            <span className="leading-6 text-sm text-gray-700">${product.price}</span>
          </div>
        </div>
      </div>
    </Link>
    <button className="bg-gray-400 text-white text-sm py-2 px-4 rounded-full mt-2 transition duration-300 hover:bg-gray-900 border-2 border-gray-400" type="button" onClick={() => addToCartHandler(product)}>
      Add to cart
    </button>
    </div>
  );
}
 
export default ProductItem

    