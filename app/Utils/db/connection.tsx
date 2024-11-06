import mongoose from "mongoose";

const connectDBV2 = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Version 2 connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDBV2;
