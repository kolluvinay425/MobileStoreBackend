import axios from "axios";
import { load } from "cheerio";

const scrapeBikeData = async (req, res) => {
  try {
    const { data } = await axios.get("https://www.bikewale.com/");
    const $ = load(data);

    const bikes = [];

    $(".bike-card").each((index, element) => {
      const brand = $(element).find(".brand-name").text().trim();
      const model = $(element).find(".model-name").text().trim();
      const type = $(element).find(".bike-type").text().trim();
      const price = parseInt(
        $(element)
          .find(".price")
          .text()
          .replace(/[^0-9]/g, ""),
        10
      );

      if (brand && model && type && price) {
        bikes.push({ brand, model, type, price });
      } else {
        console.log("no data ---->");
      }
    });

    return res.status(200).json(bikes);
  } catch (error) {
    console.error("Error scraping data:", error);
    return [];
  }
};

export { scrapeBikeData };
