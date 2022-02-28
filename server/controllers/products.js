import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addOrder = (req, res) => {
  console.log(req.body);
  res.send("Add order from client, NOT IMPLEMENTED YET");
};
