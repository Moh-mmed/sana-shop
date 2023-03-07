import axios from 'axios';
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
import React, { useEffect, useReducer} from 'react';
import { getError } from '../../utils/error';
import { NextPage } from 'next';
import s from '../../styles/admin/Dashboard.module.css'
import Widget from '../../components/admin/Widget/Widget';
import FeaturedChart from '../../components/admin/FeaturedChart/FeaturedChart';
import RegularChart from '../../components/admin/RegularChart/RegularChart';
import FeaturedTable from '../../components/admin/FeaturedTable/FeaturedTable';
import Layout from '../../components/admin/Layout/Layout';
import type { ChartOptions } from 'chart.js';
import LoadingSpinner from '../../utils/components/LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options:ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state:any, action:any) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

type SalesDataTypes = {
  ordersCount:number,
  productsCount:number,
  usersCount:number,
  ordersPrice:number,
  salesData:any
}

const AdminDashboard:NextPage = () =>{
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
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
      {loading ?
        <LoadingSpinner />
        :
        (
        <div>
        <div className={s.widgets}>
          <Widget section="users" value={summary.usersCount} link='all users' changePercentage={50}  />
          <Widget section="orders" value={summary.ordersCount} link='all orders' changePercentage={80} />
          <Widget section="products" value={summary.productsCount} link='net products' changePercentage={35} />
          <Widget section="earnings" value={`$ ${summary.ordersPrice.toFixed(3)}`} link='net earnings' changePercentage={40} />
        </div>
        <div className={s.charts}>
          <FeaturedChart />
          <RegularChart title="Last 6 Months (income)" />
        </div>
        <div className={s.table}>
          <FeaturedTable latestOrders={summary.latestOrders} />
        </div>
        <Bar
          options={options}
          data={data}
        />
      </div>
      )  
    }
    </Layout>
  );
}
export default AdminDashboard;
