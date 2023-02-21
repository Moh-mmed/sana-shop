import { getSession } from 'next-auth/react';
import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    status: string,
    message: any,
    data?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // if (req.method !== 'PUT') {
  //   return res.status(400).send({ message: `${req.method} not supported` });
  // }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ status: 'fail', message: 'signin required' });
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
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  console.log(user)
  await db.disconnect();
  return res.status(201).json({
    status: 'success',
    message: 'User updated',
  });
}

