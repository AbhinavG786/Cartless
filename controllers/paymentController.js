import { razorpay } from '../utils/razorpay.js';
import {asyncHandler} from "../utils/asyncHandler.js"
import crypto from 'crypto';
import prisma from '../utils/prisma.js';

const createOrder=asyncHandler(async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ order });
});

const verifyPayment=asyncHandler(async(req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === razorpay_signature) {
    // Save payment success in DB
    res.status(200).json({ message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid signature' });
  }
});

export {createOrder,verifyPayment}