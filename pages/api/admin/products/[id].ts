import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';
import { Data } from '../../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query, body } = req;
  const { id } = query
  
  
    switch (method) {
      case 'GET': {
        try {
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
        } catch (error) {
          return res.status(500).json({ status: "fail", message: error });
        }
      }
         
      case 'PUT': {
        try {
          await db.connect();
          const product = await Product.findById(id);
          
          if (!product) {
            await db.disconnect();
            return res.status(404).json({ status: "fail", message: 'Product not found' });
          }

          product.name = body.name;
          product.brand = body.brand;
          product.category = body.category;
          product.gender = body.gender;
          product.price = body.price;
          product.countInStock = body.countInStock;
          product.description = body.description;
          product.isFeatured = body.isFeatured;
          if (body.image) {
            product.banner = body.image;
            product.image = body.image;
          }

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
        try {
          await db.connect();
          const product = await Product.findById(id);
          
          if (!product) { 
            await db.disconnect();
            return res.status(404).json({ status: "fail", message: 'Product not found' });
          }
          await product.remove();
          await db.disconnect();

          return res.status(201).json({ status: "success", message: 'Product deleted successfully' });
          
        } catch (error) {
          return res.status(500).json({ status: "fail", message: error });
        }
      }

      default:{
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
      }
    }
};
