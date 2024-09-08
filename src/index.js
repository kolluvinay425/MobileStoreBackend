import app from "./app.js";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { grpcProductServer } from "./helpers/grpc/server.js";
if (!process.env.MONGO_URI) {
  throw new Error("No mongo url provided");
}
const port = process.env.PORT || 5000;

const mongoConnection = mongoose.connect(process.env.MONGO_URI);

mongoose.createConnection(process.env.MONGO_URI).asPromise();
mongoConnection.then(() => {
  app.listen(port, () => {
    grpcProductServer();
    console.log(`Connected with mongoDB at gim beam ${process.env.MONGO_URI}`);
    console.table(listEndpoints(app));
    console.log(`server running on port ${port}`);
  });
});
