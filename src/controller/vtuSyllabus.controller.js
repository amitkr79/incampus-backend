import VtuSyllabus from "../models/vtuSyllabus.model.js";

/**
 * GET /api/syllabus?stream=UG&scheme=2022&year=I&branch=CSE
 * Fetch syllabus by all four fields
 */
export const getSyllabus = async (req, res) => {
  try {
    const { stream, scheme, year, branch } = req.query;

    // Ensure all params are provided
    if (!stream || !scheme || !year || !branch) {
      return res.status(400).json({ message: "Missing query parameters" });
    }

    const data = await VtuSyllabus.findOne({ stream, scheme, year, branch });
    if (!data) {
      return res.status(404).json({ message: "No syllabus found for the given query" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
