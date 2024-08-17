import connectDBV2 from "@/app/Utils/db/connection";
import Blogs from "@/app/Utils/models/blogs.model";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Blogs.findOneAndUpdate(
      {
        code: "BP-" + req.query.code,
      },
      { $inc: { view: 1 } }
    );

    return res.status(200).json({
      message: "Beğenme işlemi gerçekleşti",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default handler;
