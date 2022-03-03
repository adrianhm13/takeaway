import { ADD_ITEM } from "../../constants/actionTypes";

const cartReducer = (state = { cartData: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const cartUpdated = [...state.cartData];
      cartUpdated.push(action.payload);
      return { ...state, cartData: cartUpdated };

    default:
      return { ...state };
  }
};

export default cartReducer;
