import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name,email, password } = req.body;
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email address.");
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  return res
    .status(201)
    .json({ message: "User registered successfully", token: accessToken });
});

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if (!email || !password)
        return res
          .status(400)
          .json({ message: "All fields are required" });
    const user=await prisma.user.findUnique({
        where:{email}
    })
    if (!user)
        return res
          .status(404)
          .json({ message: "User with the specified email does not exist." });
    
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword)
        return res
          .status(400)
          .json({ message: "Password doesn't match. Try again." });
    
      const accessToken = jwt.sign(
        { userId: user.id, email: user.email},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
      );
      return res.status(200).json({message:"User logged in successfully",token:accessToken})
})


export {registerUser,loginUser}