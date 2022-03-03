import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(formData);

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createUser(formData);

    console.log(data);
    if (data.ok) dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};
