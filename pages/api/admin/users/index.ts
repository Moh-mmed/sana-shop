import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import db from '../../../../utils/db';

type Data = {
    status: string,
    message: any,
    data?: object
}

interface User {
  _id?:string,
  name?: string,
  email?: string,
  image?: string,
  isAdmin?: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const session = await getSession({ req })
  // if (!session || !session.user.isAdmin) {
  //   return res.status(401).json({ status: "fail", message: 'admin sign in required' });
  // }
  const { method } = req;

 switch (method) {
   case 'GET': {
    
    try {
        await db.connect();
        const users = await User.find();
        await db.disconnect();
      
        return res.status(200).json({
          status: "success",
          message: "All users have been fetched successfully",
          data: users
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
