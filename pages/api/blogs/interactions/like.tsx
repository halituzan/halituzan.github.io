import connectDBV2 from "@/app/Utils/db/connection";
import Blogs from "@/app/Utils/models/blogs.model";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const blogs = await Blogs.findOneAndUpdate(
      {
        code: "BP-" + req.query.code,
      },
      { $inc: { like: 1 } }, // 'like' değerini bir artır
      { new: true } // Güncellenmiş belgeyi döndür
    );
    console.log("blogs", "BP-" + req.query.code);

    return res.status(200).json({
      message: "Beğenme işlemi gerçekleşti",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default handler;
