import { Router } from "express";

import {
  createCartItem,
  getCartItemById,
  getCartRecommendationsByTags,
  updateCartItemQuantity,
  deleteCartItem,
} from "../controllers/cartItemController.js";

const router = Router();

router.post("/", createCartItem);

router.get("/:cartItemId", getCartItemById);

router.get('/cart/:cartId/recommendations', getCartRecommendationsByTags);

router.put("/:cartItemId", updateCartItemQuantity);

router.delete("/:cartItemId", deleteCartItem);

export default router;
