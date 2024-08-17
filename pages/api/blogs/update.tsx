import connectDBV2 from "@/app/Utils/db/connection";
import { errorHandle } from "@/app/Utils/errorHandler/error";
import Blogs from "@/app/Utils/models/blogs.model";
import Tags from "@/app/Utils/models/tags.model";
import User from "@/app/Utils/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;
  const { id, title, content, summary, tags } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Yetkisiz Erişim" });
  }

  const userId = errorHandle(token || "", req, res, "PATCH");

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Böyle Bir Kullanıcı Bulunamıyor" });
    }

    const blog = await Blogs.findOne({ _id: id, userId });
    if (!blog) {
      return res.status(404).json({ message: "Blog Yazısı Bulunamadı" });
    }

    blog.title = title;
    blog.content = content;
    blog.summary = summary;
    blog.tags = tags;
    await blog.save();

    res.status(200).json({
      message: "Blog Yazısı Başarıyla Güncellendi",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default handler;
