import express from "express";
import { getSyllabus } from "../controller/vtuSyllabus.controller.js";

const router = express.Router();

// e.g., GET /api/syllabus?stream=UG&scheme=2022&year=I&branch=CE
router.get("/", getSyllabus);

export default router;
