import { Router } from "express";
import { createStore, getAllStores } from "../controllers/storeController.js";

const router = Router();

router.post("/", createStore);
router.get("/", getAllStores);

export default router;
