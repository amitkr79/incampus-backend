import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { vtuSyllabusScraper } from "./scrapper/vtuSyllabusScrapper.js";
import { vtuSchemeScraper } from "./scrapper/vtuSchemeScrapper.js";
import { scrapeVtuCirculars } from "./scrapper/vtuCircularScrapper.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(async () => {
    app.listen(process.env.PORT || 8000, "0.0.0.0",async () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);

      // Run Puppeteer Scraper After DB Connection
      // await vtuSyllabusScraper();
      // await vtuSchemeScraper();
      // await vtuSchemeScraper()
      // await scrapeVtuCirculars()
      // await scrapeVtuCirculars();
    });
  })
  .catch((err) => {
    console.log("❌ MONGO DB connection failed !!!", err);
  });
