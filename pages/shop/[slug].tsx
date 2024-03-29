import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout/Layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useDispatch, useSelector } from "react-redux";
import { addProduct} from "../../redux/cartSlice";
import {StoreTypes } from '../../types/StoreTypes';
import { ProductTypes } from '../../types/ProductTypes';
import s from '../../styles/shop/ProductDetail.module.css'
import {  GiRoundStar } from "react-icons/gi";
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import {MdError} from 'react-icons/md'

type PropsTypes = {
  productDetail: ProductTypes,
  relatedProducts: ProductTypes[]
}

const ProductDetail: NextPage<PropsTypes> = ({ productDetail, relatedProducts }) => {
  const cart = useSelector((state:StoreTypes) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!productDetail) {
    return (<Layout title="Product Not Found">
      <div className={s.error_container} role="alert">
        <MdError className={s.error_icon} />
        <div className={s.error}>
          <p>Error:</p>
          <p>There is no product with this ID</p>
        </div>
      </div>
    </Layout>);
  }
  const {name, image, slug, price, discount, brand, rating, numReviews, countInStock, description} = productDetail

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
            <Link href="/shop" className={s.goBack_link}>&lt; Back to Shop</Link>
          </div>
          <div className={s.main}>
            <div className={s.imgContainer}><Image src={image} alt={name} width={800} height={100}/></div>
            <div className={s.content}>
              <div className={s.heading}>
                <h1 className={s.heading_name}>{name}<span className={s.heading_brand}> | {brand}</span></h1>
                <h3 className={s.pricing}>
                  <span>${`${(price * (1 - discount / 100)).toFixed(2)}`}</span>
                  {discount > 0 && (
                    <>
                    <span className={s.pricingBar}>|</span>
                    <span className={s.price}>${price}</span>
                    <span className={s.discount}>discount {discount}%</span>
                    </>
                    )}
                </h3>
                <p className={s.description}>{description}</p>
                <p className={s.reviews}><GiRoundStar className={s.starIcon}/><span>{rating}/{numReviews}</span></p>
                <div className={`${s.productAvailability} ${countInStock > 0 ? 'bg-green-600' : 'bg-[#ff3131]'}`}>{countInStock > 0 ? 'Available' : 'Out of Stock'}</div>
              </div>
              <button
                  className={`${s.addButton} ${countInStock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} disabled:bg-blue-300`}
                  onClick={addToCartHandler}
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

// Using getServerSideProps approach

// export const getServerSideProps: GetServerSideProps = async(context:any) =>{
//   const { slug } = context.params;
//   const productUrl: any = new URL(`${process.env.ROOT_URL}/api/products/${slug}`)
//   const product = await axios.get(productUrl);
//   const productDetail = product.data.data
  
//   if (!productDetail) {
//     return {
//       props: {
//         productDetail:null
//       },
//     };
//   }
  
//   const productsUrl: any = new URL(`${process.env.ROOT_URL}/api/products`)
//   productsUrl.searchParams.set('brand', productDetail.brand)
//   productsUrl.searchParams.set('_limit', 4)

//   const {data} = await axios.get(productsUrl);
//   const relatedProducts = data.data.filter((item:ProductTypes)=>item.slug!==slug)

//   return {
//     props: {
//       productDetail,
//       relatedProducts
//     },
//   };
// }
export default ProductDetail

export const getStaticProps: GetStaticProps = async(context:any) =>{
  const { slug } = context.params;
  const productUrl: any = new URL(`${process.env.ROOT_URL}/api/products/${slug}`)
  const product = await axios.get(productUrl);
  const productDetail = product.data.data
  
  if (!productDetail) {
    return {
      props: {
        productDetail:null
      },
    };
  }
  
  const productsUrl: any = new URL(`${process.env.ROOT_URL}/api/products`)
  productsUrl.searchParams.set('brand', productDetail.brand)
  productsUrl.searchParams.set('limit', 4)

  const {data} = await axios.get(productsUrl);
  const relatedProducts = data.data.filter((item:ProductTypes)=>item.slug!==slug)
  return {
    props: {
      productDetail,
      relatedProducts
    },
    revalidate: 10
  };
}


export const getStaticPaths: GetStaticPaths = async() => {
  const productsUrl: any = new URL(`${process.env.ROOT_URL}/api/products`)
  productsUrl.searchParams.set('limit', 100000)
  const products = await axios.get(productsUrl);
  const paths = products.data.data.map((p: ProductTypes) => ({ params: { slug: `${p.slug}` } }))
  return {
    paths,
    fallback: 'blocking'
  };   
}