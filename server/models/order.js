import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  client: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  orderedAt: {
    type: Date,
    default: new Date(),
  },
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Refund", "Cancelled"],
  },
  paymentType: {
    type: String,
    enum: ["Card", "Cash"],
  },
  orderStatus: {
    type: String,
    enum: ["Ordered", "Delivered", "Ready", "Preparing"],
  },
  typeDeliver: {
    type: String,
    enum: ["Pickup", "Delivery"],
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
