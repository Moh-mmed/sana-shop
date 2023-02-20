import type { NextApiRequest, NextApiResponse } from 'next'
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

    const { method, query } = req;
    const { id } = query

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
            return res.status(500).json({ status: "fail", message: error });
        }
    }
}
