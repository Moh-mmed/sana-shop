import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ProductItem from '../../components/ProductItem/ProductItem';
import { ProductTypes } from '../../types/DataTypes';
import s from '../../styles/shop/Shop.module.css'
import {CiSearch} from 'react-icons/ci'
import { generatePagination, paginationHandler } from '../../utils/helpers';

type ShopPageTypes = {
  data: ProductTypes[],
  gender: string,
  q: string,
  page: string,
  productsNumber: number
}



const Shop: NextPage<ShopPageTypes> = ({ data, gender, q, page, productsNumber}) => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('') 
  const [filter, setFilter] = useState('') 
  const [genderFilter, setGenderFilter] = useState(gender) 
  const [currentPage, setCurrentPage] = useState(Number(page)) 
  const filterTabs = ['man', 'woman', 'shoes', 'glasses', 'jackets']

  const checkValidFilter = (tab: string) => {
    if ((tab === 'man' || tab === 'woman') && genderFilter === tab) {
      return  s.active_filter_tab
    }
    if (filter === tab) {
      return  s.active_filter_tab
    }
  }

  const filterHandler = (query: string='') => {
    if (query === 'reset') {
      setGenderFilter('')
      setFilter('')
      router.push(`/shop`)
      return 
    } 

    if (query === 'woman' || query === 'man') {
      setGenderFilter(query)
      setFilter('')
      router.push(`/shop?gender=${query}`)
      return 
    }
    setFilter(query)
    
    if (genderFilter === '') {
      router.push(`/shop?q=${query}`)
      return 
    }

    router.push(`/shop?gender=${genderFilter}&q=${query}`)
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchInput !== '') {
      setFilter('')
      setGenderFilter('')
      router.push(`/shop?q=${searchInput.toLowerCase()}`)
      setSearchInput('')
    }
  }


  return (
    <Layout title='Shop'>
      <div className={s.root}>
        <div className={s.filter_container}>
          {/* Tabs */}
          <div className={s.filter_tabs}>
            <ul className={s.filters_list}>
              <li
                className={`${s.filter_tab} ${(q === '' && gender === '') && s.active_filter_tab}`} 
                onClick={() => filterHandler('reset')}
              >
                all products
              </li>
            {filterTabs.map((tab,index) => (
              <li
                className={`${s.filter_tab} ${checkValidFilter(tab)}`} 
                onClick={() => filterHandler(tab)}
                key={index}
              >
                {tab?tab:"all products"}
              </li>
            ))}
            </ul>
          </div>

          {/* search */}
          <form className={s.searchForm} onSubmit={(e) => submitSearch(e)}>
            <CiSearch className={ s.searchIcon} />

            <input
              className={s.searchInput}
              type="text"
              name="search-product"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              />
          </form>
        </div>

        <div className={s.productsContainer}>
          {data.length>0 ? data.map((product: ProductTypes) => {
            return (<ProductItem product={product} key={ product.slug} />)
          }) :
            <div className={s.products_empty}>
              there are no results
          </div>}
        </div>


        {/* Pagination */}
        <div className={s.paginationContainer}>
          {generatePagination(productsNumber, 12).map((item, index) => (
            <span 
              className={`${s.pagination} ${currentPage === item && s.active_pagination}`} 
              key={index} 
              onClick={()=>paginationHandler(item, router, ()=>setCurrentPage(item))}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>  {
  const { gender='', q='', page=1 } = context.query;

  let url = ``
  
  if (gender && q) url = `${process.env.ROOT_URL}/api/products?$gender=${gender}&q=${q}&page=${page}`
  else if (gender) url = `${process.env.ROOT_URL}/api/products?gender=${gender}&page=${page}`
  else if (q) url = `${process.env.ROOT_URL}/api/products?q=${q}&page=${page}`
  else url = `${process.env.ROOT_URL}/api/products?page=${page}`

  const response = await axios.get(url);
  const {products, productsNumber} = response.data.data
  return {
    props: {
      data:products,
      gender,
      q,
      page,
      productsNumber
    }
  }
} 

export default Shop;
