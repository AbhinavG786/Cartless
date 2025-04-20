import prisma from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCartItem =asyncHandler(async (req,res) => {
    const {cartId, productId, quantity} =req.body
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
    return res.status(201).json({message:"Cart Item created successfully"});
  });

  const getCartItemById = asyncHandler(async (req,res) => {
    const {cartItemId}=req.params
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: {
        product: true,
      },
    });
    return res.status(200).json({message:"Cart item fetched successfully"});
  });
  
  const updateCartItemQuantity = asyncHandler(async (req,res) => {
    const {quantity}=req.body
    const {cartItemId}=req.params
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });
    return res.status(200).json({message:"Cart Item quantity updated successfully"});
  });

  const deleteCartItem = asyncHandler(async (req,res) => {
    const {cartItemId}=req.params
    const deletedCartItem = await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
    return res.status(204);
  });
  
  
  
  export {createCartItem,getCartItemById,updateCartItemQuantity,deleteCartItem}