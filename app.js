import express from "express";
import cors from "cors";
import {
  userRoutes,
  cartItemRoutes,
  cartRoutes,
  orderRoutes,
  productRoutes,
  authRoutes,
  storeRoutes,
  paymentRoutes
} from "./routes/index.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/cart-items", cartItemRoutes);
app.use("/carts", cartRoutes);
app.use("/store", storeRoutes);
app.use("/payment", paymentRoutes);

export default app;
