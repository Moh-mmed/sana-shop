import s from './OrderViewModal.module.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../../../utils/error'
import Image from 'next/image'
import { format } from 'date-fns'
import LoadingSpinner from '../../../utils/components/LoadingSpinner'
import { MdError } from 'react-icons/md'

type PropsTypes = {
    orderId: string,
    closeModalHandler: () => void,
    loadingDeliver: boolean,
    deliverOrderHandler: (id: string, isPaid:boolean) => void
}

const OrderViewModal: React.FC<PropsTypes> = ({ orderId, closeModalHandler, loadingDeliver, deliverOrderHandler }) => {
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/api/admin/orders/${orderId}`);
                setOrder(data.data)
                setLoading(false)
                } catch (err) {
                toast(getError(err));
                setLoading(false)
            }
        } 

        if (orderId) fetchData()
    }, [orderId]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'auto';
        };
    }, []);

    return (<div className={s.viewModal_container}>
        <div className={s.viewModal}>
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center" onClick={()=>closeModalHandler()}>
                <IoIosCloseCircleOutline/>
                <span className="sr-only">Close modal</span>
            </button>
                
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 capitalize">Order detail</h3>
            </div>

            {loading ? (
            <LoadingSpinner/>
            ) : !order ? (
            <div className={s.error_container} role="alert">
              <MdError className={s.error_icon} />
              <div className={s.error}>
                <p>Error:</p>
                <p>No order found with this ID</p>
              </div>
            </div>
            ) : (
              <div className={s.order_container}>
                <h1 className={s.heading}>Order:
                  <span>{orderId}</span>
                </h1>
                <div className={s.main}>
                  <div className={s.main_content}>
                    <div className={s.section}>
                      <h2 className={s.section_heading}>Shipping Address</h2>
                      <div>
                        {order?.shippingAddress.fullName}, {order?.shippingAddress.address},{' '}
                        {order?.shippingAddress.city}, {order?.shippingAddress.postalCode},{' '}
                        {order?.shippingAddress.country}
                      </div>
                      {order?.isDelivered ? (
                        <div className='success'>Delivered at {format(new Date(order?.deliveredAt), 'dd MMMM yyyy: p')}</div>
                      ) : (
                        <div className='fail'>Not delivered</div>
                      )}
                    </div>

                    <div className={s.section}>
                      <h2 className={s.section_heading}>Payment Method</h2>
                      <div>{order?.paymentMethod}</div>
                      {order?.isPaid ? (
                        <div className='success'>Paid at {format(new Date(order?.paidAt), 'dd MMMM yyyy: p')}</div>
                      ) : (
                        <div className='fail'>Not paid</div>
                      )}
                    </div>

                    <div className={s.tableContainer}>
                      <h2 className={s.section_heading}>Order Items</h2>
                      <table className={s.table}>
                        <thead className={s.table_head}>
                          <tr>
                            <th className={s.table_head_cell}>Item</th>
                            <th className={s.table_head_cell}>Quantity</th>
                            <th className={s.table_head_cell}>Price</th>
                            <th className={s.table_head_cell}>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.orderItems.map((item:any) => (
                            <tr key={item._id} className={s.table_body_row}>
                              <td className={s.table_body_cell}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                ></Image>
                                &nbsp;
                                {item.name}
                              </td>
                              <td className={s.table_body_cell}>{(item.quantity?item.quantity:0)}</td>
                              <td className={s.table_body_cell}>${item.price}</td>
                              <td className={s.table_body_cell}>
                                ${(item.quantity?item.quantity:0) * item.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Checkout Section*/}
                  <div className={s.section}>
                    <h2 className={s.section_heading}>Order Summary</h2>
                    <ul>
                      <li>
                        <div className={s.checkoutListItem}>
                          <div>Items</div>
                          <div>${order?.itemsPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className={s.checkoutListItem}>
                          <div>Tax</div>
                          <div>${order?.taxPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className={s.checkoutListItem}>
                          <div>Shipping</div>
                          <div>${order?.shippingPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className={s.checkoutListItem}>
                          <div>Total</div>
                          <div>${order?.totalPrice}</div>
                        </div>
                    </li>              
                    </ul>
                    <button
                        disabled={loadingDeliver}
                        className={`${s.actionBtn} ${s.deliverBtn}`}
                        onClick={()=>deliverOrderHandler(order._id, order.isPaid)}
                    >
                        deliver
                    </button>
                  </div>
                </div>
              </div>
            )}

        </div>
    </div>
  )
}

export default OrderViewModal