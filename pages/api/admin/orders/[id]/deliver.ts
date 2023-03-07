import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../../../models/Order';
import db from '../../../../../utils/db';
import { Data } from '../../../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const { method, query } = req;

  try {
    switch (method) {
      case 'PUT': { 
          await db.connect();
          const order = await Order.findById(query.id);
          
        if (!order) {
            await db.disconnect();
            return res.status(404).json({ status: "fail", message: 'Order not found' });
          }

          order.isDelivered = true;
          order.deliveredAt = Date.now();
          const deliveredOrder = await order.save();
          await db.disconnect();
          
          return res.status(200).json({
            status: "success",
            message: "Order delivered successfully",
            data: deliveredOrder
          });
      }
      default:{
        return res.status(400).json({ status: "fail", message: 'Method not allowed' });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
};

