import connectDBV2 from "@/app/Utils/db/connection";
import Abouts from "@/app/Utils/models/abouts.model";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

connectDBV2();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const about = await Abouts.find({});

    const payload = {
      firstName: about[0].firstName,
      lastName: about[0].lastName,
      description: about[0].description,
      title: about[0].title,
      degree: about[0].degree,
      email: about[0].email,
      phone: about[0].phone,
      location: about[0].location,
      social: about[0].social,
      user: about[0].user,
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
