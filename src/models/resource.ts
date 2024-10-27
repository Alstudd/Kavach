import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    resourceName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "medical",
        "rescue",
        "shelter",
        "food_water",
        "communication",
        "transportation",
        "protective_gear",
      ],

      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resource", resourceSchema);
