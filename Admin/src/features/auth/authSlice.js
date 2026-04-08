import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      // Handle both string and object payloads for backward compatibility
      state.admin = typeof action.payload === 'object' && action.payload.admin 
        ? action.payload.admin 
        : action.payload;
    },
    logout: (state) => {
      state.admin = null;
    }
  }
});

export const { setAdmin, logout } = authSlice.actions;
export default authSlice.reducer;