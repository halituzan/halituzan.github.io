import connectDBV2 from "@/app/Utils/db/connection";
// import sendConfirmationEmail from "@/PageApi/email/confirmation";
import User from "@/app/Utils/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
connectDBV2();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password, userName } = req.body;

  if (!firstName || !lastName || !email || !password || !userName) {
    res.status(404).json({
      message: "Lütfen gerekli alanları doldurun!",
      status: false,
    });
  }

  try {
    // Check if user already exists
    const user = await User.findOne({ email: email });
    if (user?.email === email) {
      res.status(406).json({
        message: "Bu Email İle Kullanıcı Mevcut",
        status: false,
      });
    }

    const token = jwt.sign(
      { email: email },
      process.env.JWT_SECRET || ""
    );
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Kullanıcı Başarıyla Oluşturuldu", status: true });
  } catch (error) {
    const dbError = error as any;
    if (dbError.code === 11000) {
      return res
        .status(400)
        .json({ message: "Bu e-posta adresi zaten kayıtlıdır" });
    } else {
      return res.status(500).json({
        message: "Veritabanı Bağlantısı Hatası Lütfen Bizimle İletişime Geçin",
      });
    }
  }
};

export default handler;
