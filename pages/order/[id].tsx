import { PayPalButtons, SCRIPT_LOADING_STATE, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
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
      // const { data } = await axios.put(
      //   `/api/admin/orders/${order._id}/deliver`,
      //   {}
      // );
      // let data = ''
      dispatch(deliverSuccess())
      toast.success('Order is delivered');
    } catch (err) {
      dispatch(deliverFail(getError(err)))
      toast.error(getError(err));
    }
  }

  return (
    <Layout title='Order'>
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
        <>
        <h1 className="mb-4 text-xl">Order:<span className='text-3xl text-black ml-2'>{orderId}</span></h1>
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
                <div className={getSuccessStyles(true)}>Delivered at {format(new Date(deliveredAt), 'dd MMMM yyyy: p')}</div>
              ) : (
                <div className={getSuccessStyles(false)}>Not delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-xl">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className={getSuccessStyles(true)}>Paid at {format(new Date(paidAt), 'dd MMMM yyyy: p')}</div>
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
            <div className="p-5">
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
                  ) :
                  <li>
                    <div className="w-full bg-green-400 text-white text-lg py-2 px-5 mt-4 rounded-full text-center">PAID</div> 
                  </li>
                    }
                {admin.user.isAdmin && order.isPaid && !order.isDelivered && (
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
        </>
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
      admin:admin
    },
  };
}

export default Order;
