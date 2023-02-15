import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
// import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import ProductDetailTypes from '../../types/ProductDetailTypes';
// import Product from '../../models/Product';
// import db from '../../utils/db';
// import { Store } from '../../utils/Store';

const ProductDetail: NextPage<ProductDetailTypes> = ({product}) => {
//   const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    // const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    // const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    // if (data.countInStock < quantity) {
    //   return toast.error('Sorry. Product is out of stock');
    // }

    // dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
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
        className={`w-full py-3 rounded-lg text-white font-semibold ${product.countInStock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={addToCartHandler}
        disabled={product.countInStock === 0}
      >
        {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  </div>
</div>

    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async(context) =>{
  const { params } = context;
//   const { slug } = params;

//   await db.connect();
//   const product = await Product.findOne({ slug }).lean();
//   await db.disconnect();
    
  const product = {
      name: 'Slim Shirt',
      slug: 'slim-shirt',
      category: 'Shirts',
      image: '/images/shirt3.jpg',
      price: 90,
      brand: 'Raymond',
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: 'A popular shirt',
    }
  return {
    props: {
    //   product: product ? db.convertDocToObj(product) : null,
      product
    },
  };
}

export default ProductDetail