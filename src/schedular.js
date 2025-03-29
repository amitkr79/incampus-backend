import cron from "node-cron";
import { scrapeVtuCirculars } from "./scrapper/vtuCircularScrapper.js";  // Import the scraper

// Schedule to run every day at 6 AM
cron.schedule("0 6 * * *", async () => {
  console.log("🕕 Running VTU Circulars Scraper at 6 AM...");
  await scrapeVtuCirculars();
  console.log("✅ Scraper Execution Completed.");
});


// Run the script immediately when started
(async () => {
  console.log("🚀 Initializing Scheduler...");
  await scrapeVtuCirculars();
})();
