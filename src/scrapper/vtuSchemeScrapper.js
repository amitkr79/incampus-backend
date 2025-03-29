import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import VtuScheme from "../models/vtuScheme.model.js";

puppeteer.use(StealthPlugin());

export const vtuSchemeScraper = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://vtu.ac.in/b-e-scheme-syllabus/", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const schemes = await page.evaluate(() => {
      const results = [];
      const rows = Array.from(document.querySelectorAll("table tr"));

      rows.forEach((row) => {
        const tds = row.querySelectorAll("td");
        if (tds.length < 3) return;
        const courseTitle = tds[1].innerText.trim();
        const linkElement = tds[2].querySelector("a");

        if (!linkElement) return;

        const pdfLink = linkElement.href;
        const date = new Date().toISOString();

        results.push({
          courseTitle,
          pdfLink,
          date,
        });
      });

      return results;
    });

    console.log("Scraped Scheme Data:", JSON.stringify(schemes, null, 2));

    for (const { courseTitle, pdfLink } of schemes) {
      const [title, branchRaw] = courseTitle.split("(");
      const branch = branchRaw?.replace(")", "").trim() || "Unknown";

      const existingScheme = await VtuScheme.findOne({ title: title.trim() });

      if (!existingScheme) {
        await VtuScheme.create({
          stream: "UG",
          scheme: "2022",
          year: "I",
          branch,
          title: title.trim(),
          pdfLink,
        });
        console.log(`✅ Inserted: ${title.trim()}`);
      } else {
        console.log(`🔄 Already Exists: ${title.trim()}`);
      }
    }

    console.log("✅ Scheme Scraping Completed!");
  } catch (error) {
    console.error("❌ Error during scraping:", error);
  } finally {
    await browser.close();
  }
};
