import connectDBV2 from "@/app/Utils/db/connection";
import Abouts from "@/app/Utils/models/abouts.model";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id;

  try {
    const about = await Abouts.findOne({ user: userId });

    const payload = {
      firstName: about.firstName,
      lastName: about.lastName,
      description: about.description,
      title: about.title,
      degree: about.degree,
      email: about.email,
      phone: about.phone,
      location: about.location,
      social: about.social,
      user: about.user,
    };

    return res.status(200).json({
      data: payload,
      status: true,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
