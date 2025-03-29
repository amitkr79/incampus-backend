import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import VtuSyllabus from "../models/vtuSyllabus.model.js";
import { branchMap } from "../utils/branchMap.js";

puppeteer.use(StealthPlugin());

export const vtuSyllabusScraper = async () => {
  // const browser = await puppeteer.launch({ headless: true, slowMo: 100 });
  // const page = await browser.newPage();

  // try {
  //   await page.goto("https://vtu.ac.in/b-e-scheme-syllabus/", {
  //     waitUntil: "networkidle2",
  //     timeout: 60000,
  //   });
  //   const data = await page.evaluate(() => {
  //     const results = [];
  //     const headings = Array.from(document.querySelectorAll('h5'));

  //     headings.forEach((heading) => {
  //       const headingText = heading.textContent.trim();
  //       const branch = headingText.replace("Stream Syllabus", "").trim();

  //       if (!branch) return;

  //       let table = heading.nextElementSibling;
  //       if (!table || table.tagName !== "TABLE") {
  //         table = heading.parentElement.querySelector("table");
  //       }
  //       if (!table) return;

  //       const rows = Array.from(table.querySelectorAll("tr"));
  //       const subjects = rows.map((row) => {
  //         const tds = row.querySelectorAll("td");
  //         if (tds.length < 3) return null;

  //         const subjectText = tds[1].innerText.trim();
  //         const anchor = tds[2].querySelector("a");
  //         if (!anchor) return null;

  //         const pdfLink = anchor.href;
  //         const date = new Date().toISOString();

  //         const [code, ...rest] = subjectText.split(" ");
  //         const title = rest.join(" ").trim();

  //         return { code, title, pdfLink, date };
  //       }).filter(Boolean);

  //       results.push({ branch, subjects });
  //     });

  //     return results;
  //   });
  //   console.log("Scraped Data:", JSON.stringify(data, null, 2));

  //   for (const { branch, subjects } of data) {
  //     const branchInfo = branchMap[branch];
  //     if (!branchInfo) {
  //       console.log(`Skipping unknown branch: ${branch}`);
  //       continue;
  //     }

  //     const existingDoc = await VtuSyllabus.findOne({
  //       stream: "UG",
  //       scheme: "2022",
  //       year: "I",
  //       branch: branchInfo.code,
  //     });

  //     if (!existingDoc) {
  //       await VtuSyllabus.create({
  //         stream: "UG",
  //         scheme: "2022",
  //         year: "I",
  //         branch: branchInfo.code,
  //         title: branchInfo.label,
  //         subjects,
  //       });
  //       console.log(`Inserted new syllabus for ${branchInfo.code}`);
  //     } else {
  //       let addedCount = 0;
  //       subjects.forEach((subj) => {
  //         if (!existingDoc.subjects.some((s) => s.pdfLink === subj.pdfLink)) {
  //           existingDoc.subjects.push(subj);
  //           addedCount++;
  //         }
  //       });

  //       if (addedCount > 0) {
  //         await existingDoc.save();
  //         console.log(`Updated syllabus for ${branchInfo.code}, added ${addedCount} new subjects.`);
  //       }
  //     }
  //   }

  //   console.log("✅ Scraping completed!");
  // } catch (error) {
  //   console.error("❌ Error during scraping:", error);
  // } finally {
  //   await browser.close();
  // }
};
