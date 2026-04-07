import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    logout: (state) => {
      state.admin = null;
    }
  }
});

export const { setAdmin, logout } = authSlice.actions;
export default authSlice.reducer;