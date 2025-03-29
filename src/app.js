import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import syllabusRoutes from "./routes/vtuSyllabus.routes.js";
import schemeRoutes from "./routes/vtuScheme.routes.js";
import circularRoutes from "./routes/vtuCircular.routes.js";
dotenv.config();

const app = express();

// ✅ Fix: Properly configure CORS middleware
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  

app.use(express.json()); // ✅ Ensure JSON body parsing

// ✅ Register your routes
app.use("/api/scheme", schemeRoutes);//http://localhost:8000/api/scheme?stream=UG&scheme=2022&year=I&branch=CE
app.use("/api/syllabus", syllabusRoutes); // http://localhost:8000/api/syllabus?stream=UG&scheme=2022&year=I&branch=CE
app.use("/api/circulars", circularRoutes); // http://localhost:8000/api/circulars

export { app };
