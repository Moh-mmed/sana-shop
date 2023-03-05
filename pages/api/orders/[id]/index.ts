import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import { Data } from '../../../../types/ApiResponseTypes';
import { UserTypes } from '../../../../types/UserTypes';
import db from '../../../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { method, query } = req;
    const { id } = query
    const session = await getSession({ req }) as Session & { user: UserTypes };
    
    if (!session.user) {
        return res.status(401).json({status:'fail', message: "You must be logged in." });
    }

    if (method === 'GET') {
        try {
        await db.connect();
        const order = await Order.findById(id);
        await db.disconnect();
            
        return res.status(200).json({
            status: "success",
            message: "The order has been fetched successfully",
            data: order,
        });
        } catch (error) {
            return res.status(500).json({ status: "fail", message: error});
        }
    }
}
