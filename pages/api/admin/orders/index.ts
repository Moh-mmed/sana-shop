import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../../models/Order';
import { Data } from '../../../../types/ApiResponseTypes';
import db from '../../../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

    switch (method) {
    case 'GET': {
      try {
          await db.connect();
          const orders = await Order.find({}).populate('user', 'name').sort({ updatedAt: -1 });
          await db.disconnect();
        
          return res.status(200).json({
            status: "success",
            message: "All orders have been fetched successfully",
            data: orders
          });
        
        } catch (error) {
            return res.status(500).json({ status: "fail", message: error });
      }
    }
    default:{
          return res.status(400).json({ status: "fail", message: 'Method not allowed' });
    }
  }
};

