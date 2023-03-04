import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Order from '../../../../../models/Order';
import { UserTypes } from '../../../../../types/UserTypes';
import db from '../../../../../utils/db';

type Data = {
    status: string,
    message: any,
    data?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req }) as Session & { user: UserTypes };

  if (!session || !session.user?.isAdmin) {
    return res.status(401).json({ status: "fail", message: 'admin sign in required' });
  }
  
  const { method, query } = req;

  switch (method) {
    case 'PUT': { 
      try {
        await db.connect();
        const order = await Order.findById(query.id);
        await db.disconnect();
        
        if (!order) {
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
      } catch (error) {
          return res.status(500).json({ status: "fail", message: error });
      }
    }
    default:{
      return res.status(400).json({ status: "fail", message: 'Method not allowed' });
    }
  }
};

