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
  
  const getCartRecommendationsByTags = asyncHandler(async (req, res) => {
    const { cartId } = req.params;
  
    // Step 1: Get products in the cart
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId },
      include: {
        product: {
          include: {
            tags: {
              include: { tag: true },
            },
          },
        },
      },
    });
  
    const productIdsInCart = cartItems.map(item => item.productId);
  
    // Step 2: Get tag names used in the cart
    const tagNames = [
      ...new Set(
        cartItems.flatMap(item =>
          item.product.tags.map(pt => pt.tag.name)
        )
      ),
    ];
  
    // Step 3: Find products with those tags not in the cart
    const recommendedProducts = await prisma.product.findMany({
      where: {
        id: { notIn: productIdsInCart },
        tags: {
          some: {
            tag: {
              name: { in: tagNames },
            },
          },
        },
      },
      include: { tags: { include: { tag: true } } },
      take: 10,
    });
  
    return res.status(200).json({
      message: "Tag-based recommendations fetched successfully",
      recommendations: recommendedProducts,
    });
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
  
  
  
  export {createCartItem,getCartItemById,getCartRecommendationsByTags,updateCartItemQuantity,deleteCartItem}