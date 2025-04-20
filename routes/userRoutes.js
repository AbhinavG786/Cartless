import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const router = Router();

router.post("/", createUser);

router.get("/:userId", getUserById);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

export default router;
