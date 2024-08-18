import connectDBV2 from "@/app/Utils/db/connection";
import Blogs from "@/app/Utils/models/blogs.model";

import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { id } = req.query;

  // if (!id) {
  //   return;
  // }
  try {
    // const blogs = await Blogs.find({
    //   userId: id,
    // });
    const blogs = await Blogs.find({});
    return res.status(200).json({
      data: blogs,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export default handler;
