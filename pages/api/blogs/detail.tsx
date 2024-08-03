import connectDBV2 from "@/app/Utils/db/connection";
import { errorHandle } from "@/app/Utils/errorHandler/error";
import Blogs from "@/app/Utils/models/blogs.model";

import User from "@/app/Utils/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const blogs = await Blogs.findOne({ code: "BP-" + req.query.code });

    return res.status(200).json({
      data: blogs,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export default handler;
