import { OrderTypes } from "../../../types/OrderTypes";
import s from "./FeaturedTable.module.css";

type PropsTypes = {
  latestOrders: {
    user:{name: string },
    itemsPrice: number,
    isDelivered: boolean,
    isPaid: boolean,
    paymentMethod: string,
  }[]
}

const FeaturedTable: React.FC<PropsTypes> = ({ latestOrders }) => {
  return (
    <section className={s.root}>
       <div className={s.title}>Latest Orders</div>
    <div className={s.table_container}>
      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col" className={s.th}>Ordered By</th>
            <th scope="col" className={s.th}>Items Price</th>
            <th scope="col" className={s.th}>Delivered</th>
            <th scope="col" className={s.th}>Paid</th>
            <th scope="col" className={s.th}>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {latestOrders?.length>0 && latestOrders.map((order, index)=>(
            <tr className={s.table} key={index}>
              <td className={s.td}>{order.user ? order.user.name : 'DELETED USER'}</td>
              <td className={s.td}>${order.itemsPrice}</td>
              <td className={`${s.td}`}><span className={order.isDelivered?'success':'fail' }>{order.isDelivered?'Yes':'No' }</span></td>
              <td className={`${s.td}`}><span className={order.isPaid?'success':'fail' }>{order.isPaid?'Yes':'No' }</span></td>
              <td className={s.td}>{order.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </section>
  );
}

export default FeaturedTable;