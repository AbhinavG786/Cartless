import { Router } from "express";

import { createCart, getCartForUser } from "../controllers/cartController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js"

const router = Router();

router.post("/", authMiddleware,createCart);

router.get("/user",authMiddleware, getCartForUser);

export default router;
