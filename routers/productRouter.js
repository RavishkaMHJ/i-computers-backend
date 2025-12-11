import express from "express"
import { createProductAsync, deleteProductAsync, getProductAsync, getProductByIdAsync, updateProductAsync } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/",createProductAsync);
productRouter.get("/",getProductAsync);
productRouter.delete("/:productId",deleteProductAsync);
productRouter.put("/:productId",updateProductAsync);
productRouter.get("/:productId",getProductByIdAsync);

export default productRouter;