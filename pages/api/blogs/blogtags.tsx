import connectDBV2 from "@/app/Utils/db/connection";
import Blogs from "@/app/Utils/models/blogs.model";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tag } = req.query;
  console.log("tag", tag);
  console.log("tagasdasdasd");

  if (!tag) {
    return res.status(400).json({ message: "Tag is required" });
  }

  try {
    const blogs = await Blogs.find({ "tags.url": tag });
    console.log("blogs", blogs);

    return res.status(200).json({
      data: blogs,
      status: true,
    });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
