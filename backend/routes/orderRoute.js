import express from "express"
import { placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", authMiddleware, verifyOrder)
orderRouter.post("/orders", authMiddleware, userOrders)

export default orderRouter;