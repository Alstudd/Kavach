import mongoose from "mongoose";

const disasterSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    disasterType: {
      type: String,
      enum: [
        "earthquake",
        "tsunami",
        "flood",
        "landslide",
        "forest_fire",
        "hurricane",
        "tornado",
        "volcano_eruption",
        "chemical_leak",
        "nuclear_accident",
        "oil_spill",
        "industrial_fire",
        "transport_accident",
        "disease_outbreak",
        "building_collapse",
        "dam_failure",
        "bomb_explosion",
        "hostage_crisis",
        "armed_conflict",
      ],

      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    help_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
      required: true,
    },
    status: {
      type: String,
      default: "on-going",
      enum: ["rescued", "on-going"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Disaster ||
  mongoose.model("Disaster", disasterSchema);
