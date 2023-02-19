import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from "react-redux";
import { addProduct, reset} from "../../redux/cartSlice";
import {StoreTypes } from '../../types/StoreTypes';
import { ProductTypes } from '../../types/DataTypes';

type PropsTypes = {
  product: ProductTypes
}

const ProductDetail: NextPage<PropsTypes> = ({ product }) => {
  const cart = useSelector((state:StoreTypes) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
    
  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x: ProductTypes) => x.slug === product.slug);
    const quantity = existItem ? (existItem.quantity?existItem.quantity:0) + 1 : 1;
    const { data } = await axios.get(`/api/products/${product.slug}`);

    if (data.data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch(addProduct({ ...product, quantity }))
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className="py-4 flex justify-between items-center">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
            &lt; Back to Products
        </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 mb-5">
        <div className="md:col-span-2">
            <Image
            src={product.image}
            alt={product.name}
            width={340}
            height={540}
            className="object-cover rounded-lg shadow-md mb-6"
            />
        </div>
        <div className="col-span-3 md:col-span-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <div className="p-2 text-sm">
            <p className="text-gray-700 mb-2">
            Category: <span className='ml-3 text-lg'>{product.category}</span>
            </p>
            <p className="text-gray-700 mb-2">
            Brand: <span className='ml-3 text-lg'>{product.brand}</span>
            </p>
            <p className="text-gray-700 mb-2">
            {product.rating} out of {product.numReviews} reviews
            </p>
            <p className="text-gray-700 mb-2">
            Description: <span className='ml-3 text-lg'>{product.description}</span>
            </p>
            </div>
            <div className="p-2">
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Price:</span>
                <span className="text-xl font-medium text-gray-800">
                ${product.price}
                </span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Status:</span>
                <span className={`text-lg font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
            <button
                className={`w-full py-3 rounded-lg text-white font-semibold ${product.countInStock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} disabled:bg-blue-300`}
                onClick={addToCartHandler}
                // disabled={product.countInStock === 0 || product.countInStock < 21}
                disabled={product.countInStock === 0 }
            >
                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            </div>
        </div>
        </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async(context:any) =>{
  const { params } = context;
  const { slug } = params;
  const {data} = await axios.get(`${process.env.ROOT_URL}/api/products/${slug}`);
    
  return {
    props: {
      product: data.data
    },
  };
}

export default ProductDetail