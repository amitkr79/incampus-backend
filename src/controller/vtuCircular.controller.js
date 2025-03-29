import VtuCircular from "../models/vtuCircular.model.js";

/**
 * GET /api/circulars
 * Fetch all circulars
 */
export const getCirculars = async (req, res) => {
  try {
    const circulars = await VtuCircular.find();

    // Convert string date to Date object and sort manually
    const sortedCirculars = circulars.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json(sortedCirculars);
  } catch (error) {
    console.error("Error fetching circulars:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

