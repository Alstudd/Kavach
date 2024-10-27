import mongoose from "mongoose";

const donationBlinkSchema = new mongoose.Schema({
  disaster_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disaster",
    required: true,
  },
});

export default mongoose.models.DonationBlink ||
  mongoose.model("DonationBlink", donationBlinkSchema);
