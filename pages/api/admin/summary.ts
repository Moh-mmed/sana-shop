import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import User from '../../../models/User';
import { UserTypes } from '../../../types/UserTypes';
import db from '../../../utils/db';

type Data = {
    status: string,
    message: any,
    data?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req })as Session & { user: UserTypes };


 if (!session || !session.user.isAdmin) {
    return res.status(401).json({ status: "fail", message: 'admin sign in required' });
 }
  
  
  await db.connect();

  const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();

  const ordersPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalPrice' },
      },
    },
  ]);

  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);

  await db.disconnect();
    return res.status(200).json({
      status: "success",
      message: "Summary has been fetched successfully",
      data: { ordersCount, productsCount, usersCount, ordersPrice, salesData }
  });
};

