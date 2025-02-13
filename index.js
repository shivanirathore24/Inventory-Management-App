import express from "express";
import ProductsController from "./src/controllers/product.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validateRequest from "./src/middlewares/validation.middleware.js";

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));

//Setup view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

//Serves the static files from the views directory to the browser
app.use(express.static("src/views"));

//Create an instance of ProductController
const productsController = new ProductsController();
app.get("/", productsController.getProducts);
app.get("/new-product", productsController.getAddProduct);
app.post("/", validateRequest, productsController.postAddProduct);
app.get("/update-product/:id", productsController.getUpdateProductView);
app.post("/update-product", productsController.postUpdateProduct);
app.post('/delete-product/:id', productsController.deleteProduct);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
