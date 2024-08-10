import connectDBV2 from "@/app/Utils/db/connection";
import Blogs from "@/app/Utils/models/blogs.model";

import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { s } = req.query;
  console.log("ssssss",s);
  
  try {
    const blogs = await Blogs.find({
      $or: [
        { title: { $regex: s, $options: "i" } }, // i: Case insensitive
        { content: { $regex: s, $options: "i" } },
      ],
    });

    return res.status(200).json({
      data: blogs,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export default handler;
