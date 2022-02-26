import express from "express";
import {
  getOrders,
  getSpecificOrder,
  deleteSpecificOrder,
  addSpecificOrder,
  updateSpecificOrder,
  getProducts,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/dashboard.js";

const router = express.Router();

// Routes for administrator in the dashboard

router.get("/orders", getOrders);

router.get("/orders/:orderId", getSpecificOrder);
router.delete("/orders/:orderId", deleteSpecificOrder);
router.post("/orders/:orderId", addSpecificOrder);
router.put("/orders/:orderId", updateSpecificOrder);

router.get("/products", getProducts);
router.post("/products", addProduct);

router.get("/products/:productId", getProduct);
router.delete("/products/:productId", deleteProduct);
router.put("/products/:productId", updateProduct);

export default router;
