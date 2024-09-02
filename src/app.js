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

export default app;
