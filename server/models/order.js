import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderList: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      options: [{ type: String }],
      priceTotal: { type: Number },
      qty: { type: Number },
    },
  ],
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
  deliverType: {
    type: String,
    enum: ["Pickup", "Delivery"],
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
