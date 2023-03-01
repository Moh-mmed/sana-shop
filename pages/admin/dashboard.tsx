import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useReducer, useState } from 'react';
import { getError } from '../../utils/error';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { UserTypes } from '../../types/DataTypes';
import { Flip,ToastContainer } from 'react-toastify';
import Head from 'next/head';
import s from '../../styles/admin/Dashboard.module.css'
import Sidebar from '../../components/admin/sidebar/Sidebar';
import Navbar from '../../components/admin/navbar/Navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true, error: '' };
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false, summary: action.payload, error: '' };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       state;
//   }
// }

type SalesDataTypes = {
  ordersCount:number,
  productsCount:number,
  usersCount:number,
  ordersPrice:number,
  salesData:any
}

const AdminDashboard:NextPage = () =>{
  // const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
  //   loading: true,
  //   summary: { salesData: [] },
  //   error: '',
  // });
  const [{ loading, error, summary }, setState] = useState<any>({
    loading: true,
    summary: { salesData: [] },
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // dispatch({ type: 'FETCH_REQUEST' });
        setState((preState:any)=>({...preState, loading:true}))
        const { data } = await axios.get(`/api/admin/summary`);
        // dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setState((preState:any)=>({...preState,loading:false, summary:data.data }))
      } catch (err) {
        setState((preState:any)=>({...preState,loading:false, error:getError(err) }))
        // dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x:any) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162, 222, 208, 1)',
        data: summary.salesData.map((x:any) => x.totalSales),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Random text"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" transition={Flip} limit={1} autoClose={1000} />
      <Navbar />
      <section className={s.root}>

        <Sidebar />
        <div className={s.main}>
          {/* 
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <FeaturedChart />
            <RegularChart title="Last 6 Months (income)" />
          </div>
          <div className="latest-transactions">
            <div className="list-title">Latest Transactions</div>
            <BasicTable />
          </div> */}
        </div>

      </section>
    </>
  );
}


export const getServerSideProps = async (context:any) => {
  const session = await getSession(context) as Session & { user: UserTypes };

  if (!session || !session.user.isAdmin) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  return {
    props: {
      admin: session.user
    },
  };
}
export default AdminDashboard;
