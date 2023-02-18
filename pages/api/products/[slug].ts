import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product';
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
    const { slug } = query

    if (method === 'GET') {
        try {
        await db.connect();
        const product = await Product.findOne({ slug });
        await db.disconnect();
        return res.status(200).json({
            status: "success",
            message: "The product has been fetched successfully",
            data: product,
        });
        } catch (error) {
            return res.status(500).json({ status: "fail", message: error });
        }
    }
}
