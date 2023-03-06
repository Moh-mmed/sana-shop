import User from '../../../../models/User';
import db from '../../../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { Data } from '../../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query } = req;
  const { id } = query
  
  try {
    switch (method) {
      case 'GET': {
        await db.connect();
        const user = await User.findById(id);
        await db.disconnect();
        
        return res.status(200).json({
          status: "success",
          message: "User has been fetched successfully",
          data: user
        });
      }
        
      case 'DELETE': {
        await db.connect();
        const user = await User.findById(req.query.id);
        
        if (!user) {
          return res.status(400).json({ status: "fail", message: 'User not found' });
        }

        if (user.isAdmin) {
          return res.status(400).json({ status: "fail", message: 'Cannot delete admin' });
        }

        await user.remove();
        await db.disconnect();
        return res.status(201).json({ status: "success", message: 'User deleted successfully' });
      }
      
      case 'PUT': {
        const { name, email, isAdmin, password} = req.body
        if ( !name || !email || !email.includes('@')) {
          return res.status(422).json({ status: 'fail', message: 'Validation error',});
        }

        await db.connect();
        const user = await User.findById(id);

        if (!user) {
          await db.disconnect();
          return res.status(404).json({ status: "fail", message: 'User not found' });
        }
        user.name=name
        user.email=email
        user.isAdmin = isAdmin

        if (password) {
          user.password = password;
        }
        await user.save();
        await db.disconnect();
      
        return res.status(202).json({
          status: "success",
          message: "User updated successfully",
          data: user
        });
      }
      
      default: {
        return res.status(405).json({ status: "fail", message: 'Method not allowed' });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
};

