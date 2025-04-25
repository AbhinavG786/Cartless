import prisma from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, storeId, gtin, qrCode, tags } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      price,
      storeId,
      gtin,
      qrCode,
      tags: {
        create: tags.map((tagName) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName },
            },
          },
        })),
      },
    },
  });
  return res.status(201).json({ message: "Product created successfully" },product);
});

const getProductByGtin = asyncHandler(async (req, res) => {
  const { gtin } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      gtin,
    },
    include: { tags: { include: { tag: true } } },
  });
  return res
    .status(200)
    .json({ message: "Product fetched suuccessfully", data: product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, storeId, gtin, qrCode } = req.body;
  const { productId } = req.params;
  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      price,
      storeId,
      gtin,
      qrCode,
    },
  });
  return res.status(200).json({ message: "Product updated successfully" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  return res.status(204);
});

const searchProducts = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          store: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      store: true,
    },
  });
  
 return res.status(200).json({products});
});

export { createProduct, getProductByGtin, updateProduct, deleteProduct,searchProducts };
