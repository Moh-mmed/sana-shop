import { NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import { ProductTypes } from '../types/DataTypes'
import { HomeTypes } from '../types/HomeTypes'
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { StoreTypes } from '../types/StoreTypes'
import { CartItemTypes } from '../types/CartItemTypes'

const Home: NextPage<HomeTypes> = ({ products, featuredProducts }) => {
  const cart = useSelector((state:StoreTypes) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = async (product:ProductTypes) => {
    const existItem = cart.cartItems.find((x: CartItemTypes) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // const { data } = await axios.get(`/api/products/${product._id}`);

    // if (data.countInStock < quantity) {
    if (product.countInStock < quantity) {
      // return toast.error('Sorry. Product is out of stock');
    }
    dispatch(addProduct({ ...product, quantity }))

    // toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home" description='Home page for sana shop'>
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

export default Home



export const getServerSideProps = async() =>{
  // await db.connect();
  // const products = await Product.find().lean();
  // const featuredProducts = await Product.find({ isFeatured: true }).lean();

  const products: ProductTypes[] = [{
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner1.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    }]
  const featuredProducts: ProductTypes[] = [{
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner1.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    }]
  return {
    props: {
      featuredProducts,
      products,
      // featuredProducts: featuredProducts.map(db.convertDocToObj),
      // products: products.map(db.convertDocToObj),
    },
  };
}
