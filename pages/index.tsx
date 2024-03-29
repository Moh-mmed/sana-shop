import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import axios from 'axios'
import Layout from '../components/Layout/Layout'
import Banner from '../components/Banner/Banner'
import CategoryPicker from '../components/CategoryPicker/CategoryPicker'
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts'
import FeaturedBlogs from '../components/FeaturedBlogs/FeaturedBlogs'
import { ProductTypes } from '../types/ProductTypes'
import { BlogTypes } from '../types/BlogTypes'

type PropsTypes = {
    storeOverview: ProductTypes[],
    blogOverview: BlogTypes[]
}

const Homepage: NextPage<PropsTypes> = ({ storeOverview, blogOverview }) => {
  return (
    <Layout title="Home" description='Home page for sana shop'>
      <Banner />
      
      <CategoryPicker />

      {storeOverview.length && <FeaturedProducts data={storeOverview} />}

      {blogOverview.length && <FeaturedBlogs data={blogOverview} />}

    </Layout>
  )
}

export default Homepage



export const getServerSideProps:GetServerSideProps = async() =>{

   // Store Overview Data
  const storeOverview = await axios.get(`${process.env.ROOT_URL}/api/products?isFeatured=true&limit=4`);

  // Blog Overview Data
  const blogOverview = await axios.get(`${process.env.ROOT_URL}/api/blogs?isFeatured=true&limit=4`);

  return {
    props: {
      storeOverview: storeOverview.data.data,
      blogOverview: blogOverview.data.data
    },
  };
}
