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

type ShopPageTypes = {
  data: ProductTypes[],
  gender: string
}

const Shop: NextPage<ShopPageTypes> = ({ data, gender }) => {
  const router = useRouter()
  const [search, setSearch] = useState('') 
  const [filter, setFilter] = useState('') 
  const [genderFilter, setGenderFilter] = useState('') 

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filterQuery = e.currentTarget.dataset.filter || ''
    const tempFilterQuery = filterQuery !== '*' ? filterQuery.slice(1) : filterQuery
    const tempFilter = filter !== '*' ? filter.slice(1) : filter
    const tempGenderFilter = genderFilter && genderFilter.slice(1)

    setSearch('')

    if (filterQuery === '.women' || filterQuery === '.man') {
      setGenderFilter(filterQuery)
      if (filter === '*' || filter === '' ) {
        setFilter('')
        router.push(`/shop?gender=${tempFilterQuery}`)
      } else {
        router.push(`/shop?gender=${tempFilterQuery}&q=${tempFilter}`)
      }
    } else {
      setFilter(filterQuery)
      if (filterQuery === '*') {
        setGenderFilter('')
        router.push(`/shop`)
      } else {
        if (genderFilter !== '') router.push(`/shop?gender=${tempGenderFilter}&q=${tempFilterQuery}`)
        else router.push(`/shop?q=${tempFilterQuery}`)
      }
    } 
  }

  const submitSearch = () => {
    if (search) {
      router.push(`/shop?q=${search}`)
      setSearch('')
      setFilter('*')
      setGenderFilter('')
    }
  }
  useEffect(() => {
    setGenderFilter(gender)
    if (gender === '') setFilter('*')
  }, [])












  return (
    <Layout title='Shop'>
      <div className="bg0 m-t-23 p-b-140">
        <div className="container">
          <div className="flex-w flex-sb-m p-b-52">
            {/* <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${filter === '*'? 'how-active1':''}`}
                data-filter="*"
                onClick={(e)=>filterHandler(e)}
              >
                All Products
              </button>

              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${genderFilter === '.women'? 'how-active1':''}`}
                data-filter=".women"
                onClick={(e)=>filterHandler(e)}
              >
                Women
              </button>

              <button className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${genderFilter === '.man'? 'how-active1':''}`} data-filter=".man"
                onClick={(e)=>filterHandler(e)}>
                Men
              </button>

              <button className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${filter === '.belt'? 'how-active1':''}`} data-filter=".belt"
                onClick={(e)=>filterHandler(e)}>
                Belt
              </button>
            </div> */}

            <div className="flex-w flex-c-m m-tb-10" >
              <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search show-search" onClick={submitSearch}>
                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                Search
              </div>
            </div>

            {/* search */}
            <div className="panel-search w-full p-t-10 p-b-15">
              <div className="bor8 dis-flex p-l-15">
                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04" onClick={submitSearch}>
                  <i className="zmdi zmdi-search"></i>
                </button>

                <input
                  className="mtext-107 cl2 size-114 plh2 p-r-15"
                  type="text"
                  name="search-product"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row isotope-grid">
            {data.length>0 ? data.map((product: ProductTypes) => {
              return (<ProductItem product={product} key={ product.slug} />)
            }) :
              <div className="col-12 p-5 text-capitalize display-4 text-center">
                there are no results
            </div>}
          </div>


          {/* Pagination */}
          <div className="flex-l-m flex-w w-full p-t-10 m-lr--7">
            <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1">
              1
            </a>

            <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7">
              2
            </a>

            <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7">
              3
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>  {
  const { gender='', q='' } = context.query;

  let  url = `${process.env.ROOT_URL}/api/products`

  const response = await axios.get(url);
  const data = response.data.data


  return {
    props: {
      data,
      gender: gender? `.${gender}`:''
    }
  }
} 

export default Shop;
