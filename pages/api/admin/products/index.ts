import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';
import { Data } from '../../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { method, body } = req;

  try {
    switch (method) {
      case 'GET': {
        await db.connect();
        const products = await Product.find({}).sort({ updatedAt: -1 });
        await db.disconnect();
      
        return res.status(200).json({
          status: "success",
          message: "All products have been fetched successfully",
          data: products
        });
      }
      case 'POST': {
        const {
          name,
          category,
          brand,
          gender,
          price,
          discount,
          countInStock,
          description,
          isFeatured,
          image,
        } = body;
        
        await db.connect();

        const product = await Product.create({
          name,
          image,
          price,
          discount,
          gender,
          banner:image,
          category,
          brand,
          isFeatured,
          countInStock,
          description,
        });

        await db.disconnect();

        return res.status(202).json({
          status: "success",
          message: "Product created successfully",
          data: product
        });
      }
      default:{
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
      }
    }
  } catch (error) {
      return res.status(500).json({ status: "fail", message: error });
  }
};