import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    project_name: {
      type: String,
      required: true,
      unique: true,
    },
    project_image: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
    demo_link: {
      type: String,
      required: true,
      unique: true,
    },
    github_link: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
