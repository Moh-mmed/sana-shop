import type { NextApiRequest, NextApiResponse } from 'next'
import Blog from '../../models/Blog';
import Product from '../../models/Product';
import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';

interface Data {
  message: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  await User.deleteMany();
  await User.create(data.users);
  await Product.deleteMany();
  await Product.create(data.products);
  await Blog.deleteMany();
  await Blog.create(data.blogs);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
