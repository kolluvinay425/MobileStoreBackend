import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(
  process.cwd(),
  "./src/proto/ProductService.proto"
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const {
  product: { ProductService },
} = protoDescriptor;

const getProduct = (call, callback) => {
  callback(null, {
    product_id: call.request.product_id,
    product_name: "Product A",
    account_id: "123",
  });
};

const grpcProductServer = () => {
  const server = new grpc.Server();

  server.addService(ProductService.service, {
    getProduct: getProduct,
  });

  const grpcAddress = "0.0.0.0:50052";
  server.bindAsync(
    grpcAddress,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Receiving data from ${grpcAddress}`);
        server.start();
      }
    }
  );
};

export { grpcProductServer };
