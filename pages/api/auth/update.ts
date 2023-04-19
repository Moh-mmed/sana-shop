import { getSession } from 'next-auth/react';
import User from '../../../models/User';
import db from '../../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { UserTypes } from '../../../types/UserTypes';
import { Data } from '../../../types/ApiResponseTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ status: "fail", message: 'Method not allowed' });
  }

  const session = await getSession({ req }) as Session & { user: UserTypes };
  
  if (!session || !session.user) {
    return res.status(401).json({ status: "fail", message: 'sign in required' });
  }

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    return res.status(422).json({ status: 'fail', message: 'Validation error',});
  }

  const user = session?.user
  await db.connect();
  const toUpdateUser = await User.findById(user?._id);
  toUpdateUser.name = name;
  toUpdateUser.email = email;

  if (password) {
    toUpdateUser.password = password;
  }

  await toUpdateUser.save();
  await db.disconnect();
  return res.status(201).json({
    status: 'success',
    message: 'Information updated successfully!',
  });
}

