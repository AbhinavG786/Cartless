import prisma from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req,res) => {
    const {name,email}=req.body
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return res.status(201).json({message:"User created successfully"});
  });

  const getUserById = asyncHandler(async (req,res) => {
    // const {userId}=req.params
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cart: true,
        Order: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    return res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cart: user.cart,
        Order: user.Order,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    // return res.status(200).json({message:"User fetched successfully"});
  });

  const updateUser = asyncHandler(async (req,res) => {
    const {name, email}=req.body
    const {userId}=req.params
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
      },
    });
    return res.status(200).json({message:"User updated successfully"});
  });
  
  const deleteUser = asyncHandler(async (req,res) => {
    const {userId}=req.params
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return res.status(204);
  });
  
  

  export {createUser,getUserById,updateUser,deleteUser}
  