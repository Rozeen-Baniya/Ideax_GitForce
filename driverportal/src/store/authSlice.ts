import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState: AuthState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

export const loginDriver = createAsyncThunk(
  "auth/loginDriver",
  async (payload: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transport/login`,
        payload
      );
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  }
);

export const verifyAuthDriver = createAsyncThunk(
  "auth/verifyDriver",
  async (token: any) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/transport/verify`,
      token
    );
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginDriver.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginDriver.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(loginDriver.pending, (state) => {
      state.isAuthenticated = false;
      state.loading = true;
    });
    builder.addCase(verifyAuthDriver.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(verifyAuthDriver.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(verifyAuthDriver.pending, (state) => {
      state.isAuthenticated = false;
      state.loading = true;
    });
  },
});

export default authSlice.reducer;
