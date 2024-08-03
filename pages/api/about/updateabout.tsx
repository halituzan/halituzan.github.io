import connectDBV2 from "@/app/Utils/db/connection";
import { errorHandle } from "@/app/Utils/errorHandler/error";
import Abouts from "@/app/Utils/models/abouts.model";
import User from "@/app/Utils/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, method } = req.body;
  const token = req.cookies.token;

  if (!token) {
    return;
  }

  const userId = errorHandle(token || "", req, res, method);

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Böyle Bir Kullanıcı Bulunamıyor" });
    }
    if (method === "POST") {
      const newAbout = new Abouts({ ...data, userId: user._id });
      await newAbout.save();
      res.status(201).json({
        message: "Hakkımda Oluşturuldu",
        status: true,
      });
    }

    if (method === "PATCH") {
      const newAbout = await Abouts.findOneAndUpdate(
        { user: user._id },
        data,
        { new: true }
      );
      res.status(200).json({
        message: "Hakkımda verisi güncellendi.",
        status: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export default handler;
