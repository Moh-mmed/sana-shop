import type { NextApiRequest, NextApiResponse } from 'next'
import Blog from '../../../models/Blog';
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

    switch (method) {
        case 'GET': {
            const { category, q, limit } = req.query;
            let query = {};
            
            if (category) {
              query = { category: category };
            }
    
            if (q) {
                query = {
                    ...query,
                    $or: [
                        { title: { $regex: q, $options: 'i' } },
                        { first_content: { $regex: q, $options: 'i' } },
                        { second_content: { $regex: q, $options: 'i' } },
                        { author: { $regex: q, $options: 'i' } },
                        { excerpt: { $regex: q, $options: 'i' } },
                    ],
                };
            }
            try {
                await db.connect();
                const blogs = await Blog.find(query).limit(Number(limit));
                await db.disconnect();
                
                return res.status(200).json({
                    status: "success",
                    message: "All blogs have been fetched successfully",
                    data: blogs,
                });
            } catch (error) {
                return res.status(500).json({ status: "fail", message: error });
            }
        }
        default:{
            return res.status(405).json({ status: "fail", message: 'Method not allowed' });
        }
    }
}
