import prisma from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req,res) => {
    const {userId, totalPrice}=req.body
    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
      },
    });
    return res.status(201).json({message:"Order created successfully"});
  });

  const getAllOrdersForUser = asyncHandler(async (req,res) => {
    const {userId}=req.params
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
    });
    return res.status(200).json({message:"All orders fetched successfully"});
  });

  const updateOrderTotalPrice = asyncHandler(async (req,res) => {
    const {totalPrice}=req.body
    const {orderId}=req.params
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        totalPrice,
      },
    });
    return res.status(200).json({message:"Total price of Order updated successfully"});
  });
  
  const deleteOrder = asyncHandler(async (req,res) => {
    const {orderId}=req.params
    const deletedOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return res.status(204);
  });
  

  export {createOrder,getAllOrdersForUser,updateOrderTotalPrice,deleteOrder}