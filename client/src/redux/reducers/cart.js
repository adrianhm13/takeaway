import {
  ADD_ITEM,
  DECREASE_QTY,
  DELETE_ITEM,
  INCREASE_QTY,
  UPDATE_TOTAL,
} from "../../constants/actionTypes";

const cartReducer = (state = { orderList: [], total: 0 }, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const cartCopy = [...state.orderList];
      cartCopy.push(action.payload);
      return { ...state, orderList: cartCopy };
    }

    case UPDATE_TOTAL: {
      const cartCopy = [...state.orderList];
      let newTotal = 0;
      if (cartCopy.length > 0) {
        newTotal = cartCopy.reduce((acc, item) => {
          return acc + item.priceTotal;
        }, 0);
      }
      return { ...state, total: newTotal };
    }

    case INCREASE_QTY: {
      const cartCopy = [...state.orderList].map((item) => {
        if (item.tempId === action.payload) {
          item.qty += 1;
          item.priceTotal = item.price * item.qty;
        }
        return item;
      });
      return { ...state, orderList: cartCopy };
    }

    case DECREASE_QTY: {
      const cartCopy = [...state.orderList].map((item) => {
        if (item.tempId === action.payload) {
          item.qty -= 1;
          item.priceTotal = item.price * item.qty;
        }
        return item;
      });
      return { ...state, orderList: cartCopy };
    }

    case DELETE_ITEM: {
      const orderFiltered = [...state.orderList].filter((item) => action.payload !== item);
      return { ...state, orderList: orderFiltered}
    }
    default:
      return { ...state };
  }
};

export default cartReducer;
