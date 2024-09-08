import axios from "axios";
import { load } from "cheerio";
import Mobile from "../models/mobile.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, retries = 5, delayMs = 1000) => {
  try {
    return await axios.get(url);
  } catch (error) {
    if (retries === 0 || error.response.status !== 429) {
      throw error;
    }
    await delay(delayMs);
    return fetchWithRetry(url, retries - 1, delayMs * 2);
  }
};

const scrapeMobileData = async (req, res) => {
  try {
    const { data } = await fetchWithRetry("https://www.gsmarena.com/");
    const $ = load(data);

    const mobiles = [];
    const mobileLinks = [];

    $(".makers ul li a").each((index, element) => {
      if (index < 10) {
        // Limit to 10 mobile phones
        const link = $(element).attr("href");
        mobileLinks.push(`https://www.gsmarena.com/${link}`);
      }
    });

    console.log("Mobile Links:", mobileLinks); // Log the links to verify

    for (const link of mobileLinks) {
      await delay(2000); // Add a 2-second delay between requests
      const { data: mobileData } = await fetchWithRetry(link);
      const $$ = load(mobileData);

      // Log the HTML structure to verify selectors
      console.log($$.html());

      const brand = $$(".brand").text() || "N/A";
      const model = $$(".specs-phone-name-title").text() || "N/A";
      const price = $$(".price").text() || "N/A";
      const specs = {
        screen: $$(".specs .screen").text() || "N/A",
        battery: $$(".specs .battery").text() || "N/A",
        camera: $$(".specs .camera").text() || "N/A",
      };

      console.log("Scraped Data:", { brand, model, price, specs }); // Log the scraped data to verify

      mobiles.push({ brand, model, price, specs });
    }

    await Mobile.insertMany(mobiles);
    console.log("Mobile data saved to MongoDB");

    return res.status(200).json({ mobiles: mobiles });
  } catch (error) {
    console.error("Error scraping mobile data:", error);
    return res.status(500).json({ error: "Error scraping mobile data" });
  }
};

export { scrapeMobileData };
