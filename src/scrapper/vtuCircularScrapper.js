import puppeteer from "puppeteer";
import VtuCircular from "../models/vtuCircular.model.js";

const VTU_CIRCULAR_URL = "https://vtu.ac.in/category/examination/";

export const scrapeVtuCirculars = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(VTU_CIRCULAR_URL, { waitUntil: "load", timeout: 0 });

    // Scrape circular data from the main page inside .entry-content
    const circulars = await page.evaluate(() => {
      const data = [];
      document.querySelectorAll(".entry-content .entry-title a").forEach((element) => {
        const title = element.innerText.trim();
        const firstLevelLink = element.href;

        // Extract date from the page
        const dateElement = element.closest("article").querySelector(".entry-date");
        const day = dateElement?.querySelector(".entry-day")?.innerText.trim();
        const monthYear = dateElement?.querySelector(".entry-month")?.innerText.trim();
        const formattedDate = day && monthYear ? `${day} ${monthYear}` : "Unknown Date";

        data.push({ title, firstLevelLink, date: formattedDate });
      });
      return data;
    });

    const finalCirculars = [];

    // Visit each first-level link to extract the final PDF link
    for (let item of circulars) {
      const newPage = await browser.newPage();
      await newPage.goto(item.firstLevelLink, { waitUntil: "load", timeout: 0 });

      const pdfLink = await newPage.evaluate(() => {
        const attachmentDiv = document.querySelector(".zattach"); // Target .zattach class for PDF link
        if (!attachmentDiv) return null;
        const pdfAnchor = attachmentDiv.querySelector("a[href$='.pdf']");
        return pdfAnchor ? pdfAnchor.href : null;
      });

      await newPage.close();

      if (pdfLink) {
        finalCirculars.push({
          text: item.title,      // Maps to the "text" field in the schema
          link: pdfLink,         // Maps to the "link" field
          type: "pdf",           // Fixed value "pdf"
          date: item.date,       // Use the extracted date from the main page
        });
      }
    }

    await browser.close();

    // Store the finalCirculars data in MongoDB
    for (let circular of finalCirculars) {
      await VtuCircular.findOneAndUpdate(
        { link: circular.link }, // Use the final PDF link as the unique identifier
        circular,
        { upsert: true, new: true }
      );
    }

    console.log("✅ VTU Circulars Scraped and Stored Successfully!");
  } catch (error) {
    console.error("❌ Error scraping VTU Circulars:", error);
    await browser.close();
  }
};
