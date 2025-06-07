import {createOrder,verifyPayment} from "../controllers/paymentController.js"
import { Router } from "express"
const router = Router();
router.post('/create-order', createOrder);  
router.post('/verify-payment', verifyPayment);

export default router;