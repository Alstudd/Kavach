import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  donation_blink_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DonationBlink",
    required: true,
  },
});

export default mongoose.models.Donation ||
  mongoose.model("Donation", donationSchema);
