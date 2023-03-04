import { PayPalButtons, SCRIPT_LOADING_STATE, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {MdError} from 'react-icons/md'
import { useRouter } from 'next/router';
import { useEffect} from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout/Layout';
import { getError } from '../../utils/error';
import { useDispatch, useSelector } from "react-redux";
import { StoreTypes } from '../../types/StoreTypes';
import { fetchRequest, fetchSuccess, fetchFail, payReset, deliverReset, payRequest, paySuccess, payFail, deliverRequest, deliverSuccess, deliverFail } from "../../redux/orderSlice";
import { format} from 'date-fns'
import { getSuccessStyles } from '../../utils/helpers';
import s from '../../styles/order/Order.module.css'
import LoadingButton from '../../utils/components/LoadingButton';

const Order: NextPage<any> = ({ admin }) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { query } = useRouter();
  const orderId = query.id;
  const dispatch = useDispatch();
  const { 
    loading, 
    error, 
    successPay, 
    loadingPay, 
    loadingDeliver, 
    successDeliver, 
    order } = useSelector((state: StoreTypes) => state.order);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch(fetchRequest());
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch(fetchSuccess(data.data));
      } catch (err) {
        dispatch(fetchFail('There is no order with this ID'));
      }
    };

    if (!order._id || successPay || successDeliver || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch(payReset());
      }
      if (successDeliver) {
        dispatch(deliverReset());
      }
    }
    
    else {
      const loadPaypalScript = async () => {
        const { data } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': data.data.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: SCRIPT_LOADING_STATE.PENDING });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  //* Start Paypal Payment
  const createOrder = (anyData:any, actions:any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((ordID:string) => {
        return ordID;
      });
    
  }

  //* Payment Success
  const onApprove = (anyData:any, actions:any)=> {
    return actions.order.capture().then(async function (details:any) {
      try {
        dispatch(payRequest())
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch(paySuccess(data.data))
        toast.success(data.message);
      } catch (err) {
        dispatch(payFail(getError(err)))
        toast.error(getError(err));
      }
    });
  }

  //* Payment Fail
  const onError = (err:any)=> {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch(deliverRequest())
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      if (data.status === "success") {
        dispatch(deliverSuccess())
        toast.success(data.message);
      } else {
        toast.error(getError(data.message));
      }
    } catch (err) {
      dispatch(deliverFail(getError(err)))
      toast.error(getError(err));
    }
  }

  return (
    <Layout title='Order'>
      <section className={s.root}>
        {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className={s.error_container} role="alert">
              <MdError className={s.error_icon} />
              <div className={s.error}>
                <p>Error:</p>
                <p>{error}</p>
              </div>
            </div>
            ) : (
              <div>
                <h1 className={s.heading}>Order:
                  <span>{orderId}</span>
                </h1>
                <div className={s.main}>
                  <div className={s.main_content}>
                    <div className={s.section}>
                      <h2 className={s.section_heading}>Shipping Address</h2>
                      <div>
                        {shippingAddress.fullName}, {shippingAddress.address},{' '}
                        {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                        {shippingAddress.country}
                      </div>
                      {isDelivered ? (
                        <div className={getSuccessStyles(true)}>Delivered at {format(new Date(deliveredAt), 'dd MMMM yyyy: p')}</div>
                      ) : (
                        <div className={getSuccessStyles(false)}>Not delivered</div>
                      )}
                    </div>

                    <div className={s.section}>
                      <h2 className={s.section_heading}>Payment Method</h2>
                      <div>{paymentMethod}</div>
                      {isPaid ? (
                        <div className={getSuccessStyles(true)}>Paid at {format(new Date(paidAt), 'dd MMMM yyyy: p')}</div>
                      ) : (
                        <div className={getSuccessStyles(false)}>Not paid</div>
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
                          {orderItems.map((item) => (
                            <tr key={item._id} className={s.table_body_row}>
                              <td className={s.table_body_cell}>
                                <Link href={`/shop/${item.slug}`} className={s.table_body_link}>
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={50}
                                      height={50}
                                    ></Image>
                                    &nbsp;
                                    {item.name}
                                </Link>
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
                          <div>${itemsPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className={s.checkoutListItem}>
                          <div>Tax</div>
                          <div>${taxPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className={s.checkoutListItem}>
                          <div>Shipping</div>
                          <div>${shippingPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className={s.checkoutListItem}>
                          <div>Total</div>
                          <div>${totalPrice}</div>
                        </div>
                      </li>
                      {/* Card Paying Section */}
                      {!isPaid ? (
                        <li>
                          {isPending ? (
                            <div>Loading...</div>
                          ) : (
                            <div className="w-full">
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>
                          )}
                          {loadingPay && <div>Loading...</div>}
                        </li>
                        ) :<li>
                          <div className={s.paidBtn}>PAID</div> 
                        </li>
                      }

                      {/* Admin Confirm Delivery */}
                      {admin.user.isAdmin && order.isPaid && !order.isDelivered && (
                        <li>
                          {loadingDeliver ?
                            <LoadingButton /> :
                             <button
                            className={s.checkoutBtn}
                            onClick={deliverOrderHandler}
                          >
                            Deliver Order
                          </button>}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
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
      admin:admin
    },
  };
}

export default Order;
