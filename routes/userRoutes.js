import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js"
const router = Router();

router.post("/", createUser);

router.get("/",authMiddleware, getUserById);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

export default router;
