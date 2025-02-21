import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAuthenticate: false,
}

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.userData;
      state.isAuthenticate = true;
    },
    logout: (state) => {
      state.isAuthenticate = false;
      state.userData = null;
    },
    setUser: (state, action) => {
      state.userData = action.payload.userData;
      state.isAuthenticate = true;
    }
  },
})

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;