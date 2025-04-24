import { Router } from "express";

import {
  createProduct,
  getProductByGtin,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
const router = Router();

router.post("/", createProduct);

router.get("/gtin/:gtin", getProductByGtin);

router.put("/:productId", updateProduct);

router.delete("/:productId", deleteProduct);

export default router;
