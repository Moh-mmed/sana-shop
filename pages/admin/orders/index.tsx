import axios from 'axios';
import { NextPage } from 'next';
import { useEffect,  useState } from 'react';
import Layout from '../../../components/admin/Layout/Layout';
import s from '../../../styles/admin/Orders.module.css'
import LoadingSpinner from '../../../utils/components/LoadingSpinner';
import { OrderTypes } from '../../../types/OrderTypes';
import { format } from 'date-fns';
import LoadingButton from '../../../utils/components/LoadingButton';
import { toast } from 'react-toastify';
import { getError } from '../../../utils/error';

const AdminOrders: NextPage = () => {
  const [orders, setOrders] = useState<OrderTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingDeliver, setLoadingDeliver] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/admin/orders`);
      setOrders(data.data)
      setLoading(false)

    } catch (err) {
      setLoading(false)
    }
  
  }
  useEffect(() => {
    fetchData()
  }, []);
  

  async function deliverOrderHandler(orderId:string) {
    try {
      setLoadingDeliver(true)
      const { data } = await axios.put(
        `/api/admin/orders/${orderId}/deliver`,
        {}
      );
      setLoadingDeliver(false)
      fetchData()
      toast.success(data.message);
    } catch (err) {
      setLoadingDeliver(false)
      toast.error(getError(err));
    }
  }

  return (
    <Layout title="Admin Orders">
      {loading ?
        <LoadingSpinner /> :
        <div className={s.root}>
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
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
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
                      ? <span className='success'>{format(new Date(order.paidAt), 'dd MMM yyyy: p')}</span>
                      : <span className='fail'>not paid</span>}
                      </td>
                      <td className={s.cell}>
                          {order.isDelivered
                      ? <span className='success'>{format(new Date(order.deliveredAt), 'dd MMM yyyy: p')}</span>
                      : <span className='fail'>not delivered</span>}
                      </td>
                      <td className={`${s.cell} ${s.actionCell}`}>
                        <button 
                          className={`${s.actionBtn} ${s.viewBtn}`}
                          // onClick={() => viewEditUser(user._id, 'view')}
                        >
                          view
                        </button>
                        <button
                          disabled={loadingDeliver}
                          className={`${s.actionBtn} ${s.deliverBtn}`}
                          onClick={()=>deliverOrderHandler(order._id)}
                        >
                          deliver
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
          </table>
        </div>)}
      </div>}
    </Layout>
  );
}
export default AdminOrders;
