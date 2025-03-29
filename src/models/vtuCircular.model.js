import mongoose from "mongoose";

const vtuCircularSchema = new mongoose.Schema(
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
      type: String, // Storing as String to avoid parsing errors
      required: true,
    },
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt
);

const VtuCircular = mongoose.model("VtuCircular", vtuCircularSchema);

export default VtuCircular;
