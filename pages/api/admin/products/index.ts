import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import { UserTypes } from '../../../../types/UserTypes';
import db from '../../../../utils/db';

type Data = {
    status: string,
    message: any,
    data?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const session = await getSession({ req }) as Session & { user: UserTypes };

  if (!session || !session.user?.isAdmin) {
    return res.status(401).json({ status: "fail", message: 'admin sign in required' });
  }

  const { method, query } = req;

  try {
    switch (method) {
      case 'GET': {
        await db.connect();
        const products = await Product.find();
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
          image,
          price,
          category,
          brand,
          countInStock,
          description,
          gender} = query
        
        await db.connect();
        const newProduct = new Product({
          name,
          image: '/images/shirt1.jpg',
          price,
          gender,
          banner:'',
          category,
          brand,
          countInStock,
          description,
          rating: 0,
          numReviews: 0,
        });

        const product = await newProduct.save();
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