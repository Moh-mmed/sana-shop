import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { getError } from '../../../utils/error';
import { NextPage } from 'next';
import Layout from '../../../components/Layout/Layout'

// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true, error: '' };
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false, orders: action.payload, error: '' };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       state;
//   }
// }

const AdminOrders:NextPage = ()=>{
  // const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
  //   loading: true,
  //   orders: [],
  //   error: '',
  // });

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     dispatch({ type: 'FETCH_REQUEST' });
    //     const { data } = await axios.get(`/api/admin/orders`);
    //     dispatch({ type: 'FETCH_SUCCESS', payload: data });
    //   } catch (err) {
    //     dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <Layout title= "Admin Dashboard" >
      <section>fsf</section>
    </Layout>
  )
}

export default AdminOrders