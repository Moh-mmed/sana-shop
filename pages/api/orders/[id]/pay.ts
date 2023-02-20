import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

type Data = {
    status: string,
    message: any,
    data?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({status:'fail', message: "You must be logged in." });
    }

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
      
    if (order.isPaid) {
        return res.status(400).json({status:'fail', message: "You must be logged in." });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
      };
      
    const paidOrder = await order.save();
    await db.disconnect();
      return res.status(200).json({status:'success', message: "Order paid successfully.", data:paidOrder });
  } 
    await db.disconnect();
    return res.status(200).json({status:'fail', message: 'Error: order not found' });
};
