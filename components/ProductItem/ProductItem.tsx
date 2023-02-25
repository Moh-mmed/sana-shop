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
    </div>
  );
}
 
export default ProductItem