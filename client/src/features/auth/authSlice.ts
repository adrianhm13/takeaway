import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/apiSliceTypes";

type AuthState = {
  user: User | null;
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials} = authSlice.actions
export default authSlice.reducer 