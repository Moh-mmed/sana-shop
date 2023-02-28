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
    
    if (method !== 'GET') {
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
    }
    const { info } = req.query

    switch (info) {
        case 'blog-categories': {

            try {
                await db.connect();
                const blogCategories = await Blog.find().distinct('category');
                await db.disconnect();
                
                return res.status(200).json({
                    status: "success",
                    message: "result fetched successfully",
                    data: blogCategories,
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
