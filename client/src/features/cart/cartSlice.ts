import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, OrderProduct } from "./cartSlice.types";

const initialState: CartState = {
  orderList: [],
  orderTotal: 0,
  paymentType: "Cash",
  deliverType: "Pickup",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<OrderProduct>) => {
      state.orderList.push(action.payload);
    },
    increaseQty: (state, action: PayloadAction<OrderProduct["tempId"]>) => {
      state.orderList.map((product) => {
        if (product.tempId === action.payload) {
          product.qty += 1;
          product.priceTotal = product.price * product.qty;
        }
        return product;
      });
    },
    decreaseQty: (state, action: PayloadAction<OrderProduct["tempId"]>) => {
      state.orderList.map((product) => {
        if (product.tempId === action.payload) {
          product.qty -= 1;
          product.priceTotal = product.price * product.qty;
        }
        return product;
      });
    },
    deleteProduct: (state, action: PayloadAction<OrderProduct["tempId"]>) => {
      state.orderList = state.orderList.filter(
        (product) => action.payload !== product.tempId
      );
    },
    // Update total order
    updateTotalOrder: (state) => {
      if (state.orderList.length > 0) {
        state.orderTotal = state.orderList.reduce((acc, product) => {
          return acc + product.priceTotal;
        }, 0);
      }
    },
    clearOrder: (state) => {
      state.orderList = initialState.orderList;
      state.paymentType = initialState.paymentType;
      state.deliverType = initialState.deliverType;
      state.orderTotal = initialState.orderTotal;
    },
  },
});

export const {
  addProduct,
  increaseQty,
  decreaseQty,
  deleteProduct,
  updateTotalOrder,
  clearOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
