import { NextApiRequest, NextApiResponse } from "next";
import { Data } from "../../../types/ApiResponseTypes";
const cloudinary = require('cloudinary').v2;
// export default function signature(req, res) {

// }
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) { 

  if (req.method !== 'GET') {
    return res.status(405).json({ status: "fail", message: 'Method not allowed' });
  } 

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );
    
  return res.status(200).json({ status: "success", message: 'Signature created successfully', data: { signature, timestamp }});
}