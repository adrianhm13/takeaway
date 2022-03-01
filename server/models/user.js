import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  dateBirth: { type: Date, required: true },
  address: {
    street: { type: String, required: true },
    town: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  email: { type: String, required: true },
  phone: { type: Number, maxLength: 10, minLength: 1 },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  isAdmin: { type: Boolean, default: false },
  password: {type: String, required: true}
});

const User = mongoose.model("User", userSchema);

export default User;
