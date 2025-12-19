import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const loginDriver = createAsyncThunk("auth/loginDriver", async (payload) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
});

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
  },
});

export default authSlice.reducer;
