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
  const { id } = query
  
  try {
    switch (method) {
      case 'GET': {
        await db.connect();
        const product = await Product.findById(id);
        await db.disconnect();
        
        return res.status(200).json({
          status: "success",
          message: "Product has been fetched successfully",
          data: product
        });
      }
         
      case 'PUT': {
        await db.connect();
        const product = await Product.findById(id);
        if (!product) {
          await db.disconnect();
          return res.status(404).json({ status: "fail", message: 'Product not found' });
        }

        product.name = req.body.name;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.gender = req.body.gender;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        // product.banner = req.body.banner;
        // product.image = req.body.image;


        await product.save();
        await db.disconnect();
      
        return res.status(202).json({
          status: "success",
          message: "Product updated successfully",
          data: product
        });
      }   

      case 'DELETE': {
        await db.connect();
        const product = await Product.findById(id);
        await db.disconnect();

        if (!product) { 
          return res.status(404).json({ status: "fail", message: 'Product not found' });
        }
        await product.remove();
        await db.disconnect();
        return res.status(201).json({ status: "success", message: 'Product deleted successfully' });
      }


      default:{
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
};
