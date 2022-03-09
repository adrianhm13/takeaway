import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/apiSlice.types";

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
    saveProfileLocal: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      localStorage.setItem("profile", JSON.stringify({ ...state }));
    },
    getProfileLocal: (state) => {
      const profileJSON = localStorage.getItem("profile");
      if (profileJSON !== null) {
        const profile: AuthState = JSON.parse(profileJSON);
        state.user = profile.user;
        state.token = profile.token;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    deleteProfileLocal: (state) => {
      localStorage.clear();
    },
  },
});

export const {
  setCredentials,
  saveProfileLocal,
  logout,
  deleteProfileLocal,
  getProfileLocal,
} = authSlice.actions;
export default authSlice.reducer;
