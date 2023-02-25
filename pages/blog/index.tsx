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
    category?: string,
    q?: string,
}

const Blog: NextPage<PropsTypes> = ({ data, category, q }) => {

  const router = useRouter()
  const [search, setSearch] = useState('') 
  const [categoryFilter, setCategoryFilter] = useState<string | null>(category ?? null)

  const categoriesData = ['travel', 'food', 'health', 'fashion']

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filterQuery = e.currentTarget.dataset.filter || ''

    setCategoryFilter(filterQuery)
    setSearch('')
    router.push(`/blog?category=${filterQuery}`)
  }


  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search) {
      if (categoryFilter) {
        router.push(`/blog?category=${categoryFilter}&q=${search}`)
        return 
      }
      router.push(`/blog?q=${search}`)
      setSearch('')
    }
  }

  useEffect(() => {
    if (category) setCategoryFilter(category)
    if (q) setSearch(q)
  }, [])

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
                        <button className={`${s.category_btn} ${categoryFilter === name? 'text-[#717fe0] ' : 'text-[#333]'}`} data-filter={ name} onClick={(e)=>filterHandler(e)}>
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
  const { category='', q='' } = context.query;

  let url = ''
  const queryString = category ? `category=${category}` : "";

  if (category && q) url = `${process.env.ROOT_URL}/api/blogs?${queryString}&q=${q}`
  else if (category) url = `${process.env.ROOT_URL}/api/blogs?${queryString}`
  else if (q) url = `${process.env.ROOT_URL}/api/blogs?q=${q}`
  else url = `${process.env.ROOT_URL}/api/blogs`

  const response = await axios.get(url);
  const data = response.data.data;
  return {
    props: {
      data,
      category,
      q
    }
  }
} 
export default Blog