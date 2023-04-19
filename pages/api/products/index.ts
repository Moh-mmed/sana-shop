import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product';
import db from '../../../utils/db';

type Data = {
    status: string,
    message: any,
    data?: object,
    productsNumber?:number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { method, query } = req;
try {
    switch (method) {
        case 'GET': {
            const { isFeatured, brand, gender, q, limit = 12, page = 1 }: any = query 
            const skipCount = Number(limit) * (page - 1);
            let searchCriteria = {}

            if (isFeatured) {
                searchCriteria = { isFeatured };
            }

            if (brand) {
                searchCriteria = {
                        ...searchCriteria,
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
            await db.connect();
            const productsNumber = await Product.find(searchCriteria).countDocuments()
            const products = await Product.find(searchCriteria).sort({'updatedAt':-1}).skip(skipCount).limit(Number(limit));
            await db.disconnect();

            return res.status(200).json({
                status: "success",
                message: "All products have been fetched successfully",
                data: products,
                productsNumber
            });
      }
      default:{
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
}
