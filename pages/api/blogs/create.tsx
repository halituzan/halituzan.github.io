import connectDBV2 from "@/app/Utils/db/connection";
import { errorHandle } from "@/app/Utils/errorHandler/error";
import Blogs from "@/app/Utils/models/blogs.model";
import Tags from "@/app/Utils/models/tags.model";

import User from "@/app/Utils/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
let letters = {
  ",": "",
  "!": "",
  "?": "",
  "*": "",
  ı: "i",
  ş: "s",
  ç: "c",
  ö: "o",
  ü: "u",
  ğ: "g",
  İ: "i",
  Ş: "s",
  Ç: "c",
  Ö: "o",
  Ü: "u",
  Ğ: "g",
  " ": "-",
  ".": "",
};
type LetterKeys = keyof typeof letters;
connectDBV2();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;
  const { title, content, summary, tags } = req.body;
  if (!token) {
    return;
  }
  const userId = errorHandle(token || "", req, res, "POST");
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Böyle Bir Kullanıcı Bulunamıyor" });
    }

    const currentTitle = title.toLowerCase();

    const newBlog = new Blogs({
      title,
      url: currentTitle.replaceAll(
        /[,!?*ışçöüğİŞÇÖÜĞ .]/g,
        (change: any): string => letters[change as LetterKeys]
      ),
      content,
      summary,
      tags,
      author: user.firstName + " " + user.lastName,
      userId,
    });
    await newBlog.save();
    res.status(201).json({
      message: "Blog Yazısı Başarıyla Oluşturuldu",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export default handler;
