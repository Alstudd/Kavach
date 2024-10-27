import mongoose from "mongoose";

const userKnowledgeSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UserKnowledge ||
  mongoose.model("UserKnowledge", userKnowledgeSchema);
