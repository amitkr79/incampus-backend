import mongoose from "mongoose";

const smvitCircularSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["pdf", "doc", "image"], // Can be extended
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt
);

const SmvitCircular = mongoose.model("SmvitCircular", smvitCircularSchema);

export default SmvitCircular;
