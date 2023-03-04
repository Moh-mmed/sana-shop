import axios from 'axios';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from '../types/StoreTypes';
import { fetchFail, fetchRequest, fetchSuccess } from '../redux/ordersHistorySlice';
import { format} from 'date-fns'
import { getSuccessStyles } from '../utils/helpers';
import s from '../styles/ordersHistory/OrdersHistory.module.css'

const OrdersHistory:NextPage = ()=> {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state: StoreTypes) => state.ordersHistory);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(fetchRequest());
        const { data } = await axios.get('/api/orders');
        dispatch(fetchSuccess(data.data));
      } catch (err:any) {
        dispatch(fetchFail(err.message));
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title="Order History">
      <section className='pt-20 pb-40 px-10'>
        <h1 className="mb-4 text-xl">Order History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>

            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        // <div className="overflow-x-auto">
        //   <table className="min-w-full">
        //     <thead className="border-b">
        //       <tr>
        //         <th className="px-5 text-left">ID</th>
        //         <th className="p-5 text-left">DATE</th>
        //         <th className="p-5 text-left">TOTAL</th>
        //         <th className="p-5 text-left">PAID</th>
        //         <th className="p-5 text-left">DELIVERED</th>
        //         <th className="p-5 text-left">ACTION</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {orders.map((order:any) => (
        //         <tr key={order._id} className="border-b">
        //           <td className="p-5 text-gray-900">{order._id.substring(0, 10)}...</td>
        //           <td className="p-5 ">{format(new Date(order.createdAt), 'dd MMM yyyy: p')}</td>
        //           <td className="p-5 ">${order.totalPrice}</td>
        //           <td className="p-5 ">
        //             {order.isPaid
        //               ? <span className={getSuccessStyles(true)}>{format(new Date(order.paidAt), 'dd MMM yyyy: p')}</span>
        //               : <span className={getSuccessStyles(false)}>not paid</span>}
        //           </td>
        //           <td className="p-5">
        //             {order.isDelivered
        //               ? <span className={getSuccessStyles(true)}>{format(new Date(order.deliveredAt), 'dd MMM yyyy: p')}</span>
        //               : <span className={getSuccessStyles(false)}>not delivered</span>}
        //           </td>
        //           <td className="p-5">
        //             <Link href={`/order/${order._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded-full transition duration-200">
        //               Details
        //             </Link>
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Total
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Paid
                      </th>
                      <th scope="col" className="px-6 py-3">
                          DELIVERED
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Actions</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                {orders.map((order:any) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={order._id}>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {order._id.substring(0, 10)}...
                      </td>
                      <td className={s.cell}>
                          {format(new Date(order.createdAt), 'dd MMM yyyy: p')}
                      </td>
                      <td className={s.cell}>
                          ${order.totalPrice}
                      </td>
                      <td className={s.cell}>
                          {order.isPaid
                      ? <span className={getSuccessStyles(true)}>{format(new Date(order.paidAt), 'dd MMM yyyy: p')}</span>
                      : <span className={getSuccessStyles(false)}>not paid</span>}
                      </td>
                      <td className={s.cell}>
                          {order.isDelivered
                      ? <span className={getSuccessStyles(true)}>{format(new Date(order.deliveredAt), 'dd MMM yyyy: p')}</span>
                      : <span className={getSuccessStyles(false)}>not delivered</span>}
                      </td>
                      <td className={`${s.cell} ${s.actionCell}`}>
                        <Link href={`/order/${order._id}`} className={`${s.actionBtn} ${s.showBtn}`}>
                         details
                       </Link>
                        {/* <button 
                          className={`${s.actionBtn} ${s.deleteBtn}`}
                          onClick={() => deleteUserHandler(user._id)}>
                          delete
                        </button> */}
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      )}
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (context:any) => {
  const admin = await getSession(context);
  if (!admin) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  return {
    props: {
      admin
    },
  };
}

export default OrdersHistory;
