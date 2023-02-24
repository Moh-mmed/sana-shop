/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductTypes } from '../../types/DataTypes';
import s from './ProductItem.module.css'

type ProductItemTypes = {
    product: ProductTypes,
}

const ProductItem: React.FC<ProductItemTypes> = ({ product}) => {

  return (
    <div className={s.root}>
      <Link href={`/shop/${product.slug}`} className={s.link}>
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
        </div>
      </Link>
    </div>
  );
}
 
export default ProductItem