import { Router } from "express";

import { createCart, getCartForUser } from "../controllers/cartController.js";

const router = Router();

router.post("/", createCart);

router.get("/user/:userId", getCartForUser);

export default router;
