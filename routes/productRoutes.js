import { Router } from "express";

import {
  createProduct,
  getProductByGtin,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../controllers/productController.js";
const router = Router();

router.post("/", createProduct);

router.get("/gtin/:gtin", getProductByGtin);

router.put("/:productId", updateProduct);

router.delete("/:productId", deleteProduct);

router.get('/search', searchProducts);

export default router;
