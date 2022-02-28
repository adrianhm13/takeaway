import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  options: [String],
  selectedFile: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
