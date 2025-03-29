import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    code: String,
    title: String,
    pdfLink: String,
    date: String,
  },
  { _id: false }
);

const VtuSyllabusSchema = new mongoose.Schema(
  {
    stream: { type: String, required: true }, // "UG" or "PG"
    scheme: { type: String, required: true }, // e.g. "2022"
    year:   { type: String, required: true }, // "I", "II", etc.
    
    branch: { type: String, required: true }, // short code, e.g. "AI/ML"
    title:  { type: String },                 // full label, e.g. "Artificial Intelligence ..."
    
    subjects: {
      type: [SubjectSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("VtuSyllabus", VtuSyllabusSchema);
