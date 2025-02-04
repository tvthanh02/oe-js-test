import jsonServer from "json-server";
import filterMiddleware from "./middlewares/filter.js";
import productController from "./controllers/product.js";
import storeController from "./controllers/store.js";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(filterMiddleware);

server.get("/api/store/:storeId/products", productController.getProducts);
server.get("/api/stores/", storeController.getStores);
server.get("/api/store/:storeId/", storeController.getStore);

server.listen(3000, (err) => {
  if (err) {
    console.error("Error starting server", err);
  } else {
    console.log("JSON Server is running");
  }
});
