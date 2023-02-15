import { NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import { ProductTypes } from '../types/DataTypes'
import { HomeTypes } from '../types/HomeTypes'

const Home: NextPage<HomeTypes> = ({ products, featuredProducts }) => {
  // const { state, dispatch } = useContext(Store);
  // const { cart } = state;

  const addToCartHandler = async (product:ProductTypes) => {
    // const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    // const quantity = existItem ? existItem.quantity + 1 : 1;
    // const { data } = await axios.get(`/api/products/${product._id}`);

    // if (data.countInStock < quantity) {
    //   return toast.error('Sorry. Product is out of stock');
    // }
    // dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    // toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home" description='Home page for sana shop'>
      <h2 className="h2 my-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
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

  const products: ProductTypes[] = []
  const featuredProducts: ProductTypes[] = []
  return {
    props: {
      featuredProducts,
      products,
      // featuredProducts: featuredProducts.map(db.convertDocToObj),
      // products: products.map(db.convertDocToObj),
    },
  };
}
