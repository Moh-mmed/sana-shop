import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect} from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest, fetchSuccess, fetchFail, payReset, deliverReset, payRequest, paySuccess, payFail, deliverRequest, deliverSuccess, deliverFail } from "../../redux/orderSlice";
import { StoreTypes } from '../../types/StoreTypes';
import { UserTypes } from '../../types/DataTypes';

type PropsTypes = {
  admin : UserTypes
}

const getSuccessStyles = (status: boolean) => {
  if (status) {
    return 'inline-block text-white rounded-2xl px-3 text-sm bg-green-600'
  }
  return 'inline-block text-white rounded-2xl px-3 text-sm bg-red-500'
} 

const Order:NextPage<PropsTypes> = ({admin})=> {
  // const { data: session } = useSession();
  // order/:id
  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

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
        dispatch(fetchSuccess(data));
      } catch (err) {
        dispatch(fetchFail(getError(err)));
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
        // const { data: clientId } = await axios.get('/api/keys/paypal');
        // paypalDispatch({
        //   type: 'resetOptions',
        //   value: {
        //     'client-id': clientId,
        //     currency: 'USD',
        //   },
        // });
        // paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  // }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  }, [order, orderId, successDeliver, successPay]);

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

  const createOrder= (data:any, actions:any) => {
    
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID:string) => {
        return orderID;
      });
    
  }

  const onApprove = (data:any, actions:any)=> {
    return actions.order.capture().then(async function (details:any) {
      try {
        dispatch(payRequest())
        // const { data } = await axios.put(
        //   `/api/orders/${order._id}/pay`,
        //   details
        // );
        dispatch(paySuccess(data))
        toast.success('Order is paid successfully');
      } catch (err) {
        dispatch(payFail(getError(err)))
        toast.error(getError(err));
      }
    });
  }

  function onError(err:any) {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch(deliverRequest())
      // const { data } = await axios.put(
      //   `/api/admin/orders/${order._id}/deliver`,
      //   {}
      // );
      let data = ''
      dispatch(deliverSuccess(data))
      toast.success('Order is delivered');
    } catch (err) {
      dispatch(deliverFail(getError(err)))
      toast.error(getError(err));
    }
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">Order:<span className='text-3xl text-black ml-2'>{orderId}</span></h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-xl">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className={getSuccessStyles(true)}>Delivered at {deliveredAt}</div>
              ) : (
                <div className={getSuccessStyles(false)}>Not delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-xl">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className={getSuccessStyles(true)}>Paid at {paidAt}</div>
              ) : (
                <div className={getSuccessStyles(false)}>Not paid</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-xl">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`} className="flex items-center">
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
                      <td className="p-5 text-right">{(item.quantity?item.quantity:0)}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${(item.quantity?item.quantity:0) * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-xl">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                {/* {!isPaid && (
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
                )} */}
                {admin.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <div>Loading...</div>}
                    <button
                      className="w-full bg-yellow-500 text-white text-lg py-3 px-6 mt-5 rounded-full hover:bg-yellow-600 transition duration-200"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
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

export default Order;
