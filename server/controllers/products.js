import Product from "../models/product.js";
import Order from "../models/order.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addOrder = async (req, res, next) => {
  const orderInfo = req.body;
  console.log("Order:", orderInfo);
  try {
    const newOrder = new Order({
      client: orderInfo.client,
      orderList: orderInfo.order,
      totalAmount: orderInfo.totalAmount,
      paymentType: orderInfo.paymentType,
      deliverType: orderInfo.deliverType,
      paymentStatus: "Completed",
      orderStatus: "Ordered",
    });
    await newOrder.save((error) => {
      if (error) return next(error);
      res.status(200).json("Your order was processed correctly");
    });
  } catch (error) {
    return next(error);
  }
};
