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
    const { brand, gender, q, limit }:any = query 

    if (method === 'GET') {

        let searchCriteria = {}

        if (brand) {
            searchCriteria = {
                brand: { $regex: brand, $options:"i" }
            }
        }
        
        if (gender) {
            searchCriteria = {
                ...searchCriteria, gender
            }
        }

        if (q) {
            searchCriteria = {
                ...searchCriteria,
                $or: [
                    { name: { $regex: q, $options: 'i' } },
                    { category: { $regex: q, $options: 'i' } },
                ],
            };
        }

        try {
            await db.connect();
            const products = await Product.find(searchCriteria).limit(Number(limit));
            await db.disconnect();

            return res.status(200).json({
                status: "success",
                message: "All products have been fetched successfully",
                data: products,
            });
        } catch (error) {
            return res.status(500).json({ status: "fail", message: error });
        }
    }
}
