import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    linkedin: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Contact", contactSchema);
