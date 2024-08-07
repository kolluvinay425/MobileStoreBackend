import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import productRouter from "./routes/products.js";
import cors from "cors";

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

// if (whitelist !== undefined) {
//   const corsOptions = {
//     credentials: true,
//     origin: "*",
//   };
app.use(cors(corsOptions));

app.use("/api/v1", productRouter);

export default app;