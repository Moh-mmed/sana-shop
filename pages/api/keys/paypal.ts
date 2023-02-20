import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

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
  if (!session) {
    return res.status(401).json({status:'fail', message: "You must be logged in." });
  }
  return res.status(200).json({
      status: "success",
      message: "The order has been fetched successfully",
       data: {
        clientId: process.env.PAYPAL_CLIENT_ID || 'sb'
      }
  });
};
