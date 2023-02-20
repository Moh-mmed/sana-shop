import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
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
  const session = await getSession({ req });
  if (!session || (session.user && !session.user.isAdmin)) {
    return res.status(401).json({ status: "fail", message: 'admin sign in required' });
  }
  await db.connect();
  const users = await User.find();
  await db.disconnect();
  return res.status(200).json({
      status: "success",
      message: "All users have been fetched successfully",
      data: users
  });
};
