import axios from 'axios';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect,  useState } from 'react';
import Layout from '../../../components/admin/Layout/Layout';
import s from '../../../styles/admin/Orders.module.css'
import { getError } from '../../../utils/error';
import LoadingSpinner from '../../../utils/components/LoadingSpinner';
import { OrderTypes } from '../../../types/OrderTypes';
import { UserTypes } from '../../../types/UserTypes';
import { format } from 'date-fns';
import { getSuccessStyles } from '../../../utils/helpers';
import Link from 'next/link';

const AdminOrders: NextPage = ({admin}:any) => {
  const [orders, setOrders] = useState<OrderTypes[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/admin/orders`);
      setOrders(data.data.filter((order: OrderTypes) => order._id !== admin._id))
      setLoading(false)

    } catch (err) {
      console.log(getError(err))
      setLoading(false)
    }
    fetchData()
  }}, []);
  
  return (
    <Layout title="Orders">
      {!loading ? <div className={s.root}>
        <div className="flex justify-between">
          <div className={s.title}>
            Orders
          </div>
        </div>
        {orders.length > 0 &&  (<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                          User
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
                {orders.map((order:any, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={order._id}>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {order._id.substring(0, 10)}...
                      </td>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {order.user ? order.user.name : 'DELETED USER'}
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
                      </td>
                    </tr>
                  ))}
              </tbody>
          </table>
        </div>)}
      </div> :
        <LoadingSpinner/>}
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

export default AdminOrders;
