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

    const { method, query } = req;
    const limit = query.limit ? query.limit : 0 
    
    if (method === 'GET') {
        try {
            await db.connect();
            const blogs = await Blog.find({...query}).limit(Number(limit));
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
}
