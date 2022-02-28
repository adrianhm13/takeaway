import express from "express";
import { getProducts, addOrder } from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts)
router.post('/', addOrder)

export default router