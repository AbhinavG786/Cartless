import { Router } from "express";
import userRoutes from "./userRoutes.js" 
import cartItemRoutes from "./cartItemRoutes.js"
import cartRoutes from "./cartRoutes.js"
import orderRoutes from "./orderRoutes.js"
import productRoutes from "./productRoutes.js"
import authRoutes from "./authRoutes.js"
import storeRoutes from "./storeRoutes.js"
import paymentRoutes from "./paymentRoutes.js"

const router=Router()
router.use("/",userRoutes)
router.use("/",cartItemRoutes)
router.use("/",cartRoutes)
router.use("/",orderRoutes)
router.use("/",productRoutes)
router.use("/",authRoutes)
router.use("/",storeRoutes)
router.use("/",paymentRoutes)

export {userRoutes,cartItemRoutes,cartRoutes,orderRoutes,productRoutes,authRoutes,storeRoutes,paymentRoutes}