import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout/Layout'
import ProductItem from '../components/ProductItem'
import { ProductTypes } from '../types/DataTypes'
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { StoreTypes } from '../types/StoreTypes'
import axios from 'axios'
import { toast } from 'react-toastify'
import Banner from '../components/Banner/Banner'

type PropsTypes = {
    products: ProductTypes[],
    featuredProducts: ProductTypes[]
}

const Homepage: NextPage<PropsTypes> = ({ products, featuredProducts }) => {
  const {cart} = useSelector((state:StoreTypes) => state);
  const dispatch = useDispatch();

  const addToCartHandler = async (product:ProductTypes) => {
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
    <Layout title="Home" description='Home page for sana shop'>
      <Banner/>
      {/* <CategoryPicker />
      <FeaturedProducts data={storeOverview} />
      <FeaturedBlogs data={blogOverview} /> */}


      <h2 className="h2 my-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  )
}

export default Homepage



export const getServerSideProps:GetServerSideProps = async() =>{
  const products = await axios.get(`${process.env.ROOT_URL}/api/products`);
  const featuredProducts = await axios.get(`${process.env.ROOT_URL}/api/products?featured=true`);

  return {
    props: {
      featuredProducts: featuredProducts.data.data,
      products: products.data.data,
    },
  };
}
