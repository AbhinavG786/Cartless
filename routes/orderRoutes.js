import { Router } from "express";

import {
  createOrder,
  getAllOrdersForUser,
  updateOrderTotalPrice,
  deleteOrder,
} from "../controllers/orderController.js";

const router = Router();

router.post("/", createOrder);

router.get("/user/:userId", getAllOrdersForUser);

router.put("/:orderId", updateOrderTotalPrice);

router.delete("/:orderId", deleteOrder);

export default router;
