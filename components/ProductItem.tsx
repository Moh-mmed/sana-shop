/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { ProductItemTypes } from '../types/ProductItemTypes';

const ProductItem: React.FC<ProductItemTypes> = ({ product, addToCartHandler }) => {

  return (
    
    // <div className="card">
    //   <Link href={`/product/${product.slug}`}>
    //       <img
    //         src={product.image}
    //         alt={product.name}
    //         className="rounded shadow object-cover h-64 w-full"
    //       />
    //   </Link>
    //   <div className="flex flex-col items-center justify-center p-5">
    //     <Link href={`/product/${product.slug}`}>
    //         <h2 className="text-lg">{product.name}</h2>
    //     </Link>
    //     <p className="mb-2">{product.brand}</p>
    //     <p>${product.price}</p>
        // <button
        //   className="primary-button"
        //   type="button"
        //   onClick={() => addToCartHandler(product)}
        // >
        //   Add to cart
        // </button>
    //   </div>
    // </div>
    <>
    <Link href={`/shop/${product.slug}`}>
      <div className="productCard">
        <div className="productCard-pic block overflow-hidden">
          <img src={product.image} alt="IMG-PRODUCT" />

          <div className="productCard-btn flex justify-center items-center leading-5 text-gray-800 h-10 min-w-[139px] bg-white rounded-3xl hov-btn1 px-4 trans-04">
            View Details
          </div>
        </div>

        <div className="productCard-txt flex flex-wrap items-start pt-4">
          <div className="productCard-txt-child1 flex-col flex">
            <div className="text-sm text-slate-500 hover:text-blue-900 trans-04 pb-1">{product.name}</div>

            <span className="leading-6 text-sm text-gray-700">${product.price}</span>
          </div>
        </div>
        <button className="bg-gray-400 text-white text-sm py-2 px-4 rounded-full mt-2 transition duration-300 hover:bg-gray-900 border-2 border-gray-400" type="button" onClick={() => addToCartHandler(product)}>
          Add to cart
        </button>
    </div>
    </Link>
    </>
  );
}
 
export default ProductItem

    