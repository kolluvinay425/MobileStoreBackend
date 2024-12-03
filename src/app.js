import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import productRouter from "./routes/products.js";
import mobileRouter from "./routes/mobile.js";
import cors from "cors";
import bikeRouter from "./routes/bike.js";

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// ******************** ROUTES ******************************

/*cors rules*/

var whitelist = [
  "http://localhost:3000",
  "https://dev.d3hbu45mo04vpo.amplifyapp.com",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://hopeful-list-368909.oa.r.appspot.com",
  "https://dev.aladia.io",
  "https://www.dev.aladia.io",
  "https://dev.site.aladia.io",
  "https://aladia.io",
  "http://aladia.io",
  "https://www.aladia.io",
  "http://www.aladia.io",
  "https://dashboard.stripe.com",
  "https://js.stripe.com",
  "http://192.168.150.57:3000",
  "http://93.34.232.3:3000",
  "https://aladia.stoplight.io",
  "http://load-balancer-for-products-1598262599.eu-central-1.elb.amazonaws.com",
];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed`));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api/v1", productRouter);
app.use("/api/v1", mobileRouter);
app.use("/api/v1", bikeRouter);

import { faker } from "@faker-js/faker";
import Mobile from "./models/mobile.js";
import { brandsAndModels } from "./helpers/grpc/mobileData/index.js";
// Route for generating and inserting fake mobile data
app.get("/generate-fake-mobile-data", (req, res) => {
  const generateFakeMobileData = (brand, model) => {
    const colors = faker.helpers.arrayElements(
      ["Red", "Blue", "Green", "Black", "White", "Silver", "Gold", "Purple"],
      faker.number.int({ min: 3, max: 5 }) // Generate between 3 to 5 colors
    );

    return colors.map((color) => ({
      brand,
      brandImage: faker.image.url(),
      model,
      price: faker.commerce.price(),
      specs: {
        screen: faker.helpers.arrayElement([
          "5.5-inch",
          "6.1-inch",
          "6.7-inch",
        ]),
        battery: faker.helpers.arrayElement(["3000mAh", "4000mAh", "5000mAh"]),
        camera: faker.helpers.arrayElement(["12MP", "48MP", "64MP", "108MP"]),
      },
      image: faker.image.url(),
      processor: faker.helpers.arrayElements(
        ["Snapdragon", "Exynos", "A14 Bionic", "A15 Bionic"],
        2
      ),
      ram: faker.helpers.arrayElements(["4GB", "6GB", "8GB", "12GB"], 2),
      storage: faker.helpers.arrayElements(
        ["64GB", "128GB", "256GB", "512GB"],
        2
      ),
      battery: faker.helpers.arrayElements(
        ["3000mAh", "4000mAh", "5000mAh"],
        2
      ),
      camera: faker.helpers.arrayElements(["12MP", "48MP", "64MP", "108MP"], 2),
      screenSize: faker.helpers.arrayElements(
        ["5.5-inch", "6.1-inch", "6.7-inch"],
        2
      ),
      operatingSystem: faker.helpers.arrayElements(["iOS", "Android"], 1),
      releaseDate: [faker.date.past()],
      color,
      shortDescription: faker.commerce.productDescription(),
      longDescription: faker.lorem.paragraphs(),
    }));
  };
  const fakeMobiles = [];
  for (const brand in brandsAndModels) {
    const models = brandsAndModels[brand];
    models.forEach((model) => {
      fakeMobiles.push(...generateFakeMobileData(brand, model));
    });
  }
  Mobile.insertMany(fakeMobiles)
    .then(() => {
      res.json(fakeMobiles);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error inserting data" });
    });
});

export default app;
