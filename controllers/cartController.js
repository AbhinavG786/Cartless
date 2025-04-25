import prisma from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCart = asyncHandler(async (req,res) => {
  const userId = req.user.userId;
    const cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
    return res.status(201).json({message:"Cart created successfully",cart});
  });

  const getCartForUser = asyncHandler(async (req,res) => {
    const userId = req.user.userId;
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return res.status(200).json({message:"Cart fetched successfully",cart});
  });
  

  export {createCart,getCartForUser}