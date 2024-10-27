import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Help", helpSchema);
