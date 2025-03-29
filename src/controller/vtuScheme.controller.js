import VtuScheme from "../models/vtuScheme.model.js";

/**
 * GET /api/scheme?stream=UG&scheme=2022&year=I&branch=CE
 * Fetch scheme by all four fields
 */
export const getScheme = async (req, res) => {
  try {
    const { stream, scheme, year, branch } = req.query;

    // Ensure all params are provided
    if (!stream || !scheme || !year || !branch) {
      return res.status(400).json({ message: "Missing query parameters" });
    }

    const data = await VtuScheme.findOne({ stream, scheme, year, branch });
    if (!data) {
      return res.status(404).json({ message: "No scheme found for the given query" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching scheme:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
