import type { NextApiRequest, NextApiResponse } from 'next'
import Order from '../../../../../models/Order';
import { Data } from '../../../../../types/ApiResponseTypes';
import db from '../../../../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { method, query } = req;
    const { id } = query
    try {
    switch (method) {
      case 'GET': {
        await db.connect();
        const order = await Order.findById(id);
        await db.disconnect();
            
        if (!order) { 
          await db.disconnect();
          return res.status(404).json({ status: "fail", message: 'Order not found' });
        }

        return res.status(200).json({
            status: "success",
            message: "The order has been fetched successfully",
            data: order,
        });
      }
      default:{
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
}
