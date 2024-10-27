import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    disaster_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Alert", alertSchema);
