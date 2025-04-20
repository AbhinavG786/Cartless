import express from "express";
import cors from "cors";
import {userRoutes,cartItemRoutes,cartRoutes,orderRoutes,productRoutes} from './routes/index.js'

const app = express();

app.use(cors({ origin: "*", credentials: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/cart-items", cartItemRoutes);
app.use("/carts", cartRoutes);

export default app