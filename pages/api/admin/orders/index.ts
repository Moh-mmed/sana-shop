import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import { UserTypes } from '../../../../types/UserTypes';
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
  const session = await getSession({ req }) as Session & { user: UserTypes };

  console.log(session.user?.isAdmin)
  if (!session || !session.user?.isAdmin) {
    return res.status(401).json({ status: "fail", message: 'admin sign in required' });
  }
  const { method } = req;

    switch (method) {
    case 'GET': {
      try {
          await db.connect();
          const orders = await Order.find().populate('user', 'name');
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

