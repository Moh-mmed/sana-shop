import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../../../models/Order';
import { Data } from '../../../../../types/ApiResponseTypes';
import db from '../../../../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

 const {method} = req

  try {
    switch (method) {
      case 'PUT': {
        await db.connect();
        const order = await Order.findById(req.query.id);

        if (order) {
          if (order.isPaid) {
              return res.status(400).json({status:'fail', message: "Your order is already paid" });
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
        return res.status(200).json({ status: 'fail', message: 'Error: order not found' });
        
      }
      default:{
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: 'Error: order not found' });
  }
};
