import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      ref: "User",
      required: true,
    },
    disaster_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Volunteer", volunteerSchema);
