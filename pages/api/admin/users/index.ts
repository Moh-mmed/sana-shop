import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/User';
import db from '../../../../utils/db';
import { Data } from '../../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
          await db.disconnect();
          return res.status(422).json({status: 'fail', message: 'User exists already!' });
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
