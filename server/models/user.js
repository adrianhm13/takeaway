import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  dateBirth: { type: Date, required: true },
  address: [
    {
      street: { type: String, required: true },
      town: { type: String, required: true },
      zipCode: { type: Number, required: true },
    },
  ],
  contact: { type: Number, maxLength: 10, minLength: 1 },
  orders: [{ type: Schema.ObjectId, ref: "Order" }],
});

const User = mongoose.model("User", userSchema);

export default User;