import type { NextApiRequest, NextApiResponse } from 'next'
import Blog from '../../../models/Blog';
import db from '../../../utils/db';

type Data = {
    status: string,
    message: any,
    data?: object,
    blogsNumber?:number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { method } = req;

    switch (method) {
        case 'GET': {
            const { category, q, limit = 6, page = 1 }:any = req.query;
            const skipCount = Number(limit) * (page - 1);
            let searchCriteria = {};
            
            if (category) {
              searchCriteria = { category: category };
            }
    
            if (q) {
                searchCriteria = {
                    ...searchCriteria,
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
                const blogsNumber = await Blog.find(searchCriteria)
                const blogs = await Blog.find(searchCriteria).skip(skipCount).limit(Number(limit));
                await db.disconnect();
                
                return res.status(200).json({
                    status: "success",
                    message: "All blogs have been fetched successfully",
                    data: blogs,
                    blogsNumber: blogsNumber.length
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
