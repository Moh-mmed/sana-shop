import User from '../../../../models/User';
import db from '../../../../utils/db';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

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
  
  const session = await getSession({ req }) as Session & { user: User };

  if (!session || !session.user?.isAdmin) {
    return res.status(401).json({ status: "fail", message: 'admin sign in required' });
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).json({ status: "fail", message: 'Method not allowed' });
  }
};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.email === 'admin@example.com') {
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

