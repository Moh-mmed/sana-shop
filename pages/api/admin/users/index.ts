import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import db from '../../../../utils/db';
import { UserTypes } from '../../../../types/UserTypes';
import { Data } from '../../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req }) as Session & { user: UserTypes };

  // if (!session || !session.user?.isAdmin) {
  //   return res.status(401).json({ status: "fail", message: 'admin sign in required' });
  // }
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
            await db.connect();
            const users = await User.find();
            await db.disconnect();
          
            return res.status(200).json({
              status: "success",
              message: "All users have been fetched successfully",
              data: users
            });

      }
      case 'POST': {
        const { name, email, password } = req.body;

        if (
          !name ||
          !email ||
          !email.includes('@') ||
          !password ||
          password.trim().length < 5
        ) {
          return res.status(422).json({
          status: 'fail', message: 'Validation error',
          });
        }
        await db.connect();
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
          res.status(422).json({status: 'fail', message: 'User exists already!' });
          await db.disconnect();
          return;
        }

        const user = await User.create(req.body);
        await db.disconnect();

        return res.status(202).json({
          status: "success",
          message: "User created successfully",
          data: user
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
