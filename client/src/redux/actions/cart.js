import { ADD_ITEM } from "../../constants/actionTypes";

export const addItemAction = (product) => ({ type: ADD_ITEM, payload: product });
