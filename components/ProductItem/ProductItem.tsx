/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { StoreTypes } from '../../types/StoreTypes'
import { ProductTypes } from '../../types/DataTypes';
import { MdAddShoppingCart } from 'react-icons/md'
import s from './ProductItem.module.css'

type ProductItemTypes = {
    product: ProductTypes,
}

const ProductItem: React.FC<ProductItemTypes> = ({ product}) => {
  const {cart} = useSelector((state:StoreTypes) => state);
  const dispatch = useDispatch();

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x: ProductTypes) => x.slug === product.slug);
    const quantity = existItem ? (existItem.quantity?existItem.quantity:0)+1:1;
    const { data } = await axios.get(`/api/products/${product.slug}`);
    if (data.data.countInStock <= quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch(addProduct({ ...product, quantity }))
    toast.success('Product added to the cart');
  };


  return (
    <div className={s.root} key={product.slug}>
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
      </Link>
        
      <div className={s.descriptionContainer}>
        <div className={s.description}>
          <div className={s.name}>{product.name}</div>

          <span className={s.price}>${product.price}</span>
        </div>
        <button  onClick={addToCartHandler}>
          <MdAddShoppingCart className={s.addToCartBtn} />
        </button>
      </div>
    </div>
  );
}
 
export default ProductItem