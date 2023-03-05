import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import { Data } from '../../../types/ApiResponseTypes';
import { UserTypes } from '../../../types/UserTypes';
import db from '../../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { method } = req;
    const session = await getSession({ req }) as Session & { user: UserTypes };

    if (!session.user) {
        res.status(401).json({status:'fail', message: "You must be logged in." });
        return;
    }

  try {
    switch (method) {
      case 'GET': {
        await db.connect();
        const orders = await Order.find({ user: session?.user._id })

        res.status(201).json({
          status: "success",
          message: "Orders fetched successfully!",
          data: orders,
        })
      }
      case 'POST': {
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
