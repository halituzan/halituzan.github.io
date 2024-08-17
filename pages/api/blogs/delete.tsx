import connectDBV2 from "@/app/Utils/db/connection";
import { errorHandle } from "@/app/Utils/errorHandler/error";
import Blogs from "@/app/Utils/models/blogs.model";
import User from "@/app/Utils/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;
  const { id } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Yetkisiz Erişim" });
  }

  const userId = errorHandle(token || "", req, res, "DELETE");

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
    await Blogs.deleteOne({ _id: id, userId });

    res.status(200).json({
      message: "Blog Yazısı Başarıyla Silindi",
      status: true,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};

export default handler;
