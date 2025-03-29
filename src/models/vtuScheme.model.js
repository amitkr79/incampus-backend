import mongoose from "mongoose";

const vtuSchemeSchema = new mongoose.Schema({
  stream: { type: String, required: true }, // e.g., "UG" or "PG"
  scheme: { type: String, required: true }, // e.g., "2022"
  year: { type: String, required: true }, // e.g., "I", "II", ...
  branch: { type: String, required: true }, // e.g., "CSE", "CVL", ...
  title: { type: String, required: true }, // Full name (e.g., "Civil Engineering")
  date: { type: Date, default: Date.now },
  pdfLink: { type: String, required: true }, // Link to scheme PDF
});

export default mongoose.model("VtuScheme", vtuSchemeSchema);
