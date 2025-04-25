import prisma from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createStore = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Store name is required" });
  }

  const store = await prisma.store.create({
    data: { name },
  });

  return res.status(201).json({ message: "Store created successfully", store });
});

const getAllStores = asyncHandler(async (req, res) => {
  const stores = await prisma.store.findMany();
  return res.status(200).json({ stores });
});

export { createStore, getAllStores };
