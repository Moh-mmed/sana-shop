import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product';
import { Data } from '../../../types/ApiResponseTypes';
import db from '../../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { method, query } = req;
    const { slug } = query as { slug: string };
    const id = slug.slice(slug.lastIndexOf('-p-') + 3);
    switch (method) {
        case 'GET': {
            try {
                await db.connect();
                const product = await Product.findById(id);
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
        default: {
            return res.status(405).json({ status: "fail", message: 'Method not allowed' });
        }
    }
}
