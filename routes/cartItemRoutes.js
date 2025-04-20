import { Router } from "express";

import {
  createCartItem,
  getCartItemById,
  updateCartItemQuantity,
  deleteCartItem,
} from "../controllers/cartItemController.js";

const router = Router();

router.post("/", createCartItem);

router.get("/:cartItemId", getCartItemById);

router.put("/:cartItemId", updateCartItemQuantity);

router.delete("/:cartItemId", deleteCartItem);

export default router;
