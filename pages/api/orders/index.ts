import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
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
   
    if (method === "POST") {
        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({
              status: "fail",
              message: "You are not authorized for this action.",
          });
        }

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
          return res.status(500).json({ status: "fail", message: error });  
        }
    }
};
