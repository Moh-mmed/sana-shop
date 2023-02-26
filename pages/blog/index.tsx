import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import BlogItem from '../../components/BlogItem/BlogItem';
import Layout from '../../components/Layout/Layout';
import { BlogTypes } from '../../types/DataTypes';
import s from '../../styles/blog/Blog.module.css'

import {CiSearch} from 'react-icons/ci'

type PropsTypes = {
    data: BlogTypes[],
    categoriesData: string[],
    category?: string,
}
const Blog: NextPage<PropsTypes> = ({ data, categoriesData, category}) => {

  const router = useRouter()
  const [search, setSearch] = useState('') 
  const [categoryFilter, setCategoryFilter] = useState<string | null>(category ?? null)

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filterQuery = e.currentTarget.dataset.filter || ''

    setCategoryFilter(filterQuery)
    setSearch('')
    router.push(`/blog?category=${filterQuery}`)
  }


  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search) {
      let url = ''
      if (categoryFilter) {
        url = `/blog?category=${categoryFilter}&q=${search}`
      } else {
        url = `/blog?q=${search}`
      }
      setSearch('')
      router.push(url)
    }
  }

  return (
    <Layout title="Blog" description='Sana shop blog page'>

      <section className={s.root}>
        <div className={s.main}>
          <div className={s.content}  >
          
              {/* blog item */}
              {data.length > 0 ? data.map((blog: BlogTypes) => {
                return (
                  <BlogItem blog={blog} key={blog.slug} />
                )
              }) :
              <div className="col-12 p-5 text-capitalize display-4 text-center">
                {/* <p>There are no results with your search.</p> */}
                  there are no results
              </div>
              }

            
          </div>

            <div className={s.sideMenu}>
                <form className={s.searchForm}
                  onSubmit={(e) => submitSearch(e)}
                >
                  <input
                    className={s.searchInput}
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button className={s.searchBtn}>
                    <CiSearch/>
                  </button>
                </form>

                <div className={s.categories_container}>
                  <h4 className={s.categories_heading}>Categories</h4>
                  <ul>
                    {categoriesData.map((name: string, index) => {
                    name = name.toLowerCase() 
                    return (
                      <li className={s.category_item} key={index}>
                        <button className={`${s.category_btn} ${category === name && s.active_category_btn}`} data-filter={ name} onClick={(e)=>filterHandler(e)}>
                          {name}
                        </button>
                      </li>)
                    })}
                  </ul> 
                </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}

export const getServerSideProps:GetServerSideProps = async (context) =>  {
  const { category = '', q = '' } = context.query;

  let url = ''
  const queryString = category ? `category=${category}` : "";

  if (category && q) url = `${process.env.ROOT_URL}/api/blogs?${queryString}&q=${q}`
  else if (category) url = `${process.env.ROOT_URL}/api/blogs?${queryString}`
  else if (q) url = `${process.env.ROOT_URL}/api/blogs?q=${q}`
  else url = `${process.env.ROOT_URL}/api/blogs`


  const [blogsResponse, categoriesResponse] = await Promise.all([
    axios.get(url),
    axios.get(`${process.env.ROOT_URL}/api/info?info=blog-categories`)
  ]);

  const data = blogsResponse.data.data;
  const categoriesData = categoriesResponse.data.data;


  return {
    props: {
      data,
      categoriesData,
      category
    }
  }
} 
export default Blog