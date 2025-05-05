import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      return null;
    }

    return {
      name: decoded.name || "Utente",
      role: Array.isArray(decoded.role) ? decoded.role[0] : decoded.role,
    };
  } catch {
    return null;
  }
};

const initialState = {
  token: token,
  user: token ? getUserFromToken(token) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      state.token = token;
      state.user = getUserFromToken(token);
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
