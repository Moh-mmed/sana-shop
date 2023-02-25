import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout/Layout';
import {  GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useDispatch, useSelector } from "react-redux";
import { addProduct} from "../../redux/cartSlice";
import {StoreTypes } from '../../types/StoreTypes';
import { ProductTypes } from '../../types/DataTypes';
import { ScriptProps } from 'next/script';
import { ParsedUrlQuery } from "querystring";
import s from '../../styles/shop/ProductDetail.module.css'
import {  GiRoundStar } from "react-icons/gi";
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';

type PropsTypes = {
  productDetail: ProductTypes,
  relatedProducts: ProductTypes[]
}

interface Params extends ParsedUrlQuery {
   slug: string,
}

const ProductDetail: NextPage<PropsTypes> = ({ productDetail, relatedProducts }) => {
  const cart = useSelector((state:StoreTypes) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!productDetail) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }


  const {name, image, slug, price, brand, rating, numReviews, countInStock, description} = productDetail

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x: ProductTypes) => x.slug === slug);
    const quantity = existItem ? (existItem.quantity?existItem.quantity:0) + 1 : 1;
    const { data } = await axios.get(`/api/products/${slug}`);

    if (data.data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch(addProduct({ ...productDetail, quantity }))
    router.push('/cart');
  };

  return (
      <Layout title={name} description={description}>
        <section className={s.root}>
          <div className={s.goBack}>
            <Link href="/shop" className={s.goBack_link}>
                &lt; Back to Shop
            </Link>
          </div>

          <div className={s.main}>
            <div className={s.imgContainer}>
              <Image
              src={image}
              alt={name}
              width={800}
              height={100}
              />
            </div>
            <div className={s.content}>
                <div className="text-sm">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {name}
                    <span className='text-gray-700 mb-4 text-base font-normal'> | {brand}</span>
                  </h1>

                  <h3 className="text-2xl font-medium text-gray-800 mb-2">${price}</h3>
                  
                  <p className="text-gray-500 mb-4">
                    {description}
                  </p>
                  <p className="text-gray-700 mb-2 h-6 flex items-center">
                    <GiRoundStar className='h-6 mr-1 -mt-1'/><span>{rating}/{numReviews}</span>
                  </p>
                  <div className={`inline-block text-xs px-2 py-1 rounded-xl text-white font-light ${countInStock > 0 ? 'bg-green-600' : 'bg-[#ff3131]'}`}>{countInStock > 0 ? 'Available' : 'Out of Stock'}</div>

                </div>
                <button
                    className={`${s.productAvailability} ${countInStock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} disabled:bg-blue-300`}
                    onClick={addToCartHandler}
                    // disabled={countInStock === 0 || countInStock < 21}
                    disabled={countInStock === 0 }
                    >
                    {countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
          </div>

          <div className={s.description_container}>
            <p className={s.description}>{description}</p>
          </div>

        </section>

        <section className={s.specialOffer_container}>
            <div className={s.specialOffer}>
              <span className={s.specialOffer_content}>Free shipping - only today</span>
            </div>
        </section>

        {relatedProducts.length>0 && <RelatedProducts data={relatedProducts}/>}
      </Layout>
  );
}

// export const getStaticProps: GetStaticProps<any, Params> = async (context) => {
//   const { slug } = context.params  as Params
//   const product = await axios.get(`{process.env.ROOT_URL}/api/products/${slug}`);

//   const {brand} = product.data.data
//   let relatedProducts = await axios.get(`${process.env.ROOT_URL}/api/products?brand=${brand}&_limit=4`);

//   relatedProducts = relatedProducts.data.data.filter((item:ProductTypes)=>item.slug!==slug)

//    return {
//     props: {
//       productDetail: product.data.data,
//       relatedProducts
//     },
//     revalidate: 10
//   };
// }

// export const getStaticPaths: GetStaticPaths = async () => {

//   const {data} = await axios.get(`{process.env.ROOT_URL}/api/products`);
//   const paths = data.data.map((product: ProductTypes) => ({ params: { slug: `${product.slug}` } }));
//   return {
//     paths,
//     fallback: false
//   };
// }

export const getServerSideProps: GetServerSideProps = async(context:any) =>{
  const { slug } = context.params;
  
  const product = await axios.get(`${process.env.ROOT_URL}/api/products/${slug}`);
  const {brand} = product.data.data
  let relatedProducts = await axios.get(`${process.env.ROOT_URL}/api/products?brand=${brand}&_limit=4`);

  relatedProducts = relatedProducts.data.data.filter((item:ProductTypes)=>item.slug!==slug)

  return {
    props: {
      productDetail: product.data.data,
      relatedProducts
    },
  };
}


export default ProductDetail