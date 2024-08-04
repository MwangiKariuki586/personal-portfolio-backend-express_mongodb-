import mongoose from "mongoose";
const { Schema } = mongoose;

const aboutSchema = new Schema(
  {
    greetings: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    first_image_url: {
      type: String,
      required: true,
    },
    second_image_url: {
      type: String,
      required: true,
    },
    resume: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
    linkedin: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    years_of_experience: {
      type: Number,
      required: true,
    },
    course_studied: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("About", aboutSchema);
