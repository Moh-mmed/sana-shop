import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
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
    const { method } = req;
    const session = await getSession({ req }) as Session & { user: UserTypes };

    if (!session) {
        res.status(401).json({status:'fail', message: "You must be logged in." });
        return;
    }
      
    if (method === 'GET') {
      try {
          await db.connect();
          const orders = await Order.find({ user: session?.user._id })

          res.status(201).json({
            status: "success",
            message: "Orders fetched successfully!",
            data: orders,
          });;

        } catch (error) {
          return res.status(500).json({ status: "fail", message: "Couldn't load orders" });  
        }
    }
  
    if (method === "POST") {

        try {
            const { user }:any = session;
            await db.connect();
            const newOrder = new Order({
                ...req.body,
                user: user._id,
            });


            const order = await newOrder.save();

            res.status(201).json({
              status: "success",
              message: "Order created successfully!",
              data: order,
            });;

        } catch (error) {
          return res.status(500).json({ status: "fail", message: 'Failed to create order' });  
        }
    }
};
