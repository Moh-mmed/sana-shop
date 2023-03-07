import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';
import { Data } from '../../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query } = req;
  const { id } = query
  
    switch (method) {
      case 'GET': {
        await db.connect();
        const product = await Product.findById(id);
        await db.disconnect();
        
        if (!product) {
          return res.status(404).json({ status: "fail", message: 'Product not found' });
        }

        return res.status(200).json({
          status: "success",
          message: "Product has been fetched successfully",
          data: product
        });
      }
         
      case 'PUT': {

        try {

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
        product.isFeatured = req.body.isFeatured;
        // product.banner = req.body.banner;
        product.image = req.body.image;
        
        await product.save();
        await db.disconnect();
        
        return res.status(202).json({
          status: "success",
          message: "Product updated successfully",
          data: product
        });
        } catch (error) {
          return res.status(500).json({ status: "fail", message: error });
        }
      }   

      case 'DELETE': {
        await db.connect();
        const product = await Product.findById(id);
        
        if (!product) { 
          await db.disconnect();
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
};
