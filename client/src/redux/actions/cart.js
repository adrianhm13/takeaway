import {
  ADD_ITEM,
  DECREASE_QTY,
  DELETE_ITEM,
  INCREASE_QTY,
  UPDATE_TOTAL,
} from "../../constants/actionTypes";

export const addItemAction = (product) => ({
  type: ADD_ITEM,
  payload: product,
});

export const updateTotalAction = () => ({ type: UPDATE_TOTAL });

export const increaseQtyAction = (id) => ({ type: INCREASE_QTY, payload: id });
export const decreaseQtyAction = (id) => ({ type: DECREASE_QTY, payload: id });
export const deleteItemAction = (deleteItem) => ({ type: DELETE_ITEM, payload: deleteItem });
