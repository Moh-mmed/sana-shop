import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ProductItem from '../../components/ProductItem/ProductItem';
import { ProductTypes } from '../../types/DataTypes';
import s from '../../styles/shop/Shop.module.css'
import {CiSearch} from 'react-icons/ci'


type ShopPageTypes = {
  data: ProductTypes[],
  gender: string,
  q: string,
}



const Shop: NextPage<ShopPageTypes> = ({ data, gender, q}) => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('') 
  const [filter, setFilter] = useState('') 
  const [genderFilter, setGenderFilter] = useState('') 

  const checkValidFilter = (tab: string)=>{
    if (filter === tab || genderFilter === tab || q?.includes(tab)) {
      return  s.active_filter_tab
    }
  }

  const filterHandler = (e: any) => {
    const query = e.currentTarget.dataset.filter || ''
    // const tempFilterQuery = query !== '*' ? query.slice(1) : query
    // const tempFilter = filter !== '*' ? filter : filter
    // const tempGenderFilter = genderFilter && genderFilter.slice(1)
    // setSearch('')
    // setFilter(query)

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
      // if (filter === '' ) {
      //   setFilter('')
      // } else {
      //   router.push(`/shop?gender=${tempFilterQuery}&q=${tempFilter}`)
      // }
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
      // setSearchInput('')
    }
  }

  useEffect(() => {
    if(gender) setGenderFilter(gender)
  }, [gender, q])


  const filterTabs = ['man', 'woman', 'belt', 'jackets']

  return (
    <Layout title='Shop'>
      <div className={s.root}>
        <div className={s.filter_container}>
          {/* Tabs */}
          <div className={s.filter_tabs}>
            <ul className={s.filters_list}>
              <li
                className={`${s.filter_tab} ${(q === '' && gender === '') && s.active_filter_tab}`} 
                data-filter='reset'
                onClick={(e) => filterHandler(e)}
              >
                all products
              </li>
            {filterTabs.map((tab,index) => (
              <li
                className={`${s.filter_tab} ${checkValidFilter(tab)}`} 
                data-filter={tab}
                onClick={(e) => filterHandler(e)}
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
          <Link href="#" className={s.pagination}>
            1
          </Link>

          <Link href="#" className={s.pagination}>
            2
          </Link>

          <Link href="#" className={s.pagination}>
            3
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>  {
  const { gender='', q='' } = context.query;

  let url = ``
  
  const queryString = gender ? `gender=${gender}` : "";
  if (gender && q) url = `${process.env.ROOT_URL}/api/products?${queryString}&q=${q}`
  else if (gender) url = `${process.env.ROOT_URL}/api/products?${queryString}`
  else if (q) url = `${process.env.ROOT_URL}/api/products?q=${q}`
  else url = `${process.env.ROOT_URL}/api/products`

  const response = await axios.get(url);
  const data = response.data.data

  return {
    props: {
      data,
      gender,
      q
    }
  }
} 

export default Shop;
