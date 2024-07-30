import mongoose from "mongoose";
const { Schema } = mongoose;

const BackendSchema = new Schema(
  {
    technology: {
      type: String,
      required: true,
      unique: true,
    },
    level_rank: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Backend", BackendSchema);
