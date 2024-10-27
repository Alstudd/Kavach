import mongoose from "mongoose";

const resourceAllocationSchema = new mongoose.Schema(
  {
    resource_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    disaster_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ResourceAllocation", resourceAllocationSchema);
