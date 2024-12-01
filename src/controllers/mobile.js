import axios from "axios";
import Mobile from "../models/mobile.js";
import { load } from "cheerio";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 1, // per 1 second
});

const generateMobileData = async () => {
  try {
    await rateLimiter.consume(1); // Consume 1 point per request

    const { data } = await axios.get(
      "https://www.samsung.com/us/smartphones/all-smartphones"
    ); // Replace with actual URL
    const $ = load(data);

    const samsungPhones = [];
    $("div.product-card").each((i, element) => {
      const model = $(element).find(".product-card__name").text().trim();
      const price = $(element).find(".product-card__price").text().trim();
      const image = $(element).find("img").attr("src");
      const detailLink = $(element).find("a").attr("href");

      if (model) {
        samsungPhones.push({
          model,
          brand: "Samsung",
          price,
          image,
          detailLink,
        });
      }
    });

    for (let phone of samsungPhones) {
      await rateLimiter.consume(1); // Consume 1 point per request
      const detailData = await axios.get(
        `https://www.samsung.com${phone.detailLink}`
      );
      const $$ = cheerio.load(detailData.data);

      phone.processor = $$("div.specs-processor").text().trim();
      phone.ram = $$("div.specs-ram").text().trim();
      phone.storage = $$("div.specs-storage").text().trim();
      phone.battery = $$("div.specs-battery").text().trim();
      phone.camera = $$("div.specs-camera").text().trim();
      phone.screenSize = $$("div.specs-screen-size").text().trim();
      phone.operatingSystem = $$("div.specs-operating-system").text().trim();
      phone.releaseDate = $$("div.specs-release-date").text().trim();
      phone.color = $$("div.specs-color").text().trim();
      phone.shortDescription = $$("div.specs-short-description").text().trim();
      phone.longDescription = $$("div.specs-long-description").text().trim();
    }

    return samsungPhones;
  } catch (error) {
    if (error instanceof RateLimiterMemory.ResError) {
      console.error(
        "Rate limit exceeded. Waiting for the next available slot."
      );
      await rateLimiter.waitPoints(1); // Wait for the next available slot
      return generateMobileData(); // Retry the request
    } else {
      console.error("Error scraping mobile data:", error);
      throw error;
    }
  }
};
const scrapeMobileData = async (req, res) => {
  try {
    const samsungPhones = await generateMobileData();
    console.log("---------_>", samsungPhones);
    for (let phone of samsungPhones) {
      const newMobile = new Mobile(phone);
      await newMobile.save();
    }
    res.send(
      "Samsung mobiles with detailed specifications generated and saved to the database!"
    );
  } catch (error) {
    console.error("Error scraping mobile data:", error);
    res.status(500).json({ error: "Error scraping mobile data" });
  }
};

export { scrapeMobileData };
