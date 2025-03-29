import express from "express";
import { getCirculars } from "../controller/vtuCircular.controller.js";

const router = express.Router();

router.get("/", getCirculars); // GET /api/circulars

export default router;
