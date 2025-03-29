import express from "express";
import { getScheme } from "../controller/vtuScheme.controller.js";

const router = express.Router();

// e.g., GET /api/scheme?stream=UG&scheme=2022&year=I&branch=CSE
router.get("/", getScheme);

export default router;
