import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import User from '../../../models/User';
import db from '../../../utils/db';
import { Data } from '../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const { method } = req;

  try {
    switch (method) {
      case 'GET': { 
        await db.connect();

        const ordersCount = await Order.countDocuments();
        const productsCount = await Product.countDocuments();
        const usersCount = await User.countDocuments();
        const latestOrders = await Order.find({}).select('-_id itemsPrice paymentMethod isDelivered isPaid').limit(5).populate('user', '-_id name');
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
            data: {latestOrders, ordersCount, productsCount, usersCount, ordersPrice, salesData }
        });

      }
    
      default:{
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }


};

