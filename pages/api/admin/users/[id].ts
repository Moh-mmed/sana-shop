import User from '../../../../models/User';
import db from '../../../../utils/db';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { UserTypes } from '../../../../types/DataTypes';

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
  
  switch (method) {
    case 'GET': {
      try {
        await db.connect();
        const user = await User.findById(id);
        await db.disconnect();
        
        return res.status(200).json({
          status: "success",
          message: "User has been fetched successfully",
          data: user
        });
        
        } catch (error) {
            return res.status(500).json({ status: "fail", message: error });
        }
    }
    case 'DELETE': {
      return deleteHandler(req, res);
    }
    case 'PUT': {
      const { name, email, isAdmin} = req.body
      if ( !name || !email || !email.includes('@')) {
        return res.status(422).json({ status: 'fail', message: 'Validation error',});
      }

      try {
        await db.connect();
        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json({ status: "fail", message: 'User not found' });
        }

        user.name=name
        user.email=email
        user.isAdmin = isAdmin

        await user.save();
        await db.disconnect();
      
        return res.status(202).json({
          status: "success",
          message: "User updated successfully",
          data: user
        });
        
        } catch (error) {
          return res.status(500).json({ status: "fail", message: error });
      }
   }
    default:{
      return res.status(405).json({ status: "fail", message: 'Method not allowed' });
    }
    }

};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.isAdmin) {
      return res.status(400).json({ status: "fail", message: 'Cannot delete admin' });
    }
    await user.remove();
    await db.disconnect();
    return res.status(201).json({ status: "success", message: 'User Deleted' });
  } else {
    await db.disconnect();
    return res.status(400).json({ status: "fail", message: 'User not found' });
  }
};

