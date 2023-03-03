import bcryptjs from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import db from '../../../utils/db';

type Data = {
    status: string,
    message: any,
    data?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return;
  }
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
  const newUser = new User({
    name,
    email,
    password,
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  return res.status(201).json({
    status: 'success',
    message: 'Created user!',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  });
}

