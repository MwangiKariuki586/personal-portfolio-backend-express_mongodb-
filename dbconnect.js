import mongoose from "mongoose";
import { config } from "dotenv";
config();
export const mongoConect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
    await mongoose.connect(process.env.MONGO_URI);
  }
};
