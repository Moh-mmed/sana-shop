/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {  MdOutlineAddShoppingCart } from "react-icons/md";
import { ProductTypes } from '../../types/DataTypes';
import s from './ProductItem.module.css'

type ProductItemTypes = {
    product: ProductTypes,
    addToCartHandler: (product:ProductTypes)=>void
}

const ProductItem: React.FC<ProductItemTypes> = ({ product, addToCartHandler }) => {

  return (
    <div className={s.root}>
      <Link href={`/product/${product.slug}`} className={s.link}>
        <div className={s.imgContainer}>
            <Image
            src={product.image}
            alt="IMG-PRODUCT"
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            style={{ objectFit: "cover" }}
            loading="lazy"
            className={s.img} />

          <div className={s.viewProductBtn}>
            View Details
          </div>
        </div>
        
        <div className={s.descriptionContainer}>
          <div className={s.description}>
            <div className={s.name}>{product.name}</div>

            <span className={s.price}>${product.price}</span>
          </div>
         
          <MdOutlineAddShoppingCart className={s.addToCartBtn} onClick={() => addToCartHandler(product)}/>
        </div>
      </Link>
    </div>
  );
}
 
export default ProductItem