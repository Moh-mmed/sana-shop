import axios from 'axios';
import Link from 'next/link';
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
import { UserTypes } from '../../types/UserTypes';
import s from '../../styles/admin/Dashboard.module.css'
import Widget from '../../components/admin/Widget/Widget';
import FeaturedChart from '../../components/admin/FeaturedChart/FeaturedChart';
import RegularChart from '../../components/admin/RegularChart/RegularChart';
import FeaturedTable from '../../components/admin/FeaturedTable/FeaturedTable';
import Layout from '../../components/admin/Layout/Layout';

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
    <Layout title="Admin Dashboard">
      <div>
        <div className={s.widgets}>
          <Widget section="users" value='100' link='all users' changePercentage={55}  />
          <Widget section="orders" value='600' link='all orders' changePercentage={20} />
          <Widget section="earnings" value='$9000' link='net earnings' changePercentage={30} />
          <Widget section="earnings" value='$3000' link='net earnings' changePercentage={40} />
        </div>
        <div className={s.charts}>
          <FeaturedChart />
          <RegularChart title="Last 6 Months (income)" />
        </div>
        <div className={s.table}>
          <FeaturedTable />
        </div>
      </div>
    </Layout>
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
